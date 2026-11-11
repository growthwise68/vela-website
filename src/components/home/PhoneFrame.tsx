"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Screen = {
  tab: string;
  image: string;
  alt: string;
};

const screens: Screen[] = [
  {
    tab: "Departure",
    image: "/images/app/app-build-roster.webp",
    alt: "VÉLA roster builder screen showing a flight being added before departure",
  },
  {
    tab: "Layover",
    image: "/images/app/app-rest-plan.webp",
    alt: "VÉLA rest plan screen showing sleep and nap windows for a layover",
  },
  {
    tab: "Return",
    image: "/images/app/app-insights.webp",
    alt: "VÉLA insights screen comparing body clock time with local time after returning home",
  },
];

const ROTATE_MS = 6000;

export function PhoneFrame() {
  const [active, setActive] = useState(0);

  // Auto-rotates through the slides; restarts its timer whenever `active`
  // changes for any reason, so a manual tab click doesn't get immediately
  // overridden by the next tick. Respects prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % screens.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [active]);

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
            priority={active === 0}
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
    </div>
  );
}
