import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "VÉLA subscription pricing — Core and Founding Crew.",
};

type Plan = {
  name: string;
  price: string;
  period: string;
  note?: string;
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Core — Monthly",
    price: "$19.99",
    period: "/ month",
    features: [
      "Full roster integration",
      "Day-by-day sleep, light & caffeine guidance",
      "Insights, including full history",
      "Hydration tracking",
    ],
  },
  {
    name: "Core — Annual",
    price: "$149.99",
    period: "/ year",
    note: "Includes a 14-day free trial",
    features: [
      "Everything in Core Monthly",
      "Save 37% versus paying monthly",
    ],
  },
  {
    name: "Founding Crew — Annual",
    price: "$99.99",
    period: "/ year",
    note: "Limited, time-boxed founding rate — locked in for as long as you stay subscribed",
    features: [
      "Everything in Core Annual",
      "Save 58% versus paying monthly",
      "Founding member status, locked-in price",
      "Charges immediately — no trial",
    ],
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-light text-ink">Pricing</h1>
        <p className="font-sans text-inkMid">
          One plan, priced two ways. Every VÉLA subscription includes full roster integration and
          personalised sleep, light, and caffeine guidance for your schedule.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[18px] border p-6 ${
              plan.highlight
                ? "border-gold/50 bg-parchment/80"
                : "border-warmLine bg-parchment/50"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
              {plan.name}
            </p>
            <p className="mt-3 font-display text-3xl font-light text-ink">
              {plan.price}
              <span className="ml-1 font-sans text-sm text-inkMid">{plan.period}</span>
            </p>
            {plan.note && (
              <p className="mt-2 font-sans text-xs text-inkFaint">{plan.note}</p>
            )}
            <ul className="mt-5 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="font-sans text-sm text-inkMid">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rounded-[18px] border border-warmLine bg-parchment/50 p-6 space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">
          Good to know
        </p>
        <p className="font-sans text-sm text-inkMid">
          All prices are in USD. Subscriptions renew automatically and can be cancelled at any time
          from your account settings.
        </p>
        <p className="font-sans text-sm text-inkMid">
          VÉLA subscriptions are available through the App Store, Google Play, or directly at
          velaforcrew.com. Purchases made directly through this site are processed securely by{" "}
          <a
            className="text-gold underline decoration-gold/40"
            href="https://www.paddle.com"
            target="_blank"
            rel="noreferrer"
          >
            Paddle.com
          </a>
          , our authorized reseller and merchant of record.
        </p>
        <p className="font-sans text-sm text-inkMid">
          Questions about pricing or billing? See our{" "}
          <a className="text-gold underline decoration-gold/40" href="/refund-policy">
            refund policy
          </a>{" "}
          or contact us via the{" "}
          <a className="text-gold underline decoration-gold/40" href="/support">
            support page
          </a>
          .
        </p>
      </section>

      <p className="font-sans text-xs text-inkFaint">
        Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
      </p>
    </div>
  );
}
