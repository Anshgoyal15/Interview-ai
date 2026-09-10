import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
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

        <Link 
        href="/create-kit"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
          Create Interview Kit
        </Link>
      </div>
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
        <div className="text-3xl mb-4">🏢</div>

        <h3 className="text-xl font-semibold mb-2">
          Company Research
        </h3>

        <p className="text-slate-400">
          Learn about the company, its culture, products,
          and what matters for your interview.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="text-3xl mb-4">❓</div>

        <h3 className="text-xl font-semibold mb-2">
          Interview Questions
        </h3>

        <p className="text-slate-400">
          Practice questions tailored to the role
          you're applying for.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="text-3xl mb-4">🧠</div>

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