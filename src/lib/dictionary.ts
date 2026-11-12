// Small German → English glossary for the tap-to-translate demo.
const DICT: Record<string, string> = {
  in: "in", deutschland: "Germany", dürfen: "are allowed to", menschen: "people", offen: "openly",
  etwas: "something", gegen: "against", die: "the", der: "the", das: "the", den: "the", dem: "the",
  regierung: "government", sagen: "to say", weil: "because", hier: "here", religionsfreiheit: "freedom of religion",
  gilt: "applies", steuern: "taxes", zahlen: "to pay", wahlrecht: "right to vote", haben: "to have",
  meinungsfreiheit: "freedom of speech", ist: "is", ein: "a", eine: "a", rechtsstaat: "constitutional state",
  was: "what", damit: "by that", gemeint: "meant", alle: "all", einwohner: "residents", und: "and",
  staat: "state", müssen: "must", sich: "themselves", an: "to", gesetze: "laws", halten: "to keep / follow",
  muss: "must", nicht: "not", nur: "only", deutsche: "Germans", befolgen: "to obey", gerichte: "courts",
  machen: "to make", wie: "how", heißt: "is called", deutsche_: "German", verfassung: "constitution",
  volksgesetz: "people's law", bundesgesetz: "federal law", deutsches: "German", gesetz: "law",
  grundgesetz: "Basic Law (constitution)", welches: "which", recht: "right", gehört: "belongs",
  zu: "to", grundrechten: "basic rights", waffenbesitz: "gun ownership", faustrecht: "law of the fist",
  selbstjustiz: "vigilante justice", steht: "stands / is written", im: "in the", von: "of", würde: "dignity",
  des: "of the", menschen_: "human", unantastbar: "inviolable", sollen: "should", gleich: "equal",
  viel: "much", geld: "money", jeder: "every", mensch: "person", darf: "may", seine: "his / their",
  meinung: "opinion", sind: "are", vor: "before", viele: "many", bundesländer: "federal states",
  hat: "has", bundesrepublik: "Federal Republic", wer: "who", wählt: "elects", bundeskanzler: "chancellor",
  oder: "or", bundeskanzlerin: "chancellor (female)", bundesrat: "Federal Council", bundesversammlung: "Federal Convention",
  volk: "people", bundestag: "federal parliament", bedeutet: "means", abkürzung: "abbreviation",
  christliche: "Christian", christlicher: "Christian", christlich: "Christian", union: "union", club: "club",
  deutscher: "German", unternehmer: "entrepreneurs", umweltschutz: "environmental protection",
  demokratische: "democratic", aufgabe: "task", polizei: "police", land: "country", verteidigen: "to defend",
  bürger: "citizens", abzuhören: "to wiretap", beschließen: "to pass (a law)", einhaltung: "compliance",
  überwachen: "to monitor", welchem: "which", jahr: "year", wurde: "was", mauer: "wall", berlin: "Berlin",
  gebaut: "built", wann: "when", für: "for", geöffnet: "opened", welche: "which", farben: "colours",
  flagge: "flag", oft: "often", gibt: "gives / there is", es: "it", normalerweise: "normally",
  bundestagswahlen: "federal elections", drei: "three", vier: "four", fünf: "five", sechs: "six",
  jahre: "years", ab: "from", alter: "age", man: "one / you", wahl: "election", zum: "to the",
  deutschen: "German", teilnehmen: "to take part", grundrecht: "basic right", glaubensfreiheit: "freedom of belief",
  auf: "on / to", eigenes: "own", auto: "car", urlaub: "holiday", haus: "house", stadt: "city",
  landeshauptstadt: "state capital", parlament: "parliament", landtag: "state parliament",
  bürgerschaft: "city parliament", abgeordnetenhaus: "House of Representatives", wo: "where",
  können: "can", sie: "you", über: "about", politische: "political", themen: "topics",
  informieren: "to inform yourself", bei: "at", verbraucherzentrale: "consumer advice centre",
  landeszentrale: "state agency", politische_: "political", bildung: "education", beim: "at the",
  ordnungsamt: "public order office", gemeinde: "municipality", ausländerbehörde: "immigration office",
  bundespräsidenten: "federal president", bundespräsidentin: "federal president (female)", bundespräsident: "federal president",
  wie_: "how", lange: "long", wird: "will be / is", gewählt: "elected", sieben: "seven", bildet: "forms",
  abgeordneten: "members of parliament", minister: "ministers", bundesregierung: "federal government",
  regierungsvertreter: "government representatives", mitglieder: "members", parteien: "parties",
  demokratie: "democracy", monarchie: "monarchy", sozialstaat: "welfare state", bundesstaat: "federal state",
  bundesgericht: "federal court", besteht: "consists", aus: "of / from", bundesländern: "federal states",
  einen: "a", merkmal: "feature", unserer: "our", regelmäßige: "regular", wahlen: "elections",
  pressezensur: "press censorship", einparteiensystem: "one-party system", verbot: "ban", gegründet: "founded",
  geschah: "happened", november: "November", zweite: "second", weltkrieg: "world war", war: "was", ende: "end",
  fiel: "fell", hitler: "Hitler", kam: "came", macht: "power / makes", begann: "began", deutschen_: "German",
  angriff: "attack", polen: "Poland", europa: "Europe", feiert: "celebrates", oktober: "October",
  tag: "day", einheit: "unity", ostern: "Easter", weihnachten: "Christmas", arbeit: "work", reichskanzler: "Reich chancellor",
  nachbarland: "neighbouring country", ungarn: "Hungary", portugal: "Portugal", spanien: "Spain", schweiz: "Switzerland",
  frei: "free", niemand: "nobody", bestimmten: "particular", gezwungen: "forced", werden: "to be / become",
  stimme: "vote", annehmen: "to accept", männer: "men", wählen: "to vote", volkssouveränität: "sovereignty of the people",
  staatsgewalt: "state power", geht: "goes / comes", vom: "from the", volke: "people", könig: "king", herrscht: "rules",
  bestimmt: "decides", ganz: "all of / whole", volkskammer: "People's Chamber (GDR)", bundesgerichtshof: "Federal Court of Justice",
  neues: "new", staatsoberhaupt: "head of state", ministerpräsident: "state premier", bundestagspräsident: "Bundestag president",
  opposition: "opposition", kontrolliert: "controls", entscheidet: "decides", allein: "alone",
  gericht: "court", prüft: "checks", ob: "whether", übereinstimmen: "agree / match", bundesverfassungsgericht: "Federal Constitutional Court",
  amtsgericht: "local court", arbeitsgericht: "labour court", landgericht: "regional court", frau: "woman",
  verliert: "loses", ihre: "her", arbeitsstelle: "job", grund: "reason", diese: "this", entlassung: "dismissal",
  krank: "ill", kommt: "comes", spät: "late", erwartet: "is expecting", kind: "child", unhöflich: "rude",
  ehrenamt: "volunteer work", unbezahlte: "unpaid", gemeinschaft: "community", amt: "office", rathaus: "town hall",
  bezahlte: "paid", gehört_: "belongs", gemeindeverwaltung: "local administration", pfarramt: "parish office",
  finanzministerium: "finance ministry", bundesamt: "federal office", wofür: "what for", sozialdemokratische: "Social Democratic",
  sozialistische: "Socialist", sozialpolitische: "socio-political", soziale: "social", partnerschaft: "partnership",
  partei: "party", deutschlands: "of Germany", stasi: "Stasi (GDR secret police)", geheimdienst: "secret service",
  ddr: "GDR (East Germany)", sportverein: "sports club", zeitung: "newspaper", beiden: "two / both", staaten: "states",
  wiedervereinigt: "reunified", regierte: "governed", sed: "SED (GDR ruling party)", fdp: "FDP (Free Democratic Party)",
  spd: "SPD (Social Democratic Party)", cdu: "CDU (Christian Democratic Union)", tier: "animal",
  wappentier: "heraldic animal", adler: "eagle", löwe: "lion", bär: "bear", pferd: "horse",
  sozialversicherung: "social insurance", krankenversicherung: "health insurance", haftpflichtversicherung: "liability insurance",
  autoversicherung: "car insurance", hausratversicherung: "home contents insurance", stimmen: "votes",
  bundestagswahl: "federal election", zwei: "two", mitgliedstaaten: "member states", europäische: "European",
  europäischen: "European", heute: "today", welcher: "which", sitz: "seat", london: "London", paris: "Paris",
  straßburg: "Strasbourg",
  schwarz: "black", rot: "red", gold: "gold", weiß: "white", grün: "green", gelb: "yellow",
};

export function normalizeWord(word: string) {
  return word.toLowerCase().replace(/[.,!?;:…"„“()]/g, "").trim();
}

export function translate(word: string): string | null {
  const w = normalizeWord(word);
  if (!w) return null;
  if (DICT[w]) return DICT[w];
  // handle compound colours like schwarz-rot-gold
  if (w.includes("-")) {
    const parts = w.split("-").map((p) => DICT[p]);
    if (parts.every(Boolean)) return parts.join("-");
  }
  return null;
}

export function speakGerman(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
  return true;
}
