import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the VÉLA website and app.",
};

export default function TermsPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Terms of service</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Version 2.0 — 14 June 2026
      </p>

      <h2>Agreement to these terms</h2>
      <p>
        By accessing the VÉLA website or using the VÉLA mobile application, you agree to be
        bound by these terms of service. If you do not agree, please do not use VÉLA.
      </p>
      <p>
        VÉLA is operated by Vela4Crew Inc., a Delaware corporation (&ldquo;VÉLA&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
      </p>

      <h2>What VÉLA is</h2>
      <p>
        VÉLA is a <strong>lifestyle and readiness planning</strong> tool for people who work
        across time zones, primarily long-haul cabin crew. It uses published sleep science
        models and your schedule to generate readiness estimates and sleep timing suggestions.
      </p>
      <p>
        All outputs — including readiness scores, fatigue estimates, and sleep timing
        suggestions — are <strong>informational estimates for personal planning purposes
        only</strong>. They are not medical assessments, diagnostic results, or safety
        determinations.
      </p>

      <h2>No medical advice</h2>
      <p>
        VÉLA does not provide medical, health, or clinical advice. Nothing in the app or on
        this website should be interpreted as a medical recommendation. If you have concerns
        about fatigue, sleep, or your health, consult a qualified healthcare professional.
      </p>

      <h2>No safety or operational guarantee</h2>
      <p>
        VÉLA is <strong>not a safety system</strong>. You remain solely responsible for your
        own fitness for duty. Readiness estimates do not replace your employer&rsquo;s
        fitness-for-duty assessments, crew scheduling requirements, or applicable regulations.
      </p>
      <p>
        VÉLA is <strong>not</strong> an approved Fatigue Risk Management System (FRMS)
        component under ICAO, FAA, EASA, or any national aviation authority. It is a personal
        lifestyle planning tool and must not be used as a substitute for any operator-approved
        FRMS.
      </p>

      <h2>Accuracy of estimates</h2>
      <p>
        Readiness scores and fatigue estimates are based on population-level sleep science
        models and the schedule information you enter. They reflect assumed patterns, not
        measured physiological data. Individual results may vary significantly. Estimates are
        not guarantees of actual readiness, alertness, or performance.
      </p>

      <h2>Your account</h2>
      <p>
        You are responsible for maintaining the security of your account credentials and for
        all activity that occurs under your account. Notify us promptly if you suspect
        unauthorised access. We reserve the right to suspend accounts that violate these terms.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use VÉLA for any unlawful purpose or in violation of any applicable law.</li>
        <li>Attempt to reverse-engineer, decompile, or extract source code from the app.</li>
        <li>Interfere with or disrupt the integrity or performance of VÉLA or its servers.</li>
        <li>
          Use VÉLA in any context where its outputs could be treated as safety-critical or
          operationally authoritative.
        </li>
        <li>Misrepresent VÉLA&rsquo;s capabilities to third parties, including employers or regulators.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The VÉLA name, logo, app design, and all content we create are our property or
        licensed to us. Your schedule data and preferences that you enter remain yours. We
        do not claim ownership of the information you provide.
      </p>
      <p>
        You grant us a limited licence to process your data solely to provide the service to
        you, as described in our{" "}
        <a className="text-gold underline decoration-gold/40" href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Third-party services</h2>
      <p>
        VÉLA uses third-party infrastructure (including Google Firebase, Supabase, MailerLite,
        and Vercel) to operate the service. Those services are governed by their own terms and
        privacy policies. We are not responsible for the practices of third-party services we
        use to operate VÉLA.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Vela4Crew Inc. and its officers,
        employees, and contractors shall not be liable for any direct, indirect, incidental,
        special, or consequential loss arising from your use of, or inability to use, the app
        or website — including any decisions made based on readiness estimates or planning
        suggestions provided by VÉLA.
      </p>
      <p>
        VÉLA is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied,
        including warranties of merchantability, fitness for a particular purpose, or
        non-infringement.
      </p>

      <h2>Changes to the service</h2>
      <p>
        We may modify, suspend, or discontinue any part of VÉLA at any time. We will
        endeavour to give reasonable notice of material changes where practicable.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. When we do, we will revise the date at
        the top of this page. Continued use of VÉLA after changes take effect constitutes
        your acceptance of the updated terms. For material changes, we will provide notice
        through the app or by email.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Delaware, United States, without
        regard to its conflict of law provisions. Any disputes arising under these terms shall
        be subject to the exclusive jurisdiction of the courts located in Delaware.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be directed to{" "}
        <a className="text-gold underline decoration-gold/40" href="mailto:founder@velaforcrew.com">
          founder@velaforcrew.com
        </a>{" "}
        or via the{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
      </p>
      <p>
        Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
      </p>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint">
        Version 2.0 — 14 June 2026
      </p>
    </article>
  );
}
