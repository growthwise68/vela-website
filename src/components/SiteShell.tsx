import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-warmLine bg-cream/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-display text-4xl font-medium tracking-tight text-ink hover:text-gold transition-colors">
            <span className="text-gold text-3xl">★</span>
            <span>VÉLA</span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-inkMid transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-warmLine bg-parchment/60">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-inkFaint font-semibold">
            &copy; {new Date().getFullYear()} Véla. Lifestyle planning for long-haul crew.
          </p>
        </div>
      </footer>
    </div>
  );
}
