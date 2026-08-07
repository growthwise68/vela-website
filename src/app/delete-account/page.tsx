import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description:
    "How to delete your VÉLA account and data, from inside the app or by request — for App Store and Google Play account-deletion requirements.",
};

const supportEmail = "founder@velaforcrew.com";

export default function DeleteAccountPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Delete your account</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Version 1.0 — 27 July 2026
      </p>

      <p>
        You can permanently delete your VÉLA account and the data associated with it at any time.
        There are two ways to do it: directly in the app, or by emailing us if you no longer have
        access to the app.
      </p>

      <h2>Option 1 — delete in the app (recommended)</h2>
      <ol>
        <li>Open VÉLA and sign in.</li>
        <li>
          Go to <strong>Profile</strong>.
        </li>
        <li>
          Scroll to <strong>Delete account</strong> and tap it.
        </li>
        <li>Confirm your password when asked, then confirm the deletion.</li>
      </ol>
      <p>
        Deletion happens immediately once you confirm and <strong>cannot be undone</strong>. You
        will be signed out and will not be able to sign back in with that account.
      </p>

      <h2>Option 2 — request deletion by email</h2>
      <p>
        If you can&rsquo;t open the app — you&rsquo;ve lost your device, uninstalled it, or
        forgotten your password — email us at{" "}
        <a className="text-gold underline decoration-gold/40" href={`mailto:${supportEmail}?subject=Delete%20my%20VÉLA%20account`}>
          {supportEmail}
        </a>{" "}
        from the address on your account and ask us to delete it. We may ask a short question or
        two to confirm it&rsquo;s really you before we act on the request, then we&rsquo;ll delete
        your account and confirm back to you by email. We aim to complete email requests within{" "}
        <strong>30 days</strong>, and usually much sooner.
      </p>
      <p>
        You can also reach us through the{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
      </p>

      <h2>What gets deleted</h2>
      <p>Deleting your account removes:</p>
      <ul>
        <li>Your account itself (email, sign-in credentials, display name).</li>
        <li>Your roster and schedule data, and any assembled duty/flight information.</li>
        <li>Your profile, preferences, and planning settings (chronotype, sleep targets, and similar).</li>
        <li>Adherence feedback and any other data tied to your account.</li>
      </ul>
      <p>
        Some information cannot be deleted immediately or is kept for a limited time for legal,
        billing, or security reasons even after your account is gone:
      </p>
      <ul>
        <li>
          <strong>Subscription and transaction records</strong> — if you have a paid subscription,
          our payment platforms and RevenueCat retain billing records as required for tax,
          accounting, and fraud-prevention purposes. Deleting your VÉLA account does{" "}
          <strong>not</strong> cancel an active subscription — cancel it separately in your App
          Store, Google Play, or Paddle subscription settings first, or ask us to help.
        </li>
        <li>
          <strong>Aggregated or anonymised analytics</strong> — usage data that has already been
          aggregated or stripped of anything that could identify you may be retained to help us
          understand product usage; it cannot be used to identify you.
        </li>
        <li>
          <strong>Backups</strong> — data may persist in encrypted backups for a short period
          before being purged in the normal backup-rotation cycle.
        </li>
      </ul>
      <p>
        For the full detail on what we collect and why, see our{" "}
        <a className="text-gold underline decoration-gold/40" href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about account deletion? Contact us at{" "}
        <a className="text-gold underline decoration-gold/40" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>{" "}
        or via the{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
      </p>
      <p>
        Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
      </p>
    </article>
  );
}
