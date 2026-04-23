import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Vela website and app.",
};

export default function TermsPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Terms of service</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Draft — last updated 23 April 2026 — counsel review before production launch
      </p>

      <h2>Agreement</h2>
      <p>
        By using Vela&rsquo;s website or applications, you agree to these terms. Vela is a
        <strong> lifestyle planning</strong> product. It does not provide medical, health, or
        clinical advice. All outputs are informational estimates for planning purposes only.
      </p>

      <h2>No safety or operational guarantee</h2>
      <p>
        Vela is <strong>not a safety system</strong>. You remain responsible for your fitness for
        duty. Readiness estimates do not replace airline fitness-for-duty assessments or an
        approved Fatigue Risk Management System (FRMS). Vela is <strong>not</strong> an approved
        FRMS component under ICAO, FAA, EASA, or any national aviation authority.
      </p>

      <h2>Accuracy of estimates</h2>
      <p>
        Scores and fatigue-related estimates are based on population-level sleep science models
        and assumed patterns. Individual results may vary. Estimates are not guarantees of
        actual readiness or alertness.
      </p>

      <h2>Professional advice</h2>
      <p>
        If you have persistent fatigue, sleep difficulties, or health concerns, consult a
        qualified professional.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Vela and its creators are not liable for
        decisions made using the app&rsquo;s estimates or suggestions.
      </p>

      <h2>Changes</h2>
      <p>We may update these terms. Material changes should be posted here with a new date.</p>
    </article>
  );
}
