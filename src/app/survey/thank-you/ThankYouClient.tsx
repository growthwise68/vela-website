"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * High-contrast copy on the site’s cream / parchment system (root layout),
 * not survey.css variables (those target navy-only surfaces).
 */
export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

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
    <div className="w-full max-w-lg mx-auto pb-8 -mt-4">
      <div className="mb-6 flex justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-gold"
          aria-hidden
        >
          <span className="text-2xl leading-none">✓</span>
        </div>
      </div>
      <h2 className="text-center font-display text-3xl font-light text-ink">Thank you.</h2>
      <p className="mt-3 text-center text-[15px] leading-relaxed text-inkMid">
        {
          "Your answers will help us improve Véla. We keep them confidential and do not use them to sell unrelated products or services."
        }
      </p>

      {rid && status !== "success" && (
        <div className="mt-8 rounded-[18px] border border-warmLine bg-parchment/90 p-6 shadow-sm">
          <p className="text-[0.9rem] leading-relaxed text-ink">
            <span className="font-medium text-ink">Optional waitlist.</span>{" "}
            {
              "What you shared in the survey is not published with your name. If you want a single email when the beta opens, add your details below — for the waitlist only. We will not use your address for other marketing. You can skip: your response is already saved."
            }
          </p>
          <form onSubmit={submitWaitlist} className="mt-5 space-y-4">
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
            {message && status === "error" && (
              <p className="text-sm text-coral">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-night py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-opacity hover:bg-nightMid disabled:opacity-50"
            >
              {status === "loading" ? "Saving…" : "Join the waitlist"}
            </button>
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.1em] text-inkFaint">
              One message when we are ready. Unsubscribe anytime.
            </p>
          </form>
        </div>
      )}

      {rid && status === "success" && (
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-gold">
          You are on the waitlist
        </p>
      )}

      {!rid && (
        <p className="mt-6 text-center text-sm text-inkMid">
          {
            "If you completed the survey, thank you. To join the waitlist later, use the Support page."
          }
        </p>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg border border-warmLine bg-cream/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-inkMid transition-colors hover:border-gold/50 hover:text-ink"
        >
          {rid && status !== "success" ? "Skip — back to Véla" : "Back to Véla"}
        </Link>
      </div>
    </div>
  );
}
