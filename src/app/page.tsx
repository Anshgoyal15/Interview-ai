"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeSummary, setResumeSummary] = useState("");
const [analyzingResume, setAnalyzingResume] = useState(false);

  const handleResumeChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Please upload a PDF file only.");
    event.target.value = "";
    return;
  }

  if (file.size > 4 * 1024 * 1024) {
    alert("Please upload a PDF smaller than 4 MB.");
    event.target.value = "";
    return;
  }

  setResume(file);

  try {
    const formData = new FormData();
    formData.append("resume", file);

    const response = await fetch("/api/analyze-resume", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to analyze resume.");
    }

    console.log("RESUME ANALYSIS:", data.resumeSummary);

sessionStorage.setItem("resumeSummary", data.resumeSummary);

alert("Resume analyzed successfully! 🎉");
  } catch (error) {
    console.error("RESUME ERROR:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Failed to analyze resume."
    );
  }
};

  const removeResume = () => {
  setResume(null);
  sessionStorage.removeItem("resumeSummary");
};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full px-8 py-6 flex items-center justify-between">
        <div className="text-xl font-bold">
          InterviewAI
        </div>

        <div className="flex items-center gap-8 text-sm text-slate-300">
          <a href="#">Features</a>
          <a href="#">How it works</a>
          <a href="#">About</a>

          <button className="bg-white text-slate-950 px-4 py-2 rounded-lg font-semibold">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-purple-400 font-semibold mb-4">
            AI-POWERED INTERVIEW PREPARATION
          </p>

          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Prepare smarter.
            <br />
            Interview with confidence.
          </h1>

          <p className="text-slate-400 text-lg mb-8">
            Create a personalized interview preparation kit based on
            your job description and company.
          </p>

          {/* Resume Upload */}
          <div className="max-w-xl mx-auto mb-6">
            <label
              htmlFor="resume-upload"
              className="block cursor-pointer bg-slate-900 border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-2xl p-8 transition"
            >
              <div className="text-4xl mb-3">
                📄
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Upload your resume
              </h3>

              <p className="text-slate-400 mb-4">
                Upload your resume to personalize your interview preparation.
              </p>

              <span className="inline-block bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg font-semibold">
                Choose PDF
              </span>

              <p className="text-xs text-slate-500 mt-3">
                PDF files only
              </p>

              <input
                id="resume-upload"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>

            {/* Selected Resume */}
           {resume && (
  <div className="mt-4 bg-slate-900 border border-green-600 rounded-xl p-4 flex items-center justify-between gap-4 text-left">
    <div className="flex items-center gap-3 min-w-0">
      <span className="text-2xl">📄</span>

      <div className="min-w-0">
        <p className="text-sm text-slate-400">
          Selected Resume
        </p>

        <p className="font-semibold truncate">
          {resume.name}
        </p>
      </div>
    </div>

    <button
      onClick={removeResume}
      className="text-red-400 hover:text-red-300 text-sm font-semibold"
    >
      Remove
    </button>
  </div>
)}

{resumeSummary && (
  <div className="mt-4 bg-slate-900 border border-purple-700 rounded-xl p-5 text-left">
    <div className="flex items-center gap-2 mb-3">
      <span className="text-2xl">🧠</span>

      <h3 className="text-lg font-semibold">
        Resume Analysis
      </h3>
    </div>

    <p className="text-green-400 text-sm font-semibold mb-3">
      ✅ Resume analyzed successfully
    </p>

    <div className="bg-slate-950 rounded-lg p-4 max-h-64 overflow-y-auto">
      <p className="text-slate-300 text-sm whitespace-pre-wrap leading-6">
        {resumeSummary}
      </p>
    </div>
  </div>
)}
          </div>

          <Link
            href="/create-kit"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Create Interview Kit
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 py-16">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-purple-400 font-semibold mb-3">
              EVERYTHING YOU NEED
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Prepare for every part of your interview
            </h2>

            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Get the tools you need to research companies,
              practice questions, and build confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl mb-4">
                🏢
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Company Research
              </h3>

              <p className="text-slate-400">
                Learn about the company, its culture, products,
                and what matters for your interview.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl mb-4">
                ❓
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Interview Questions
              </h3>

              <p className="text-slate-400">
                Practice questions tailored to the role
                you're applying for.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="text-3xl mb-4">
                🧠
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Smart Flashcards
              </h3>

              <p className="text-slate-400">
                Review important concepts quickly with
                personalized flashcards.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}