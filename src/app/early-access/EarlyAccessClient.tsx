"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function EarlyAccessClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [airline, setAirline] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          airline: airline.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setTimeout(() => router.push("/"), 1800);
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-8 -mt-4">
      <div className="mb-6 flex justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-gold"
          aria-hidden
        >
          <span className="text-2xl leading-none">✦</span>
        </div>
      </div>

      <h2 className="text-center font-display text-3xl font-light text-ink">
        Be the first to fly with VÉLA.
      </h2>
      <p className="mt-3 text-center text-[15px] leading-relaxed text-inkMid">
        VÉLA is built by crew, for crew — a personal tool that reads your roster and shows you what
        your body clock will be doing, duty by duty.
      </p>
      <p className="mt-4 text-center text-[15px] leading-relaxed text-inkMid">
        Add your details below and we&rsquo;ll bring you along as this gets built. A few emails from
        the crew member behind VÉLA, and a front-row seat when it&rsquo;s ready.
      </p>

      {status !== "success" && (
        <div className="mt-8 rounded-[18px] border border-warmLine bg-parchment/90 p-6 shadow-sm">
          <h3 className="text-center font-display text-xl font-light text-ink">
            Get early access.
          </h3>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                First name
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                autoComplete="given-name"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                Email
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                Airline{" "}
                <span className="font-sans normal-case tracking-normal text-inkFaint/90">(optional)</span>
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="text"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                placeholder="e.g. Emirates, United, Qantas"
                autoComplete="organization"
                disabled={status === "loading"}
              />
              <p className="mt-2 text-[0.8rem] leading-snug text-inkMid">
                If you tell us, we can let you know when VÉLA adds features relevant to your airline.
              </p>
            </div>
            {message && status === "error" && (
              <p className="text-sm text-coral">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-night py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-opacity hover:bg-nightMid disabled:opacity-50"
            >
              {status === "loading" ? "Saving…" : "Let me know"}
            </button>
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.1em] text-inkFaint">
              Unsubscribe anytime.
            </p>
          </form>
        </div>
      )}

      {status === "success" && (
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-gold">
          You are on the list — taking you home
        </p>
      )}

      {/* Additional info sections */}
      <div className="mt-16 space-y-10 border-t border-warmLine pt-12">
        <section>
          <h2 className="font-display text-2xl font-light text-ink mb-3">What is V&Eacute;LA?</h2>
          <p className="font-sans text-base text-inkMid leading-relaxed">
            V&Eacute;LA is a body-clock planning app for long-haul cabin crew. It turns your roster into a
            personalised body-clock plan, with sleep, light, caffeine and meal timing for every duty,
            layover and day off.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-ink mb-4">What you get when you join</h2>
          <ul className="space-y-4">
            {[
              { label: "First access at launch.", body: "You'll hear the moment VÉLA opens, before it's available to everyone." },
              { label: "Founding Crew pricing.", body: "$99.99 a year instead of $179.99, locked in for as long as you stay subscribed. Available until VÉLA opens to everyone, then it's gone." },
              { label: "A 14-day free trial.", body: "Try it on your real roster before you pay anything." },
              { label: "A few emails while you wait.", body: "How your body clock actually works, and what crew told us about fatigue. No spam, unsubscribe anytime." },
            ].map(({ label, body }) => (
              <li key={label} className="flex gap-3 items-baseline">
                <span className="text-gold font-mono text-xs flex-shrink-0">—</span>
                <span className="font-sans text-base text-inkMid leading-relaxed">
                  <strong className="font-medium text-ink">{label}</strong>{" "}{body}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-ink mb-3">What happens next</h2>
          <p className="font-sans text-base text-inkMid leading-relaxed">
            Join the list now. When V&Eacute;LA opens, you&rsquo;ll get an email with everything you need
            to start: download the app, add your next few duties with the date and flight number, and
            see your first plan.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-light text-ink mb-3">Built by crew, for crew</h2>
          <p className="font-sans text-base text-inkMid leading-relaxed mb-6">
            V&Eacute;LA is independent of any airline. You only ever enter dates and flight numbers, and
            your data stays private to your account.
          </p>
          <div className="flex flex-wrap gap-4 font-sans text-sm">
            <Link href="/how-vela-works" className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              How V&Eacute;LA works &rarr;
            </Link>
            <Link href="/research/crew-fatigue-survey-2026" className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              Read what 93 crew told us &rarr;
            </Link>
            <Link href="/pricing" className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              See pricing &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
