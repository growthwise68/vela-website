import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description: "Contact and support for Vela.",
};

const supportName = "Iain Giffen";
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ?? "";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-light text-ink">Support</h1>
      <p className="font-sans text-inkMid">
        For product help, Vela&rsquo;s public contact is below. This page is intended to match what
        you list in App Store Connect and Google Play (support URL and email, where required).
      </p>
      <div className="rounded-[18px] border border-warmLine bg-parchment/80 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">Contact</p>
        <p className="mt-2 font-sans text-base text-ink">{supportName}</p>
        {supportEmail ? (
          <p className="mt-2 font-sans text-sm text-inkMid">
            Email:{" "}
            <a
              className="text-gold underline decoration-gold/40"
              href={`mailto:${supportEmail}`}
            >
              {supportEmail}
            </a>
          </p>
        ) : (
          <p className="mt-3 font-sans text-sm text-inkMid">
            When your <strong>final site URL</strong> and public support inbox are ready, set{" "}
            <code className="font-mono text-ink">NEXT_PUBLIC_SUPPORT_EMAIL</code> in Vercel so it
            appears here (use the <strong>same</strong> address in App Store Connect and Google
            Play). It is normal to ship the site first and add the email afterward.
          </p>
        )}
      </div>
    </div>
  );
}
