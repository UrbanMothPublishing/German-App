import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, X } from "lucide-react";

import { chunkyClasses } from "@/components/app/ChunkyButton";
import { useOnboardingGuard } from "@/components/app/useOnboardingGuard";
import { progressSummary, useAppStore } from "@/lib/store";

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "My mistakes — Einbürgerungstest Trainer" },
      { name: "description", content: "Review the Einbürgerungstest questions you got wrong and practise them again." },
      { property: "og:title", content: "My mistakes — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Review the Einbürgerungstest questions you got wrong and practise them again." },
    ],
  }),
  component: Mistakes,
});

function Mistakes() {
  const ready = useOnboardingGuard();
  const store = useAppStore();
  if (!ready) return <div className="h-full" />;
  const { mistakes } = progressSummary(store.pool, store.stats);

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="font-display text-[1.9rem] font-extrabold tracking-tight">My mistakes</h1>
      <p className="mt-1 text-muted-foreground">Questions you got wrong come back until you get them right.</p>

      {mistakes.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-[2rem] border-2 border-dashed p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <Sparkles className="h-8 w-8" />
          </div>
          <p className="font-display mt-4 text-xl font-bold">No mistakes yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Get studying — anything you miss shows up here.</p>
          <Link to="/practice" search={{ mode: undefined }} className={chunkyClasses("primary", "mt-6")}>
            Start practice
          </Link>
        </div>
      ) : (
        <>
          <Link to="/practice" search={{ mode: "mistakes" }} className={chunkyClasses("accent", "mt-5")}>
            Practise {mistakes.length} mistake{mistakes.length === 1 ? "" : "s"}
          </Link>
          <ul className="mt-5 space-y-3">
            {mistakes.map((q) => {
              const s = store.stats[q.id];
              return (
                <li key={q.id} className="rounded-2xl border-2 bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">{q.topic}</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-destructive">
                      <X className="h-3.5 w-3.5" strokeWidth={3} /> {s?.wrong ?? 1}× wrong
                    </span>
                  </div>
                  <p className="mt-2 font-semibold leading-snug">{q.text}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-success">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={3} /> {q.options[q.correct]}
                  </p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
