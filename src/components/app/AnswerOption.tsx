import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { TappableText } from "./TappableText";

export type OptionState = "idle" | "selected" | "correct" | "wrong" | "dimmed";

const LETTERS = ["A", "B", "C", "D"];

export function AnswerOption({
  index,
  text,
  state,
  wordMode,
  disabled,
  onChoose,
}: {
  index: number;
  text: string;
  state: OptionState;
  wordMode: boolean;
  disabled?: boolean;
  onChoose: () => void;
}) {
  const styles: Record<OptionState, string> = {
    idle: "border-border bg-card shadow-pop-border",
    selected: "border-primary bg-secondary",
    correct: "border-success bg-success-soft animate-pop-in",
    wrong: "border-destructive bg-destructive-soft animate-shake",
    dimmed: "border-border bg-card opacity-55",
  };
  const badge: Record<OptionState, string> = {
    idle: "bg-muted text-muted-foreground",
    selected: "bg-primary text-primary-foreground",
    correct: "bg-success text-primary-foreground",
    wrong: "bg-destructive text-destructive-foreground",
    dimmed: "bg-muted text-muted-foreground",
  };

  const content = (
    <>
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold",
          badge[state],
        )}
      >
        {state === "correct" ? <Check className="h-5 w-5" strokeWidth={3} /> : state === "wrong" ? <X className="h-5 w-5" strokeWidth={3} /> : LETTERS[index]}
      </span>
      <TappableText text={text} enabled={wordMode} className="flex-1 text-left text-[15px] font-medium leading-snug" />
    </>
  );

  if (!wordMode) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onChoose}
        className={cn(
          "flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 transition-all active:translate-y-0.5",
          styles[state],
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 transition-all", styles[state])}>
      {content}
      <button
        type="button"
        disabled={disabled}
        onClick={onChoose}
        aria-label={`Choose answer ${LETTERS[index]}`}
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all active:scale-90",
          state === "selected" ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-primary",
          disabled && "opacity-0",
        )}
      >
        <Check className="h-5 w-5" strokeWidth={3} />
      </button>
    </div>
  );
}
