import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import { useState } from "react";

import welcomeArt from "@/assets/welcome-illustration-arab.jpg";
import { ChunkyButton } from "@/components/app/ChunkyButton";
import { LanguageChips, StatePickerSheet } from "@/components/app/Pickers";
import { WavingFlag } from "@/components/app/WavingFlag";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — Einbürgerungstest Trainer" },
      { name: "description", content: "Pick your Bundesland and language to start practising for the German citizenship test." },
      { property: "og:title", content: "Welcome — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Pick your Bundesland and language to start practising for the German citizenship test." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const store = useAppStore();
  const navigate = useNavigate();
  const [state, setState] = useState<string | null>(store.state);
  const [language, setLanguage] = useState(store.language);
  const [picker, setPicker] = useState(false);

  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-muted">
        <img
          src={welcomeArt}
          alt="Friends smiling in front of the Brandenburg Gate, with a German flag waving on a tall pole behind them"
          width={1024}
          height={832}
          className="w-full"
        />
        {/* Positioned in % of the picture so it stays attached to the painted pole (x 226/1024, top 102/832). */}
        <WavingFlag className="absolute left-[21.9%] top-[12.3%] w-[19%]" />
      </div>

      <h1 className="font-display mt-6 text-[2rem] font-extrabold leading-[1.05] tracking-tight">
        Pass your <span className="text-primary">Einbürgerungstest</span> — and learn the German behind it.
      </h1>
      <p className="mt-2 text-muted-foreground">Two quick choices and you're ready to go.</p>

      <section className="mt-6">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">1</span>
          Your Bundesland
        </h2>
        <button
          type="button"
          onClick={() => setPicker(true)}
          className="flex w-full items-center gap-3 rounded-2xl border-2 bg-card px-4 py-3.5 text-left shadow-pop-border transition-colors hover:border-primary/50"
        >
          <MapPin className="h-5 w-5 text-primary" />
          <span className={state ? "flex-1 font-semibold" : "flex-1 text-muted-foreground"}>
            {state ?? "Choose your state"}
          </span>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
        <p className="mt-1.5 text-xs text-muted-foreground">Your test has 30 general questions and 3 from your state.</p>
      </section>

      <section className="mt-6">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">2</span>
          Your language
        </h2>
        <LanguageChips value={language} onPick={setLanguage} />
        <p className="mt-2 text-xs text-muted-foreground">Tap any German word to see it in your language and hear how it sounds.</p>
      </section>

      <div className="mt-auto pt-8">
        <ChunkyButton
          disabled={!state}
          onClick={() => {
            store.setPrefs({ state, language });
            navigate({ to: "/" });
          }}
        >
          {state ? "Start learning" : "Choose your state first"}
        </ChunkyButton>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" /> No account. No sign-up. Progress stays on this phone.
        </p>
      </div>

      <StatePickerSheet open={picker} value={state} onClose={() => setPicker(false)} onPick={setState} />
    </div>
  );
}
