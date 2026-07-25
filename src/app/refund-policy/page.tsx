import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds work for VÉLA subscriptions.",
};

export default function RefundPolicyPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Refund policy</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Version 1.1 — 25 July 2026
      </p>

      <p>
        We want VÉLA to be worth what you paid for it. If something isn&rsquo;t working for you,
        talk to us first — we&rsquo;re a small team and we read every message.
      </p>

      <h2>Purchased through the App Store or Google Play</h2>
      <p>
        Refunds for subscriptions purchased through Apple&rsquo;s App Store or Google Play are
        handled directly by Apple or Google under their own refund policies — we do not have the
        ability to issue these refunds ourselves. We&rsquo;re glad to help you find the right
        place to request one; just{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">
          contact us
        </a>{" "}
        and we&rsquo;ll point you in the right direction.
      </p>

      <h2>Purchased directly through velaforcrew.com</h2>
      <p>
        Subscriptions purchased directly through this website are processed by{" "}
        <a
          className="text-gold underline decoration-gold/40"
          href="https://www.paddle.com"
          target="_blank"
          rel="noreferrer"
        >
          Paddle.com
        </a>
        , our authorized reseller and merchant of record. If you contact us within{" "}
        <strong>14 days</strong> of purchase, we&rsquo;ll issue a full refund to your original
        payment method, processed by Paddle.
      </p>

      <h2>How to request one</h2>
      <p>
        Email{" "}
        <a className="text-gold underline decoration-gold/40" href="mailto:founder@velaforcrew.com">
          founder@velaforcrew.com
        </a>{" "}
        with your account email and the reason for your request. We aim to respond to all support
        requests within <strong>two business days</strong>. As a small team, coverage may be
        slower on nights and weekends.
      </p>

      <h2>Cancelling instead of refunding</h2>
      <p>
        You can cancel your subscription at any time from your device&rsquo;s subscription
        settings (App Store or Google Play) or from your account settings if you subscribed
        directly. Cancelling stops future renewals; it does not itself trigger a refund for the
        current billing period unless approved per the policy above.
      </p>

      <p className="mt-8 font-sans text-xs text-inkFaint">
        Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
      </p>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint">
        Version 1.1 — 25 July 2026
      </p>
    </article>
  );
}
