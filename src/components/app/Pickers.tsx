import { Check } from "lucide-react";

import { LANGUAGES, STATES } from "@/lib/questions";
import { cn } from "@/lib/utils";

import { BottomSheet } from "./BottomSheet";

export function StatePickerSheet({
  open,
  value,
  onClose,
  onPick,
}: {
  open: boolean;
  value: string | null;
  onClose: () => void;
  onPick: (s: string) => void;
}) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Choose your Bundesland">
      <ul className="grid grid-cols-1 gap-1.5">
        {STATES.map((s) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => {
                onPick(s);
                onClose();
              }}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-semibold transition-colors",
                value === s ? "bg-secondary text-secondary-foreground" : "hover:bg-muted",
              )}
            >
              {s}
              {value === s && <Check className="h-5 w-5 text-primary" strokeWidth={3} />}
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}

export function LanguageChips({ value, onPick }: { value: string; onPick: (code: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onPick(l.code)}
          aria-pressed={value === l.code}
          className={cn(
            "rounded-full border-2 px-3.5 py-2 text-sm font-semibold transition-all active:scale-95",
            value === l.code
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:border-primary/50",
          )}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}
