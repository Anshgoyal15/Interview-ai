import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please upload a resume PDF." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      );
    }

    // Keep resume uploads reasonably small for the web app.
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume PDF must be smaller than 4 MB." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured." },
        { status: 500 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    const base64Pdf = Buffer.from(arrayBuffer).toString("base64");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert resume analyzer helping a candidate prepare for job interviews.

Analyze the uploaded resume carefully.

Return the result using exactly these sections:

CANDIDATE
- Name: [candidate name]

SUMMARY
- [short professional summary]

TECHNICAL SKILLS
- [list the technical skills found in the resume]

EXPERIENCE
- [companies, roles, internships, and important responsibilities]
- If no experience is present, write: None found

PROJECTS
- [project names and a short description of each]
- If no projects are present, write: None found

EDUCATION
- [degrees, institutions, and relevant details]

CERTIFICATIONS
- [certifications found]
- If none are present, write: None found

ACHIEVEMENTS
- [important achievements]
- If none are present, write: None found

IMPORTANT INSTRUCTIONS:
- Only use information actually present in the resume.
- Do not invent or assume information.
- Keep the response concise and useful for interview preparation.
`;

    let response;

try {
  response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      {
        text: prompt,
      },
    ],
  });
} catch (error) {
  console.log("Gemini 3.6 unavailable. Trying Gemini 3.5...");

  response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: [
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      {
        text: prompt,
      },
    ],
  });
}

    const resumeSummary = response.text || "";

    if (!resumeSummary.trim()) {
      throw new Error("Gemini could not extract information from the resume.");
    }

    return NextResponse.json({
      success: true,
      resumeSummary,
    });
  } catch (error) {
    console.error("RESUME ANALYSIS ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze resume.",
      },
      { status: 500 }
    );
  }
}