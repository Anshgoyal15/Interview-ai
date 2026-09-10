"use client";
import { useEffect, useState } from "react";
export default function CreateKit() {
    const [company, setCompany] = useState("");
const [role, setRole] = useState("");
const [jobDescription, setJobDescription] = useState("");
const [generated, setGenerated] = useState(false);
const [questions, setQuestions] = useState<string[]>([]);
const [loading, setLoading] = useState(false);
const [answers, setAnswers] = useState<string[]>([]);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [submitted, setSubmitted] = useState(false);
const [score, setScore] = useState(0);
const [feedback, setFeedback] = useState<string[]>([]);
const [timeLeft, setTimeLeft] = useState(20 * 60);
useEffect(() => {
  if (!generated || submitted) return;

  if (timeLeft <= 0) {
    submitInterview();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [generated, submitted, timeLeft]);

const submitInterview = async () => {
  try {
    const response = await fetch("/api/evaluate-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions,
        answers,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to evaluate answers.");
    }

    setFeedback(
      data.evaluation.map(
        (item: { score: number; feedback: string }) => item.feedback
      )
    );

   const totalScore = data.evaluation.reduce(
  (total: number, item: { score: number }) => {
    const itemScore = Number(item.score);

    return total + (Number.isFinite(itemScore) ? itemScore : 0);
  },
  0
);

    const answeredCount = answers.filter(
  (answer) => answer && answer.trim().length >= 20
).length;

const finalScore =
  answeredCount > 0
    ? Math.round((totalScore / (answeredCount * 10)) * 100)
    : 0;

    setScore(finalScore);
    setSubmitted(true);
  } catch (error) {
    console.error("SUBMIT ERROR:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong while evaluating your answers."
    );
  }
};
const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "SQL",
  "Git",
];
  const generateKit = async () => {

  setLoading(true);

  try {
    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        role,
        jobDescription,
        technologies: technologies.filter((tech) =>
          jobDescription.toLowerCase().includes(tech.toLowerCase())
        ),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate questions");
    }

    setQuestions(data.questions);
    setGenerated(true);
  } catch (error) {
    console.error(error);
    alert( error instanceof Error
      ? error.message
      :"Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Create Your Interview Kit
        </h1>

        <p className="text-slate-400 mb-10">
          Tell us about the job you're applying for.
        </p>

        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              Company Name
            </label>

            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Job Role
            </label>

            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Job Description
            </label>

            <textarea
              placeholder="Paste the job description here..."
              rows={8}
              value={jobDescription}
onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 outline-none focus:border-blue-500"
            />
          </div>

          <button
          onClick={generateKit}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Generating..." : "Generate Interview Kit"}
          </button>

        </div>
        {generated && (
  <div className="mt-12 space-y-6">

    <div>
      <p className="text-blue-400 font-semibold">
        YOUR INTERVIEW KIT
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {company || "Your Company"} — {role || "Your Role"}
      </h2>
    </div>

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        🏢 Company Research
      </h3>
     
      <p className="text-slate-400">
        Research the company's products, culture, values,
        recent developments, and the requirements of the role.
      </p>
    </div>

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-3">
        ❓ Interview Questions
      </h3>

      <div className="space-y-6">
  {questions.length > 0 && (
  <div className="bg-slate-800 p-5 rounded-lg">
    <div className="flex justify-center sm:justify-end mb-4">
  <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg font-semibold">
    ⏱️ {Math.floor(timeLeft / 60)}:
    {String(timeLeft % 60).padStart(2, "0")}
  </div>
</div>
    <p className="text-sm text-slate-400 mb-2">
      Question {currentQuestion + 1} of {questions.length}
    </p>
    <div className="w-full bg-slate-700 rounded-full h-2 mb-5">
  <div
    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
    style={{
      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
    }}
  />
</div>

    <p className="font-semibold text-lg mb-4">
      {currentQuestion + 1}. {questions[currentQuestion]}
    </p>

    <textarea
      value={answers[currentQuestion] || ""}
      onChange={(e) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);
      }}
      placeholder="Type your answer here..."
      className="w-full min-h-28 sm:min-h-32 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
    />

    <div className="flex flex-col sm:flex-row gap-3 justify-between mt-5">
      <button
        onClick={() =>
          setCurrentQuestion((prev) => Math.max(prev - 1, 0))
        }
        disabled={currentQuestion === 0}
        className="px-5 py-2 bg-slate-700 rounded-lg disabled:opacity-40"
      >
        ← Previous
      </button>

      <button
        onClick={() =>
          setCurrentQuestion((prev) =>
            Math.min(prev + 1, questions.length - 1)
          )
        }
        disabled={currentQuestion === questions.length - 1}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-40"
      >
        Next →
      </button>
      {currentQuestion === questions.length - 1 && (
  <button
    onClick={submitInterview}
    className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
  >
    Submit Interview
  </button>
)}
    </div>
  </div>
)}
</div>
    </div>

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      {submitted && (
  <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 text-center mt-6">
    <div className="text-5xl mb-4">🎉</div>

    <h3 className="text-2xl font-bold mb-3">
      Interview Complete!
    </h3>

    <p className="text-slate-400 mb-6">
      Here is your interview practice score.
    </p>
    <div className="mt-8 text-left">
  <h4 className="text-xl font-bold mb-4">
    📝 AI Feedback
  </h4>

  <div className="space-y-4">
    {feedback.map((item, index) => (
      <div
        key={index}
        className="bg-slate-800 rounded-lg p-4"
      >
        <p className="font-semibold mb-2">
          Question {index + 1}
        </p>

        <p className="text-slate-300">
          {item}
        </p>
      </div>
    ))}
  </div>
</div>

    <h3 className="text-2xl font-bold mb-3">
  📊 Your Interview Score
</h3>
    <div className="text-6xl font-bold text-blue-500 mb-3">
      {score}%
    </div>
    <div className="w-full max-w-md mx-auto bg-slate-800 rounded-full h-3 mb-6">
  <div
    className="bg-blue-600 h-3 rounded-full transition-all"
    style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
  />
</div>
    <p className="text-lg font-semibold mb-4">
  {score >= 80
    ? "🏆 Excellent"
    : score >= 60
    ? "👍 Good"
    : score >= 40
    ? "📚 Needs Improvement"
    : "💪 Keep Practicing"}
</p>
    <div className="mt-4 mb-6 inline-block bg-slate-800 border border-slate-700 rounded-lg px-6 py-3">
  <p className="text-sm text-slate-400">
    Questions Answered
  </p>

  <p className="text-xl font-bold text-white">
    {answers.filter(
      (answer) => answer && answer.trim().length >= 20
    ).length}{" "}
    / {questions.length}
  </p>
</div>

    <p className="text-slate-400">
  {score >= 80
    ? "Excellent work! 🚀"
    : score >= 50
    ? "Good effort! Keep practicing. 💪"
    : "Keep practicing and try again. 📚"}
</p>

<button
  onClick={() => {
    setSubmitted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setFeedback([]);
    setScore(0);
    setTimeLeft(20 * 60);
  }}
  className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
>
  🔄 Practice Again
</button>

</div>
)}
      <h3 className="text-xl font-bold mb-3">
        🧠 Key Topics to Prepare
      </h3>

      <div className="flex flex-wrap gap-3">
        {technologies
  .filter((tech) =>
    jobDescription.toLowerCase().includes(tech.toLowerCase())
  )
  .map((tech) => (
    <span
      key={tech}
      className="bg-slate-800 px-3 py-2 rounded-lg"
    >
      {tech}
    </span>
  ))}
      </div>
    </div>

  </div>
)}
      </div>
    </main>
  );
}