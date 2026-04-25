/**
 * Live survey: 15 questions (excludes intro; email is on thank-you page).
 * Order: engaging / emotional first, demographics last.
 * See /public/vela_crew_survey.md for full inventory and included/excluded list.
 */
export type SurveyQuestion = {
  id: string;
  type: "intro" | "energy" | "single" | "multi" | "scale" | "opentext";
  index?: string;
  section?: string;
  text?: string;
  sub?: string;
  options?: string[] | Array<{ label: string; icon: string }>;
  scaleMin?: string;
  scaleMax?: string;
  scale?: number;
  maxSelect?: number;
  optional?: boolean;
};

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  { id: "intro", type: "intro" },

  // 1–5 — open with feeling + product vision
  {
    id: "energy",
    type: "energy",
    index: "01",
    section: "Your world",
    text: "How are you feeling right now?",
    sub: "A quick check-in: think about this week in your flying life, not a random \u201coff-day\u201d mood.",
    options: [
      { label: "Running on fumes", icon: "🔋" },
      { label: "Below par", icon: "🌤" },
      { label: "Getting by", icon: "☀️" },
      { label: "Pretty good", icon: "⚡" },
      { label: "Fully charged", icon: "🚀" },
    ],
  },
  {
    id: "recovery",
    type: "single",
    index: "02",
    section: "Your world",
    text: "After a long-haul rotation, how long until you feel like yourself again?",
    sub: "",
    options: [
      "Under 24 hours — I bounce back fast",
      "1 to 2 days",
      "3 to 4 days",
      "Close to a week",
      "What\u2019s feeling normal?",
    ],
  },
  {
    id: "personal_life",
    type: "single",
    index: "03",
    section: "Your world",
    text: "How often does fatigue from your roster affect your personal life on days off?",
    sub: "",
    options: [
      "Almost never",
      "Sometimes",
      "Often",
      "Almost always — I spend my days off recovering",
    ],
  },
  {
    id: "utility",
    type: "scale",
    index: "04",
    section: "The idea",
    text: "Imagine something that can make your roster and time off a little better. How much would you want that kind of help?",
    sub: "You have not used Véla yet — this is about the idea. It draws on published circadian and sleep science, the same body of research that informs high-performance space and military sleep and alertness work. Not medical advice.",
    scaleMin: "Not for me",
    scaleMax: "I want it a lot",
    scale: 5,
  },
  {
    id: "helpful_features",
    type: "multi",
    index: "05",
    section: "The idea",
    text: "What would help you most before a difficult trip?",
    sub: "Select up to 3.",
    options: [
      "When to sleep before departure",
      "When to seek or avoid light",
      "Caffeine timing suggestions",
      "Nap strategy for layover",
      "Low alertness window estimates",
      "Recovery plan for after the trip",
    ],
    maxSelect: 3,
  },

  // 6–12 — body, flying, planning
  {
    id: "bodyclock",
    type: "single",
    index: "06",
    section: "Your body and rhythm",
    text: "Do you know where your body clock actually is at any point in your roster?",
    sub: "",
    options: [
      "Yes — I always know",
      "Roughly — I can estimate",
      "Not really — I just know I\u2019m tired",
      "No idea — I\u2019ve never thought about it",
    ],
  },
  {
    id: "route",
    type: "single",
    index: "07",
    section: "Your body and rhythm",
    text: "What best describes your typical flying pattern?",
    sub: "Choose the option that fits most of your roster.",
    options: [
      "Short-haul only (< 4 hrs)",
      "Mostly short with some long-haul",
      "Mostly long-haul, some short",
      "Long-haul focused (8–14 hrs)",
      "Ultra long-haul specialist (14+ hrs)",
      "Mixed — it varies widely",
    ],
  },
  {
    id: "zones",
    type: "single",
    index: "08",
    section: "Your body and rhythm",
    text: "How many time zones do you cross in a typical month?",
    sub: "Roughly — we\u2019re not auditing your logbook.",
    options: [
      "1 to 3 — mostly regional",
      "4 to 8 — moderate crossing",
      "9 to 12 — significant disruption",
      "13 or more — full circadian chaos",
    ],
  },
  {
    id: "roster_planning",
    type: "single",
    index: "09",
    section: "Planning",
    text: "When you receive your roster, do you plan your sleep and recovery around it?",
    sub: "",
    options: [
      "Yes — I plan carefully",
      "I try, but I don\u2019t know the best approach",
      "Occasionally — only for tough trips",
      "No — I just show up and cope",
    ],
  },
  {
    id: "coping",
    type: "multi",
    index: "10",
    section: "Planning",
    text: "What do you currently use to support your sleep and recovery?",
    sub: "Select everything that applies.",
    options: [
      "Melatonin or sleep supplements",
      "Sleep mask and earplugs",
      "Deliberate caffeine timing",
      "Light exposure strategies",
      "Napping strategies",
      "Exercise and movement",
      "A fitness or sleep tracker",
      "Advice from other crew",
      "Nothing — I just push through",
      "I\u2019ve tried everything, nothing works well",
    ],
  },
  {
    id: "rested",
    type: "single",
    index: "11",
    section: "Planning",
    text: "How often do you report for duty feeling genuinely well-rested?",
    sub: "",
    options: [
      "Almost never",
      "Rarely — a few times a month",
      "About half the time",
      "Often",
      "Almost always",
    ],
  },
  {
    id: "crew_trust",
    type: "single",
    index: "12",
    section: "Trust",
    text: "Would knowing the app was designed with input from former crew members make you more likely to trust it?",
    sub: "",
    options: ["Yes — significantly", "Somewhat", "Doesn\u2019t matter to me"],
  },

  // 13–15 — business + who you are
  {
    id: "pay",
    type: "single",
    index: "13",
    section: "Practical",
    text: "If it genuinely helped your sleep and how you feel on the job, what would you pay per month?",
    sub: "Be honest — this helps us build something people actually use.",
    options: [
      "Nothing — it should be free",
      "Under $5 / month",
      "$5 to $10 / month",
      "$10 to $20 / month",
      "More than $20 if it really works",
    ],
  },
  {
    id: "role",
    type: "single",
    index: "14",
    section: "About you",
    text: "What is your current role?",
    sub: "We use this in aggregate to see how patterns differ across the cabin. Véla is for the full crew community — from economy to first.",
    options: [
      "Economy cabin crew",
      "Business class crew",
      "First class crew",
      "Cabin supervisor or manager",
      "Purser",
    ],
  },
  {
    id: "experience",
    type: "single",
    index: "15",
    section: "About you",
    text: "How many years have you been flying?",
    sub: "",
    options: ["Under 1 year", "1–3 years", "4–7 years", "8–15 years", "16 or more years"],
  },
];
