import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Home } from "lucide-react";

import { chunkyClasses } from "@/components/app/ChunkyButton";
import { ProgressRing } from "@/components/app/ProgressRing";
import { canTakeMockExam, hasPassed, passMark } from "@/lib/questions";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Exam result — Einbürgerungstest Trainer" },
      { name: "description", content: "See how you did in your mock Einbürgerungstest and review the questions you missed." },
      { property: "og:title", content: "Exam result — Einbürgerungstest Trainer" },
      { property: "og:description", content: "See how you did in your mock Einbürgerungstest and review the questions you missed." },
    ],
  }),
  component: Result,
});

function Result() {
  const store = useAppStore();
  if (!store.hydrated) return <div className="h-full" />;
  const r = store.exams[0];

  if (!r) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
        <h1 className="font-display text-2xl font-extrabold">No exam yet</h1>
        <p className="mt-2 text-muted-foreground">Take a mock exam to see your result here.</p>
        <Link to="/exam" className={chunkyClasses("primary", "mt-8")}>Take a mock exam</Link>
      </div>
    );
  }

  const passed = hasPassed(r.score, r.total);
  const wrong = store.pool.filter((q) => r.wrongIds.includes(q.id));
  const mins = Math.floor(r.seconds / 60);

  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-8">
      <section
        className={cn(
          "animate-pop-in relative overflow-hidden rounded-[2rem] p-6 text-center",
          passed ? "bg-hero text-primary-foreground dark:text-foreground" : "bg-destructive-soft",
        )}
      >
        <p className="text-sm font-bold uppercase tracking-widest opacity-80">Result</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">{passed ? "Bestanden! 🎉" : "Almost there"}</h1>
        <div className="relative mx-auto mt-4 w-fit">
          <ProgressRing value={(r.score / r.total) * 100} size={140} stroke={13} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-extrabold">{r.score}</span>
            <span className="text-xs font-bold opacity-80">of {r.total}</span>
          </div>
        </div>
        <p className="mt-4 text-sm opacity-90">
          You needed {passMark(r.total)} to pass · finished in {mins} min
        </p>
      </section>

      <h2 className="font-display mt-7 text-lg font-bold">{wrong.length ? "Review your mistakes" : "No mistakes — perfect!"}</h2>
      <ul className="mt-3 space-y-3">
        {wrong.map((q) => (
          <li key={q.id} className="rounded-2xl border-2 bg-card p-4">
            <p className="font-semibold leading-snug">{q.text}</p>
            <p className="mt-2 flex items-start gap-2 text-sm text-success">
              <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} /> {q.options[q.correct]}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-3 pt-8">
        {canTakeMockExam(store.exams.length) ? (
          <Link to="/exam" className={chunkyClasses("primary")}>Take another mock exam</Link>
        ) : (
          <Link to="/unlock" className={chunkyClasses("accent")}>Unlock more mock exams</Link>
        )}
        <Link to="/" className={chunkyClasses("outline")}>
          <Home className="h-5 w-5" /> Back to home
        </Link>
      </div>
    </div>
  );
}
