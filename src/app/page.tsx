import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
        Long-haul cabin crew
      </p>
      <h1 className="font-display text-4xl font-light leading-tight text-ink md:text-5xl">
        Plan rest and readiness around your roster
      </h1>
      <p className="max-w-2xl font-sans text-lg font-light text-inkMid">
        Vela helps you see how sleep timing and time zones may affect your readiness—using
        transparent, schedule-based estimates. Built for crew, with science you can
        understand.
      </p>
      <div className="rounded-[20px] border border-warmLine bg-parchment/80 p-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-inkFaint">
          Important
        </p>
        <p className="mt-2 font-sans text-sm text-inkMid">
          Vela is a <strong className="font-medium text-ink">personal lifestyle planning</strong> tool. It
          is not a medical device and does not provide medical, health, or safety advice. Readiness
          scores are estimates for personal planning only—not for safety-critical or fitness-for-duty
          decisions. Vela is not part of any airline Fatigue Risk Management System (FRMS) and does
          not replace your operator's fitness-for-duty requirements or professional medical advice.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">
          App store links
        </span>
        <p className="font-sans text-sm text-inkMid">
          Add TestFlight, App Store, and Play links here when available.
        </p>
      </div>
    </div>
  );
}
