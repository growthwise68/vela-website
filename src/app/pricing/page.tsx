import type { Metadata } from "next";
import Link from "next/link";
import { mobileApplication } from "@/lib/structured-data";
import { FullBleed } from "@/components/FullBleed";

export const metadata: Metadata = {
  title: "Pricing and Free Trial",
  description:
    "VÉLA Core is $14.99/month or $139.99/year. Founding Crew is $99.99/year, locked in for as long as you stay. Every plan starts with a 14-day free trial.",
  alternates: {
    canonical: "https://velaforcrew.com/pricing",
  },
};

type Plan = {
  id: string;
  label: string;
  tag?: string;
  price: string;
  strikePrice?: string;
  period: string;
  sub?: string;
  note?: string;
  pill: string;
  features: string[];
  cta: string;
  style: "outline" | "solid";
  order: string;
};

const plans: Plan[] = [
  {
    id: "monthly",
    label: "Core — Monthly",
    price: "$14.99",
    period: "/ month",
    pill: "14 days free",
    features: [
      "Full roster integration",
      "Day-by-day sleep, light & caffeine guidance",
      "Insights, including full history",
      "Meal timing",
    ],
    cta: "Start free trial",
    style: "outline",
    order: "order-2 md:order-1",
  },
  {
    id: "founding",
    label: "Founding Crew — Annual",
    tag: "Founding rate · ends at launch",
    price: "$99.99",
    strikePrice: "$139.99",
    period: "/ year",
    sub: "$8.33/month, billed yearly",
    note: "Locked in for as long as you stay subscribed.",
    pill: "14 days free",
    features: [
      "Everything in Core Annual",
      "$40 less than Core Annual, every year",
      "44% less than paying monthly",
      "Founding member status",
    ],
    cta: "Claim the founding rate",
    style: "solid",
    order: "order-1 md:order-2",
  },
  {
    id: "annual",
    label: "Core — Annual",
    price: "$139.99",
    period: "/ year",
    sub: "$11.67/month, billed yearly",
    pill: "14 days free",
    features: ["Everything in Core Monthly", "Save $39.89 a year versus monthly"],
    cta: "Start free trial",
    style: "outline",
    order: "order-3 md:order-3",
  },
];

export default function PricingPage() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", ...mobileApplication }),
        }}
      />

      {/* HEADER */}
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            Pricing
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
            Pricing
          </h1>
          <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed max-w-2xl">
            One plan, three ways to pay. Every VÉLA subscription includes full roster integration
            and personalised sleep, light, caffeine and meal guidance for your schedule.
          </p>
        </div>
      </FullBleed>

      {/* PLAN CARDS */}
      <FullBleed className="bg-cream pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 md:items-end">
            {plans.map((plan) => (
              <div key={plan.id} className={plan.order}>
                <div
                  className={`flex flex-col rounded-[18px] ${
                    plan.style === "solid"
                      ? "p-7 md:p-9 border-2 border-gold bg-night shadow-[0_12px_32px_rgba(26,37,64,0.35)]"
                      : "p-6 md:p-7 border border-warmLine bg-parchment/50"
                  }`}
                >
                  {plan.tag ? (
                    <span className="self-start mb-4 inline-block rounded-full bg-gold px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-ink font-semibold">
                      {plan.tag}
                    </span>
                  ) : (
                    <div className="h-[22px] mb-4" aria-hidden="true" />
                  )}

                  <p
                    className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                      plan.style === "solid" ? "text-cream/60" : "text-inkFaint"
                    }`}
                  >
                    {plan.label}
                  </p>

                  <div className="mt-3 flex items-baseline gap-2 flex-wrap">
                    <span
                      className={`font-display font-light ${
                        plan.style === "solid"
                          ? "text-cream text-5xl md:text-6xl"
                          : "text-ink text-4xl md:text-5xl"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.strikePrice && (
                      <span
                        className={`font-display text-lg line-through ${
                          plan.style === "solid" ? "text-cream/40" : "text-inkFaint"
                        }`}
                      >
                        {plan.strikePrice}
                      </span>
                    )}
                    <span className={`font-sans text-sm ${plan.style === "solid" ? "text-cream/70" : "text-inkMid"}`}>
                      {plan.period}
                    </span>
                  </div>

                  {plan.sub && (
                    <p className={`mt-1 font-mono text-[11px] ${plan.style === "solid" ? "text-cream/60" : "text-inkFaint"}`}>
                      {plan.sub}
                    </p>
                  )}
                  {plan.note && (
                    <p className={`mt-2 font-sans text-xs ${plan.style === "solid" ? "text-cream/70" : "text-inkMid"}`}>
                      {plan.note}
                    </p>
                  )}

                  <span className="mt-4 self-start inline-block rounded-full border border-gold/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-gold">
                    {plan.pill}
                  </span>

                  <ul className="mt-6 space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex gap-2 font-sans text-sm leading-snug ${
                          plan.style === "solid" ? "text-cream/80" : "text-inkMid"
                        }`}
                      >
                        <span className="text-gold flex-shrink-0">—</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/early-access"
                    className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                      plan.style === "solid"
                        ? "bg-gold text-ink font-semibold hover:bg-yellow-600"
                        : "border border-gold text-gold hover:bg-gold hover:text-ink"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* GOOD TO KNOW */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="not-prose rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-cream/70 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint mb-3">
              Good to know
            </p>
            <div className="space-y-3">
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                All prices are in USD and are the same in every market. Depending on where you
                live, sales tax or VAT may be added at checkout &mdash; the exact total for your
                country is always shown before you pay, and nothing is charged until you confirm
                it.
              </p>
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                Subscriptions renew automatically until cancelled. You can cancel at any time: if
                you subscribed through the App Store or Google Play, use your device&rsquo;s
                subscription settings; if you subscribed directly on this site, use the
                manage-subscription link in your purchase receipt, or{" "}
                <a className="text-gold underline decoration-gold/40" href="/support">
                  contact us
                </a>{" "}
                and we will cancel it for you. Cancelling stops future renewals.
              </p>
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                VÉLA subscriptions are available through the App Store, Google Play, or directly
                at velaforcrew.com. Purchases made directly through this site are processed
                securely by{" "}
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
              <p className="font-sans text-sm text-inkMid leading-relaxed">
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
            </div>
          </div>

          <p className="mt-6 font-sans text-xs text-inkFaint">
            Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
          </p>
        </div>
      </FullBleed>
    </div>
  );
}
