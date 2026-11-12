import { createFileRoute, Link } from "@tanstack/react-router";
import { Languages, PartyPopper, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AnswerOption, type OptionState } from "@/components/app/AnswerOption";
import { ChunkyButton, chunkyClasses } from "@/components/app/ChunkyButton";
import { QuestionText } from "@/components/app/QuestionHeader";
import { useOnboardingGuard } from "@/components/app/useOnboardingGuard";
import type { Question } from "@/lib/questions";
import { practiceQueue, useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

type Mode = "mistakes" | "state";
const SESSION_SIZE = 10;

export const Route = createFileRoute("/practice")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode | undefined } => ({
    mode: s["mode"] === "mistakes" || s["mode"] === "state" ? s["mode"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Practice — Einbürgerungstest Trainer" },
      { name: "description", content: "Practise Einbürgerungstest questions one at a time, with instant feedback and tap-to-translate words." },
      { property: "og:title", content: "Practice — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Practise Einbürgerungstest questions one at a time, with instant feedback and tap-to-translate words." },
    ],
  }),
  component: Practice,
});

function Practice() {
  const ready = useOnboardingGuard();
  const { mode } = Route.useSearch();
  if (!ready) return <div className="h-full" />;
  return <Session key={mode ?? "all"} mode={mode} />;
}

function Session({ mode }: { mode?: Mode | undefined }) {
  const store = useAppStore();
  const [queue, setQueue] = useState<Question[]>([]);
  const [round, setRound] = useState(0);

  // Build the queue once per session so answering doesn't reshuffle the questions.
  useEffect(() => {
    let list = practiceQueue(store.pool, store.stats);
    if (mode === "state") list = list.filter((q) => q.state);
    if (mode === "mistakes") list = list.filter((q) => store.stats[q.id]?.lastCorrect === false);
    setQueue(list.slice(0, SESSION_SIZE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, round]);

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wordMode, setWordMode] = useState(true);

  const q = queue[i];
  const done = queue.length > 0 && i >= queue.length;
  const title = mode === "state" ? `${store.state} questions` : mode === "mistakes" ? "Fix my mistakes" : "Practice";

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setRound((r) => r + 1);
  };

  const choose = (idx: number) => {
    if (picked !== null || !q) return;
    setPicked(idx);
    const correct = idx === q.correct;
    if (correct) setScore((s) => s + 1);
    store.recordAnswer(q.id, correct);
  };

  const states = useMemo<OptionState[]>(() => {
    if (!q) return [];
    return q.options.map((_, idx) => {
      if (picked === null) return "idle";
      if (idx === q.correct) return "correct";
      if (idx === picked) return "wrong";
      return "dimmed";
    });
  }, [q, picked]);

  if (queue.length === 0) {
    return (
      <EmptyState
        title={mode === "mistakes" ? "No mistakes to fix" : "Nothing to practise"}
        text={mode === "mistakes" ? "Every question you've tried is right. Nice work!" : "Try another set of questions."}
      />
    );
  }

  if (done) {
    const pct = Math.round((score / queue.length) * 100);
    return (
      <div className="flex min-h-full flex-col items-center px-6 pb-8 pt-14 text-center">
        <div className="animate-pop-in flex h-24 w-24 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-pop-accent">
          <PartyPopper className="h-12 w-12" />
        </div>
        <h1 className="font-display mt-6 text-3xl font-extrabold">{pct >= 70 ? "Super gemacht!" : "Good effort!"}</h1>
        <p className="mt-2 text-muted-foreground">
          You got <span className="font-bold text-foreground">{score} of {queue.length}</span> right this round.
        </p>
        <div className="mt-auto w-full space-y-3 pt-10">
          <ChunkyButton onClick={restart}>
            <RotateCcw className="h-5 w-5" /> Practise again
          </ChunkyButton>
          <Link to="/" className={chunkyClasses("outline")}>Back to home</Link>
        </div>
      </div>
    );
  }

  if (!q) return null;
  const isCorrect = picked !== null && picked === q.correct;

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 bg-background/95 px-5 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Close practice" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </Link>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((i + (picked !== null ? 1 : 0)) / queue.length) * 100}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-bold text-muted-foreground">
            {i + 1}/{queue.length}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold">{title}</p>
          <button
            type="button"
            onClick={() => setWordMode((w) => !w)}
            aria-pressed={wordMode}
            className={cn(
              "flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors",
              wordMode ? "border-primary bg-secondary text-secondary-foreground" : "text-muted-foreground",
            )}
          >
            <Languages className="h-4 w-4" /> Translate words {wordMode ? "on" : "off"}
          </button>
        </div>
      </div>

      <div className="flex-1 px-5 pb-4 pt-2">
        <QuestionText topic={q.topic} text={q.text} wordMode={wordMode} />
        <div className="mt-5 space-y-3">
          {q.options.map((opt, idx) => (
            <AnswerOption
              key={`${q.id}-${idx}`}
              index={idx}
              text={opt}
              state={states[idx] ?? "idle"}
              wordMode={wordMode}
              disabled={picked !== null}
              onChoose={() => choose(idx)}
            />
          ))}
        </div>
        {picked === null && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            {wordMode ? "Tap any word to translate it. Tap ✓ to choose an answer." : "Tap an answer to choose it."}
          </p>
        )}
      </div>

      {picked !== null && (
        <div
          className={cn(
            "animate-sheet-up sticky bottom-0 rounded-t-[2rem] px-5 pb-5 pt-5",
            isCorrect ? "bg-success-soft" : "bg-destructive-soft",
          )}
        >
          <p className={cn("font-display text-xl font-extrabold", isCorrect ? "text-success" : "text-destructive")}>
            {isCorrect ? "Richtig! 🎉" : "Not quite"}
          </p>
          {!isCorrect && (
            <p className="mt-1 text-sm">
              Correct answer: <span className="font-bold">{q.options[q.correct]}</span>
            </p>
          )}
          <ChunkyButton
            className="mt-4"
            onClick={() => {
              setPicked(null);
              setI((n) => n + 1);
            }}
          >
            {i + 1 === queue.length ? "See results" : "Next question"}
          </ChunkyButton>
        </div>
      )}
    </div>
  );
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <PartyPopper className="h-10 w-10" />
      </div>
      <h1 className="font-display mt-5 text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Link to="/practice" search={{ mode: undefined }} className={chunkyClasses("primary", "mt-8")}>
        Practise all questions
      </Link>
    </div>
  );
}
