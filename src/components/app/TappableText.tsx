import { Volume2 } from "lucide-react";
import { useState } from "react";

import { normalizeWord, speakGerman, translate } from "@/lib/dictionary";
import { LANGUAGES } from "@/lib/questions";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import { BottomSheet } from "./BottomSheet";

export function TappableText({
  text,
  className,
  enabled = true,
}: {
  text: string;
  className?: string;
  enabled?: boolean;
}) {
  const [word, setWord] = useState<string | null>(null);
  const words = text.split(/(\s+)/);

  if (!enabled) return <span className={className}>{text}</span>;

  return (
    <>
      <span className={className}>
        {words.map((w, i) =>
          /^\s+$/.test(w) || !normalizeWord(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setWord(w);
                speakGerman(normalizeWord(w));
              }}
              className="rounded-md decoration-primary/40 decoration-dotted decoration-2 underline-offset-4 transition-colors hover:bg-accent/40 hover:underline active:bg-accent/60"
            >
              {w}
            </button>
          ),
        )}
      </span>
      <WordSheet word={word} onClose={() => setWord(null)} />
    </>
  );
}

function WordSheet({ word, onClose }: { word: string | null; onClose: () => void }) {
  const { language } = useAppStore();
  const clean = word ? word.replace(/[.,!?;:…"„“()]/g, "") : "";
  const meaning = word ? translate(word) : null;
  const lang = LANGUAGES.find((l) => l.code === language);

  return (
    <BottomSheet open={!!word} onClose={onClose} title="Word">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-4xl font-extrabold text-primary">{clean}</p>
          <p className={cn("mt-2 text-lg", meaning ? "text-foreground" : "text-muted-foreground")}>
            {meaning ?? "No translation for this word yet."}
          </p>
          {meaning && language !== "en" && (
            <p className="mt-1 text-xs text-muted-foreground">
              Shown in English — {lang?.label} coming soon.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => speakGerman(clean)}
          aria-label={`Hear ${clean}`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-pop-accent transition-transform active:translate-y-1 active:shadow-none"
        >
          <Volume2 className="h-6 w-6" />
        </button>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-2xl bg-secondary py-3.5 font-bold text-secondary-foreground"
      >
        Got it
      </button>
    </BottomSheet>
  );
}
