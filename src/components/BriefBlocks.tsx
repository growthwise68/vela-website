"use client";

import { useState } from "react";

export function TimelineTrack({
  items,
}: {
  items: { time: string; label: string; href: string }[];
}) {
  return (
    <ol className="not-prose mt-3 mb-6 flex flex-col gap-3 md:grid md:grid-cols-5 md:gap-x-3 md:gap-y-6">
      {items.map((item) => (
        <li key={item.time} className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-0">
          <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0 md:mb-2" />
          <a href={item.href} className="group flex items-baseline gap-3 md:flex-col md:items-start md:gap-0">
            <time className="font-mono text-[11px] uppercase tracking-[0.1em] text-gold flex-shrink-0 w-12 md:w-auto group-hover:underline">
              {item.time}
            </time>
            <span className="font-sans text-sm md:text-xs leading-snug text-inkMid group-hover:text-gold transition-colors">
              {item.label}
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function CrewNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose relative rounded-[10px] border border-warmLine bg-parchment/80 px-6 py-5 my-8 shadow-sm md:-rotate-1">
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold shadow-sm" />
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">
        ✈ Crew note
      </p>
      <div className="font-sans text-[15px] leading-relaxed text-inkMid">{children}</div>
    </aside>
  );
}

export function BoardingPassCard({
  from,
  to,
  detail,
  children,
}: {
  from: string;
  to: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose rounded-xl border border-warmLine bg-parchment/70 overflow-hidden my-8">
      <div className="flex items-center justify-between px-6 py-5 gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint mb-1">Home</p>
          <p className="font-display text-3xl text-ink">{from}</p>
        </div>
        <div className="flex-1 border-t-2 border-dashed border-gold/50 relative">
          <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 text-gold text-sm">
            &#9992;
          </span>
        </div>
        <div className="text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint mb-1">To</p>
          <p className="font-display text-3xl text-ink">{to}</p>
        </div>
      </div>
      <div className="border-t border-dashed border-warmLine px-6 py-4 bg-cream/60">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-3">{detail}</p>
        <div className="font-sans text-[15px] leading-relaxed text-inkMid">{children}</div>
      </div>
    </div>
  );
}

export function ChecklistScore({
  items,
  bands,
}: {
  items: string[];
  bands: { label: string; min: number; max: number; text: string }[];
}) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const score = checked.filter(Boolean).length;

  return (
    <div className="not-prose">
      <ul className="space-y-2 mb-6">
        {items.map((item, i) => (
          <li key={item}>
            <label className="flex items-center gap-3 font-sans text-[15px] text-inkMid cursor-pointer">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() =>
                  setChecked((prev) => prev.map((c, idx) => (idx === i ? !c : c)))
                }
                className="w-4 h-4 accent-gold flex-shrink-0"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>

      <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-4">
        Score: {score} / {items.length}
      </p>

      <div className="space-y-2">
        {bands.map((band) => {
          const active = score >= band.min && score <= band.max;
          return (
            <p
              key={band.label}
              className={`font-sans text-[15px] leading-relaxed rounded-lg px-3 py-2 transition-colors ${
                active ? "bg-goldPale text-ink" : "text-inkMid"
              }`}
            >
              <strong>{band.label}:</strong> {band.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
