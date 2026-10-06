export function SectionLabel({
  tone = "gold",
  className = "",
  children,
}: {
  tone?: "gold" | "faint";
  className?: string;
  children: React.ReactNode;
}) {
  const color = tone === "gold" ? "text-gold" : "text-inkFaint";
  return (
    <p
      className={`font-mono text-xs md:text-sm uppercase tracking-[0.25em] font-semibold ${color} ${className}`}
    >
      {children}
    </p>
  );
}
