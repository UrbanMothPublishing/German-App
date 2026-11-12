import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Crown, Flame, MapPin, Moon, Sun, Target, Timer, Trophy } from "lucide-react";

import { chunkyClasses } from "@/components/app/ChunkyButton";
import { ProgressRing } from "@/components/app/ProgressRing";
import { useOnboardingGuard } from "@/components/app/useOnboardingGuard";
import { canTakeMockExam, FULL_QUESTION_COUNT, hasPassed } from "@/lib/questions";
import { progressSummary, streakCount, useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Einbürgerungstest Trainer — Practise for your citizenship test" },
      { name: "description", content: "A friendly mobile trainer for the German Einbürgerungstest with tap-to-translate words, audio and mock exams." },
      { property: "og:title", content: "Einbürgerungstest Trainer — Practise for your citizenship test" },
      { property: "og:description", content: "A friendly mobile trainer for the German Einbürgerungstest with tap-to-translate words, audio and mock exams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const ready = useOnboardingGuard();
  const store = useAppStore();
  if (!ready) return <div className="h-full" />;

  const { tried, known, mistakes, readiness } = progressSummary(store.pool, store.stats);
  const streak = streakCount(store.streakDays);
  const lastExam = store.exams[0];
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Guten Morgen" : hour < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <div className="px-5 pb-8 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{greeting} 👋</p>
          <Link to="/settings" className="mt-0.5 inline-flex items-center gap-1 text-sm font-bold text-primary">
            <MapPin className="h-4 w-4" /> {store.state}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-accent/30 px-3 py-1.5 text-sm font-extrabold text-accent-foreground dark:text-accent">
            <Flame className="h-4 w-4" /> {streak}
          </span>
          <button
            type="button"
            aria-label={store.dark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => store.setPrefs({ dark: !store.dark })}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-card"
          >
            {store.dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <h1 className="font-display mt-5 text-[1.9rem] font-extrabold leading-tight tracking-tight">
        Let's get you <span className="text-primary">test-ready.</span>
      </h1>

      {/* Readiness card */}
      <section className="bg-hero relative mt-5 overflow-hidden rounded-[2rem] p-5 text-primary-foreground shadow-soft dark:text-foreground">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25" aria-hidden />
        <div className="relative flex items-center gap-5">
          <div className="relative">
            <ProgressRing value={readiness} size={112} stroke={11} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-extrabold">{readiness}%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">ready</span>
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold opacity-85">Your readiness</p>
            <p className="font-display mt-1 text-xl font-bold leading-snug">
              {tried === 0 ? "Answer your first question to start." : `${known} of ${store.pool.length} questions known`}
            </p>
            <p className="mt-1 text-xs opacity-80">
              {tried === 0 ? "Only answers you get right count." : `${tried} tried · ${mistakes.length} still to learn`}
            </p>
          </div>
        </div>
      </section>

      {/* Main entry point */}
      <Link to="/practice" search={{ mode: undefined }} className={chunkyClasses("accent", "mt-5 justify-between py-5 text-lg")}>
        <span className="flex flex-col items-start leading-tight">
          <span>{tried === 0 ? "Start practice" : "Continue practice"}</span>
          <span className="text-xs font-semibold opacity-75">
            {mistakes.length ? `${mistakes.length} to review first` : "10 questions · about 5 min"}
          </span>
        </span>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-foreground/10">
          <ArrowRight className="h-6 w-6" strokeWidth={3} />
        </span>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to="/exam" className="group rounded-3xl border-2 bg-card p-4 shadow-pop-border transition-all active:translate-y-0.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
            <Timer className="h-6 w-6" />
          </span>
          <p className="font-display mt-3 text-lg font-bold leading-tight">Mock exam</p>
          <p className="text-xs text-muted-foreground">
            {canTakeMockExam(store.exams.length) ? "33 questions · 1 free" : "Free exam used · unlock more"}
          </p>
        </Link>
        <Link to="/mistakes" className="rounded-3xl border-2 bg-card p-4 shadow-pop-border transition-all active:translate-y-0.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-destructive-soft text-destructive">
            <Target className="h-6 w-6" />
          </span>
          <p className="font-display mt-3 text-lg font-bold leading-tight">My mistakes</p>
          <p className="text-xs text-muted-foreground">{mistakes.length ? `${mistakes.length} to fix` : "Nothing yet 🎉"}</p>
        </Link>
      </div>

      <Link
        to="/practice"
        search={{ mode: "state" }}
        className="mt-3 flex items-center gap-3 rounded-3xl border-2 bg-card p-4 shadow-pop-border transition-all active:translate-y-0.5"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral/25 text-coral-foreground dark:text-coral">
          <MapPin className="h-6 w-6" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="font-display block font-bold">{store.state} questions</span>
          <span className="block text-xs text-muted-foreground">The 3 questions only for your state</span>
        </span>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </Link>

      {lastExam && (
        <Link to="/result" className="mt-3 flex items-center gap-3 rounded-3xl bg-secondary p-4 text-secondary-foreground">
          <Trophy className="h-6 w-6" />
          <span className="flex-1 text-sm font-semibold">
            Last mock exam: {lastExam.score}/{lastExam.total} — {hasPassed(lastExam.score, lastExam.total) ? "passed" : "not passed yet"}
          </span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      )}

      <Link
        to="/unlock"
        className="mt-5 flex items-center gap-3 rounded-3xl border-2 border-dashed border-accent-shade/60 p-4"
      >
        <Crown className="h-6 w-6 text-accent-shade" />
        <span className="flex-1">
          <span className="block text-sm font-bold">Unlock all {FULL_QUESTION_COUNT} questions</span>
          <span className="block text-xs text-muted-foreground">Free preview: {store.pool.length} questions + 1 mock exam</span>
        </span>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </Link>
    </div>
  );
}
