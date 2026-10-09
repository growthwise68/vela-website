"use client";

import { useEffect, useRef, useState } from "react";
import { Cite } from "./Cite";

/**
 * Wraps an illustration so it fades/rises into place the first time it
 * scrolls into view, respecting prefers-reduced-motion. Same technique as
 * the homepage Wave component's draw-in animation.
 */
export function RevealOnView({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      {children}
    </div>
  );
}

/** Section 1 — hero: two concentric 24-hour rings, out of sync. */
export function HeroRings() {
  const cx = 130;
  const cy = 130;
  const outerR = 104;
  const innerR = 66;

  return (
    <RevealOnView className="mx-auto w-[230px] sm:w-[260px]">
      <figure>
        <svg
          viewBox="0 0 260 280"
          role="img"
          aria-label="Two concentric 24-hour clock rings: an ink outer ring for local time and a gold inner ring for body time, shown out of sync, with a small plane marking your flight on the outer ring."
          className="w-full h-auto"
        >
          <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="currentColor" className="text-ink/60" strokeWidth={1.5} />
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * 2 * Math.PI - Math.PI / 2;
            const major = i % 6 === 0;
            const x1 = cx + (outerR - (major ? 9 : 5)) * Math.cos(angle);
            const y1 = cy + (outerR - (major ? 9 : 5)) * Math.sin(angle);
            const x2 = cx + outerR * Math.cos(angle);
            const y2 = cy + outerR * Math.sin(angle);
            return (
              <line
                key={`o-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                className="text-ink/50"
                strokeWidth={major ? 2 : 1}
              />
            );
          })}

          <g transform={`translate(${cx} ${cy - outerR}) rotate(90)`}>
            <path d="M-7 3 L9 -3 L0 3 L9 9 Z" className="fill-ink" />
          </g>

          <text x={cx} y={cy - outerR - 16} textAnchor="middle" className="fill-ink font-mono text-[11px] uppercase tracking-[0.12em]">
            Local time
          </text>

          <g className="vela-ring-inner" style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="currentColor" className="text-gold" strokeWidth={2} />
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
              const x1 = cx + (innerR - 6) * Math.cos(angle);
              const y1 = cy + (innerR - 6) * Math.sin(angle);
              const x2 = cx + innerR * Math.cos(angle);
              const y2 = cy + innerR * Math.sin(angle);
              return (
                <line key={`i-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" className="text-gold/70" strokeWidth={1.5} />
              );
            })}
            <circle cx={cx} cy={cy - innerR} r={4.5} className="fill-gold" />
          </g>

          <text x={cx} y={cy + innerR + 28} textAnchor="middle" className="fill-gold font-mono text-[11px] uppercase tracking-[0.12em]">
            Body time
          </text>
        </svg>
        <figcaption className="mt-5 text-center font-sans text-base text-inkMid leading-relaxed">
          After a few sectors, your body clock and the clock on the wall disagree. VÉLA tracks the gap.
        </figcaption>
      </figure>
    </RevealOnView>
  );
}

function StepFigure({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" role="img" aria-label={ariaLabel} className="w-full max-w-[200px] h-auto">
        {children}
      </svg>
      <figcaption className="mt-3 font-sans text-sm text-inkMid text-center">{caption}</figcaption>
    </figure>
  );
}

function StepConnector() {
  return (
    <div className="hidden sm:flex flex-1 items-center justify-center px-2 self-center" aria-hidden="true">
      <svg viewBox="0 0 100 10" className="w-full h-[10px]" preserveAspectRatio="none">
        <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" className="text-gold/50" strokeWidth={2} strokeDasharray="6 6" />
        <circle cx="50" cy="5" r="3" className="fill-gold" />
      </svg>
    </div>
  );
}

/** Section 2 — three mini illustrated steps joined by a dotted flight path. */
export function HowItWorksSteps() {
  return (
    <RevealOnView>
      <div className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-0">
        <StepFigure ariaLabel="A roster chip showing a flight entry: EK 201 on 14 October" caption="Add your duties">
          <rect x="20" y="35" width="160" height="50" rx="12" className="fill-cream stroke-warmLine" strokeWidth={1} />
          <text x="100" y="58" textAnchor="middle" className="fill-ink font-mono text-[14px] font-semibold">
            EK 201
          </text>
          <text x="100" y="76" textAnchor="middle" className="fill-inkFaint font-mono text-[11px] uppercase tracking-[0.1em]">
            14 Oct
          </text>
        </StepFigure>

        <StepConnector />

        <StepFigure ariaLabel="A small gold wave representing your body clock curve" caption="VÉLA maps your body clock">
          <path
            d="M15 72 Q50 25 85 72 T155 72"
            fill="none"
            stroke="currentColor"
            className="text-gold"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx="50" cy="48.5" r="4" className="fill-cream stroke-gold" strokeWidth={2} />
          <circle cx="120" cy="48.5" r="4" className="fill-cream stroke-gold" strokeWidth={2} />
        </StepFigure>

        <StepConnector />

        <StepFigure ariaLabel="A plan card showing tonight's sleep and light timing" caption="Get your plan">
          <rect x="15" y="25" width="170" height="70" rx="12" className="fill-night" />
          <text x="100" y="52" textAnchor="middle" className="fill-gold font-mono text-[10px] uppercase tracking-[0.18em]">
            Tonight
          </text>
          <text x="100" y="74" textAnchor="middle" className="fill-cream font-mono text-[13px]">
            Sleep 22:00 · Light 07:30
          </text>
        </StepFigure>
      </div>
      <p className="mt-8 text-center font-sans text-sm text-inkFaint">
        Just a date and flight number per duty.
      </p>
    </RevealOnView>
  );
}

/** Section 3 — one combined chart: body clock, sleep pressure, grogginess. */
export function ScienceChart() {
  const W = 640;
  const H = 300;
  const MX = 24;
  const hourX = (h: number) => MX + (h / 36) * (W - 2 * MX);

  const sineMidY = 120;
  const sineAmp = 46;
  const peakHour = 16;
  const steps = 96;
  let sinePath = "";
  for (let i = 0; i <= steps; i++) {
    const h = (i / steps) * 36;
    const y = sineMidY - sineAmp * Math.cos((2 * Math.PI * (h - peakHour)) / 24);
    sinePath += `${i === 0 ? "M" : "L"} ${hourX(h).toFixed(1)} ${y.toFixed(1)} `;
  }

  const sawPoints: [number, number][] = [
    [0, 222],
    [16, 150],
    [24, 222],
    [36, 168],
  ];
  const sawPath = sawPoints.map(([h, y], i) => `${i === 0 ? "M" : "L"} ${hourX(h).toFixed(1)} ${y}`).join(" ");

  return (
    <RevealOnView>
      <figure>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="A chart over a day and a half showing a gold body-clock wave, an ink sleep-pressure line that rises while you're awake and drops while you sleep, and a small shaded dip marking grogginess just after waking."
          className="w-full h-auto"
        >
          <rect x={hourX(0)} y={0} width={hourX(8) - hourX(0)} height={H} className="fill-night/[0.05]" />
          <rect x={hourX(24)} y={0} width={hourX(32) - hourX(24)} height={H} className="fill-night/[0.05]" />

          <path
            d={`M ${hourX(24)} 222 Q ${hourX(25)} 248 ${hourX(26)} 222`}
            fill="none"
            stroke="currentColor"
            className="text-inkFaint"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <text x={hourX(25)} y={272} textAnchor="middle" className="fill-inkFaint font-mono text-[11px] uppercase tracking-[0.08em]">
            Grogginess
          </text>

          <path d={sawPath} fill="none" stroke="currentColor" className="text-ink" strokeWidth={2} strokeLinejoin="round" />
          <text x={hourX(16) + 8} y={142} className="fill-ink font-mono text-[12px] uppercase tracking-[0.08em]">
            Sleep pressure
          </text>

          <path d={sinePath} fill="none" stroke="currentColor" className="text-gold" strokeWidth={2.5} strokeLinecap="round" />
          <text x={hourX(16) + 8} y={sineMidY - sineAmp - 10} className="fill-gold font-mono text-[12px] uppercase tracking-[0.08em]">
            Body clock
          </text>
        </svg>
        <figcaption className="mt-6 space-y-2 font-sans text-sm text-inkMid leading-relaxed max-w-2xl mx-auto">
          <span className="block">
            Your body clock has a natural low point in the early hours of your body&apos;s night.
          </span>
          <span className="block">
            Sleep pressure builds the longer you&apos;re awake and clears when you sleep.
          </span>
          <span className="block">
            Grogginess is the groggy period just after you wake up, before you&apos;re fully alert.
          </span>
        </figcaption>
      </figure>
    </RevealOnView>
  );
}

/** Section 4 — a clock face with two curved arrows: east (harder) vs west (easier). */
export function EastWestClock() {
  const cx = 180;
  const cy = 120;
  const r = 85;

  return (
    <RevealOnView className="mx-auto w-[280px] sm:w-[320px]">
      <figure>
        <svg
          viewBox="0 0 360 260"
          role="img"
          aria-label="A clock face with two curved arrows: a gold arrow curving left, labelled east, shift earlier, harder; and an ink arrow curving right, labelled west, shift later, easier."
          className="w-full h-auto"
        >
          <defs>
            <marker id="hvw-arrow-gold" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" className="fill-gold" />
            </marker>
            <marker id="hvw-arrow-ink" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" className="fill-ink" />
            </marker>
          </defs>

          <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" className="text-warmLine" strokeWidth={1.5} />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
            const x1 = cx + (r - 6) * Math.cos(angle);
            const y1 = cy + (r - 6) * Math.sin(angle);
            const x2 = cx + r * Math.cos(angle);
            const y2 = cy + r * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" className="text-inkFaint" strokeWidth={1} />;
          })}
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + 20} stroke="currentColor" className="text-ink" strokeWidth={2} strokeLinecap="round" />

          <path
            d={`M ${cx - 16} ${cy - r + 12} A ${r - 12} ${r - 12} 0 0 0 ${cx - r + 12} ${cy - 16}`}
            fill="none"
            stroke="currentColor"
            className="text-gold"
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd="url(#hvw-arrow-gold)"
          />
          <path
            d={`M ${cx + 16} ${cy - r + 12} A ${r - 12} ${r - 12} 0 0 1 ${cx + r - 12} ${cy - 16}`}
            fill="none"
            stroke="currentColor"
            className="text-ink"
            strokeWidth={3}
            strokeLinecap="round"
            markerEnd="url(#hvw-arrow-ink)"
          />

          <g transform={`translate(${cx - r + 6} ${cy - 6}) rotate(-25)`}>
            <path d="M-7 3 L9 -3 L0 3 L9 9 Z" className="fill-gold" />
          </g>
          <g transform={`translate(${cx + r - 16} ${cy - 6}) rotate(25)`}>
            <path d="M-7 3 L9 -3 L0 3 L9 9 Z" className="fill-ink" />
          </g>

          <text x={cx - 90} y={cy + r + 30} textAnchor="middle" className="fill-gold font-mono text-[10px] uppercase tracking-[0.06em]">
            East · shift earlier
          </text>
          <text x={cx - 90} y={cy + r + 46} textAnchor="middle" className="fill-gold font-mono text-[10px] uppercase tracking-[0.06em]">
            Harder
          </text>
          <text x={cx + 90} y={cy + r + 30} textAnchor="middle" className="fill-ink font-mono text-[10px] uppercase tracking-[0.06em]">
            West · shift later
          </text>
          <text x={cx + 90} y={cy + r + 46} textAnchor="middle" className="fill-ink font-mono text-[10px] uppercase tracking-[0.06em]">
            Easier
          </text>
        </svg>
        <figcaption className="mt-4 text-center font-sans text-base text-inkMid leading-relaxed">
          Going to sleep earlier than your body expects is harder than staying up later.
          <Cite n={[6]} />
        </figcaption>
      </figure>
    </RevealOnView>
  );
}

/** Section 5 — a 24-hour light strip: morning sun pulls earlier, evening moon pushes later. */
export function LightStrip() {
  const W = 640;
  const H = 150;
  const MX = 20;
  const hourX = (h: number) => MX + (h / 24) * (W - 2 * MX);

  return (
    <RevealOnView>
      <figure>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="A 24-hour strip shaded from day to night, with a sun icon in the morning and a moon icon in the evening, and arrows showing that morning light pulls your body clock earlier while evening light pushes it later."
          className="w-full h-auto"
        >
          <defs>
            <linearGradient id="hvw-daynight" x1="0%" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#1A2540" stopOpacity="0.12" />
              <stop offset="30%" stopColor="#1A2540" stopOpacity="0" />
              <stop offset="70%" stopColor="#1A2540" stopOpacity="0" />
              <stop offset="100%" stopColor="#1A2540" stopOpacity="0.18" />
            </linearGradient>
            <marker id="hvw-arrow-gold-2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" className="fill-gold" />
            </marker>
            <marker id="hvw-arrow-ink-2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" className="fill-ink" />
            </marker>
          </defs>

          <rect
            x={MX}
            y={35}
            width={W - 2 * MX}
            height={50}
            rx={25}
            fill="url(#hvw-daynight)"
            stroke="currentColor"
            className="text-warmLine"
            strokeWidth={1.5}
          />

          <g transform={`translate(${hourX(8)} 60)`}>
            <circle r={9} fill="none" stroke="currentColor" className="text-gold" strokeWidth={2} />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i / 8) * 2 * Math.PI;
              return (
                <line
                  key={i}
                  x1={Math.cos(a) * 12}
                  y1={Math.sin(a) * 12}
                  x2={Math.cos(a) * 16}
                  y2={Math.sin(a) * 16}
                  stroke="currentColor"
                  className="text-gold"
                  strokeWidth={1.5}
                />
              );
            })}
          </g>
          <line
            x1={hourX(8) - 22}
            y1={60}
            x2={hourX(8) - 38}
            y2={60}
            stroke="currentColor"
            className="text-gold"
            strokeWidth={2}
            markerEnd="url(#hvw-arrow-gold-2)"
          />
          <text x={hourX(8)} y={102} textAnchor="middle" className="fill-gold font-mono text-[11px] uppercase tracking-[0.06em]">
            Pulls earlier
          </text>

          <g transform={`translate(${hourX(20)} 60)`}>
            <path d="M6 -10a10 10 0 1 0 0 20 8 8 0 0 1 0-20z" className="fill-ink" />
          </g>
          <line
            x1={hourX(20) + 24}
            y1={60}
            x2={hourX(20) + 40}
            y2={60}
            stroke="currentColor"
            className="text-ink"
            strokeWidth={2}
            markerEnd="url(#hvw-arrow-ink-2)"
          />
          <text x={hourX(20)} y={102} textAnchor="middle" className="fill-ink font-mono text-[11px] uppercase tracking-[0.06em]">
            Pushes later
          </text>
        </svg>
        <figcaption className="mt-4 text-center font-sans text-base text-inkMid leading-relaxed">
          Light is the strongest signal your body clock follows, and timing decides which way it moves.
          <Cite n={[5, 6]} />
        </figcaption>
      </figure>
    </RevealOnView>
  );
}

function BedIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 mx-auto text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 18v2M21 18v2" />
      <path d="M5 10V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
      <path d="M3 14h18" />
    </svg>
  );
}
function SunTileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 mx-auto text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}
function CupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 mx-auto text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z" />
      <path d="M17 10h1.5a2 2 0 0 1 0 4H17" />
      <path d="M8 6c0 .8.8.8.8 1.6M12 6c0 .8.8.8.8 1.6" />
    </svg>
  );
}
function PlateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 mx-auto text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="10" cy="12" r="7" />
      <circle cx="10" cy="12" r="2.5" />
      <path d="M18 5v14M20 5v6a2 2 0 0 1-2 2M16 5v6a2 2 0 0 0 2 2" />
    </svg>
  );
}

const planTiles = [
  { icon: BedIcon, title: "Sleep", caption: "When to sleep, when to nap" },
  { icon: SunTileIcon, title: "Light", caption: "When to seek or avoid it" },
  { icon: CupIcon, title: "Caffeine", caption: "When your last coffee is" },
  { icon: PlateIcon, title: "Meals", caption: "When to eat, on body time" },
];

/** Section 6 — four icon tiles: what VÉLA plans for you. */
export function PlanTiles() {
  return (
    <RevealOnView>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {planTiles.map(({ icon: Icon, title, caption }) => (
          <div key={title} className="rounded-xl border border-warmLine bg-cream/60 px-4 py-6 text-center">
            <Icon />
            <p className="mt-3 font-display text-xl text-ink">{title}</p>
            <p className="mt-1 font-sans text-sm text-inkMid leading-snug">{caption}</p>
          </div>
        ))}
      </div>
    </RevealOnView>
  );
}
