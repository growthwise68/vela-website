/**
 * Sandbox RevenueCat Web Purchase Link + app open/download targets.
 * Configure in Vercel / .env.local — never use production WPL here until Helen live gate.
 */
export const PAY_PAGE_PATH = "/pay";

/** RevenueCat sandbox Web Purchase Link (Stripe checkout hosted by RC). */
export const RC_WEB_PURCHASE_URL =
  process.env.NEXT_PUBLIC_RC_WEB_PURCHASE_URL?.trim() ||
  "https://pay.rev.cat/sandbox/rc-bed9aa89d1/vela_core_web";

export const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_STORE_URL?.trim() || "";

export const ANDROID_PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL?.trim() || "";

/** Opens the installed app after web purchase (universal link or custom scheme). */
export const VELA_OPEN_APP_URL =
  process.env.NEXT_PUBLIC_VELA_OPEN_APP_URL?.trim() || "vela://open";

export const ATTRIBUTION_STORAGE_KEY = "vela_pay_attribution_v1";

/** Query keys persisted on the pay page URL only (first-touch). */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "referral",
] as const;

export type AttributionParamKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];

export type PayAttribution = Partial<Record<AttributionParamKey, string>>;
