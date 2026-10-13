"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { pickAttributionFromSearchParams } from "@/lib/pay/attribution";
import { buildRevenueCatCheckoutUrl } from "@/lib/pay/checkout-url";
import { buildPayPageUrl } from "@/lib/pay/pay-page-url";
import { ReferralSharePanel } from "@/components/pay/ReferralSharePanel";

type PayCheckoutClientProps = {
  siteOrigin: string;
};

export function PayCheckoutClient({ siteOrigin }: PayCheckoutClientProps) {
  const searchParams = useSearchParams();

  const attribution = useMemo(
    () => pickAttributionFromSearchParams(searchParams),
    [searchParams]
  );

  const checkoutUrl = useMemo(() => buildRevenueCatCheckoutUrl(), []);

  const sharePayUrl = useMemo(
    () => buildPayPageUrl(siteOrigin, attribution),
    [siteOrigin, attribution]
  );

  if (!checkoutUrl) {
    return (
      <p className="font-sans text-sm text-inkMid" data-testid="pay-not-available">
        Not available yet
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <div className="rounded-[18px] border border-warmLine bg-parchment/50 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-2">
          Web checkout
        </p>
        <p className="font-sans text-sm text-inkMid leading-relaxed mb-6">
          Pay with Stripe via RevenueCat. After payment, open VÉLA on your phone and sign in —
          Core should be ready. Pasting a redeem code is only a rare backup.
        </p>
        <a
          href={checkoutUrl}
          className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl px-8 py-3 font-mono text-sm font-semibold uppercase tracking-[0.03em] transition-colors bg-gold text-ink hover:bg-yellow-600"
          data-testid="pay-checkout-cta"
        >
          Continue to secure checkout
        </a>
      </div>

      <ReferralSharePanel payPageUrl={sharePayUrl} />
    </div>
  );
}
