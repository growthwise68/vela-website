"use client";

/**
 * Citation superscript. Clicking it opens the collapsed sources panel
 * (id="sources-panel") before the browser jumps to the #source-N anchor,
 * so the anchor target is actually visible when the page scrolls to it.
 */
export function Cite({ n }: { n: number[] }) {
  const handleClick = () => {
    const panel = document.getElementById("sources-panel") as HTMLDetailsElement | null;
    if (panel && !panel.open) panel.open = true;
  };

  return (
    <sup className="font-mono text-xs text-gold">
      {n.map((x, i) => (
        <span key={x}>
          {i > 0 && <span className="text-inkFaint">,</span>}
          <a href={`#source-${x}`} onClick={handleClick} className="hover:underline underline-offset-1">
            {x}
          </a>
        </span>
      ))}
    </sup>
  );
}
