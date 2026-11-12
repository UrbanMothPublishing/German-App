import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Crown, MapPin, Moon, RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { BottomSheet } from "@/components/app/BottomSheet";
import { ChunkyButton } from "@/components/app/ChunkyButton";
import { LanguageChips, StatePickerSheet } from "@/components/app/Pickers";
import { Switch } from "@/components/ui/switch";
import { useOnboardingGuard } from "@/components/app/useOnboardingGuard";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Einbürgerungstest Trainer" },
      { name: "description", content: "Change your Bundesland, language and display settings for the Einbürgerungstest Trainer." },
      { property: "og:title", content: "Settings — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Change your Bundesland, language and display settings for the Einbürgerungstest Trainer." },
    ],
  }),
  component: Settings,
});

function Settings() {
  const ready = useOnboardingGuard();
  const store = useAppStore();
  const [statePicker, setStatePicker] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  if (!ready) return <div className="h-full" />;

  return (
    <div className="px-5 pb-8 pt-6">
      <h1 className="font-display text-[1.9rem] font-extrabold tracking-tight">Settings</h1>

      <section className="mt-5 overflow-hidden rounded-3xl border-2 bg-card">
        <button type="button" onClick={() => setStatePicker(true)} className="flex w-full items-center gap-3 p-4 text-left">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="flex-1">
            <span className="block text-xs font-semibold text-muted-foreground">Bundesland</span>
            <span className="block font-bold">{store.state}</span>
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3 border-t p-4">
          <Moon className="h-5 w-5 text-primary" />
          <label htmlFor="dark" className="flex-1 font-bold">Dark mode</label>
          <Switch id="dark" checked={store.dark} onCheckedChange={(dark) => store.setPrefs({ dark })} />
        </div>
      </section>

      <section className="mt-5 rounded-3xl border-2 bg-card p-4">
        <h2 className="mb-3 text-xs font-semibold text-muted-foreground">Translation language</h2>
        <LanguageChips value={store.language} onPick={(language) => store.setPrefs({ language })} />
      </section>

      <Link to="/unlock" className="mt-5 flex items-center gap-3 rounded-3xl bg-accent p-4 text-accent-foreground shadow-pop-accent">
        <Crown className="h-6 w-6" />
        <span className="flex-1 font-bold">Unlock everything</span>
        <ChevronRight className="h-5 w-5" />
      </Link>

      <button
        type="button"
        onClick={() => setConfirmReset(true)}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-destructive hover:bg-destructive-soft"
      >
        <RotateCcw className="h-4 w-4" /> Reset my progress
      </button>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        No account. Your progress stays on this phone.
      </p>

      <StatePickerSheet
        open={statePicker}
        value={store.state}
        onClose={() => setStatePicker(false)}
        onPick={(state) => store.setPrefs({ state })}
      />
      <BottomSheet open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset progress?">
        <p className="text-muted-foreground">This clears your answers, mistakes and exam results on this phone.</p>
        <div className="mt-6 space-y-3">
          <ChunkyButton variant="outline" onClick={() => setConfirmReset(false)}>Cancel</ChunkyButton>
          <button
            type="button"
            onClick={() => {
              store.reset();
              toast.success("Progress reset");
            }}
            className="w-full rounded-2xl bg-destructive py-4 font-extrabold text-destructive-foreground"
          >
            Yes, reset everything
          </button>
        </div>
      </BottomSheet>
    </div>
  );
}
