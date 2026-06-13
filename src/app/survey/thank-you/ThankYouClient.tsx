"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { THANK_YOU_COPY as copy } from "./thank-you-copy";

/**
 * High-contrast copy on the site’s cream / parchment system (root layout),
 * not survey.css variables (those target navy-only surfaces).
 *
 * Strings live in `./thank-you-copy.ts` (v1 preserved; active bundle switched there).
 */
export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [airline, setAirline] = useState("");
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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseId: rid,
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
      <h2 className="text-center font-display text-3xl font-light text-ink">{copy.heading}</h2>
      {copy.leadParagraphs.map((paragraph, i) => (
        <p
          key={i}
          className={`text-center text-[15px] leading-relaxed text-inkMid ${i === 0 ? "mt-3" : "mt-4"}`}
        >
          {paragraph}
        </p>
      ))}

      {copy.legalLine && (
        <p className="mt-4 text-center text-[15px] leading-relaxed text-inkMid">
          {copy.legalLine.before}
          <Link
            href="/privacy"
            className="text-ink underline decoration-warmLine underline-offset-[5px] transition-colors hover:text-gold hover:decoration-gold/50"
          >
            {copy.legalLine.privacyLinkText}
          </Link>
          {copy.legalLine.middle}
          <Link
            href="/terms"
            className="text-ink underline decoration-warmLine underline-offset-[5px] transition-colors hover:text-gold hover:decoration-gold/50"
          >
            {copy.legalLine.termsLinkText}
          </Link>
          {copy.legalLine.after}
        </p>
      )}

      {rid && status !== "success" && (
        <div className="mt-8 rounded-[18px] border border-warmLine bg-parchment/90 p-6 shadow-sm">
          {copy.waitlistTitle && (
            <h3 className="text-center font-display text-xl font-light text-ink">{copy.waitlistTitle}</h3>
          )}
          <p
            className={`text-[0.9rem] leading-relaxed text-ink ${copy.waitlistTitle ? "mt-3 text-center" : ""}`}
          >
            {copy.waitlistLead}
          </p>
          <form onSubmit={submitWaitlist} className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                {copy.labels.firstName}
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.placeholders.firstName}
                autoComplete="given-name"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                {copy.labels.email}
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholders.email}
                autoComplete="email"
                disabled={status === "loading"}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
                {copy.labels.airlineOptional}{" "}
                <span className="font-sans normal-case tracking-normal text-inkFaint/90">(optional)</span>
              </label>
              <input
                className="w-full rounded-xl border border-warmLine bg-cream px-3 py-2.5 text-ink placeholder:text-inkFaint/80 outline-none focus:border-gold/60"
                type="text"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                placeholder={copy.placeholders.airline}
                autoComplete="organization"
                disabled={status === "loading"}
              />
              <p className="mt-2 text-[0.8rem] leading-snug text-inkMid">{copy.airlineHelper}</p>
            </div>
            {message && status === "error" && <p className="text-sm text-coral">{message}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-night py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-opacity hover:bg-nightMid disabled:opacity-50"
            >
              {status === "loading" ? copy.submitLoading : copy.submitButton}
            </button>
            <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.1em] text-inkFaint">
              {copy.formFooter}
            </p>
          </form>
        </div>
      )}

      {rid && status === "success" && (
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-gold">
          {copy.successLine}
        </p>
      )}

      {!rid && (
        <p className="mt-6 text-center text-sm text-inkMid">{copy.noRidMessage}</p>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg border border-warmLine bg-cream/50 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-inkMid transition-colors hover:border-gold/50 hover:text-ink"
        >
          {rid && status !== "success" ? copy.linkSkip : copy.linkBack}
        </Link>
      </div>
    </div>
  );
}
