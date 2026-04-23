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
        Draft — last updated 23 April 2026 — counsel review before production launch
      </p>

      <h2>Overview</h2>
      <p>
        This page describes how we approach privacy for the Vela website and services. The
        product is a <strong>lifestyle and readiness planning</strong> tool for people who
        travel across time zones. It is <strong>not</strong> a medical device. Align final text
        with the app&rsquo;s data practices and your counsel before relying on it for app store
        submission.
      </p>

      <h2>Information we may collect</h2>
      <p>
        Typical categories can include account identifiers, product analytics in aggregated or
        pseudonymous form, and support communications. Your finished policy must list exactly
        what the app and site collect, consistent with platform disclosures (Apple App Privacy,
        Google Play Data safety) and in-app behaviour.
      </p>

      <h2>How we use information</h2>
      <p>
        To operate the service, improve the product, respond to support requests, and meet legal
        obligations. Vela does not provide medical advice; any health-adjacent data categories must
        be declared accurately in store consoles.
      </p>

      <h2>Your choices</h2>
      <p>
        Account deletion, access, and regional rights depend on the shipped app. Mirror the
        in-app account deletion and data handling promises here when those flows are final (see
        internal Apple readiness checklist in the app repository).
      </p>

      <h2>Contact</h2>
      <p>
        Use the <a className="text-gold underline decoration-gold/40" href="/support">support</a>{" "}
        page for privacy-related requests once a contact address is set.
      </p>
    </article>
  );
}
