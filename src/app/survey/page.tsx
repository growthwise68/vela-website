"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./survey.css";

type Question = {
  id: string;
  type: "intro" | "energy" | "single" | "multi" | "scale" | "email";
  index?: string;
  text?: string;
  sub?: string;
  options?: string[] | Array<{ label: string; icon: string }>;
  scaleMin?: string;
  scaleMax?: string;
  scale?: number;
};

const questions: Question[] = [
  {
    id: "intro",
    type: "intro",
  },
  {
    id: "energy",
    type: "energy",
    index: "01",
    text: "How are you feeling right now?",
    sub: "Let's start with a baseline check-in.",
    options: [
      { label: "Running on fumes", icon: "🔋" },
      { label: "Below par", icon: "🌤" },
      { label: "Getting by", icon: "☀️" },
      { label: "Pretty good", icon: "⚡" },
      { label: "Fully charged", icon: "🚀" },
    ],
  },
  {
    id: "route",
    type: "single",
    index: "02",
    text: "What best describes your typical flying pattern?",
    sub: "Choose the option that fits most of your roster.",
    options: [
      "Short-haul only (< 4 hrs)",
      "Mostly short with some long-haul",
      "Long-haul focused (8–14 hrs)",
      "Ultra long-haul specialist (14+ hrs)",
      "Mixed — it varies widely",
    ],
  },
  {
    id: "zones",
    type: "single",
    index: "03",
    text: "How many time zones do you cross in a typical month?",
    sub: "Roughly — we're not auditing your logbook.",
    options: [
      "1 to 3 — mostly regional",
      "4 to 8 — moderate crossing",
      "9 to 12 — significant disruption",
      "13 or more — full circadian chaos",
    ],
  },
  {
    id: "challenge",
    type: "single",
    index: "04",
    text: "What's your biggest fatigue challenge?",
    sub: "The one that affects your life most consistently.",
    options: [
      "Sleeping on layovers, even when exhausted",
      "Recovering and readjusting back home",
      "Energy crashes mid-flight or mid-duty",
      "Overall sleep quality — it's just poor",
      "Managing social and family life around the roster",
      "All of the above, honestly",
    ],
  },
  {
    id: "recovery",
    type: "single",
    index: "05",
    text: "After a long-haul rotation, how long until you feel like yourself again?",
    sub: "",
    options: [
      "Under 24 hours — I bounce back fast",
      "1 to 2 days",
      "3 to 4 days",
      "Close to a week",
      "What's feeling normal?",
    ],
  },
  {
    id: "coping",
    type: "multi",
    index: "06",
    text: "What do you currently use to manage fatigue and sleep?",
    sub: "Select everything that applies.",
    options: [
      "Melatonin or sleep supplements",
      "Sleep mask and earplugs",
      "Deliberate caffeine timing",
      "Light exposure strategies",
      "Exercise and movement",
      "A fitness or sleep tracker",
      "Nothing specific — just push through",
      "I've tried everything, nothing works well",
    ],
  },
  {
    id: "awareness",
    type: "single",
    index: "07",
    text: "How familiar are you with circadian rhythm science for shift workers?",
    sub: "",
    options: [
      "Deeply — I know the research",
      "Somewhat — I've read a bit",
      "Heard of it, don't know the detail",
      "Not at all familiar",
    ],
  },
  {
    id: "utility",
    type: "scale",
    index: "08",
    text: "How useful would a personalised circadian management app be for your life?",
    sub: "One that uses your actual roster to give you specific guidance.",
    scaleMin: "Not useful",
    scaleMax: "Absolutely essential",
    scale: 5,
  },
  {
    id: "pay",
    type: "single",
    index: "09",
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
  {
    id: "email",
    type: "email",
    index: "10",
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
    const count = 90;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 1.8 + 0.4;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --d: ${2 + Math.random() * 4}s;
        --delay: -${Math.random() * 6}s;
        --min-op: ${0.05 + Math.random() * 0.1};
        --max-op: ${0.3 + Math.random() * 0.5};
      `;
      container.appendChild(star);
    }
  };

  const q = questions[current];
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
    if (animating || q.type === "email") return;
    if (q.type === "intro") {
      setCurrent(1);
      return;
    }
    handleTransition(() => {
      setCurrent(Math.min(current + 1, questions.length - 1));
    });
  };

  const goBack = () => {
    if (current === 0 || animating) return;
    handleTransition(() => {
      setCurrent(Math.max(current - 1, 0));
    });
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
    const current = answers[id] || [];
    const idx = current.indexOf(index);
    const newMulti =
      idx > -1
        ? current.filter((i: number) => i !== index)
        : [...current, index];
    setAnswers({ ...answers, [id]: newMulti });
  };

  const submitSurvey = async () => {
    const nameInput = document.getElementById("nameInput") as HTMLInputElement;
    const emailInput = document.getElementById("emailInput") as HTMLInputElement;
    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      if (emailInput) {
        emailInput.style.borderColor = "rgba(229,115,115,0.5)";
      }
      return;
    }

    if (!name) {
      setError("Please enter your name");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Map answers to survey fields
      const energyLabels = [
        "Running on fumes",
        "Below par",
        "Getting by",
        "Pretty good",
        "Fully charged",
      ];
      const routeLabels = [
        "Short-haul only",
        "Short + long-haul",
        "Long-haul focused",
        "Ultra long-haul",
        "Mixed",
      ];
      const zoneLabels = [
        "1-3 zones",
        "4-8 zones",
        "9-12 zones",
        "13+ zones",
      ];

      const copingOptions = [
        "Melatonin",
        "Sleep mask/earplugs",
        "Caffeine timing",
        "Light exposure",
        "Exercise",
        "Sleep tracker",
        "Nothing specific",
        "Tried everything",
      ];

      const surveyData = {
        energy: (answers.energy || 0) + 1,
        route_type:
          routeLabels[answers.route as number] || "Not specified",
        timezone_crossings:
          zoneLabels[answers.zones as number] || "Not specified",
        fatigue_challenge:
          (questions[4].options as string[])[
            answers.challenge as number
          ] || "Not specified",
        recovery_time:
          (questions[5].options as string[])[answers.recovery as number] ||
          "Not specified",
        coping_strategies: ((answers.coping as number[]) || []).map(
          (i) => copingOptions[i]
        ),
        circadian_awareness:
          (questions[7].options as string[])[answers.awareness as number] ||
          "Not specified",
        app_utility: (answers.utility as number) || 0,
        willingness_to_pay:
          (questions[9].options as string[])[answers.pay as number] ||
          "Not specified",
        email,
        name,
      };

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to submit survey");
        setIsSubmitting(false);
        return;
      }

      // Redirect to thank you page
      router.push("/survey/thank-you");
    } catch (err) {
      console.error("Survey submission error:", err);
      setError("Failed to submit survey. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    if (q.type === "single" || q.type === "energy" || q.type === "scale") {
      return answers[q.id] === undefined;
    }
    if (q.type === "multi") {
      return !answers[q.id] || answers[q.id].length === 0;
    }
    return false;
  };

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
              <div
                className="progress-fill"
                id="progressFill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-label">
              {current === 0 ? "" : `${current} of ${total}`}
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="screen">
          <div className="screen-inner" id="screenInner">
            {q.type === "intro" && (
              <div className="intro-screen">
                <div className="vela-wordmark">Vela</div>
                <div className="vela-tagline">
                  Circadian Intelligence for Cabin Crew
                </div>
                <div className="intro-body">
                  You spend your career flying across time zones.
                  <br />
                  This is 3 minutes that might change how you&rsquo;ll recover.
                </div>
                <div className="intro-sub">
                  We&rsquo;re building Vela — a fatigue management app built
                  specifically for long-haul crew. Before we ship, we want to
                  understand your world. Your responses shape what we build.
                </div>
                <div className="intro-time">
                  ⏱ Takes about 3 minutes · Completely anonymous
                </div>
                <button
                  className="cta"
                  onClick={goNext}
                  style={{
                    maxWidth: "320px",
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  Begin the survey →
                </button>
              </div>
            )}

            {q.type === "energy" && (
              <div>
                <div className="q-index">{q.index} / 09</div>
                <div className="q-text">{q.text}</div>
                <div className="q-sub">{q.sub}</div>
                <div className="energy-scale">
                  {(
                    q.options as Array<{ label: string; icon: string }>
                  ).map((o, i) => (
                    <div
                      key={i}
                      className={`energy-btn${
                        answers.energy === i ? " selected" : ""
                      }`}
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
                <div className="q-index">{q.index} / 09</div>
                <div className="q-text">{q.text}</div>
                {q.sub ? (
                  <div className="q-sub">{q.sub}</div>
                ) : (
                  <div style={{ marginBottom: "2rem" }}></div>
                )}
                <div className="options">
                  {(q.options as string[]).map((o, i) => (
                    <div
                      key={i}
                      className={`option${
                        answers[q.id] === i ? " selected" : ""
                      }`}
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
                <div className="q-index">{q.index} / 09</div>
                <div className="q-text">{q.text}</div>
                <div className="q-sub">{q.sub}</div>
                <div className="options">
                  {(q.options as string[]).map((o, i) => (
                    <div
                      key={i}
                      className={`option multi${
                        (answers[q.id] || []).includes(i) ? " selected" : ""
                      }`}
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
                <div className="q-index">{q.index} / 09</div>
                <div className="q-text">{q.text}</div>
                {q.sub ? (
                  <div className="q-sub">{q.sub}</div>
                ) : (
                  <div style={{ marginBottom: "2rem" }}></div>
                )}
                <div className="scale-wrap">
                  <div className="scale-labels">
                    <span>{q.scaleMin}</span>
                    <span>{q.scaleMax}</span>
                  </div>
                  <div className="scale-options">
                    {Array.from({ length: q.scale || 5 }, (_, i) => (
                      <div
                        key={i}
                        className={`scale-btn${
                          answers[q.id] === i + 1 ? " selected" : ""
                        }`}
                        onClick={() => selectScale(q.id, i + 1)}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {q.type === "email" && (
              <div className="email-screen">
                <div className="q-index">Final step</div>
                <div className="email-intro">
                  You&rsquo;re exactly who we&rsquo;re building this for.
                </div>
                <div className="email-sub">
                  Join the Vela waitlist and be first in line for beta access.
                  We&rsquo;ll send you one email when we&rsquo;re ready — nothing else.
                </div>
                {error && (
                  <div
                    style={{
                      marginBottom: "1rem",
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
                <div className="field-group">
                  <div className="field-wrap">
                    <div className="field-label">First name</div>
                    <input
                      className="text-input"
                      id="nameInput"
                      type="text"
                      placeholder="Your first name"
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="field-wrap">
                    <div className="field-label">Email address</div>
                    <input
                      className="text-input"
                      id="emailInput"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <button
                  className="cta"
                  id="submitBtn"
                  onClick={submitSurvey}
                  disabled={isSubmitting}
                  style={{ opacity: isSubmitting ? 0.5 : 1 }}
                >
                  {isSubmitting ? "Saving..." : "Claim my early access →"}
                </button>
                <div
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.72rem",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.05em",
                  }}
                  className="text-hint"
                >
                  No spam. Unsubscribe anytime.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <div
          className="nav"
          id="nav"
          style={{ display: q.type === "intro" || q.type === "email" ? "none" : "flex" }}
        >
          <button
            className="nav-back"
            onClick={goBack}
            style={{
              visibility: current === 0 || q.type === "intro" ? "hidden" : "visible",
            }}
          >
            <svg viewBox="0 0 16 16">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            Back
          </button>
          <button
            className="next-btn"
            onClick={goNext}
            disabled={isNextDisabled()}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
