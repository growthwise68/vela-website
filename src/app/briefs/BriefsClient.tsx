"use client";

import { useState } from "react";

export default function BriefsClient() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/subscribe-briefs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong. Please try again.");
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
    <div className="w-full pb-8">

      {/* Hero */}
      <div className="mx-auto max-w-xl py-10 text-center">
        <span className="block text-2xl text-gold mb-6">★</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-5">
          Véla Recovery Briefs
        </p>
        <h1 className="font-display text-4xl sm:text-[2.8rem] font-light text-ink leading-tight mb-5">
          Everything we know.<br />Yours to keep.
        </h1>
        <p className="text-[15px] leading-relaxed text-inkMid">
          Short, practical guides for the exact moments this job tests you the most — a 2am wake-up,
          a four-sector day, a red-eye that never quite ends. Free to download, no strings attached.
        </p>
      </div>

      {/* Signup band */}
      <div className="rounded-[18px] bg-night px-8 py-10 text-center mb-12">
        <h2 className="font-display text-2xl font-light text-cream mb-2" style={{ fontStyle: "italic" }}>
          Get the next one first.
        </h2>
        <p className="text-[13.5px] text-cream/50 mb-7 max-w-sm mx-auto leading-relaxed">
          New Recovery Briefs land here first. Drop your email and we&rsquo;ll send each one the
          moment it&rsquo;s ready — nothing else.
        </p>

        {status === "success" ? (
          <p className="font-display text-[1.1rem] text-gold/90 py-2" style={{ fontStyle: "italic" }}>
            You&rsquo;re in. First to know, every time.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 max-w-md mx-auto sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              disabled={status === "loading"}
              className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 outline-none focus:border-gold/60 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-gold px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink transition-opacity hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "…" : "Notify me"}
            </button>
          </form>
        )}

        {message && status === "error" && (
          <p className="mt-3 text-sm text-coral">{message}</p>
        )}

        {status !== "success" && (
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-cream/25">
            No spam. Unsubscribe anytime. Built by crew, for crew.
          </p>
        )}
      </div>

      {/* Briefs list */}
      <div>
        <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
          Available now
        </p>

        {/* Brief 001 */}
        <div className="mb-5 rounded-[18px] border border-warmLine bg-parchment/60 px-6 py-6 sm:px-8 sm:py-7 transition-colors hover:border-gold/50">
          <div className="sm:flex sm:items-center sm:gap-6">
            <span className="block font-display text-3xl font-light text-gold mb-2 sm:mb-0 sm:w-12 sm:flex-shrink-0">001</span>
            <div className="sm:flex-1 sm:min-w-0">
              <h3 className="mb-1 font-display text-xl font-medium text-ink">
                Preparing for a 2am Wake-Up
              </h3>
              <p className="text-[13.5px] leading-relaxed text-inkMid">
                A full 24-hour plan for the earliest, hardest reports — what to do the day before,
                the moment you wake, and how to protect the rest of your trip.
              </p>
            </div>
            <a
              href="/downloads/vela-recovery-brief-001-2am-wakeup.pdf"
              download
              className="mt-4 block text-center sm:mt-0 sm:flex-shrink-0 rounded-xl bg-night px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-gold hover:text-ink sm:whitespace-nowrap"
            >
              Download PDF
            </a>
          </div>
        </div>

        {/* Brief 002 — Coming soon */}
        <div className="rounded-[18px] border border-dashed border-warmLine px-6 py-6 sm:px-8 sm:py-7 opacity-50">
          <div className="sm:flex sm:items-center sm:gap-6">
            <span className="block font-display text-3xl font-light text-gold mb-2 sm:mb-0 sm:w-12 sm:flex-shrink-0">002</span>
            <div className="sm:flex-1 sm:min-w-0">
              <h3 className="mb-1 font-display text-xl font-medium text-ink">Coming soon</h3>
              <p className="text-[13.5px] leading-relaxed text-inkMid">
                Sign up above to be the first to know when the next brief lands.
              </p>
            </div>
            <span className="mt-4 block text-center sm:mt-0 sm:flex-shrink-0 rounded-xl border border-warmLine px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-inkFaint sm:whitespace-nowrap">
              Not yet available
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
