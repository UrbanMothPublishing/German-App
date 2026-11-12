import { Volume2 } from "lucide-react";

import { speakGerman } from "@/lib/dictionary";

import { TappableText } from "./TappableText";

export function QuestionText({ topic, text, wordMode }: { topic: string; text: string; wordMode: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">{topic}</span>
        <button
          type="button"
          onClick={() => speakGerman(text)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-primary hover:bg-secondary"
        >
          <Volume2 className="h-4 w-4" /> Listen
        </button>
      </div>
      <h1 className="font-display mt-3 text-[1.45rem] font-bold leading-snug tracking-tight">
        <TappableText text={text} enabled={wordMode} />
      </h1>
    </div>
  );
}
