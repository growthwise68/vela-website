import type { ElementType } from "react";

const sizes = {
  xl: "text-5xl md:text-6xl", // page H1
  lg: "text-3xl md:text-4xl", // major section H2
  md: "text-2xl md:text-3xl", // sub-section H2/H3
} as const;

/**
 * A heading with the brand's gold-rule underline treatment. Pass `as` to
 * control the actual semantic tag/level independently of visual size, so
 * heading levels never have to change to get a particular look.
 */
export function RuledHeading({
  as: Tag = "h2",
  size = "lg",
  tone = "ink",
  className = "",
  children,
}: {
  as?: ElementType;
  size?: keyof typeof sizes;
  tone?: "ink" | "cream";
  className?: string;
  children: React.ReactNode;
}) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  return (
    <Tag
      className={`font-display font-light leading-tight border-b-2 border-gold pb-4 ${sizes[size]} ${color} ${className}`}
    >
      {children}
    </Tag>
  );
}
