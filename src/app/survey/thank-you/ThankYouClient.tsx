"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../survey.css";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const container = document.getElementById("stars");
    if (!container || container.childElementCount > 0) return;
    for (let i = 0; i < 90; i++) {
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
  }, []);

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rid) return;
    if (!email.trim() || !email.includes("@")) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }
    if (!name.trim()) {
      setMessage("Please enter your first name.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/survey/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseId: rid,
          email: email.trim(),
          name: name.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", overflowY: "auto" }}>
      <div className="stars" id="stars"></div>
      <div className="arc-bg"></div>

      <div className="shell">
        <div className="header" style={{ visibility: "hidden" }}>
          <div className="logo">
            Vela
            <span>Circadian Intelligence</span>
          </div>
          <div className="progress-wrap" style={{ maxWidth: "220px" }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>
            <div className="progress-label">Complete</div>
          </div>
        </div>

        <div className="screen">
          <div className="screen-inner">
            <div className="thankyou" style={{ maxWidth: "480px", margin: "0 auto" }}>
              <div className="thankyou-mark">✓</div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2rem",
                  fontWeight: "300",
                  marginBottom: "0.75rem",
                  color: "var(--text-primary)",
                }}
              >
                Thank you.
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  margin: "0 auto 1.5rem",
                }}
              >
                {
                  "Your responses will directly shape how Vela is built. They are stored to help us improve the product — not published with your name on the open web."
                }
              </p>

              {rid && status !== "success" && (
                <div
                  style={{
                    textAlign: "left",
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(196,151,106,0.25)",
                    background: "rgba(26,37,64,0.35)",
                    marginBottom: "1.25rem",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--text-secondary)",
                      lineHeight: "1.65",
                      marginBottom: "1rem",
                    }}
                  >
                    <strong style={{ color: "var(--text-primary)" }}>Waitlist (optional).</strong>{" "}
                    {
                      "The answers you already gave are not tied to your name in any public way. If you want one email when the beta opens, add your details below — for the waitlist only. We will not use your email for unrelated marketing. You can skip this; your survey is already saved."
                    }
                  </p>
                  <form onSubmit={submitWaitlist}>
                    <div className="field-wrap" style={{ marginBottom: "0.75rem" }}>
                      <div className="field-label">First name</div>
                      <input
                        className="text-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your first name"
                        autoComplete="given-name"
                        disabled={status === "loading"}
                      />
                    </div>
                    <div className="field-wrap" style={{ marginBottom: "0.75rem" }}>
                      <div className="field-label">Email</div>
                      <input
                        className="text-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        disabled={status === "loading"}
                      />
                    </div>
                    {message && status === "error" && (
                      <p style={{ color: "#ff6b6b", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                        {message}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="cta"
                      disabled={status === "loading"}
                      style={{
                        width: "100%",
                        opacity: status === "loading" ? 0.6 : 1,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {status === "loading" ? "Saving…" : "Join the waitlist"}
                    </button>
                    <p
                      style={{
                        fontSize: "0.68rem",
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.06em",
                        color: "var(--text-hint)",
                        textAlign: "center",
                        margin: 0,
                      }}
                    >
                      One message when we are ready. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}

              {rid && status === "success" && (
                <div className="waitlist-badge" style={{ marginBottom: "1rem" }}>
                  You are on the waitlist
                </div>
              )}

              {!rid && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--text-hint)",
                    lineHeight: "1.6",
                    marginBottom: "1.25rem",
                  }}
                >
                  {
                    "If you completed the survey in this session, your answers are still with us. To join the waitlist later, contact us via the Support page."
                  }
                </p>
              )}

              <Link
                href="/"
                style={{
                  marginTop: "0.5rem",
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  background: "none",
                  border: "1px solid rgba(196,151,106,0.5)",
                  borderRadius: "6px",
                  color: "var(--amber-light)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.08em",
                }}
              >
                {rid && status !== "success" ? "Skip — back to Vela" : "Back to Vela"}
              </Link>
            </div>
          </div>
        </div>

        <div className="nav" style={{ visibility: "hidden" }}>
          <button className="nav-back" type="button">
            Back
          </button>
          <button className="next-btn" type="button">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
