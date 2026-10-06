"use client";

import { useEffect, useId, useRef, useState } from "react";

export type WavePoint = { hour: number; time: string; label: string; side: "above" | "below" };

// Default points match the homepage hero exactly, so existing callers that
// don't pass `points` keep their current visual with no change.
const defaultPoints: WavePoint[] = [
  { hour: 2, time: "02:00", label: "Report", side: "below" },
  { hour: 4, time: "04:00", label: "Low point", side: "above" },
  { hour: 8, time: "08:00", label: "Light", side: "below" },
  { hour: 14, time: "14:00", label: "Layover", side: "above" },
  { hour: 22, time: "22:00", label: "Sleep", side: "below" },
];

const WIDTH = 640;
const HEIGHT = 280;
const MARGIN_X = 24;
const MID_Y = 130;
const AMPLITUDE = 56;
// Circadian low point ~04:00, peak ~16:00 — a simple cosine is enough to
// read as "a gentle wave," not a literal physiological model.
const PEAK_HOUR = 16;

function x(hour: number) {
  return MARGIN_X + (hour / 24) * (WIDTH - MARGIN_X * 2);
}

function y(hour: number, peakHour: number) {
  const elevation = Math.cos((2 * Math.PI * (hour - peakHour)) / 24);
  return MID_Y - AMPLITUDE * elevation;
}

function buildWavePath(peakHour: number) {
  const steps = 96;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const hour = (i / steps) * 24;
    const cmd = i === 0 ? "M" : "L";
    d += `${cmd} ${x(hour).toFixed(1)} ${y(hour, peakHour).toFixed(1)} `;
  }
  return d.trim();
}

function buildAreaPath(peakHour: number) {
  return `${buildWavePath(peakHour)} L ${x(24)} ${HEIGHT} L ${x(0)} ${HEIGHT} Z`;
}

/**
 * The circadian wave: a thin gold line across a 24-hour axis, low at night
 * and high in the day, with configurable labelled moments on the curve.
 * Draws itself in once scrolled into view (respects prefers-reduced-motion).
 */
export function Wave({
  points = defaultPoints,
  peakHour = PEAK_HOUR,
  showNightShading = true,
  ariaLabel = "A circadian wave across a 24-hour axis, low at night and high in the day",
  className = "",
}: {
  points?: WavePoint[];
  peakHour?: number;
  showNightShading?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const uid = useId().replace(/:/g, "");

  const wavePath = buildWavePath(peakHour);
  const areaPath = buildAreaPath(peakHour);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [wavePath]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDrawn(true);
      return;
    }

    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label={ariaLabel}>
        <defs>
          <linearGradient id={`${uid}-night-l`} x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#1A2540" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#1A2540" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-night-r`} x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#1A2540" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A2540" stopOpacity="0.07" />
          </linearGradient>
          <linearGradient id={`${uid}-area`} x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#C49A3C" stopOpacity="0" />
            <stop offset="14%" stopColor="#C49A3C" stopOpacity="0.07" />
            <stop offset="86%" stopColor="#C49A3C" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#C49A3C" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-vfade`} x1="0" y1="0%" x2="0" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="22%" stopColor="white" stopOpacity="1" />
            <stop offset="78%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}-vmask`}>
            <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill={`url(#${uid}-vfade)`} />
          </mask>
        </defs>

        <g mask={`url(#${uid}-vmask)`}>
          {showNightShading && (
            <>
              <rect x={x(0)} y={0} width={x(6) - x(0)} height={HEIGHT} fill={`url(#${uid}-night-l)`} />
              <rect x={x(20)} y={0} width={x(24) - x(20)} height={HEIGHT} fill={`url(#${uid}-night-r)`} />
            </>
          )}
          <path d={areaPath} fill={`url(#${uid}-area)`} stroke="none" />
        </g>

        <path
          ref={pathRef}
          d={wavePath}
          fill="none"
          stroke="currentColor"
          className="text-gold"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={
            pathLength
              ? {
                  strokeDasharray: pathLength,
                  strokeDashoffset: drawn ? 0 : pathLength,
                  transition: drawn ? "stroke-dashoffset 1.6s ease-out" : "none",
                }
              : undefined
          }
        />

        {points.map((p, i) => {
          const cx = x(p.hour);
          const cy = y(p.hour, peakHour);
          const labelY = p.side === "above" ? cy - 34 : cy + 46;
          const timeY = p.side === "above" ? cy - 18 : cy + 28;
          return (
            <g
              key={`${p.hour}-${p.label}`}
              style={{
                opacity: drawn ? 1 : 0,
                transition: drawn ? `opacity 0.5s ease-out ${0.4 + i * 0.15}s` : "none",
              }}
            >
              <line
                x1={cx}
                y1={cy}
                x2={cx}
                y2={p.side === "above" ? cy - 10 : cy + 10}
                stroke="currentColor"
                className="text-gold/40"
                strokeWidth={1}
              />
              <circle cx={cx} cy={cy} r={5} className="fill-cream stroke-gold" strokeWidth={2} />
              <text x={cx} y={timeY} textAnchor="middle" className="fill-ink font-mono text-[12px] md:text-[13px]">
                {p.time}
              </text>
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                letterSpacing="0.05em"
                className="fill-ink font-mono text-[11px] md:text-[12px] uppercase"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
