export type TocItem = { id: string; label: string };

/**
 * Sticky table of contents shown in the left margin on wide desktop
 * viewports only (there isn't reliably enough margin before xl). Own
 * background so it stays legible regardless of which band color is
 * scrolled behind it. Pure navigation chrome — the labels here are short
 * paraphrases for the sidebar; the actual headings they link to keep
 * their exact original text and level.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  return (
    <nav
      aria-label="On this page"
      className="hidden xl:block fixed top-28 left-8 w-[200px] max-h-[70vh] overflow-y-auto rounded-xl border border-warmLine bg-cream/95 backdrop-blur-sm px-4 py-5 z-10"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint mb-3">
        On this page
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="font-sans text-sm text-inkMid hover:text-gold transition-colors leading-snug"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
