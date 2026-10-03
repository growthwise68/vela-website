import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crew Body Clock Survey",
  description: "A 3-minute anonymous survey for long-haul cabin crew about sleep, fatigue and rosters. Your answers shape how VÉLA gets built.",
};

export default function SurveyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
