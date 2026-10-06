"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function FullBleed({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={`w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] ${className}`}>
      {children}
    </div>
  );
}

export type BriefStage = {
  id: string;
  label: string;
  bg: "cream" | "parchment";
  nextLabel: string;
  children: React.ReactNode;
};

export type BriefMapItem = {
  time: string;
  label: string;
  href: string;
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
  map,
  stages,
  closing,
}: {
  jsonLd: object;
  briefLabel: string;
  title: string;
  shortVersion: React.ReactNode;
  hook: React.ReactNode;
  map?: BriefMapItem[];
  stages: BriefStage[];
  closing: BriefClosing;
}) {
  const spineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const startSentinelRef = useRef<HTMLDivElement>(null);
  const endSentinelRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});
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
          if (entry.target === startSentinelRef.current) {
            setStrip((prev) => (entry.isIntersecting ? "hidden" : prev === "hidden" ? "visible" : prev));
          }
          if (entry.target === endSentinelRef.current && entry.isIntersecting) {
            setStrip("hidden");
          }
        });
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

        {map && map.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 md:px-8 mt-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint mb-4">
              The route
            </p>
            <ol className="not-prose flex flex-col md:flex-row md:items-start gap-0 md:gap-2 rounded-xl border border-warmLine bg-parchment/60 p-4 md:p-6">
              {map.map((item, i) => (
                <li key={item.time} className="flex-1 flex md:flex-col items-center md:items-start gap-3 md:gap-2 py-2 md:py-0">
                  <div className="flex md:flex-col items-center gap-3 md:gap-2 md:w-full">
                    <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
                    {i < map.length - 1 && (
                      <span className="hidden md:block h-px flex-1 bg-gold/30 mt-0" />
                    )}
                  </div>
                  <a
                    href={item.href}
                    className="group flex md:flex-col gap-2 md:gap-1 items-baseline md:items-start"
                  >
                    <time className="font-mono text-xs text-gold group-hover:underline">{item.time}</time>
                    <span className="font-sans text-xs text-inkMid group-hover:text-gold transition-colors">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </FullBleed>

      <div ref={startSentinelRef} />

      {/* STAGES / FLIGHT PATH */}
      <div className="relative max-w-3xl mx-auto px-6 md:px-8">
        <div
          ref={spineRef}
          className="absolute top-0 bottom-0 left-4 w-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #C49A3C 0, #C49A3C 3px, transparent 3px, transparent 9px)",
          }}
        />
        <div
          ref={fillRef}
          className="absolute top-0 left-4 w-px bg-gold"
          style={{ height: "0%" }}
        />

        {stages.map((stage, i) => {
          const nextId = i < stages.length - 1 ? stages[i + 1].id : "closing";
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
                className="max-w-3xl mx-auto px-6 md:px-8 relative scroll-mt-32"
              >
                <span className="absolute left-4 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gold ring-4 ring-cream" />
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

      <div ref={endSentinelRef} />

      {/* CLOSING */}
      <FullBleed id="closing" className="scroll-mt-32 bg-gradient-to-b from-parchment/50 to-cream/50 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="font-display text-3xl md:text-5xl font-light text-ink leading-tight mb-8">
            {closing.bigLine}
          </p>
          <div className="font-sans text-base md:text-lg text-inkMid leading-relaxed max-w-2xl mx-auto mb-10 text-left">
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
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-inkMid underline underline-offset-2 hover:text-gold transition-colors"
            >
              Download this brief as a PDF
            </a>
          </div>

          <p className="font-sans text-sm text-inkFaint text-left max-w-2xl mx-auto">{closing.signOff}</p>
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
