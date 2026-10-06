export function PullQuote({
  tone = "ink",
  className = "",
  children,
}: {
  tone?: "ink" | "cream";
  className?: string;
  children: React.ReactNode;
}) {
  const color = tone === "cream" ? "text-cream" : "text-ink";
  return (
    <p
      className={`font-display text-2xl md:text-3xl italic leading-relaxed pl-4 border-l-2 border-gold ${color} ${className}`}
    >
      {children}
    </p>
  );
}
