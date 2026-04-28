/**
 * Live survey: 15 questions (excludes intro; email is on thank-you page).
 * Copy source: /public/vela_crew_survey_v2.md
 */
export type SurveyQuestion = {
  id: string;
  type: "intro" | "single" | "multi" | "scale" | "opentext";
  index?: string;
  section?: string;
  text?: string;
  sub?: string;
  options?: string[];
  scaleMin?: string;
  scaleMax?: string;
  scale?: number;
  maxSelect?: number;
  optional?: boolean;
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  { id: "intro", type: "intro" },

  // 1–6 — Be honest — nobody's watching
  {
    id: "running_on_empty",
    type: "single",
    index: "01",
    section: "Be honest — nobody\u2019s watching",
    text: "How often do you show up to work already running on empty?",
    sub: "",
    options: [
      "Almost every duty",
      "More often than not",
      "Sometimes",
      "Rarely",
    ],
  },
  {
    id: "leaving_job",
    type: "single",
    index: "02",
    section: "Be honest — nobody\u2019s watching",
    text: "Has the fatigue ever made you seriously think about leaving the job?",
    sub: "",
    options: [
      "Yes — I\u2019ve actively looked at other options",
      "I think about it more than I\u2019d like to",
      "It crosses my mind occasionally",
      "No — I love the job despite it",
    ],
  },
  {
    id: "airline_acknowledgment",
    type: "single",
    index: "03",
    section: "Be honest — nobody\u2019s watching",
    text:
      "Has your airline ever actually sat down with you and acknowledged what the schedule does to your body?",
    sub: "",
    options: ["Never", "Once or twice, kind of", "Yes, properly"],
  },
  {
    id: "wrong_moment_fatigue",
    type: "single",
    index: "04",
    section: "Be honest — nobody\u2019s watching",
    text:
      "You know that feeling when your body just wants to give up at exactly the wrong moment on a flight?",
    sub: "Boarding. Taxi. Takeoff. Landing. Those moments.",
    options: [
      "Never happens to me",
      "Occasionally",
      "More than I\u2019d like to admit",
      "It\u2019s just part of the job now",
      "Rather not say",
    ],
  },
  {
    id: "tiredness_episodes_month",
    type: "single",
    index: "05",
    section: "Be honest — nobody\u2019s watching",
    text:
      "In the past month — how many times did tiredness actually get the better of you? On a flight, a layover, days off?",
    sub: "",
    options: [
      "Honestly, zero",
      "Once or twice",
      "A handful of times",
      "I stopped counting",
    ],
  },
  {
    id: "tiredness_worry",
    type: "scale",
    index: "06",
    section: "Be honest — nobody\u2019s watching",
    text: "How much does the tiredness in this job worry you?",
    sub: "1 = doesn\u2019t cross my mind — 5 = genuinely keeps me up at night",
    scaleMin: "Doesn\u2019t cross my mind",
    scaleMax: "Keeps me up at night",
    scale: 5,
  },

  // 7–9 — Your body clock
  {
    id: "recovery_after_haul",
    type: "single",
    index: "07",
    section: "Your body clock",
    text:
      "After a long or medium-haul flight, how long before you actually feel like yourself again?",
    sub: "",
    options: [
      "Less than a day",
      "A day or two",
      "Three or four days",
      "Five days or more",
      "I\u2019m never fully back before the next trip",
    ],
  },
  {
    id: "bodyclock_tz",
    type: "single",
    index: "08",
    section: "Your body clock",
    text:
      "At any given point in your roster — do you actually know what time zone your body thinks it\u2019s in?",
    sub: "",
    options: [
      "Yeah, I track it",
      "Roughly",
      "Not really — I just know I\u2019m tired",
      "Never even thought about it",
    ],
  },
  {
    id: "roster_planning",
    type: "single",
    index: "09",
    section: "Your body clock",
    text: "When your roster drops, do you plan around it — sleep, recovery, all of it?",
    sub: "",
    options: [
      "Yes, I\u2019m pretty deliberate about it",
      "I try, but I\u2019m guessing most of the time",
      "Only when I know a trip\u2019s going to destroy me",
      "No — I just show up and deal with it",
    ],
  },

  // 10–11 — What would actually help
  {
    id: "roster_heads_up_use",
    type: "single",
    index: "10",
    section: "What would actually help",
    text:
      "If something could read your roster and give you a heads up — when to sleep, when to get light, when your body\u2019s going to hit a wall — would you use it?",
    sub: "",
    options: [
      "I\u2019d download it today",
      "Probably yes",
      "Maybe — I\u2019d want to try it first",
      "Doubt it",
    ],
  },
  {
    id: "tools_issue",
    type: "multi",
    index: "11",
    section: "What would actually help",
    text: "What\u2019s your issue with the sleep and fatigue tools that already exist?",
    sub: "Pick everything that applies.",
    options: [
      "They\u2019re made for people with normal schedules",
      "They track stuff but never tell me what to actually do",
      "Nothing ever connects to my actual roster",
      "There\u2019s genuinely nothing out there for crew",
      "I don\u2019t use anything — I just push through",
    ],
  },

  // 12–13 — Two things we really want to know
  {
    id: "job_taken_from_life",
    type: "opentext",
    index: "12",
    section: "Two things we really want to know",
    text:
      "What has this job actually taken from you — not your career, but your life?",
    sub: "Your days off. Your relationships. The person you are when you\u2019re not exhausted.",
  },
  {
    id: "one_thing_energy_help",
    type: "opentext",
    index: "13",
    section: "Two things we really want to know",
    text:
      "If you could have one thing to help you manage your energy as crew — what would it be?",
    sub: "",
  },

  // 14–15 — About you
  {
    id: "role",
    type: "single",
    index: "14",
    section: "Last two — just so we know who we\u2019re talking to",
    text: "What\u2019s your current role?",
    sub: "",
    options: [
      "Economy",
      "Business",
      "First",
      "Cabin Supervisor / Manager",
      "Purser",
    ],
  },
  {
    id: "experience",
    type: "single",
    index: "15",
    section: "Last two — just so we know who we\u2019re talking to",
    text: "How long have you been flying?",
    sub: "",
    options: ["Under 1 year", "1–3 years", "4–7 years", "8–15 years", "16+ years"],
  },
];

/** Maps running_on_empty option index (0–3) to legacy energy column 1–5 for DB compatibility. */
export function runningEmptyIndexToEnergyLegacy(idx: number): number {
  const map: Record<number, number> = { 0: 1, 1: 2, 2: 3, 3: 5 };
  return map[idx] ?? 1;
}
