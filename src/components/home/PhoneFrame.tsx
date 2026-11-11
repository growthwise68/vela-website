"use client";

import { useState } from "react";
import Image from "next/image";

type Screen = {
  tab: string;
  context: string;
  title: string;
  note: string;
  image: string;
  alt: string;
};

const screens: Screen[] = [
  {
    tab: "Departure",
    context: "LHR → SIN · Day 1",
    title: "The Departure",
    note: "Your report time is 02:00. Your body thinks it’s the middle of the night — because it is. VÉLA saw this coming three days ago.",
    image: "/images/app/app-home.webp",
    alt: "VÉLA home screen showing tonight's plan: sleep and wake times, caffeine cutoff, light timing and a wellness score",
  },
  {
    tab: "Layover",
    context: "SIN layover · Day 2",
    title: "The Layover",
    note: "30 hours in Singapore. Your body clock is still back in London. VÉLA shows you when rest will help most, so you can actually use this layover.",
    image: "/images/app/app-rest-plan.webp",
    alt: "VÉLA rest plan showing a timeline of meals, sleep, wake-up and departure for the next duty",
  },
  {
    tab: "Return",
    context: "Home · Day 1 off",
    title: "The Return",
    note: "You’re home. Your days off start now. VÉLA shows you why the first 24 hours matter most — and what to do with them.",
    image: "/images/app/app-home.webp",
    alt: "VÉLA home screen showing tonight's plan: sleep and wake times, caffeine cutoff, light timing and a wellness score",
  },
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
        <div className="relative rounded-[2rem] overflow-hidden" style={{ aspectRatio: "924 / 2000" }}>
          <Image
            src={screen.image}
            alt={screen.alt}
            fill
            sizes="300px"
            className="object-cover"
            priority={screen.image === screens[0].image}
          />
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

      {/* Caption — keeps the per-stage story that used to live inside the mock screen */}
      <div className="mt-5 max-w-[300px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold font-semibold mb-1">
          {screen.context}
        </p>
        <h3 className="font-display text-lg font-light text-cream mb-2">{screen.title}</h3>
        <p className="font-sans text-[13px] text-cream/70 leading-relaxed">{screen.note}</p>
      </div>
    </div>
  );
}
