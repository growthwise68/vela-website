"use client";

import { useState } from "react";
import Link from "next/link";
import { FullBleed } from "@/components/FullBleed";

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
    <div className="w-full">
      {/* Hero */}
      <FullBleed className="pt-16 md:pt-20 pb-10 md:pb-14 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <span className="block text-2xl text-gold mb-6">★</span>
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-5">
            VÉLA Recovery Briefs
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-ink leading-tight mb-5">
            Everything we know.
            <br />
            Yours to keep.
          </h1>
          <p className="font-sans text-base leading-relaxed text-inkMid">
            Short, practical guides for the exact moments this job tests you the most — a 2am wake-up,
            a four-sector day, a red-eye that never quite ends. Free to download, no strings attached.
          </p>
        </div>
      </FullBleed>

      {/* Signup band — navy */}
      <FullBleed className="py-14 md:py-20 bg-night">
        <div className="max-w-xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl italic font-light text-cream mb-3">
            Get the next one first.
          </h2>
          <p className="font-sans text-sm text-cream/60 mb-8 max-w-sm mx-auto leading-relaxed">
            New Recovery Briefs land here first. Drop your email and we&rsquo;ll send each one the
            moment it&rsquo;s ready — nothing else.
          </p>

          {status === "success" ? (
            <p className="font-display text-xl italic text-gold py-2">
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
                className="rounded-xl bg-gold px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
              >
                {status === "loading" ? "…" : "Notify me"}
              </button>
            </form>
          )}

          {message && status === "error" && <p className="mt-3 text-sm text-coral">{message}</p>}

          {status !== "success" && (
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.15em] text-cream/40">
              No spam. Unsubscribe anytime. Built by crew, for crew.
            </p>
          )}
        </div>
      </FullBleed>

      {/* Briefs list — cards styled like PDF covers: navy, gold mono number, cream serif title */}
      <FullBleed className="py-14 md:py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
            Available now
          </p>

          <div className="space-y-5">
            {/* Brief 001 */}
            <Link
              href="/briefs/2am-wake-up"
              className="group block rounded-[18px] bg-night px-6 py-6 sm:px-8 sm:py-7 border-2 border-transparent hover:border-gold transition-colors"
            >
              <div className="sm:flex sm:items-center sm:gap-6">
                <span className="block font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2 sm:mb-0 sm:w-24 sm:flex-shrink-0">
                  Brief 001
                </span>
                <div className="sm:flex-1 sm:min-w-0">
                  <h3 className="mb-1 font-display text-xl md:text-2xl font-light text-cream group-hover:text-gold transition-colors">
                    Preparing for a 2am Wake-Up
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-cream/60">
                    A full 24-hour plan for the earliest, hardest reports — what to do the day before,
                    the moment you wake, and how to protect the rest of your trip.
                  </p>
                </div>
                <span className="mt-4 block text-center sm:mt-0 sm:flex-shrink-0 rounded-xl border border-gold/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:whitespace-nowrap">
                  Read brief
                </span>
              </div>
            </Link>
            <a
              href="/downloads/vela-recovery-brief-001-2am-wakeup.pdf"
              download
              className="block text-center font-mono text-[10px] uppercase tracking-[0.12em] text-inkFaint underline underline-offset-2 hover:text-gold transition-colors -mt-2"
            >
              Download Brief 001 as a PDF
            </a>

            {/* Brief 002 */}
            <Link
              href="/briefs/eating-across-time-zones"
              className="group block rounded-[18px] bg-night px-6 py-6 sm:px-8 sm:py-7 border-2 border-transparent hover:border-gold transition-colors mt-5"
            >
              <div className="sm:flex sm:items-center sm:gap-6">
                <span className="block font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2 sm:mb-0 sm:w-24 sm:flex-shrink-0">
                  Brief 002
                </span>
                <div className="sm:flex-1 sm:min-w-0">
                  <h3 className="mb-1 font-display text-xl md:text-2xl font-light text-cream group-hover:text-gold transition-colors">
                    Eating Across Time Zones
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-cream/60">
                    Why bloating, cramping, and mismatched appetite happen on trips — and simple,
                    evidence-backed ways to keep your gut on schedule, wherever you&rsquo;re flying.
                  </p>
                </div>
                <span className="mt-4 block text-center sm:mt-0 sm:flex-shrink-0 rounded-xl border border-gold/50 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-gold sm:whitespace-nowrap">
                  Read brief
                </span>
              </div>
            </Link>
            <a
              href="/downloads/vela-recovery-brief-002-eating-across-time-zones.pdf"
              download
              className="block text-center font-mono text-[10px] uppercase tracking-[0.12em] text-inkFaint underline underline-offset-2 hover:text-gold transition-colors -mt-2"
            >
              Download Brief 002 as a PDF
            </a>
          </div>

          {/* Research link */}
          <div className="mt-10 pt-6 border-t border-warmLine text-center">
            <Link
              href="/research/crew-fatigue-survey-2026"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint hover:text-gold transition-colors"
            >
              Read what 93 crew told us &rarr;
            </Link>
          </div>

          {/* Brief 003 — Coming soon, sand outline */}
          <div className="mt-5 rounded-[18px] border-2 border-dashed border-warmLine bg-parchment/40 px-6 py-6 sm:px-8 sm:py-7">
            <div className="sm:flex sm:items-center sm:gap-6">
              <span className="block font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mb-2 sm:mb-0 sm:w-24 sm:flex-shrink-0">
                Brief 003
              </span>
              <div className="sm:flex-1 sm:min-w-0">
                <h3 className="mb-1 font-display text-xl md:text-2xl font-light text-ink">Coming soon</h3>
                <p className="font-sans text-sm leading-relaxed text-inkMid">
                  Sign up above to be the first to know when the next brief lands.
                </p>
              </div>
              <span className="mt-4 block text-center sm:mt-0 sm:flex-shrink-0 rounded-xl border border-warmLine px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-inkFaint sm:whitespace-nowrap">
                Not yet available
              </span>
            </div>
          </div>
        </div>
      </FullBleed>
    </div>
  );
}
