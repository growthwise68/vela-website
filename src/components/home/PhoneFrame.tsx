"use client";

import { useState } from "react";

type Screen = {
  tab: string;
  context: string;
  title: string;
  note: string;
};

const screens: Screen[] = [
  {
    tab: "Departure",
    context: "LHR → SIN · Day 1",
    title: "The Departure",
    note: "Your report time is 02:00. Your body thinks it’s the middle of the night — because it is. VÉLA saw this coming three days ago.",
  },
  {
    tab: "Layover",
    context: "MEL layover · Day 2",
    title: "The Layover",
    note: "30 hours in Melbourne. Your body clock is sitting somewhere over the Indian Ocean. VÉLA shows you when rest will help most, so you can actually use this layover.",
  },
  {
    tab: "Return",
    context: "Home · Day 1 off",
    title: "The Return",
    note: "You’re home. Your days off start now. VÉLA shows you why the first 24 hours matter most — and what to do with them.",
  },
];

// Reuses times that already appear elsewhere on the page (Sleep Timing,
// Light Exposure and the Flying East card), so the app screen and the
// page copy stay consistent rather than inventing a second set of numbers.
const planRows = [
  { label: "Sleep window", value: "22:00–06:00" },
  { label: "Light", value: "08:00" },
  { label: "Caffeine cut-off", value: "14:00" },
  { label: "Recovery priority", value: "Sleep first" },
];

export function PhoneFrame() {
  const [active, setActive] = useState(0);
  const screen = screens[active];

  return (
    <div className="flex flex-col items-center">
      {/* Phone — near-black navy bezel (darker than the section's own
          night background) with a gold rim, so it reads as a distinct
          physical object rather than blending into the section */}
      <div className="relative w-[300px] rounded-[2.5rem] border-[6px] border-navy bg-navy p-2 ring-1 ring-gold/30 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-20 h-5 rounded-full bg-navy z-10" />
        <div className="rounded-[2rem] bg-cream overflow-hidden flex flex-col">
          <div className="px-5 pt-8 pb-4 border-b border-warmLine">
            <p className="font-mono text-[13px] uppercase tracking-[0.15em] text-gold font-semibold mb-1">
              Tonight&rsquo;s plan
            </p>
            <p className="font-mono text-[13px] text-inkFaint">{screen.context}</p>
          </div>

          <div className="px-5 py-5">
            <h3 className="font-display text-xl font-light text-ink mb-4 leading-snug">
              {screen.title}
            </h3>

            <div className="divide-y divide-warmLine/70">
              {planRows.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between py-2.5">
                  <span className="font-sans text-xs text-inkMid">{row.label}</span>
                  <span className="font-mono text-xs text-ink">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 pb-6 pt-1">
            <p className="font-sans text-[13px] text-inkFaint leading-relaxed">{screen.note}</p>
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
            className={`px-4 py-2 min-h-11 rounded-full font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
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
