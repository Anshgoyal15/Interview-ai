import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { questions, answers } = await request.json();

    if (!questions || !answers) {
      return NextResponse.json(
        { error: "Questions and answers are required." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answers to the interview questions.

Questions:
${questions
  .map((question: string, index: number) => `${index + 1}. ${question}`)
  .join("\n")}

Candidate Answers:
${answers
  .map(
    (answer: string, index: number) =>
      `${index + 1}. ${answer || "No answer provided"}`
  )
  .join("\n")}

For each answer:
- If the candidate did not provide an answer, give a score of 0.
- If the answer is very short or meaningless, give a score from 0 to 2.
- Give a score from 0 to 10 for answered questions.
- Give short, useful feedback.
- Consider correctness, relevance, clarity and completeness.
- Never give points to a blank answer.

Return ONLY valid JSON in this exact format:

[
  {
    "score": 8,
    "feedback": "Good answer. You explained the concept clearly."
  }
]

Return exactly one object for each question.
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let response;

try {
  response = await ai.models.generateContent({
    model: "gemini-3.7-flash",
    contents: prompt,
  });
} catch (error) {
  console.log("Gemini 3.7 unavailable. Trying Gemini 3.6...");

  response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });
}

    let result = response.text || "";

    result = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const evaluation = JSON.parse(result);

    const fixedEvaluation = evaluation.map(
      (
        item: { score: number; feedback: string },
        index: number
      ) => {
        const answer = answers[index];

        if (!answer || answer.trim().length < 20) {
          return {
            score: 0,
            feedback: "No answer was provided for this question.",
          };
        }

        return item;
      }
    );

    return NextResponse.json({
      evaluation: fixedEvaluation,
    });
  } catch (error) {
    console.error("GEMINI EVALUATION ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to evaluate answers.",
      },
      { status: 500 }
    );
  }
}