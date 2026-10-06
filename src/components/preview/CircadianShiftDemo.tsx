"use client";

import { useState } from "react";

const WIDTH = 560;
const HEIGHT = 200;
const MARGIN_X = 20;
const MID_Y = 110;
const AMPLITUDE = 44;
const PEAK_HOUR = 16;

function x(hour: number) {
  return MARGIN_X + (hour / 24) * (WIDTH - MARGIN_X * 2);
}

function y(hour: number) {
  const elevation = Math.cos((2 * Math.PI * (hour - PEAK_HOUR)) / 24);
  return MID_Y - AMPLITUDE * elevation;
}

function buildWavePath() {
  const steps = 72;
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

  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label={`Circadian wave with the low point for ${day.label} marked at ${day.lowPointHour.toString().padStart(2, "0")}:00`}
      >
        <path d={wavePath} fill="none" stroke="currentColor" className="text-gold/50" strokeWidth={1.5} />
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy + 24}
          stroke="currentColor"
          className="text-gold/40"
          strokeWidth={1}
        />
        <circle cx={cx} cy={cy} r={6} className="fill-cream stroke-gold" strokeWidth={2} />
        <text
          x={cx}
          y={cy + 40}
          textAnchor="middle"
          className="fill-ink font-mono text-[12px]"
        >
          {Math.floor(day.lowPointHour).toString().padStart(2, "0")}:
          {day.lowPointHour % 1 === 0 ? "00" : "30"}
        </text>
        <text
          x={cx}
          y={cy - 16}
          textAnchor="middle"
          letterSpacing="0.05em"
          className="fill-gold font-mono text-[11px] uppercase"
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
