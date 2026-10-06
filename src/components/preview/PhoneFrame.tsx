"use client";

import { useState } from "react";

type Screen = {
  tab: string;
  title: string;
  body: string;
  chips: { label: string; tone: "navy" | "gold" | "sand" }[];
};

const screens: Screen[] = [
  {
    tab: "Departure",
    title: "The Departure",
    body: "Your report time is 02:00. Your body thinks it’s the middle of the night — because it is. VÉLA saw this coming three days ago.",
    chips: [
      { label: "Sleep", tone: "navy" },
      { label: "Flight", tone: "gold" },
      { label: "Rest", tone: "sand" },
    ],
  },
  {
    tab: "Layover",
    title: "The Layover",
    body: "30 hours in Melbourne. Your body clock is sitting somewhere over the Indian Ocean. VÉLA shows you when rest will help most, so you can actually use this layover.",
    chips: [
      { label: "Sleep", tone: "navy" },
      { label: "Flight", tone: "gold" },
      { label: "Rest", tone: "sand" },
    ],
  },
  {
    tab: "Return",
    title: "The Return",
    body: "You’re home. Your days off start now. VÉLA shows you why the first 24 hours matter most — and what to do with them.",
    chips: [
      { label: "Sleep", tone: "navy" },
      { label: "Flight", tone: "gold" },
      { label: "Rest", tone: "sand" },
    ],
  },
];

const chipClasses: Record<Screen["chips"][number]["tone"], string> = {
  navy: "bg-night text-cream",
  gold: "bg-gold text-ink",
  sand: "bg-warmMid text-inkMid",
};

export function PhoneFrame() {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  return (
    <div className="flex flex-col items-center">
      {/* Phone — ink bezel (not navy) with a gold rim, so it reads as a
          distinct object against the section's navy background */}
      <div className="relative w-[280px] rounded-[2.5rem] border-[6px] border-ink bg-ink p-2 ring-1 ring-gold/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-20 h-5 rounded-full bg-ink z-10" />
        <div className="rounded-[2rem] bg-cream overflow-hidden min-h-[400px] flex flex-col">
          <div className="px-5 pt-9 pb-4 border-b border-warmLine">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold font-semibold">
              Tonight&rsquo;s plan
            </p>
          </div>
          <div className="flex-1 px-5 py-6 flex flex-col justify-center">
            <h3 className="font-display text-2xl font-light text-ink mb-3 leading-snug">
              {screen.title}
            </h3>
            <p className="font-sans text-sm text-inkMid leading-relaxed mb-5">{screen.body}</p>
            <div className="flex gap-2 flex-wrap">
              {screen.chips.map((chip) => (
                <span
                  key={chip.label}
                  className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] ${chipClasses[chip.tone]}`}
                >
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mt-6" role="tablist" aria-label="Trip stage">
        {screens.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-4 py-2 min-h-11 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
              i === active
                ? "bg-gold text-ink font-semibold"
                : "border border-cream/25 text-cream/70 hover:border-gold hover:text-gold"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
