"use client";

import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  ANDROID_PLAY_STORE_URL,
  IOS_APP_STORE_URL,
  VELA_OPEN_APP_URL,
} from "@/lib/pay/config";

const FAIL_OPEN_REPORTS_URL =
  "https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports";

const INSTALL_EMAIL_SENTENCE =
  "If the app is not installed yet, install it, then open the purchase confirmation email from RevenueCat.";

function redactRedeemUrlRaw(raw: string | null): string {
  if (raw === null) {
    return "";
  }
  const marker = "redemption_token=";
  const index = raw.indexOf(marker);
  if (index === -1) {
    return raw;
  }
  const valueStart = index + marker.length;
  const ampIndex = raw.indexOf("&", valueStart);
  const end = ampIndex === -1 ? raw.length : ampIndex;
  return `${raw.slice(0, valueStart)}[redacted]${raw.slice(end)}`;
}

function truncateRedeemUrlRedacted(redacted: string): string {
  return redacted.slice(0, 120);
}

function redactPageUrlForFailOpenReport(pageUrl: string): string {
  const url = new URL(pageUrl);
  url.searchParams.delete("redeem_url");
  for (const key of [...url.searchParams.keys()]) {
    if (key === "redemption_token") {
      url.searchParams.set(key, "[redacted]");
    }
  }
  return url.toString();
}

type RedeemUrlFaultReason = "missing" | "unparseable" | "invalid_shape";

type RedeemUrlDecision =
  | { valid: true }
  | { valid: false; reason: RedeemUrlFaultReason };

function decideRedeemUrl(raw: string | null): RedeemUrlDecision {
  if (raw === null || raw.trim() === "") {
    return { valid: false, reason: "missing" };
  }
  try {
    const parsed = new URL(raw);
    if (parsed.protocol.toLowerCase() !== "rc-bed9aa89d1:") {
      return { valid: false, reason: "invalid_shape" };
    }
    if (parsed.hostname !== "redeem_web_purchase") {
      return { valid: false, reason: "invalid_shape" };
    }
    const token = parsed.searchParams.get("redemption_token");
    if (!token || token.length === 0) {
      return { valid: false, reason: "invalid_shape" };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: "unparseable" };
  }
}

export async function sendPaySuccessRedeemUrlFault({
  raw,
  appUserId,
  pageUrl,
}: {
  raw: string | null;
  appUserId: string | null;
  pageUrl: string;
}): Promise<void> {
  const anonKey =
    process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY?.trim() || "";
  if (!anonKey) {
    return;
  }

  const decision = decideRedeemUrl(raw);
  if (decision.valid) {
    return;
  }
  const reason = decision.reason;
  const redactedRaw = redactRedeemUrlRaw(raw);
  const redeemUrlTruncated =
    raw === null ? "" : truncateRedeemUrlRedacted(redactedRaw);
  const sanitizedPageUrl = redactPageUrlForFailOpenReport(pageUrl);

  const observed: Record<string, string> = {
    reason,
    redeem_url_truncated: redeemUrlTruncated,
    page_url: sanitizedPageUrl,
  };
  if (appUserId) {
    observed.app_user_id = appUserId;
  }

  const body = {
    report_id: crypto.randomUUID(),
    install_id: crypto.randomUUID(),
    check_id: "pay_success_redeem_url",
    occurred_at: new Date().toISOString(),
    result: "invalid",
    work_state: "continued",
    account_id: appUserId ?? null,
    observed,
  };

  await fetch(FAIL_OPEN_REPORTS_URL, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(body),
  });
}

export function PaySuccessActions() {
  const searchParams = useSearchParams();
  const raw = searchParams?.get("redeem_url") ?? null;
  const appUserId = searchParams?.get("app_user_id") ?? null;

  const redeemDecision = useMemo(() => decideRedeemUrl(raw), [raw]);

  const openAppHref = useMemo(() => {
    if (redeemDecision.valid) {
      return raw as string;
    }
    return VELA_OPEN_APP_URL;
  }, [redeemDecision, raw]);

  useEffect(() => {
    if (redeemDecision.valid) {
      return;
    }
    void sendPaySuccessRedeemUrlFault({
      raw,
      appUserId,
      pageUrl: window.location.href,
    }).catch(() => {});
  }, [redeemDecision, raw, appUserId]);

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
          Sign in on your phone. Core attaches to the account you confirm — it does
          not have to be the checkout email, and there is no code to paste.
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
        <p className="mt-4 font-sans text-sm text-inkMid leading-relaxed">
          {INSTALL_EMAIL_SENTENCE}
        </p>
      </div>

      <p className="font-sans text-xs text-inkFaint text-center">
        Profile → Redeem is only a rare backup if something went wrong — not the normal path.
      </p>
    </div>
  );
}
