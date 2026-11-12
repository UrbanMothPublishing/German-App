export type Question = {
  id: string;
  text: string;
  options: string[];
  correct: number;
  topic: string;
  state?: string;
};

export const STATES = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
] as const;

export const CAPITALS: Record<string, string> = {
  "Baden-Württemberg": "Stuttgart",
  Bayern: "München",
  Berlin: "Berlin",
  Brandenburg: "Potsdam",
  Bremen: "Bremen",
  Hamburg: "Hamburg",
  Hessen: "Wiesbaden",
  "Mecklenburg-Vorpommern": "Schwerin",
  Niedersachsen: "Hannover",
  "Nordrhein-Westfalen": "Düsseldorf",
  "Rheinland-Pfalz": "Mainz",
  Saarland: "Saarbrücken",
  Sachsen: "Dresden",
  "Sachsen-Anhalt": "Magdeburg",
  "Schleswig-Holstein": "Kiel",
  Thüringen: "Erfurt",
};

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "fa", label: "Persian", native: "فارسی" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pl", label: "Polish", native: "Polski" },
] as const;

export const GENERAL_QUESTIONS: Question[] = [
  {
    id: "g1",
    topic: "Rights",
    text: "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil …",
    options: [
      "hier Religionsfreiheit gilt.",
      "die Menschen Steuern zahlen.",
      "die Menschen das Wahlrecht haben.",
      "hier Meinungsfreiheit gilt.",
    ],
    correct: 3,
  },
  {
    id: "g2",
    topic: "Rule of law",
    text: "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
    options: [
      "Alle Einwohner und der Staat müssen sich an die Gesetze halten.",
      "Der Staat muss sich nicht an die Gesetze halten.",
      "Nur Deutsche müssen die Gesetze befolgen.",
      "Die Gerichte machen die Gesetze.",
    ],
    correct: 0,
  },
  {
    id: "g3",
    topic: "Constitution",
    text: "Wie heißt die deutsche Verfassung?",
    options: ["Volksgesetz", "Bundesgesetz", "Deutsches Gesetz", "Grundgesetz"],
    correct: 3,
  },
  {
    id: "g4",
    topic: "Rights",
    text: "Welches Recht gehört zu den Grundrechten in Deutschland?",
    options: ["Waffenbesitz", "Faustrecht", "Meinungsfreiheit", "Selbstjustiz"],
    correct: 2,
  },
  {
    id: "g5",
    topic: "Constitution",
    text: "Was steht nicht im Grundgesetz von Deutschland?",
    options: [
      "Die Würde des Menschen ist unantastbar.",
      "Alle sollen gleich viel Geld haben.",
      "Jeder Mensch darf seine Meinung sagen.",
      "Alle sind vor dem Gesetz gleich.",
    ],
    correct: 1,
  },
  {
    id: "g6",
    topic: "Federal states",
    text: "Wie viele Bundesländer hat die Bundesrepublik Deutschland?",
    options: ["14", "15", "16", "17"],
    correct: 2,
  },
  {
    id: "g7",
    topic: "Government",
    text: "Wer wählt in Deutschland den Bundeskanzler oder die Bundeskanzlerin?",
    options: ["der Bundesrat", "die Bundesversammlung", "das Volk", "der Bundestag"],
    correct: 3,
  },
  {
    id: "g8",
    topic: "Parties",
    text: "Was bedeutet die Abkürzung CDU in Deutschland?",
    options: [
      "Christliche Deutsche Union",
      "Club Deutscher Unternehmer",
      "Christlicher Deutscher Umweltschutz",
      "Christlich Demokratische Union",
    ],
    correct: 3,
  },
  {
    id: "g9",
    topic: "Government",
    text: "Was ist eine Aufgabe der Polizei in Deutschland?",
    options: [
      "das Land zu verteidigen",
      "die Bürger abzuhören",
      "die Gesetze zu beschließen",
      "die Einhaltung von Gesetzen zu überwachen",
    ],
    correct: 3,
  },
  {
    id: "g10",
    topic: "History",
    text: "In welchem Jahr wurde die Mauer in Berlin gebaut?",
    options: ["1953", "1956", "1959", "1961"],
    correct: 3,
  },
  {
    id: "g11",
    topic: "History",
    text: "Wann wurde die Mauer in Berlin für alle geöffnet?",
    options: ["1987", "1989", "1992", "1995"],
    correct: 1,
  },
  {
    id: "g12",
    topic: "Symbols",
    text: "Welche Farben hat die Flagge der Bundesrepublik Deutschland?",
    options: ["schwarz-rot-gold", "rot-weiß-schwarz", "schwarz-rot-grün", "schwarz-gelb-rot"],
    correct: 0,
  },
  {
    id: "g13",
    topic: "Elections",
    text: "Wie oft gibt es normalerweise Bundestagswahlen in Deutschland?",
    options: ["alle drei Jahre", "alle vier Jahre", "alle fünf Jahre", "alle sechs Jahre"],
    correct: 1,
  },
  {
    id: "g14",
    topic: "Elections",
    text: "Ab welchem Alter darf man in Deutschland an der Wahl zum Deutschen Bundestag teilnehmen?",
    options: ["16", "17", "18", "20"],
    correct: 2,
  },
  {
    id: "g15",
    topic: "Rights",
    text: "Was ist in Deutschland ein Grundrecht?",
    options: [
      "Glaubensfreiheit",
      "das Recht auf ein eigenes Auto",
      "das Recht auf Urlaub",
      "das Recht auf ein eigenes Haus",
    ],
    correct: 0,
  },
  {
    id: "g16",
    topic: "Government",
    text: "Wer wählt in Deutschland den Bundespräsidenten oder die Bundespräsidentin?",
    options: ["der Bundesrat", "der Bundestag", "die Bundesversammlung", "die Bürger"],
    correct: 2,
  },
  {
    id: "g17",
    topic: "Government",
    text: "Für wie viele Jahre wird der Bundespräsident gewählt?",
    options: ["vier Jahre", "fünf Jahre", "sechs Jahre", "sieben Jahre"],
    correct: 1,
  },
  {
    id: "g18",
    topic: "Government",
    text: "Wer bildet den Bundesrat?",
    options: ["die Abgeordneten des Bundestages", "die Minister der Bundesregierung", "die Regierungsvertreter der Bundesländer", "die Mitglieder der Parteien"],
    correct: 2,
  },
  {
    id: "g19",
    topic: "Constitution",
    text: "Was ist Deutschland nicht?",
    options: ["eine Demokratie", "ein Rechtsstaat", "eine Monarchie", "ein Sozialstaat"],
    correct: 2,
  },
  {
    id: "g20",
    topic: "Federal states",
    text: "Deutschland ist ein Bundesstaat. Was bedeutet das?",
    options: ["Deutschland hat ein Bundesgericht.", "Deutschland besteht aus Bundesländern.", "Deutschland hat einen Bundeskanzler.", "Deutschland hat einen Bundespräsidenten."],
    correct: 1,
  },
  {
    id: "g21",
    topic: "Democracy",
    text: "Was ist ein Merkmal unserer Demokratie?",
    options: ["regelmäßige Wahlen", "Pressezensur", "ein Einparteiensystem", "das Verbot von Parteien"],
    correct: 0,
  },
  {
    id: "g22",
    topic: "History",
    text: "In welchem Jahr wurde die Bundesrepublik Deutschland gegründet?",
    options: ["1939", "1945", "1949", "1951"],
    correct: 2,
  },
  {
    id: "g23",
    topic: "History",
    text: "Was geschah am 9. November 1989 in Deutschland?",
    options: ["Der Zweite Weltkrieg war zu Ende.", "Die Bundesrepublik wurde gegründet.", "Die Mauer fiel.", "Hitler kam an die Macht."],
    correct: 2,
  },
  {
    id: "g24",
    topic: "History",
    text: "Wann begann der Zweite Weltkrieg mit dem deutschen Angriff auf Polen?",
    options: ["1933", "1939", "1945", "1918"],
    correct: 1,
  },
  {
    id: "g25",
    topic: "History",
    text: "Wann war der Zweite Weltkrieg in Europa zu Ende?",
    options: ["1933", "1945", "1949", "1961"],
    correct: 1,
  },
  {
    id: "g26",
    topic: "Holidays",
    text: "Was feiert man in Deutschland am 3. Oktober?",
    options: ["den Tag der Deutschen Einheit", "Ostern", "Weihnachten", "den Tag der Arbeit"],
    correct: 0,
  },
  {
    id: "g27",
    topic: "History",
    text: "In welchem Jahr wurde Hitler Reichskanzler?",
    options: ["1923", "1927", "1933", "1936"],
    correct: 2,
  },
  {
    id: "g28",
    topic: "Europe",
    text: "Welches Land ist ein Nachbarland von Deutschland?",
    options: ["Ungarn", "Portugal", "Spanien", "die Schweiz"],
    correct: 3,
  },
  {
    id: "g29",
    topic: "Elections",
    text: "Wahlen in Deutschland sind frei. Was bedeutet das?",
    options: ["Niemand darf zu einer bestimmten Wahl gezwungen werden.", "Man darf Geld für die Stimme annehmen.", "Nur Männer dürfen wählen.", "Alle müssen wählen."],
    correct: 0,
  },
  {
    id: "g30",
    topic: "Democracy",
    text: "Was bedeutet Volkssouveränität?",
    options: ["Alle Staatsgewalt geht vom Volke aus.", "Der König herrscht über das Volk.", "Das Volk muss Steuern zahlen.", "Die Regierung bestimmt über das Volk."],
    correct: 0,
  },
  {
    id: "g31",
    topic: "Government",
    text: "Wie heißt das Parlament für ganz Deutschland?",
    options: ["Bundesversammlung", "Volkskammer", "Bundestag", "Bundesgerichtshof"],
    correct: 2,
  },
  {
    id: "g32",
    topic: "Government",
    text: "Wer beschließt in Deutschland ein neues Gesetz?",
    options: ["die Regierung", "das Parlament", "die Gerichte", "die Polizei"],
    correct: 1,
  },
  {
    id: "g33",
    topic: "Government",
    text: "Wer ist das Staatsoberhaupt der Bundesrepublik Deutschland?",
    options: ["der Bundeskanzler", "der Ministerpräsident", "der Bundespräsident", "der Bundestagspräsident"],
    correct: 2,
  },
  {
    id: "g34",
    topic: "Democracy",
    text: "Was ist eine Aufgabe der Opposition im Bundestag?",
    options: ["Sie kontrolliert die Regierung.", "Sie entscheidet, wer Minister wird.", "Sie bestimmt, was die Polizei macht.", "Sie macht die Gesetze allein."],
    correct: 0,
  },
  {
    id: "g35",
    topic: "Rule of law",
    text: "Welches Gericht prüft, ob Gesetze mit dem Grundgesetz übereinstimmen?",
    options: ["das Bundesverfassungsgericht", "das Amtsgericht", "das Arbeitsgericht", "das Landgericht"],
    correct: 0,
  },
  {
    id: "g36",
    topic: "Work",
    text: "Eine Frau verliert ihre Arbeitsstelle. Was darf nicht der Grund für diese Entlassung sein?",
    options: ["Sie ist lange krank.", "Sie kommt oft zu spät.", "Sie erwartet ein Kind.", "Sie ist bei der Arbeit unhöflich."],
    correct: 2,
  },
  {
    id: "g37",
    topic: "Society",
    text: "Was ist in Deutschland ein Ehrenamt?",
    options: ["unbezahlte Arbeit für die Gemeinschaft", "eine Arbeit beim Staat", "ein Amt bei der Polizei", "eine bezahlte Arbeit im Rathaus"],
    correct: 0,
  },
  {
    id: "g38",
    topic: "Government",
    text: "Welches Amt gehört in Deutschland zur Gemeindeverwaltung?",
    options: ["das Pfarramt", "das Ordnungsamt", "das Finanzministerium", "das Bundesamt"],
    correct: 1,
  },
  {
    id: "g39",
    topic: "Parties",
    text: "Wofür steht die Abkürzung SPD?",
    options: ["Sozialistische Partei Deutschlands", "Sozialdemokratische Partei Deutschlands", "Sozialpolitische Partei Deutschlands", "Soziale Partnerschaft Deutschlands"],
    correct: 1,
  },
  {
    id: "g40",
    topic: "History",
    text: "Was war die Stasi?",
    options: ["der Geheimdienst der DDR", "ein Sportverein in der DDR", "eine Partei in der DDR", "eine Zeitung in der DDR"],
    correct: 0,
  },
  {
    id: "g41",
    topic: "History",
    text: "In welchem Jahr wurden die beiden deutschen Staaten wiedervereinigt?",
    options: ["1989", "1990", "1991", "1994"],
    correct: 1,
  },
  {
    id: "g42",
    topic: "History",
    text: "Welche Partei regierte in der DDR?",
    options: ["die SED", "die CDU", "die FDP", "die SPD"],
    correct: 0,
  },
  {
    id: "g43",
    topic: "Symbols",
    text: "Welches Tier ist das Wappentier der Bundesrepublik Deutschland?",
    options: ["der Adler", "der Löwe", "der Bär", "das Pferd"],
    correct: 0,
  },
  {
    id: "g44",
    topic: "Society",
    text: "Was gehört in Deutschland zur Sozialversicherung?",
    options: ["die Krankenversicherung", "die Haftpflichtversicherung", "die Autoversicherung", "die Hausratversicherung"],
    correct: 0,
  },
  {
    id: "g45",
    topic: "Elections",
    text: "Wie viele Stimmen haben Sie bei der Bundestagswahl?",
    options: ["eine", "zwei", "drei", "vier"],
    correct: 1,
  },
  {
    id: "g46",
    topic: "Europe",
    text: "Wie viele Mitgliedstaaten hat die Europäische Union heute?",
    options: ["21", "23", "25", "27"],
    correct: 3,
  },
  {
    id: "g47",
    topic: "Europe",
    text: "In welcher Stadt ist der Sitz des Europäischen Parlaments?",
    options: ["London", "Paris", "Berlin", "Straßburg"],
    correct: 3,
  },
];

function stateParliament(state: string) {
  if (state === "Berlin") return "Abgeordnetenhaus";
  if (state === "Hamburg" || state === "Bremen") return "Bürgerschaft";
  return "Landtag";
}

export function stateQuestions(state: string): Question[] {
  const capital = CAPITALS[state] ?? state;
  const others = Object.values(CAPITALS).filter((c) => c !== capital);
  // Deterministic distractors so the question looks the same every visit
  const seed = state.length;
  const distractors = [0, 5, 10].map((o) => others[(seed + o) % others.length] ?? "");
  const capitalOptions = [...distractors];
  capitalOptions.splice(seed % 4, 0, capital);

  const parliament = stateParliament(state);
  const parliamentOptions = ["Landtag", "Bürgerschaft", "Abgeordnetenhaus", "Bundesrat"];

  return [
    {
      id: `s-${state}-1`,
      topic: state,
      state,
      text: `Welche Stadt ist die Landeshauptstadt von ${state}?`,
      options: capitalOptions,
      correct: capitalOptions.indexOf(capital),
    },
    {
      id: `s-${state}-2`,
      topic: state,
      state,
      text: `Wie heißt das Parlament von ${state}?`,
      options: parliamentOptions,
      correct: parliamentOptions.indexOf(parliament),
    },
    {
      id: `s-${state}-3`,
      topic: state,
      state,
      text: `Wo können Sie sich in ${state} über politische Themen informieren?`,
      options: [
        "bei der Verbraucherzentrale",
        "bei der Landeszentrale für politische Bildung",
        "beim Ordnungsamt der Gemeinde",
        "bei der Ausländerbehörde",
      ],
      correct: 1,
    },
  ];
}

export function questionPool(state: string | null): Question[] {
  const general = GENERAL_QUESTIONS.slice(0, FREE_QUESTION_COUNT - 3);
  return state ? [...general, ...stateQuestions(state)] : general;
}

/** Free preview: 50 practice questions (general + 3 for the user's state) and one mock exam. */
export const FREE_QUESTION_COUNT = 50;
export const FREE_MOCK_EXAMS = 1;
export const FULL_QUESTION_COUNT = 460;

/** The real test: 30 general + 3 state questions, pass with 17 correct. */
export const EXAM_GENERAL = 30;
export const EXAM_STATE = 3;
export const OFFICIAL_TOTAL = EXAM_GENERAL + EXAM_STATE;
export const OFFICIAL_PASS = 17;

export function passMark(total: number) {
  return Math.ceil((total * OFFICIAL_PASS) / OFFICIAL_TOTAL);
}
export function hasPassed(score: number, total: number) {
  return score >= passMark(total);
}

function shuffle<T>(arr: T[], rand: () => number) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

/** A mock exam like the real one: 30 random general questions, then the 3 state questions. */
export function buildExam(pool: Question[], rand: () => number = Math.random): Question[] {
  const general = shuffle(pool.filter((q) => !q.state), rand).slice(0, EXAM_GENERAL);
  const state = pool.filter((q) => q.state).slice(0, EXAM_STATE);
  return [...general, ...state];
}

export function canTakeMockExam(examsTaken: number) {
  return examsTaken < FREE_MOCK_EXAMS;
}
