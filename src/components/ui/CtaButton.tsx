import Link from "next/link";

export function CtaButton({
  href,
  variant = "solid",
  className = "",
  children,
}: {
  href: string;
  variant?: "solid" | "outline";
  className?: string;
  children: React.ReactNode;
}) {
  const styles =
    variant === "solid"
      ? "bg-gold text-ink font-semibold hover:bg-yellow-600 hover:scale-105"
      : "border border-gold text-gold hover:bg-gold hover:text-ink";
  return (
    <Link
      href={href}
      className={`inline-block px-8 py-4 rounded-xl text-base transition-all ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
