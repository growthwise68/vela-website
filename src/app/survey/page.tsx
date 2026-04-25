"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./survey.css";

type Question = {
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

const questions: Question[] = [
  { id: "intro", type: "intro" },

  // Section 1 — About You
  {
    id: "role", type: "single", index: "01", section: "About You",
    text: "What is your current role?", sub: "",
    options: ["Economy cabin crew", "Business class crew", "First class crew", "Cabin supervisor or manager", "Purser"],
  },
  {
    id: "experience", type: "single", index: "02", section: "About You",
    text: "How many years have you been flying?", sub: "",
    options: ["Under 1 year", "1–3 years", "4–7 years", "8–15 years", "16 or more years"],
  },
  {
    id: "age", type: "single", index: "03", section: "About You",
    text: "What\u2019s your age range?", sub: "",
    options: ["21–25", "26–30", "31–35", "36–40", "41–50", "51+"],
  },
  {
    id: "base", type: "single", index: "04", section: "About You",
    text: "Where are you based?", sub: "",
    options: ["UAE (DXB / AUH)", "Middle East — other", "Europe", "Asia-Pacific", "Americas", "Africa or other"],
  },

  // Section 2 — Your Flying Life
  {
    id: "route", type: "single", index: "05", section: "Your Flying Life",
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
    id: "zones", type: "single", index: "06", section: "Your Flying Life",
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
    id: "rested", type: "single", index: "07", section: "Your Flying Life",
    text: "How often do you report for duty feeling genuinely well-rested?", sub: "",
    options: ["Almost never", "Rarely — a few times a month", "About half the time", "Often", "Almost always"],
  },
  {
    id: "recovery", type: "single", index: "08", section: "Your Flying Life",
    text: "After a long-haul rotation, how long until you feel like yourself again?", sub: "",
    options: [
      "Under 24 hours — I bounce back fast",
      "1 to 2 days",
      "3 to 4 days",
      "Close to a week",
      "What\u2019s feeling normal?",
    ],
  },

  // Section 3 — Your Body
  {
    id: "energy", type: "energy", index: "09", section: "Your Body",
    text: "How are you feeling right now?", sub: "A quick check-in.",
    options: [
      { label: "Running on fumes", icon: "🔋" },
      { label: "Below par", icon: "🌤" },
      { label: "Getting by", icon: "☀️" },
      { label: "Pretty good", icon: "⚡" },
      { label: "Fully charged", icon: "🚀" },
    ],
  },
  {
    id: "redeye", type: "single", index: "10", section: "Your Body",
    text: "How often do you struggle to stay awake on red-eye or ultra long-haul flights?", sub: "",
    options: ["Never", "Occasionally", "Frequently", "Almost every time"],
  },
  {
    id: "bodyclock", type: "single", index: "11", section: "Your Body",
    text: "Do you know where your body clock actually is at any point in your roster?", sub: "",
    options: [
      "Yes — I always know",
      "Roughly — I can estimate",
      "Not really — I just know I\u2019m tired",
      "No idea — I\u2019ve never thought about it",
    ],
  },

  // Section 4 — Recovery & Coping
  {
    id: "coping", type: "multi", index: "12", section: "Recovery & Coping",
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
    id: "personal_life", type: "single", index: "13", section: "Recovery & Coping",
    text: "How often does fatigue from your roster affect your personal life on days off?", sub: "",
    options: [
      "Almost never",
      "Sometimes",
      "Often",
      "Almost always — I spend my days off recovering",
    ],
  },

  // Section 5 — Roster & Planning
  {
    id: "roster_planning", type: "single", index: "14", section: "Roster & Planning",
    text: "When you receive your roster, do you plan your sleep and recovery around it?", sub: "",
    options: [
      "Yes — I plan carefully",
      "I try, but I don\u2019t know the best approach",
      "Occasionally — only for tough trips",
      "No — I just show up and cope",
    ],
  },
  {
    id: "dreaded_routes", type: "single", index: "15", section: "Roster & Planning",
    text: "Are there specific routes in your roster you dread because of how they make you feel physically?", sub: "",
    options: ["Yes — several", "One or two", "Not really"],
  },
  {
    id: "helpful_features", type: "multi", index: "16", section: "Roster & Planning",
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

  // Section 6 — The App
  {
    id: "utility", type: "scale", index: "17", section: "The App",
    text: "How useful would a readiness planning app be for your life?",
    sub: "One that uses your actual roster to give you specific guidance.",
    scaleMin: "Not useful", scaleMax: "Absolutely essential", scale: 5,
  },
  {
    id: "crew_trust", type: "single", index: "18", section: "The App",
    text: "Would knowing the app was built by a fellow crew member make you more likely to trust it?", sub: "",
    options: ["Yes — significantly", "Somewhat", "Doesn\u2019t matter to me"],
  },
  {
    id: "pay", type: "single", index: "19", section: "The App",
    text: "If it genuinely improved your sleep and recovery, what would you pay per month?",
    sub: "Be honest — this helps us build something people actually use.",
    options: [
      "Nothing — it should be free",
      "Under $5 / month",
      "$5 to $10 / month",
      "$10 to $20 / month",
      "More than $20 if it really works",
    ],
  },

  // Section 7 — In Your Own Words
  {
    id: "open_1", type: "opentext", index: "20", section: "In Your Own Words",
    text: "What fatigue challenge has most affected your wellbeing or life outside work?",
    sub: "Optional — skip with Continue if you prefer.",
    optional: true,
  },
  {
    id: "open_2", type: "opentext", index: "21", section: "In Your Own Words",
    text: "What one thing do you wish existed to support your energy and wellbeing as crew?",
    sub: "Optional — your answer could be the thing we build next.",
    optional: true,
  },
];

export default function SurveyPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [animating, setAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateStars();
  }, []);

  const generateStars = () => {
    const container = document.getElementById("stars");
    if (!container) return;
    for (let i = 0; i < 90; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 1.8 + 0.4;
      star.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%; top: ${Math.random() * 100}%;
        --d: ${2 + Math.random() * 4}s; --delay: -${Math.random() * 6}s;
        --min-op: ${0.05 + Math.random() * 0.1}; --max-op: ${0.3 + Math.random() * 0.5};
      `;
      container.appendChild(star);
    }
  };

  const q = questions[current];
  const questionCount = questions.filter((q) => q.type !== "intro").length;
  const total = questions.length - 1;
  const progress = current === 0 ? 0 : Math.round((current / total) * 100);

  const handleTransition = (callback: () => void) => {
    if (animating) return;
    setAnimating(true);
    const screenInner = document.getElementById("screenInner");
    if (screenInner) {
      screenInner.classList.add("exit");
      setTimeout(() => {
        callback();
        screenInner.classList.remove("exit");
        screenInner.classList.add("enter");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            screenInner.classList.remove("enter");
            setAnimating(false);
          })
        );
      }, 320);
    }
  };

  const goNext = () => {
    if (animating || isSubmitting) return;
    if (q.type === "intro") { setCurrent(1); return; }
    if (current >= questions.length - 1) {
      submitSurvey();
      return;
    }
    handleTransition(() => setCurrent(Math.min(current + 1, questions.length - 1)));
  };

  const goBack = () => {
    if (current === 0 || animating) return;
    handleTransition(() => setCurrent(Math.max(current - 1, 0)));
  };

  const selectSingle = (id: string, index: number) => {
    setAnswers({ ...answers, [id]: index });
    setTimeout(goNext, 320);
  };

  const selectEnergy = (index: number) => {
    setAnswers({ ...answers, energy: index });
    setTimeout(goNext, 320);
  };

  const selectScale = (id: string, value: number) => {
    setAnswers({ ...answers, [id]: value });
    setTimeout(goNext, 380);
  };

  const toggleMulti = (id: string, index: number) => {
    const qDef = questions.find((q) => q.id === id);
    const curr: number[] = answers[id] || [];
    const idx = curr.indexOf(index);
    if (idx > -1) {
      setAnswers({ ...answers, [id]: curr.filter((i) => i !== index) });
    } else {
      if (qDef?.maxSelect && curr.length >= qDef.maxSelect) return;
      setAnswers({ ...answers, [id]: [...curr, index] });
    }
  };

  const getLabel = (qId: string, idx: number): string => {
    const qDef = questions.find((q) => q.id === qId);
    if (!qDef?.options) return "Not specified";
    return (qDef.options as string[])[idx] ?? "Not specified";
  };

  const getLabels = (qId: string, indices: number[]): string[] =>
    indices.map((i) => getLabel(qId, i));

  const submitSurvey = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    const energyLabels = ["Running on fumes", "Below par", "Getting by", "Pretty good", "Fully charged"];

    const surveyData = {
      energy: (answers.energy as number ?? -1) + 1,
      route_type: getLabel("route", answers.route as number),
      timezone_crossings: getLabel("zones", answers.zones as number),
      recovery_time: getLabel("recovery", answers.recovery as number),
      coping_strategies: getLabels("coping", (answers.coping as number[]) || []),
      app_utility: (answers.utility as number) || 0,
      willingness_to_pay: getLabel("pay", answers.pay as number),
      email: null as string | null,
      name: null as string | null,
      answers: {
        role: getLabel("role", answers.role as number),
        experience: getLabel("experience", answers.experience as number),
        age: getLabel("age", answers.age as number),
        base: getLabel("base", answers.base as number),
        energy_label: energyLabels[answers.energy as number] ?? "Not specified",
        rested: getLabel("rested", answers.rested as number),
        redeye: getLabel("redeye", answers.redeye as number),
        bodyclock: getLabel("bodyclock", answers.bodyclock as number),
        personal_life: getLabel("personal_life", answers.personal_life as number),
        roster_planning: getLabel("roster_planning", answers.roster_planning as number),
        dreaded_routes: getLabel("dreaded_routes", answers.dreaded_routes as number),
        helpful_features: getLabels("helpful_features", (answers.helpful_features as number[]) || []),
        crew_trust: getLabel("crew_trust", answers.crew_trust as number),
        open_1: (answers.open_1 as string) || "",
        open_2: (answers.open_2 as string) || "",
      },
    };

    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const id = result.id as string | undefined;
      if (id) {
        router.push(`/survey/thank-you?rid=${encodeURIComponent(id)}`);
      } else {
        router.push("/survey/thank-you");
      }
    } catch {
      setError("Failed to submit survey. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    if (q.type === "opentext") return false;
    if (q.type === "single" || q.type === "energy" || q.type === "scale") {
      return answers[q.id] === undefined;
    }
    if (q.type === "multi") {
      return !answers[q.id] || (answers[q.id] as number[]).length === 0;
    }
    return false;
  };

  const selectedMultiCount = q.type === "multi" ? ((answers[q.id] as number[]) || []).length : 0;

  return (
    <div className="survey-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflowY: "auto" }}>
      <div className="stars" id="stars"></div>
      <div className="arc-bg"></div>

      <div className="shell" style={{ display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div className="header" style={{ display: q.type === "intro" ? "none" : "flex" }}>
          <div className="logo">
            Vela
            <span>Circadian Intelligence</span>
          </div>
          <div className="progress-wrap" style={{ maxWidth: "220px" }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-label">
              {current > 0 ? `${current} of ${questionCount}` : ""}
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="screen">
          <div className="screen-inner" id="screenInner">
            {error && q.type !== "intro" && (
              <div
                style={{
                  margin: "0 auto 1rem",
                  maxWidth: "400px",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(229,115,115,0.1)",
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                }}
              >
                {error}
              </div>
            )}

            {q.type === "intro" && (
              <div className="intro-screen">
                <div className="vela-wordmark">Vela</div>
                <div className="vela-tagline">Circadian Intelligence for Cabin Crew</div>
                <div className="intro-body">
                  You spend your career flying across time zones.
                  <br />
                  3 minutes to help us build something designed around your world.
                </div>
                <div className="intro-sub">
                  {
                    "We\u2019re building Vela — a readiness planning app built specifically for long-haul crew. " +
                    "Before we ship, we want to understand your world. Your responses shape what we build."
                  }
                </div>
                <div className="intro-time">
                  ⏱ About 4 minutes · Not shared with your employer. Optional waitlist on the thank-you page.
                </div>
                <button
                  className="cta"
                  onClick={goNext}
                  style={{ maxWidth: "320px", margin: "0 auto", display: "block" }}
                >
                  Begin the survey →
                </button>
              </div>
            )}

            {q.type === "energy" && (
              <div>
                {q.section && <div className="q-section">{q.section}</div>}
                <div className="q-index">{q.index} / {questionCount}</div>
                <div className="q-text">{q.text}</div>
                <div className="q-sub">{q.sub}</div>
                <div className="energy-scale">
                  {(q.options as Array<{ label: string; icon: string }>).map((o, i) => (
                    <div
                      key={i}
                      className={`energy-btn${answers.energy === i ? " selected" : ""}`}
                      onClick={() => selectEnergy(i)}
                    >
                      <div className="energy-icon">{o.icon}</div>
                      <div className="energy-label">{o.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {q.type === "single" && (
              <div>
                {q.section && <div className="q-section">{q.section}</div>}
                <div className="q-index">{q.index} / {questionCount}</div>
                <div className="q-text">{q.text}</div>
                {q.sub ? <div className="q-sub">{q.sub}</div> : <div style={{ marginBottom: "2rem" }}></div>}
                <div className="options">
                  {(q.options as string[]).map((o, i) => (
                    <div
                      key={i}
                      className={`option${answers[q.id] === i ? " selected" : ""}`}
                      onClick={() => selectSingle(q.id, i)}
                    >
                      <div className="option-dot"></div>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {q.type === "multi" && (
              <div>
                {q.section && <div className="q-section">{q.section}</div>}
                <div className="q-index">{q.index} / {questionCount}</div>
                <div className="q-text">{q.text}</div>
                <div className="q-sub">
                  {q.sub}
                  {q.maxSelect && selectedMultiCount >= q.maxSelect && (
                    <span className="multi-max-hint"> · Maximum {q.maxSelect} selected</span>
                  )}
                </div>
                <div className="options">
                  {(q.options as string[]).map((o, i) => (
                    <div
                      key={i}
                      className={`option multi${(answers[q.id] || []).includes(i) ? " selected" : ""}`}
                      onClick={() => toggleMulti(q.id, i)}
                    >
                      <div className="option-dot"></div>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {q.type === "scale" && (
              <div>
                {q.section && <div className="q-section">{q.section}</div>}
                <div className="q-index">{q.index} / {questionCount}</div>
                <div className="q-text">{q.text}</div>
                {q.sub ? <div className="q-sub">{q.sub}</div> : <div style={{ marginBottom: "2rem" }}></div>}
                <div className="scale-wrap">
                  <div className="scale-labels">
                    <span>{q.scaleMin}</span>
                    <span>{q.scaleMax}</span>
                  </div>
                  <div className="scale-options">
                    {Array.from({ length: q.scale || 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`scale-btn${answers[q.id] === i + 1 ? " selected" : ""}`}
                        onClick={() => selectScale(q.id, i + 1)}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {q.type === "opentext" && (
              <div>
                {q.section && <div className="q-section">{q.section}</div>}
                <div className="q-index">{q.index} / {questionCount}</div>
                <div className="q-text">{q.text}</div>
                {q.sub && <div className="q-sub">{q.sub}</div>}
                <textarea
                  className="text-input opentext-input"
                  value={(answers[q.id] as string) || ""}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  placeholder="Your thoughts here..."
                  rows={5}
                />
              </div>
            )}

          </div>
        </div>

        {/* Nav */}
        <div
          className="nav"
          id="nav"
          style={{ display: q.type === "intro" ? "none" : "flex" }}
        >
          <button
            className="nav-back"
            onClick={goBack}
            style={{ visibility: current <= 1 ? "hidden" : "visible" }}
          >
            <svg viewBox="0 0 16 16"><polyline points="10,3 5,8 10,13" /></svg>
            Back
          </button>
          <button
            className="next-btn"
            onClick={goNext}
            disabled={isNextDisabled() || isSubmitting}
          >
            {isSubmitting
              ? "Sending…"
              : current >= questions.length - 1
                ? "Finish →"
                : "Continue →"}
          </button>
        </div>

      </div>
    </div>
  );
}
