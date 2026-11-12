import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { BookOpen, Check, Crown, Languages, Repeat, Timer, WifiOff, X } from "lucide-react";
import { toast } from "sonner";

import { ChunkyButton } from "@/components/app/ChunkyButton";

export const Route = createFileRoute("/unlock")({
  head: () => ({
    meta: [
      { title: "Unlock everything — Einbürgerungstest Trainer" },
      { name: "description", content: "Get all 460 official questions, unlimited mock exams and offline practice with a one-time purchase." },
      { property: "og:title", content: "Unlock everything — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Get all 460 official questions, unlimited mock exams and offline practice with a one-time purchase." },
    ],
  }),
  component: Unlock,
});

const FEATURES = [
  { icon: BookOpen, text: "All 460 official questions, every state" },
  { icon: Timer, text: "Unlimited 60-minute mock exams" },
  { icon: Languages, text: "Tap any word to translate it, with audio" },
  { icon: Repeat, text: "Spaced repetition brings back what you missed" },
  { icon: WifiOff, text: "Works fully offline" },
];

function Unlock() {
  const router = useRouter();
  return (
    <div className="flex min-h-full flex-col">
      <section className="bg-hero relative overflow-hidden px-5 pb-10 pt-4 text-primary-foreground dark:text-foreground">
        <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-accent/25" aria-hidden />
        <button
          type="button"
          aria-label="Close"
          onClick={() => router.history.back()}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-accent text-accent-foreground shadow-pop-accent">
          <Crown className="h-8 w-8" />
        </div>
        <h1 className="font-display relative mt-5 text-[2.1rem] font-extrabold leading-[1.05]">Unlock everything</h1>
        <p className="relative mt-2 opacity-85">One-time purchase. No subscription, no account.</p>
      </section>

      <ul className="-mt-5 space-y-2 rounded-t-[2rem] bg-background px-5 pt-6">
        {FEATURES.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 rounded-2xl bg-card p-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-semibold">{text}</span>
            <Check className="h-5 w-5 text-success" strokeWidth={3} />
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-3 px-5 pb-6 pt-8">
        <ChunkyButton variant="accent" onClick={() => toast("Checkout isn't connected yet in this preview.")}>
          Buy now
        </ChunkyButton>
        <div className="flex items-center justify-between text-sm">
          <button type="button" className="font-bold text-primary" onClick={() => toast("No previous purchase found on this phone.")}>
            Restore purchase
          </button>
          <Link to="/" className="font-semibold text-muted-foreground">Not now</Link>
        </div>
        <p className="text-center text-xs text-muted-foreground">Terms of Use · Privacy Policy</p>
      </div>
    </div>
  );
}
