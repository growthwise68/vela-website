"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const mainNav = [
  { href: "/briefs", label: "Briefs" },
  { href: "/how-vela-works", label: "How it works" },
  { href: "/research/crew-fatigue-survey-2026", label: "Research" },
  { href: "/pricing", label: "Pricing" },
];

const mobileSecondaryNav = [
  { href: "/survey", label: "Survey" },
  { href: "/support", label: "Support" },
];

const footerExplore = [
  { href: "/briefs", label: "Briefs" },
  { href: "/how-vela-works", label: "How it works" },
  { href: "/research/crew-fatigue-survey-2026", label: "Research" },
  { href: "/pricing", label: "Pricing" },
  { href: "/early-access", label: "Early access" },
];

const footerCrew = [
  { href: "/survey", label: "Take the survey" },
  { href: "/support", label: "Support" },
];

const footerLegal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/refund-policy", label: "Refunds" },
];

function Logo({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`flex items-center gap-2 font-display text-3xl md:text-4xl font-medium tracking-tight text-ink hover:text-gold transition-colors ${className}`}
    >
      <span className="text-gold text-2xl md:text-3xl">★</span>
      <span>VÉLA</span>
    </Link>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-1 md:mb-2">{title}</p>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block py-3.5 md:py-1.5 font-mono text-xs md:text-xs uppercase tracking-[0.1em] text-inkMid hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      // Runs after the DOM has committed menuOpen=false, so the header
      // is no longer inert and can actually receive focus here — doing
      // this focus call eagerly (e.g. in the onClick handler) fails
      // silently because the button is still inert at that instant.
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        inert={menuOpen || undefined}
        className="border-b border-warmLine bg-cream sticky top-0 z-20"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3 md:py-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-[0.15em] text-inkMid">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`pb-1 border-b-2 transition-colors hover:text-gold ${
                    active ? "border-gold text-ink" : "border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/early-access"
              className="inline-block px-4 py-2 bg-gold text-ink font-semibold rounded-lg text-xs hover:bg-yellow-600 transition-colors"
            >
              Get early access
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/early-access"
              className="inline-flex items-center justify-center px-4 h-11 bg-gold text-ink font-semibold rounded-lg text-xs whitespace-nowrap"
            >
              Early access
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-11 h-11 text-ink flex-shrink-0"
            >
              <span className="text-2xl leading-none" aria-hidden="true">☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-30 bg-cream md:hidden motion-safe:animate-[menuIn_0.2s_ease-out] overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-3 border-b border-warmLine">
            <Logo onClick={closeMenu} />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
              className="flex items-center justify-center w-11 h-11 text-ink flex-shrink-0"
            >
              <span className="text-2xl leading-none" aria-hidden="true">✕</span>
            </button>
          </div>

          <nav className="px-6 py-8 flex flex-col">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="font-display text-4xl font-light text-ink py-2 hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-gold/40 my-6" />

            <div className="flex flex-col">
              {mobileSecondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="block py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-inkMid hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/early-access"
              onClick={closeMenu}
              className="mt-10 inline-block w-full text-center px-6 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-colors"
            >
              Get early access
            </Link>
          </nav>
        </div>
      )}

      <main inert={menuOpen || undefined} className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        {children}
      </main>

      <footer
        inert={menuOpen || undefined}
        className="w-full border-t border-warmLine bg-parchment"
      >
        <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">
          {pathname !== "/how-vela-works" && (
            <p className="font-sans text-xs text-inkFaint leading-relaxed mb-6 md:mb-10">
              A note on V&Eacute;LA: it provides personal planning insights based on your roster. It isn&rsquo;t
              medical advice or a substitute for your airline&rsquo;s fatigue-management requirements.{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-inkMid transition-colors">
                Full details &rarr;
              </Link>
            </p>
          )}

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            <div className="md:max-w-[220px]">
              <Logo className="mb-3" />
              <p className="font-sans text-sm text-inkMid leading-relaxed mb-2">
                VÉLA for Crew is a body-clock planning app for long-haul cabin crew.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint">
                Built by crew, for crew.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-12">
              <FooterColumn title="Explore" items={footerExplore} />
              <FooterColumn title="Crew" items={footerCrew} />
              <FooterColumn title="Legal" items={footerLegal} />
            </div>
          </div>

          <div className="mt-6 pt-5 md:mt-12 md:pt-6 border-t border-warmLine flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint">
              &copy; {new Date().getFullYear()} V&Eacute;LA &middot; Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA
            </p>
            <a
              href="https://www.instagram.com/velaforcrew"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint hover:text-gold transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
