export function PlanRows({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`divide-y divide-ink/15 ${className}`}>{children}</div>;
}

export function PlanRow({
  label,
  value,
  mono = true,
  className = "",
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-3 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5 ${className}`}
    >
      <span className="font-sans text-base text-inkMid">{label}</span>
      <span
        className={`${mono ? "font-mono" : "font-sans"} text-base text-ink text-right max-[599px]:text-left`}
      >
        {value}
      </span>
    </div>
  );
}
