"use client";

import { useState } from "react";

// Matches BodyClockTimeline's scale/weight so the two uses of the wave feel
// like one system rather than a hero version and a smaller afterthought.
const WIDTH = 640;
const HEIGHT = 240;
const MARGIN_X = 24;
const MID_Y = 110;
const AMPLITUDE = 48;
const PEAK_HOUR = 16;

function x(hour: number) {
  return MARGIN_X + (hour / 24) * (WIDTH - MARGIN_X * 2);
}

function y(hour: number) {
  const elevation = Math.cos((2 * Math.PI * (hour - PEAK_HOUR)) / 24);
  return MID_Y - AMPLITUDE * elevation;
}

function buildWavePath() {
  const steps = 96;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const hour = (i / steps) * 24;
    const cmd = i === 0 ? "M" : "L";
    d += `${cmd} ${x(hour).toFixed(1)} ${y(hour).toFixed(1)} `;
  }
  return d.trim();
}

const wavePath = buildWavePath();

// Illustrative day-by-day low-point shift for a DXB–JFK pattern — matches
// the existing copy's "pushes your low point to 04:00 body time on day two."
const days = [
  { label: "Day 1", lowPointHour: 1 },
  { label: "Day 2", lowPointHour: 4 },
  { label: "Day 3", lowPointHour: 5 },
  { label: "Day 4", lowPointHour: 5.5 },
  { label: "Day 5", lowPointHour: 6 },
];

export function CircadianShiftDemo() {
  const [active, setActive] = useState(1);
  const day = days[active];
  const cx = x(day.lowPointHour);
  const cy = y(day.lowPointHour);
  const hourLabel = `${Math.floor(day.lowPointHour).toString().padStart(2, "0")}:${
    day.lowPointHour % 1 === 0 ? "00" : "30"
  }`;

  return (
    <div className="w-full md:min-w-[480px] md:max-w-xl mx-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Circadian wave with the low point for ${day.label} marked at ${hourLabel}`}
      >
        <path
          d={wavePath}
          fill="none"
          stroke="currentColor"
          className="text-gold"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy + 24}
          stroke="currentColor"
          className="text-gold/40"
          strokeWidth={1}
        />
        <circle cx={cx} cy={cy} r={5} className="fill-cream stroke-gold" strokeWidth={2} />
        <text x={cx} y={cy + 44} textAnchor="middle" className="fill-ink font-mono text-[12px] md:text-[13px]">
          {hourLabel}
        </text>
        <text
          x={cx}
          y={cy - 18}
          textAnchor="middle"
          letterSpacing="0.05em"
          className="fill-ink font-mono text-[11px] md:text-[12px] uppercase"
        >
          Low point
        </text>
      </svg>

      <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Day of trip">
        {days.map((d, i) => (
          <button
            key={d.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`px-3 py-2 min-h-11 rounded-full font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
              i === active ? "bg-gold text-ink font-semibold" : "text-inkFaint hover:text-gold"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
