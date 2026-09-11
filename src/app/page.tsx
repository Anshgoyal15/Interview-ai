"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
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
  setAnalyzingResume(true);

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
setResumeSummary(data.resumeSummary);
setAnalyzingResume(false);
sessionStorage.setItem("resumeSummary", data.resumeSummary);

alert("Resume analyzed successfully! 🎉");
  } catch (error) {
    setAnalyzingResume(false);
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
    <>
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Futuristic background glow */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
  <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
</div>
      {/* Navbar */}
<nav className="absolute top-3 left-3 right-3 z-50 rounded-2xl border border-purple-500/30 bg-slate-950/75 backdrop-blur-xl shadow-2xl shadow-purple-950/20">
  <div className="px-5 md:px-7 py-3 flex items-center justify-between">

    {/* Brand */}
    <div className="flex items-center gap-3">

      {/* AI Brain */}
      <div className="w-10 h-10 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
        >
          <path
            d="M24 7C19 2 11 5 11 11C6 11 4 16 7 20C3 24 6 30 11 30C10 36 15 40 20 38C21 43 27 43 28 38C33 40 38 36 37 30C42 30 45 24 41 20C44 16 42 11 37 11C37 5 29 2 24 7Z"
            stroke="url(#brainGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M24 8V39M17 13C20 15 20 19 18 21M31 13C28 15 28 19 30 21M12 22C16 22 18 25 17 28M36 22C32 22 30 25 31 28"
            stroke="url(#brainGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="brainGradient"
              x1="5"
              y1="5"
              x2="43"
              y2="43"
            >
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="55%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Name */}
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-extrabold tracking-tight">
          <span className="text-white">Interview</span>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI
          </span>
        </span>

        <span className="hidden sm:inline-block text-xs md:text-sm font-medium text-white relative pb-1">
          by Ansh Goyal
          <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        </span>

        <span className="hidden sm:inline text-purple-400 text-xl">
          ✦
        </span>
      </div>
    </div>

    {/* Navigation */}
    <div className="hidden md:flex items-center gap-12 text-sm text-slate-300">
      <a
        href="#features"
        className="hover:text-white transition-colors"
      >
        Features
      </a>


      <a
        href="#about"
        className="hover:text-white transition-colors"
      >
        About
      </a>
    </div>

    {/* Right side */}
    <div className="flex items-center gap-5">


     {/* Theme Toggle */}
<button
  className="text-2xl text-white hover:scale-110 transition-transform"
  aria-label="Toggle theme"
>
  
</button>
      {/* Login */}
      <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 px-5 md:px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300">
        Login →
      </button>

    </div>

  </div>
</nav>

     {/* Hero Section */}
<section id="how-it-works" className="pt-20 ...">

  <div className="max-w-7xl mx-auto w-full relative top-16">

    {/* Hero Content */}
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

      {/* LEFT SIDE */}
      <div className="text-left">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
          AI-Powered Interview Preparation
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">

          <span className="text-white">
            Practice Smarter.
          </span>

          <br />

          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Get Hired Faster.
          </span>

        </h1>

        {/* Description */} 
        <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-7 sm:leading-8">
  Real interview questions. AI-powered feedback.
  Personalized improvement. All in one place.
</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-8">

          <Link
            href="/create-kit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 px-7 py-3.5 rounded-xl font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300"
          >
            Start Practicing
            <span>→</span>
          </Link>

          <button
          onClick={() => setShowTutorial(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700 bg-slate-900/70 text-white font-semibold hover:bg-slate-800 transition"
          >
            <span>▶</span>
            ✨ How It Works
          </button>
          <a
  href="https://www.youtube.com/watch?v=P5NjkLpllA4"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-purple-500/40 bg-purple-500/10 text-white font-semibold hover:bg-purple-500/20 transition"
>
  ▶ Watch Demo
</a>

        </div>

      </div>


      {/* RIGHT SIDE — AI VISUAL */}
      <div className="hidden lg:flex relative items-center justify-center min-h-[480px] -mt-10">

        {/* Outer Glow */}
        <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

        {/* Orbital Ring */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-500/20" />

        <div className="absolute w-[440px] h-[440px] rounded-full border border-blue-500/10" />

        {/* AI Coach */}
        <div className="relative z-10">

          <div className="w-48 h-48 md:w-56 md:h-56 rounded-[2.5rem] bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/40">

            <div className="w-36 h-36 md:w-44 md:h-44 rounded-[2rem] bg-slate-950/80 flex items-center justify-center backdrop-blur-xl">
              <span className="text-7xl md:text-8xl">
                🤖
              </span>
            </div>

          </div>

          <div className="text-center mt-6">

            <h2 className="text-2xl font-bold text-white">
              Your AI Interview Coach
            </h2>

            <p className="text-slate-400 mt-2">
              Practice. Improve. Get hired.
            </p>

          </div>

        </div>


        {/* Technical Questions Card */}
        <div className="absolute top-4 left-2 md:left-0 lg:-left-8 rounded-2xl border border-purple-500/30 bg-slate-900/80 backdrop-blur-xl px-5 py-4 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl">
              &lt;/&gt;
            </div>

            <div>
              <p className="text-white font-semibold">
                Technical
              </p>

              <p className="text-purple-300 text-sm">
                Questions
              </p>
            </div>

          </div>

        </div>


        {/* Behavioral Questions Card */}
        <div className="absolute top-16 -right-2 md:right-0 lg:-right-8 rounded-2xl border border-blue-500/30 bg-slate-900/80 backdrop-blur-xl px-5 py-4 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">
              👥
            </div>

            <div>
              <p className="text-white font-semibold">
                Behavioral
              </p>

              <p className="text-blue-300 text-sm">
                Questions
              </p>
            </div>

          </div>

        </div>


        {/* Instant Feedback Card */}
        <div className="absolute bottom-12 -left-2 md:left-0 lg:-left-8 rounded-2xl border border-pink-500/30 bg-slate-900/80 backdrop-blur-xl px-5 py-4 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center text-xl">
              📊
            </div>

            <div>
              <p className="text-white font-semibold">
                Instant
              </p>

              <p className="text-pink-300 text-sm">
                Feedback
              </p>
            </div>

          </div>

        </div>


        {/* Progress Card */}
        <div className="absolute bottom-0 -right-2 md:right-0 lg:-right-8 rounded-2xl border border-blue-500/30 bg-slate-900/80 backdrop-blur-xl px-5 py-4 shadow-xl">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl">
              📈
            </div>

            <div>
              <p className="text-white font-semibold">
                Track
              </p>

              <p className="text-blue-300 text-sm">
                Progress
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>


    {/* Feature Highlights */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 max-w-5xl mx-auto">

      <div className="flex items-center gap-4 rounded-2xl border border-purple-500/20 bg-slate-900/60 backdrop-blur-xl p-5">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-2xl">
          ⚡
        </div>

        <div>
          <p className="font-semibold text-white">
            Real Questions
          </p>

          <p className="text-sm text-slate-400">
            Industry relevant
          </p>
        </div>
      </div>


      <div className="flex items-center gap-4 rounded-2xl border border-blue-500/20 bg-slate-900/60 backdrop-blur-xl p-5">
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl">
          📊
        </div>

        <div>
          <p className="font-semibold text-white">
            AI Feedback
          </p>

          <p className="text-sm text-slate-400">
            Detailed analysis
          </p>
        </div>
      </div>


      <div className="flex items-center gap-4 rounded-2xl border border-pink-500/20 bg-slate-900/60 backdrop-blur-xl p-5">
        <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-2xl">
          🎯
        </div>

        <div>
          <p className="font-semibold text-white">
            Personalized
          </p>

          <p className="text-sm text-slate-400">
            Improve faster
          </p>
        </div>
      </div>

    </div>
    </div>

  </section>

          {/* Resume Upload */}
          <div className="max-w-xl mx-auto mt-24 mb-6">
            <label
              htmlFor="resume-upload"
              className="block cursor-pointer rounded-3xl border-2 border-dashed border-purple-500/30 bg-slate-900/70 backdrop-blur-xl px-8 py-12 text-center shadow-2xl shadow-purple-900/10 hover:border-purple-400/60 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="text-5xl mb-4">
                📑
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Upload your resume
              </h3>

              <p className="text-slate-400 mb-4">
                Upload your resume to personalize your interview preparation.
              </p>

              <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 transition">
  {analyzingResume ? "⏳ Analyzing your resume..." : "Choose PDF"}
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

      {/* Features Section */}
      <section id="features" className="w-full px-6 py-16">
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
      {/* About Section */}
<section id="about" className="w-full px-6 py-20">
  <div className="max-w-4xl mx-auto text-center">

    <p className="text-purple-400 font-semibold tracking-widest text-sm mb-4">
      ABOUT
    </p>

    <h2 className="text-4xl md:text-5xl font-extrabold text-white">
      InterviewAI
    </h2>

    <p className="text-slate-400 mt-5 text-lg">
      An AI-powered interview preparation platform.
    </p>

    {/* Your Name */}
    <div className="mt-10 inline-block">
      <p className="text-sm text-slate-500 mb-2">
        Created & Developed by
      </p>

      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        Ansh Goyal
      </h3>

      <div className="h-1 mt-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
    </div>

  </div>
</section>
{/* Footer */}
<footer className="border-t border-slate-800 py-6 text-center">
  <p className="text-sm text-slate-500">
    © 2026 Ansh Goyal. All rights reserved.
  </p>
</footer>
    </main>
  
    {showTutorial && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
    <div className="w-full max-w-2xl rounded-3xl border border-purple-500/30 bg-slate-950 p-8 shadow-2xl shadow-purple-900/30">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-purple-400 text-sm font-semibold">
            QUICK TUTORIAL
          </p>
          <h2 className="text-3xl font-bold text-white mt-1">
            How InterviewAI Works
          </h2>
        </div>

        <button
          onClick={() => setShowTutorial(false)}
          className="text-slate-400 hover:text-white text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">

        <div className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-2xl">📄</span>
          <div>
            <h3 className="font-semibold text-white">
              1. Upload your resume
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Upload your PDF resume and let AI understand your skills,
              projects and experience.
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-2xl">🏢</span>
          <div>
            <h3 className="font-semibold text-white">
              2. Enter your interview details
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Add the company, job role and job description.
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-2xl">🤖</span>
          <div>
            <h3 className="font-semibold text-white">
              3. AI creates your questions
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              InterviewAI generates personalized technical and behavioral
              questions.
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-2xl">🎤</span>
          <div>
            <h3 className="font-semibold text-white">
              4. Take the interview
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Answer the questions one by one within the interview timer.
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-2xl">🧠</span>
          <div>
            <h3 className="font-semibold text-white">
              5. Get your AI score
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Receive scores and useful feedback to improve your answers.
            </p>
          </div>
        </div>

      </div>

      <button
        onClick={() => setShowTutorial(false)}
        className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-transform rounded-xl py-3 font-semibold text-white"
      >
        Got it — Let's Practice 🚀
      </button>

    </div>
  </div>
)}
</>
  );
}