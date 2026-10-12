"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ATTRIBUTION_STORAGE_KEY,
  IOS_APP_STORE_URL,
  ANDROID_PLAY_STORE_URL,
  type PayAttribution,
} from "@/lib/pay/config";
import {
  mergeAttributionFirstTouch,
  parseAttributionJson,
  pickAttributionFromSearchParams,
} from "@/lib/pay/attribution";
import { buildRevenueCatCheckoutUrl } from "@/lib/pay/checkout-url";
import { buildPayPageUrl } from "@/lib/pay/pay-page-url";
import { ReferralSharePanel } from "@/components/pay/ReferralSharePanel";

type PayCheckoutClientProps = {
  siteOrigin: string;
};

export function PayCheckoutClient({ siteOrigin }: PayCheckoutClientProps) {
  const searchParams = useSearchParams();
  const [attribution, setAttribution] = useState<PayAttribution>({});

  useEffect(() => {
    const incoming = pickAttributionFromSearchParams(searchParams);
    const stored = parseAttributionJson(
      typeof window !== "undefined"
        ? window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
        : null
    );
    const merged = mergeAttributionFirstTouch(stored, incoming);
    setAttribution(merged);
    try {
      window.sessionStorage.setItem(
        ATTRIBUTION_STORAGE_KEY,
        JSON.stringify(merged)
      );
    } catch {
      /* private mode / blocked storage */
    }
  }, [searchParams]);

  const checkoutUrl = useMemo(
    () => buildRevenueCatCheckoutUrl(attribution),
    [attribution]
  );

  const sharePayUrl = useMemo(
    () => buildPayPageUrl(siteOrigin, attribution),
    [siteOrigin, attribution]
  );

  const checkoutReady = Boolean(checkoutUrl);

  return (
    <div className="space-y-10">
      <div className="rounded-[18px] border border-warmLine bg-parchment/50 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-2">
          Sandbox checkout
        </p>
        <p className="font-sans text-sm text-inkMid leading-relaxed mb-6">
          Pay with Stripe via RevenueCat. After payment, open VÉLA on your phone — Core
          should already be active once you sign in. No code to paste.
        </p>
        <a
          href={checkoutReady ? checkoutUrl : undefined}
          aria-disabled={!checkoutReady}
          className={`inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl px-8 py-3 font-mono text-sm font-semibold uppercase tracking-[0.03em] transition-colors ${
            checkoutReady
              ? "bg-gold text-ink hover:bg-yellow-600"
              : "bg-warmLine text-inkFaint pointer-events-none"
          }`}
          data-testid="pay-checkout-cta"
        >
          Continue to secure checkout
        </a>
        <p className="mt-4 font-sans text-xs text-inkFaint">
          Test cards only — sandbox Web Purchase Link. App Store / Play subscriptions are
          separate.
        </p>
      </div>

      <ReferralSharePanel payPageUrl={sharePayUrl} />

      {(IOS_APP_STORE_URL || ANDROID_PLAY_STORE_URL) && (
        <div className="rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-cream/70 px-6 py-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-inkFaint mb-2">
            No app yet?
          </p>
          <p className="font-sans text-sm text-inkMid mb-4">
            You can install VÉLA before or after checkout — web purchases unlock Core in the
            app once you sign in.
          </p>
          <div className="flex flex-wrap gap-3">
            {IOS_APP_STORE_URL ? (
              <a
                href={IOS_APP_STORE_URL}
                className="font-mono text-xs uppercase tracking-[0.1em] text-gold underline underline-offset-4"
                rel="noreferrer"
                target="_blank"
              >
                App Store
              </a>
            ) : null}
            {ANDROID_PLAY_STORE_URL ? (
              <a
                href={ANDROID_PLAY_STORE_URL}
                className="font-mono text-xs uppercase tracking-[0.1em] text-gold underline underline-offset-4"
                rel="noreferrer"
                target="_blank"
              >
                Google Play
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
