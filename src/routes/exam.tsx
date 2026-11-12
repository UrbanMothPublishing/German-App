import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Crown, Flag, ListChecks, Timer, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AnswerOption } from "@/components/app/AnswerOption";
import { BottomSheet } from "@/components/app/BottomSheet";
import { ChunkyButton, chunkyClasses } from "@/components/app/ChunkyButton";
import { QuestionText } from "@/components/app/QuestionHeader";
import { useOnboardingGuard } from "@/components/app/useOnboardingGuard";
import {
  buildExam,
  canTakeMockExam,
  EXAM_GENERAL,
  EXAM_STATE,
  FREE_MOCK_EXAMS,
  OFFICIAL_PASS,
  OFFICIAL_TOTAL,
  type Question,
} from "@/lib/questions";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const EXAM_SECONDS = 60 * 60;

export const Route = createFileRoute("/exam")({
  head: () => ({
    meta: [
      { title: "Mock exam — Einbürgerungstest Trainer" },
      { name: "description", content: "Take a timed mock Einbürgerungstest that works just like the real one." },
      { property: "og:title", content: "Mock exam — Einbürgerungstest Trainer" },
      { property: "og:description", content: "Take a timed mock Einbürgerungstest that works just like the real one." },
    ],
  }),
  component: Exam,
});

function Exam() {
  const ready = useOnboardingGuard();
  const store = useAppStore();
  const [questions, setQuestions] = useState<Question[] | null>(null);
  if (!ready) return <div className="h-full" />;

  if (!questions) {
    const allowed = canTakeMockExam(store.exams.length);
    return (
      <div className="flex min-h-full flex-col px-5 pb-8 pt-4">
        <Link to="/" aria-label="Back to home" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted">
          <X className="h-5 w-5" />
        </Link>
        <div className="mt-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-secondary-foreground">
          <Timer className="h-10 w-10" />
        </div>
        <h1 className="font-display mt-5 text-3xl font-extrabold leading-tight">Mock exam</h1>
        <p className="mt-2 text-muted-foreground">Just like test day. No hints, no translations — you can do it!</p>
        <ul className="mt-6 space-y-3">
          {[
            { icon: ListChecks, title: `${OFFICIAL_TOTAL} questions`, sub: `${EXAM_GENERAL} general + ${EXAM_STATE} from ${store.state}` },
            { icon: Clock, title: "60 minutes", sub: "The clock keeps running in the background" },
            { icon: Flag, title: `Pass with ${OFFICIAL_PASS} correct`, sub: `${OFFICIAL_PASS} of ${OFFICIAL_TOTAL}, just like test day` },
          ].map(({ icon: Icon, title, sub }) => (
            <li key={title} className="flex items-center gap-3 rounded-2xl border-2 bg-card p-4">
              <Icon className="h-6 w-6 shrink-0 text-primary" />
              <span>
                <span className="block font-bold">{title}</span>
                <span className="block text-xs text-muted-foreground">{sub}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          {allowed ? (
            <>
              <ChunkyButton onClick={() => setQuestions(buildExam(store.pool))}>Start exam</ChunkyButton>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                The free preview includes {FREE_MOCK_EXAMS} mock exam.
              </p>
            </>
          ) : (
            <>
              <p className="mb-3 rounded-2xl bg-muted p-4 text-center text-sm">
                You've used your free mock exam. Unlock to take as many as you like.
              </p>
              <Link to="/unlock" className={chunkyClasses("accent")}>
                <Crown className="h-5 w-5" /> Unlock unlimited exams
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return <ExamRun questions={questions} />;
}

function ExamRun({ questions }: { questions: Question[] }) {
  const store = useAppStore();
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [left, setLeft] = useState(EXAM_SECONDS);
  const [overview, setOverview] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const started = useRef(Date.now());

  const finish = () => {
    let score = 0;
    const wrongIds: string[] = [];
    questions.forEach((q, idx) => {
      const ok = answers[idx] === q.correct;
      if (ok) score++;
      else wrongIds.push(q.id);
      if (answers[idx] !== null) store.recordAnswer(q.id, ok);
    });
    store.recordExam({
      score,
      total: questions.length,
      at: Date.now(),
      wrongIds,
      seconds: Math.round((Date.now() - started.current) / 1000),
    });
    navigate({ to: "/result" });
  };

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (left === 0) finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  const q = questions[i];
  if (!q) return null;
  const answered = answers.filter((a) => a !== null).length;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background/95 px-5 pb-3 pt-4 backdrop-blur">
        <Link to="/" aria-label="Leave exam" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
          <X className="h-5 w-5" />
        </Link>
        <span
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm font-bold",
            left < 300 ? "bg-destructive-soft text-destructive" : "bg-secondary text-secondary-foreground",
          )}
        >
          <Clock className="h-4 w-4" /> {mm}:{ss}
        </span>
        <button
          type="button"
          onClick={() => setOverview(true)}
          className="rounded-full border-2 px-3 py-1.5 text-xs font-bold"
        >
          {answered}/{questions.length} answered
        </button>
      </div>

      <div className="flex-1 px-5 pb-4">
        <p className="mb-3 text-sm font-bold text-muted-foreground">
          Question {i + 1} of {questions.length}
        </p>
        <QuestionText topic={q.topic} text={q.text} wordMode={false} />
        <div className="mt-5 space-y-3">
          {q.options.map((opt, idx) => (
            <AnswerOption
              key={`${q.id}-${idx}`}
              index={idx}
              text={opt}
              wordMode={false}
              state={answers[i] === idx ? "selected" : "idle"}
              onChoose={() => setAnswers((a) => a.map((v, k) => (k === i ? idx : v)))}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 grid grid-cols-[auto_1fr] gap-3 border-t bg-background/95 px-5 pb-5 pt-3 backdrop-blur">
        <button
          type="button"
          disabled={i === 0}
          onClick={() => setI((n) => n - 1)}
          aria-label="Previous question"
          className={chunkyClasses("outline", "w-14 px-0")}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        {i + 1 < questions.length ? (
          <ChunkyButton onClick={() => setI((n) => n + 1)}>
            Next <ArrowRight className="h-5 w-5" />
          </ChunkyButton>
        ) : (
          <ChunkyButton variant="accent" onClick={() => (answered < questions.length ? setConfirm(true) : finish())}>
            Finish exam
          </ChunkyButton>
        )}
      </div>

      <BottomSheet open={overview} onClose={() => setOverview(false)} title="Jump to a question">
        <div className="grid grid-cols-6 gap-2">
          {questions.map((qq, idx) => (
            <button
              key={qq.id}
              type="button"
              onClick={() => {
                setI(idx);
                setOverview(false);
              }}
              className={cn(
                "aspect-square rounded-xl text-sm font-bold",
                idx === i && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                answers[idx] !== null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <ChunkyButton variant="accent" className="mt-6" onClick={() => (answered < questions.length ? setConfirm(true) : finish())}>
          Finish exam
        </ChunkyButton>
      </BottomSheet>

      <BottomSheet open={confirm} onClose={() => setConfirm(false)} title="Finish now?">
        <p className="text-muted-foreground">
          You still have {questions.length - answered} unanswered question{questions.length - answered === 1 ? "" : "s"}. They will count as wrong.
        </p>
        <div className="mt-6 space-y-3">
          <ChunkyButton onClick={() => setConfirm(false)}>Keep going</ChunkyButton>
          <ChunkyButton variant="outline" onClick={finish}>
            Finish anyway
          </ChunkyButton>
        </div>
      </BottomSheet>
    </div>
  );
}
