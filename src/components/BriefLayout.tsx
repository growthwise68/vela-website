"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FullBleed } from "@/components/FullBleed";

export type BriefStage = {
  id: string;
  label: string;
  bg: "cream" | "parchment";
  nextLabel: string;
  children: React.ReactNode;
};

export type BriefClosing = {
  bigLine: React.ReactNode;
  paragraph: React.ReactNode;
  pdfHref: string;
  signOff: React.ReactNode;
  extra?: React.ReactNode;
};

export function BriefLayout({
  jsonLd,
  briefLabel,
  title,
  shortVersion,
  hook,
  stages,
  closing,
}: {
  jsonLd: object;
  briefLabel: string;
  title: string;
  shortVersion: React.ReactNode;
  hook: React.ReactNode;
  stages: BriefStage[];
  closing: BriefClosing;
}) {
  const spineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const startSentinelRef = useRef<HTMLDivElement>(null);
  const endSentinelRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pastStartRef = useRef(false);
  const pastEndRef = useRef(false);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [strip, setStrip] = useState<"hidden" | "visible">("hidden");
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    const headerEl = document.querySelector("header");
    if (!headerEl) return;
    const update = () => setHeaderHeight(headerEl.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(headerEl);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      if (fillRef.current) fillRef.current.style.height = "100%";
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const track = spineRef.current;
        const fill = fillRef.current;
        if (!track || !fill) return;
        const rect = track.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.5;
        const progress = (viewportCenter - rect.top) / rect.height;
        fill.style.height = `${Math.min(1, Math.max(0, progress)) * 100}%`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-stage-id");
            if (id) setActiveStage(id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    Object.values(stageRefs.current).forEach((el) => el && stageObserver.observe(el));

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // A sentinel scrolled above the viewport (top < 0) counts as "passed";
          // still below the viewport (top >= 0) counts as "not yet reached" — this
          // keeps the strip correct when scrolling back up, not just scrolling down.
          const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
          const notYet = !entry.isIntersecting && entry.boundingClientRect.top >= 0;
          if (entry.target === startSentinelRef.current) {
            if (entry.isIntersecting) pastStartRef.current = false;
            else if (passed) pastStartRef.current = true;
            else if (notYet) pastStartRef.current = false;
          }
          if (entry.target === endSentinelRef.current) {
            if (entry.isIntersecting) pastEndRef.current = false;
            else if (passed) pastEndRef.current = true;
            else if (notYet) pastEndRef.current = false;
          }
        });
        setStrip(pastStartRef.current && !pastEndRef.current ? "visible" : "hidden");
      },
      { rootMargin: "0px", threshold: 0 }
    );
    if (startSentinelRef.current) visibilityObserver.observe(startSentinelRef.current);
    if (endSentinelRef.current) visibilityObserver.observe(endSentinelRef.current);

    return () => {
      stageObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  const activeLabel = stages.find((s) => s.id === activeStage)?.label ?? stages[0]?.label ?? "";

  return (
    <div className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* PROGRESS STRIP */}
      <div
        className="fixed inset-x-0 z-[5] bg-cream/95 backdrop-blur-sm border-b border-warmLine transition-[opacity,transform] duration-200"
        style={{
          top: headerHeight,
          opacity: strip === "visible" ? 1 : 0,
          transform: strip === "visible" ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: strip === "visible" ? "auto" : "none",
        }}
        aria-hidden={strip !== "visible"}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-2 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold whitespace-nowrap">
            {activeLabel}
          </span>
          <span className="h-px flex-1 bg-gold/30 relative overflow-hidden">
            <span
              className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-300"
              style={{
                width: `${((stages.findIndex((s) => s.id === activeStage) + 1) / stages.length) * 100}%`,
              }}
            />
          </span>
        </div>
      </div>

      {/* HEADER */}
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            {briefLabel}
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
            {title}
          </h1>

          <div className="rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5 mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">
              The short version
            </p>
            <div className="font-sans text-base leading-relaxed text-inkMid">{shortVersion}</div>
          </div>

          <div className="font-display text-2xl md:text-3xl italic text-gold pl-4 border-l-2 border-gold leading-relaxed">
            {hook}
          </div>
        </div>
      </FullBleed>

      <div ref={startSentinelRef} />

      {/* STAGES / FLIGHT PATH */}
      <FullBleed>
        <div className="relative max-w-3xl mx-auto px-6 md:px-8">
          <div
            ref={spineRef}
            className="absolute top-0 bottom-0 left-[14px] md:left-5 w-px z-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #C49A3C 0, #C49A3C 3px, transparent 3px, transparent 9px)",
            }}
          />
          <div
            ref={fillRef}
            className="absolute top-0 left-[14px] md:left-5 w-px bg-gold z-0"
            style={{ height: "0%" }}
          />

          {stages.map((stage, i) => {
            const nextId = i < stages.length - 1 ? stages[i + 1].id : "closing";
            const isActive = stage.id === activeStage;
            return (
              <FullBleed
                key={stage.id}
                className={`${stage.bg === "cream" ? "bg-cream" : "bg-parchment"} py-14 md:py-20`}
              >
                <div
                  id={stage.id}
                  ref={(el) => {
                    stageRefs.current[stage.id] = el;
                  }}
                  data-stage-id={stage.id}
                  className="max-w-3xl mx-auto pl-7 pr-6 md:pl-10 md:pr-8 relative scroll-mt-32"
                >
                  <span
                    className={`absolute left-[14px] md:left-5 top-2 -translate-x-1/2 z-10 w-2.5 h-2.5 rounded-full ring-4 ring-cream transition-colors ${
                      isActive ? "bg-gold" : "bg-cream border-2 border-gold"
                    }`}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold mb-3">
                    {stage.label}
                  </p>
                  <div className="prose-vela">{stage.children}</div>
                  <a
                    href={`#${nextId}`}
                    className="not-prose mt-8 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-gold hover:underline underline-offset-2"
                  >
                    {stage.nextLabel}
                  </a>
                </div>
              </FullBleed>
            );
          })}
        </div>
      </FullBleed>

      <div ref={endSentinelRef} />

      {/* CLOSING — navy, for site-wide rhythm */}
      <FullBleed id="closing" className="scroll-mt-32 bg-night py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="font-display text-3xl md:text-5xl font-light text-cream leading-tight mb-8">
            {closing.bigLine}
          </p>
          <div className="font-sans text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl mx-auto mb-10 text-left">
            {closing.paragraph}
          </div>

          <div className="not-prose flex flex-wrap gap-4 items-center justify-center mb-10">
            <Link
              href="/early-access"
              className="inline-block px-8 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-all hover:scale-105"
            >
              Get Early Access
            </Link>
            <a
              href={closing.pdfHref}
              download
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-cream/70 underline underline-offset-2 hover:text-gold transition-colors"
            >
              Download this brief as a PDF
            </a>
          </div>

          <p className="font-sans text-sm text-cream/50 text-left max-w-2xl mx-auto">{closing.signOff}</p>
        </div>
      </FullBleed>

      {closing.extra && (
        <FullBleed className="bg-cream py-14 md:py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <div className="prose-vela">{closing.extra}</div>
          </div>
        </FullBleed>
      )}

      <FullBleed className="bg-cream py-8">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="font-sans text-xs text-inkFaint mb-6">
            VÉLA provides personal planning insights. It isn&apos;t medical advice or a substitute
            for your airline&apos;s fatigue-management requirements.{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-inkMid transition-colors">
              Full details
            </Link>
          </p>
          <nav className="pt-6 border-t border-warmLine">
            <Link
              href="/briefs"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint hover:text-gold transition-colors"
            >
              ← All Recovery Briefs
            </Link>
          </nav>
        </div>
      </FullBleed>
    </div>
  );
}
