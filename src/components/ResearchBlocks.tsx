"use client";

import { useEffect, useState } from "react";

/**
 * On mount, if the page's URL hash matches one of the given accordion
 * ids, forces that <details> open so the content a visitor landed on is
 * actually visible (a closed <details> still gets the browser's native
 * anchor scroll, but its content stays hidden unless opened).
 */
export function AutoOpenFromHash({ ids }: { ids: string[] }) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!ids.includes(hash)) return;
    const el = document.getElementById(hash);
    if (el instanceof HTMLDetailsElement) {
      el.open = true;
      el.scrollIntoView({ block: "start" });
    }
  }, [ids]);
  return null;
}

export function StatCard({
  value,
  label,
  href,
}: {
  value: string;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-xl border-l-4 border-gold bg-parchment/60 px-4 py-4 hover:bg-parchment transition-colors"
    >
      <p className="font-display text-3xl md:text-4xl font-light text-ink">{value}</p>
      <p className="font-sans text-[15px] leading-snug text-ink mt-1">{label}</p>
    </a>
  );
}

export function CopyAnchorButton({ anchorId }: { anchorId: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable — silently ignore
        }
      }}
      aria-label="Copy link to this finding"
      className="not-prose inline-flex items-center align-middle ml-2 text-gold opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
    >
      {copied ? (
        <span className="font-mono text-xs uppercase tracking-[0.1em]">Copied</span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
          <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5" />
        </svg>
      )}
    </button>
  );
}

export function CitationBox({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="not-prose rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-3">
        Citation
      </p>
      <p className="font-mono text-sm text-ink leading-relaxed select-all mb-4">{text}</p>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // clipboard unavailable — silently ignore
          }
        }}
        className="inline-block rounded-lg border border-gold px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-gold hover:bg-gold hover:text-ink transition-colors"
      >
        {copied ? "Copied" : "Copy citation"}
      </button>
    </div>
  );
}

function Bar({
  n,
  pct,
  highlighted,
}: {
  n: number;
  pct: number;
  highlighted: boolean;
}) {
  return (
    <div className="relative h-7 rounded bg-ink/[0.04] overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 rounded ${highlighted ? "bg-gold" : "bg-gold/50"}`}
        style={{ width: `${pct}%` }}
      />
      <span className="absolute inset-y-0 right-2 flex items-center font-mono text-sm text-ink">
        {n} · {pct}%
      </span>
    </div>
  );
}

export function ResultTable({
  options,
  total,
  highlight = [],
  multi,
  caption,
}: {
  options: { label: string; n: number }[];
  total: number;
  highlight?: string[];
  multi?: boolean;
  caption?: string;
}) {
  return (
    <div className="not-prose overflow-x-auto mt-4 mb-2">
      <table className="w-full border-collapse">
        {caption && (
          <caption className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mb-3 text-left">
            {caption}
          </caption>
        )}
        <thead className="sr-only">
          <tr>
            <th>Answer</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          {options.map((o, i) => {
            const pct = multi
              ? Math.min(Math.round((o.n / total) * 100), 100)
              : Math.round((o.n / total) * 100);
            return (
              <tr
                key={o.label}
                className={`block md:table-row mb-4 md:mb-0 last:mb-0 ${
                  i > 0 ? "md:border-t md:border-ink/10" : ""
                }`}
              >
                <td className="block md:table-cell md:w-2/5 md:pr-4 md:py-3 md:align-middle pb-1 font-sans text-sm text-ink leading-snug">
                  {o.label}
                </td>
                <td className="block md:table-cell md:w-3/5 md:py-3 md:align-middle pb-2">
                  <Bar n={o.n} pct={pct} highlighted={highlight.includes(o.label)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
