import { describe, expect, it } from "vitest";

import { buildExam, canTakeMockExam, hasPassed, passMark, questionPool } from "./questions";
import { progressSummary } from "./store";

describe("free preview", () => {
  it("has 50 practice questions once a state is chosen", () => {
    expect(questionPool("Berlin")).toHaveLength(50);
  });

  it("includes exactly one mock exam", () => {
    expect(canTakeMockExam(0)).toBe(true);
    expect(canTakeMockExam(1)).toBe(false);
  });
});

describe("mock exam", () => {
  it("has 33 questions: 30 general + 3 from the state", () => {
    const exam = buildExam(questionPool("Bayern"));
    expect(exam).toHaveLength(33);
    expect(exam.filter((q) => q.state === "Bayern")).toHaveLength(3);
    expect(new Set(exam.map((q) => q.id)).size).toBe(33);
  });

  it("needs 17 of 33 correct to pass", () => {
    expect(passMark(33)).toBe(17);
    expect(hasPassed(17, 33)).toBe(true);
    expect(hasPassed(16, 33)).toBe(false);
  });
});

describe("readiness", () => {
  const pool = questionPool("Berlin");
  const [a, b] = pool;

  it("does not go up for questions that were only tried and got wrong", () => {
    const stats = { [a!.id]: { right: 0, wrong: 1, lastCorrect: false, at: 1 } };
    const s = progressSummary(pool, stats);
    expect(s.tried).toBe(1);
    expect(s.known).toBe(0);
    expect(s.readiness).toBe(0);
  });

  it("counts questions known: 1 right out of 50 is 2%", () => {
    const stats = {
      [a!.id]: { right: 1, wrong: 0, lastCorrect: true, at: 1 },
      [b!.id]: { right: 0, wrong: 1, lastCorrect: false, at: 1 },
    };
    const s = progressSummary(pool, stats);
    expect(s.known).toBe(1);
    expect(s.readiness).toBe(2);
  });
});
