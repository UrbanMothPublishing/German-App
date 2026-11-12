import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { questionPool, type Question } from "./questions";

export type AnswerStat = { right: number; wrong: number; lastCorrect: boolean; at: number };
export type ExamResult = { score: number; total: number; at: number; wrongIds: string[]; seconds: number };

type Persisted = {
  state: string | null;
  language: string;
  dark: boolean;
  stats: Record<string, AnswerStat>;
  exams: ExamResult[];
  streakDays: string[];
};

const DEFAULTS: Persisted = {
  state: null,
  language: "en",
  dark: false,
  stats: {},
  exams: [],
  streakDays: [],
};

const KEY = "ebt-trainer-v1";

type Store = Persisted & {
  hydrated: boolean;
  pool: Question[];
  setPrefs: (p: Partial<Pick<Persisted, "state" | "language" | "dark">>) => void;
  recordAnswer: (id: string, correct: boolean) => void;
  recordExam: (r: ExamResult) => void;
  reset: () => void;
};

const Ctx = createContext<Store | null>(null);

function today() {
  return new Date().toISOString().slice(0, 10);
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Persisted>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore broken storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify(data));
  }, [data, hydrated]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", data.dark);
  }, [data.dark]);

  const setPrefs = useCallback<Store["setPrefs"]>((p) => setData((d) => ({ ...d, ...p })), []);

  const recordAnswer = useCallback((id: string, correct: boolean) => {
    setData((d) => {
      const prev = d.stats[id] ?? { right: 0, wrong: 0, lastCorrect: false, at: 0 };
      const day = today();
      return {
        ...d,
        streakDays: d.streakDays.includes(day) ? d.streakDays : [...d.streakDays, day].slice(-60),
        stats: {
          ...d.stats,
          [id]: {
            right: prev.right + (correct ? 1 : 0),
            wrong: prev.wrong + (correct ? 0 : 1),
            lastCorrect: correct,
            at: Date.now(),
          },
        },
      };
    });
  }, []);

  const recordExam = useCallback((r: ExamResult) => {
    setData((d) => ({ ...d, exams: [r, ...d.exams].slice(0, 20) }));
  }, []);

  const reset = useCallback(() => setData((d) => ({ ...DEFAULTS, dark: d.dark })), []);

  const pool = useMemo(() => questionPool(data.state), [data.state]);

  const value = useMemo(
    () => ({ ...data, hydrated, pool, setPrefs, recordAnswer, recordExam, reset }),
    [data, hydrated, pool, setPrefs, recordAnswer, recordExam, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppStore must be used inside AppStoreProvider");
  return v;
}

/** Consecutive days (ending today or yesterday) with at least one answer. */
export function streakCount(days: string[]) {
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

/** Readiness counts questions the user KNOWS (last answer correct) — never just tried. */
export function progressSummary(pool: Question[], stats: Record<string, AnswerStat>) {
  const tried = pool.filter((q) => stats[q.id]).length;
  const known = pool.filter((q) => stats[q.id]?.lastCorrect).length;
  const mistakes = pool.filter((q) => stats[q.id]?.lastCorrect === false);
  const readiness = pool.length ? Math.round((known / pool.length) * 100) : 0;
  return { tried, known, mistakes, readiness };
}

/** Practice order: mistakes first, then unseen, then the oldest correctly answered. */
export function practiceQueue(pool: Question[], stats: Record<string, AnswerStat>) {
  const rank = (q: Question) => {
    const s = stats[q.id];
    if (!s) return 1;
    if (!s.lastCorrect) return 0;
    return 2;
  };
  return [...pool].sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r !== 0) return r;
    return (stats[a.id]?.at ?? 0) - (stats[b.id]?.at ?? 0);
  });
}
