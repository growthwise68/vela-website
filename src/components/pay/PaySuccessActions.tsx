"use client";

import React from "react";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  VELA_OPEN_APP_URL,
} from "@/lib/pay/config";

export function PaySuccessActions() {
  const openAppHref = VELA_OPEN_APP_URL;

  return (
    <div className="space-y-8" data-testid="pay-success-actions">
      <div className="rounded-[18px] border-2 border-gold bg-night p-6 md:p-8 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60 mb-3">
          Next step
        </p>
        <a
          href={openAppHref}
          className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-gold px-10 py-3 font-mono text-sm font-semibold uppercase tracking-[0.03em] text-ink hover:bg-yellow-600 transition-colors"
          data-testid="open-vela-cta"
        >
          Open Véla
        </a>
        <p className="mt-4 font-sans text-sm text-cream/75 leading-relaxed max-w-md mx-auto">
          Sign in with the same account you used at checkout. Core should already be on — no
          code to paste.
        </p>
      </div>

      <div className="rounded-[14px] border border-warmLine bg-parchment/50 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-3">
          Don&apos;t have the app yet?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          {IOS_APP_STORE_URL ? (
            <a
              href={IOS_APP_STORE_URL}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border-2 border-gold font-mono text-xs font-semibold uppercase tracking-[0.05em] text-ink hover:bg-gold transition-colors"
              rel="noreferrer"
              target="_blank"
              data-testid="ios-download-cta"
            >
              Download on the App Store
            </a>
          ) : null}
          {ANDROID_PLAY_STORE_URL ? (
            <a
              href={ANDROID_PLAY_STORE_URL}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border-2 border-gold font-mono text-xs font-semibold uppercase tracking-[0.05em] text-ink hover:bg-gold transition-colors"
              rel="noreferrer"
              target="_blank"
              data-testid="android-download-cta"
            >
              Get it on Google Play
            </a>
          ) : null}
        </div>
      </div>

      <p className="font-sans text-xs text-inkFaint text-center">
        Profile → Redeem is only a rare backup if something went wrong — not the normal path.
      </p>
    </div>
  );
}
