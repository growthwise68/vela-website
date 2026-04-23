import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vela handles information when you use our services.",
};

export default function PrivacyPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Privacy policy</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Final – Preliminary Review — 23 April 2026 — pending counsel approval before app store submission
      </p>

      <div className="mt-4 rounded-lg border border-warmLine bg-parchment px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-inkMid">
          This policy has been reviewed against regulatory positioning and is ready for counsel final approval before public app store submission.
        </p>
      </div>

      <h2>Who we are</h2>
      <p>
        Vela is a <strong>lifestyle and readiness planning</strong> tool for people who work
        across time zones. It is operated by Iain Giffen (&ldquo;Vela&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;, or &ldquo;our&rdquo;). Vela is not a medical device and does not
        provide medical, health, or clinical advice.
      </p>
      <p>
        This policy describes what information we collect when you use the Vela website
        (<a className="text-gold underline decoration-gold/40" href="https://vela-website-lilac.vercel.app">vela-website-lilac.vercel.app</a>) and
        the Vela mobile application, how we use that information, and the choices you have.
      </p>

      <h2>Information we collect</h2>

      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Account information</strong> — when you create an account we collect an email
          address and any display name you choose.
        </li>
        <li>
          <strong>Schedule and roster data</strong> — duty periods, layover locations, and shift
          patterns you enter to generate readiness estimates. This information stays on your
          device or in your private account and is not shared with your employer or airline.
        </li>
        <li>
          <strong>Preferences and settings</strong> — sleep timing preferences, notification
          settings, and planning configuration you choose within the app.
        </li>
        <li>
          <strong>Support communications</strong> — messages you send us via the support page
          or email.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage analytics</strong> — aggregated or pseudonymous data about features
          used, session length, and error events. We use this to understand how the app is
          used and to improve it. We do not build individual profiles for advertising.
        </li>
        <li>
          <strong>Crash and performance reports</strong> — technical diagnostics that help us
          identify and fix issues.
        </li>
        <li>
          <strong>Device information</strong> — operating system version, app version, and
          device type, used for compatibility and support.
        </li>
      </ul>

      <h3>What we do not collect</h3>
      <p>
        Vela does not collect biometric data, vital signs, or clinical health measurements.
        Readiness scores are estimates derived from your schedule and published sleep science
        models — they are not health measurements. We do not access HealthKit, Google Fit, or
        wearable sensor data in the current version of the app.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To provide and operate the Vela service.</li>
        <li>To generate readiness and sleep timing estimates based on your schedule.</li>
        <li>To respond to support requests and communications.</li>
        <li>To improve the app using aggregated usage insights.</li>
        <li>To send service-related notifications if you opt in.</li>
        <li>To meet legal and compliance obligations.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use your data to provide medical
        advice, diagnostic assessments, or safety-critical guidance.
      </p>

      <h2>Information sharing</h2>
      <p>
        We share your information only in the following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers</strong> — we use third-party infrastructure providers
          (including Google Firebase for authentication, data storage, and analytics) to
          operate the service. These providers process data on our behalf under their own
          privacy and security standards.
        </li>
        <li>
          <strong>Legal requirements</strong> — we may disclose information if required by law,
          regulation, or valid legal process.
        </li>
        <li>
          <strong>Business transfers</strong> — if Vela is acquired or merges with another
          entity, your information may transfer as part of that transaction. We will notify you
          of any such change.
        </li>
      </ul>
      <p>
        We do not share your roster or schedule data with your employer, airline, or any
        regulatory authority unless required by law.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain your account information and schedule data for as long as your account is
        active. You may request deletion of your account and associated data at any time (see
        &ldquo;Your choices&rdquo; below). Aggregated analytics data that cannot identify you
        individually may be retained for longer to support product improvement.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>Account deletion</strong> — you can delete your account and associated data
          from within the app settings. Deletion is permanent and cannot be undone. This
          process will be documented in the app before public launch.
        </li>
        <li>
          <strong>Access and correction</strong> — you can update your account details and
          schedule information at any time within the app.
        </li>
        <li>
          <strong>Analytics opt-out</strong> — where platform controls allow, you can limit
          analytics collection. This does not affect core app functionality.
        </li>
        <li>
          <strong>Regional rights</strong> — depending on your location, you may have
          additional rights under applicable privacy law (for example, GDPR in the European
          Economic Area, or UK GDPR). Contact us to exercise those rights.
        </li>
      </ul>

      <h2>Children</h2>
      <p>
        Vela is intended for adults. We do not knowingly collect personal information from
        anyone under the age of 16. If you believe we have inadvertently collected such
        information, please contact us and we will delete it promptly.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your information.
        No system is completely secure; we encourage you to use a strong password and to
        contact us if you notice any suspicious activity related to your account.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the date at
        the top of this page. For material changes, we will provide notice through the app or
        by email where we have your address.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, account deletion requests, or to exercise your data
        rights, use the{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
      </p>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint">
        Version 1.0 — 23 April 2026 — final preliminary review
      </p>
    </article>
  );
}
