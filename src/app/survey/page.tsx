"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SURVEY_QUESTIONS, runningEmptyIndexToEnergyLegacy } from "./questions";
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

    const roIdx = answers.running_on_empty as number;
    const surveyData = {
      energy: runningEmptyIndexToEnergyLegacy(typeof roIdx === "number" ? roIdx : 0),
      route_type: "Not collected — survey v2",
      timezone_crossings: "Not collected — survey v2",
      recovery_time: getLabel("recovery_after_haul", answers.recovery_after_haul as number),
      coping_strategies: getLabels("tools_issue", (answers.tools_issue as number[]) || []),
      app_utility: (answers.tiredness_worry as number) || 0,
      willingness_to_pay: "Not collected — survey v2",
      email: null as string | null,
      name: null as string | null,
      answers: {
        survey_version: "15q_v2",
        running_on_empty: getLabel("running_on_empty", answers.running_on_empty as number),
        leaving_job: getLabel("leaving_job", answers.leaving_job as number),
        airline_acknowledgment: getLabel(
          "airline_acknowledgment",
          answers.airline_acknowledgment as number
        ),
        wrong_moment_fatigue: getLabel(
          "wrong_moment_fatigue",
          answers.wrong_moment_fatigue as number
        ),
        tiredness_episodes_month: getLabel(
          "tiredness_episodes_month",
          answers.tiredness_episodes_month as number
        ),
        tiredness_worry: (answers.tiredness_worry as number) || 0,
        recovery_after_haul: getLabel("recovery_after_haul", answers.recovery_after_haul as number),
        bodyclock_tz: getLabel("bodyclock_tz", answers.bodyclock_tz as number),
        roster_planning: getLabel("roster_planning", answers.roster_planning as number),
        roster_heads_up_use: getLabel("roster_heads_up_use", answers.roster_heads_up_use as number),
        tools_issue: getLabels("tools_issue", (answers.tools_issue as number[]) || []),
        job_taken_from_life: String(answers.job_taken_from_life || "").trim(),
        one_thing_energy_help: String(answers.one_thing_energy_help || "").trim(),
        role: getLabel("role", answers.role as number),
        experience: getLabel("experience", answers.experience as number),
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
    if (q.type === "opentext") {
      return String(answers[q.id] || "").trim().length === 0;
    }
    if (q.type === "single" || q.type === "scale") {
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
                <div className="vela-tagline">By crew, for crew.</div>
                <div className="intro-body">
                  Three minutes. Your experience. Our blueprint.
                </div>
                <div className="intro-sub">
                  {"Your roster. Your patterns. Your experience of what this job really does to you. That\u2019s what we\u2019re building from.\n\nNo one has ever put crew at the centre of something like this. Every answer you give goes directly into what Véla becomes — and stays completely anonymous."}
                </div>
                <div className="intro-time">⏱ About 3 minutes · Anonymous</div>
                <button
                  className="cta"
                  onClick={goNext}
                  style={{ maxWidth: "320px", margin: "0 auto", display: "block" }}
                >
                  Add your voice →
                </button>
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
                  placeholder={
                    q.id === "job_taken_from_life"
                      ? "Share as much as you\u2019re comfortable with\u2026"
                      : "One sentence is enough\u2026"
                  }
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
