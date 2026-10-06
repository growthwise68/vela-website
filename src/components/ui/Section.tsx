import { FullBleed } from "@/components/FullBleed";

export type Tone = "cream" | "sand" | "navy";

const toneBg: Record<Tone, string> = {
  cream: "bg-cream",
  sand: "bg-parchment",
  navy: "bg-night",
};

const widths = {
  article: "max-w-3xl", // ~65ch reading column
  wide: "max-w-[1120px]", // full section width for split layouts, grids
} as const;

/**
 * Full-bleed section band (edge to edge, escapes the shared layout's
 * max-w-3xl <main>) with a tone (cream / sand / navy) and an inner
 * container at either reading width ("article") or section width ("wide").
 */
export function Section({
  tone = "cream",
  width = "article",
  padding = "py-14 md:py-20",
  id,
  className = "",
  innerClassName = "",
  children,
}: {
  tone?: Tone;
  width?: keyof typeof widths;
  /** Vertical padding utility classes. Pass "" to supply your own via
   * className instead — mixing both risks conflicting py-* utilities,
   * since Tailwind doesn't guarantee which wins by class-string order. */
  padding?: string;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <FullBleed id={id} className={`${toneBg[tone]} ${padding} ${className}`}>
      <div className={`${widths[width]} mx-auto px-6 md:px-10 ${innerClassName}`}>{children}</div>
    </FullBleed>
  );
}
