"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SURVEY_QUESTIONS } from "./questions";
import "./survey.css";

const questions = SURVEY_QUESTIONS;

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
        energy_label: energyLabels[answers.energy as number] ?? "Not specified",
        rested: getLabel("rested", answers.rested as number),
        bodyclock: getLabel("bodyclock", answers.bodyclock as number),
        personal_life: getLabel("personal_life", answers.personal_life as number),
        roster_planning: getLabel("roster_planning", answers.roster_planning as number),
        helpful_features: getLabels("helpful_features", (answers.helpful_features as number[]) || []),
        crew_trust: getLabel("crew_trust", answers.crew_trust as number),
        survey_version: "15q_v1",
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
            Véla
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
                <div className="vela-wordmark">Véla</div>
                <div className="vela-tagline">Circadian Intelligence for Cabin Crew</div>
                <div className="intro-body">
                  You spend your career flying across time zones.
                  <br />
                  About 3 minutes to help us build something designed around your world.
                </div>
                <div className="intro-sub">
                  {
                    "We\u2019re building Véla — a lifestyle and wellness companion for long-haul crew, rooted in how you actually work and rest. " +
                    "To ensure we can help you, we need to understand your world. Your responses stay anonymous and shape what we build."
                  }
                </div>
                <div className="intro-time">⏱ About 3 minutes · Anonymous</div>
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
