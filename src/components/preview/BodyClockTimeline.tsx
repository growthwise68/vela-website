"use client";

import { useEffect, useRef, useState } from "react";

type Point = { hour: number; time: string; label: string; side: "above" | "below" };

const points: Point[] = [
  { hour: 2, time: "02:00", label: "Report", side: "below" },
  { hour: 4, time: "04:00", label: "Low point", side: "above" },
  { hour: 8, time: "08:00", label: "Light", side: "below" },
  { hour: 14, time: "14:00", label: "Layover", side: "above" },
  { hour: 22, time: "22:00", label: "Sleep", side: "below" },
];

const WIDTH = 640;
const HEIGHT = 170;
const MARGIN = 28;
const Y = 90;

function x(hour: number) {
  return MARGIN + (hour / 24) * (WIDTH - MARGIN * 2);
}

export function BodyClockTimeline({
  size = "large",
  className = "",
}: {
  size?: "large" | "small";
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

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

  const dotRadius = size === "large" ? 4 : 3;
  const labelSize = size === "large" ? 11 : 9;
  const timeSize = size === "large" ? 12 : 10;

  return (
    <div ref={wrapRef} className={className}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label="A 24-hour body-clock timeline showing report time, circadian low point, light exposure, layover and sleep window"
      >
        <line
          x1={MARGIN}
          y1={Y}
          x2={WIDTH - MARGIN}
          y2={Y}
          stroke="currentColor"
          className="text-gold/25"
          strokeWidth={1}
        />
        <path
          ref={pathRef}
          d={`M ${MARGIN} ${Y} L ${WIDTH - MARGIN} ${Y}`}
          fill="none"
          stroke="currentColor"
          className="text-gold"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{
            strokeDasharray: WIDTH - MARGIN * 2,
            strokeDashoffset: drawn ? 0 : WIDTH - MARGIN * 2,
            transition: drawn ? "stroke-dashoffset 1.4s ease-out" : "none",
          }}
        />

        {points.map((p, i) => {
          const cx = x(p.hour);
          const labelY = p.side === "above" ? Y - 20 : Y + 32;
          const timeY = p.side === "above" ? Y - 34 : Y + 46;
          return (
            <g
              key={p.hour}
              style={{
                opacity: drawn ? 1 : 0,
                transition: drawn ? `opacity 0.5s ease-out ${0.3 + i * 0.15}s` : "none",
              }}
            >
              <line
                x1={cx}
                y1={Y}
                x2={cx}
                y2={p.side === "above" ? Y - 10 : Y + 10}
                stroke="currentColor"
                className="text-gold/40"
                strokeWidth={1}
              />
              <circle cx={cx} cy={Y} r={dotRadius} fill="currentColor" className="text-gold" />
              <text
                x={cx}
                y={timeY}
                textAnchor="middle"
                fontSize={timeSize}
                fontFamily="var(--font-dm-mono), ui-monospace, monospace"
                className="fill-current text-gold"
              >
                {p.time}
              </text>
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                fontSize={labelSize}
                fontFamily="var(--font-dm-mono), ui-monospace, monospace"
                letterSpacing="0.05em"
                className="fill-current text-inkFaint"
              >
                {p.label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
