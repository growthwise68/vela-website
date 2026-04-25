"use client";

import Link from "next/link";
import { useEffect } from "react";
import "../survey.css";

export default function ThankYouPage() {
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

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
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
              <div
                className="progress-fill"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="progress-label">Complete</div>
          </div>
        </div>

        <div className="screen">
          <div className="screen-inner">
            <div className="thankyou">
              <div className="thankyou-mark">✓</div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: "300",
                marginBottom: "0.75rem",
                color: "var(--text-primary)"
              }}>Thank you.</h2>
              <p style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                lineHeight: "1.7",
                maxWidth: "460px",
                margin: "0 auto"
              }}>
                {
                  "Your responses will directly shape how Vela is built. You\u2019ll be among the first to experience what circadian intelligence looks like when it\u2019s designed specifically for crew life."
                }
              </p>
              <div className="waitlist-badge">Early Access Confirmed</div>
              <p style={{
                marginTop: "1.5rem",
                fontSize: "0.78rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
                color: "var(--text-hint)"
              }}>
                Watch for a message from the Vela team.
              </p>
              <Link
                href="/"
                style={{
                  marginTop: "2rem",
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
                  transition: "all 0.2s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(196,151,106,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "none";
                }}
              >
                Back to Vela
              </Link>
            </div>
          </div>
        </div>

        <div className="nav" style={{ visibility: "hidden" }}>
          <button className="nav-back">
            <svg viewBox="0 0 16 16">
              <polyline points="10,3 5,8 10,13" />
            </svg>
            Back
          </button>
          <button className="next-btn">Continue →</button>
        </div>
      </div>
    </div>
  );
}
