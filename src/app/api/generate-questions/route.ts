import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { company, role, jobDescription, technologies } = body;

    if (!company || !role || !jobDescription) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
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

Requirements:
- Include technical and behavioral questions.
- Make the questions relevant to the role.
- Use the technologies from the job description.
- Keep each question clear and concise.
- Return ONLY the questions.
- Put each question on a separate line.
`;

    const ollamaResponse = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5:0.5b",
          prompt,
          stream: false,
        }),
      }
    );

    if (!ollamaResponse.ok) {
      throw new Error("Ollama request failed.");
    }

    const data = await ollamaResponse.json();

    const questions = data.response
      .split("\n")
      .map((question: string) =>
        question.replace(/^\s*\d+[\.\)]\s*/, "").trim()
      )
      .filter((question: string) => question.length > 0)
      .slice(0, 10);

    return NextResponse.json({
      questions,
    });
  } catch (error) {
    console.error("OLLAMA ERROR:", error);

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