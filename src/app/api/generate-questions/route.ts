import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
  company,
  role,
  jobDescription,
  technologies,
  resumeSummary,
} = body;

    if (!company || !role || !jobDescription) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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

Create exactly 10 interview questions for this candidate.

Company: ${company}
Role: ${role}

Job Description:
${jobDescription}

Technologies:
${technologies?.join(", ") || "Not specified"}
Resume:
${resumeSummary || "No resume provided"}

Requirements:
- Include technical and behavioral questions.
- Personalize questions using the candidate's resume when available.
- Make the questions relevant to the role.
- Use the technologies from the job description.
- Keep each question clear and concise.
- Return ONLY the questions.
- Put each question on a separate line.
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    let response;

try {
  response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });
} catch (error) {
  console.log("Gemini 3.6 unavailable. Trying Gemini 3.5...");

  response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });
}

    const result = response.text || "";

    const questions = result
      .split("\n")
      .map((question) =>
        question.replace(/^\s*\d+[\.\)]\s*/, "").trim()
      )
      .filter((question) => question.length > 0)
      .slice(0, 10);

    if (questions.length === 0) {
      throw new Error("Gemini did not generate any questions.");
    }

    return NextResponse.json({
      questions,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate questions.",
      },
      { status: 500 }
    );
  }
}