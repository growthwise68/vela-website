/**
 * RevenueCat Web Purchase Link + app open/download targets.
 * Configure in Vercel / .env.local — set sandbox WPL when testing checkout.
 */
export const PAY_PAGE_PATH = "/pay";

/** RevenueCat Web Purchase Link (Stripe checkout hosted by RC). */
export const RC_WEB_PURCHASE_URL =
  process.env.NEXT_PUBLIC_RC_WEB_PURCHASE_URL?.trim() || "";

export const IOS_APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_STORE_URL?.trim() || "";

export const ANDROID_PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_ANDROID_PLAY_STORE_URL?.trim() || "";

/** Opens the installed app after web purchase (universal link or custom scheme). */
export const VELA_OPEN_APP_URL =
  process.env.NEXT_PUBLIC_VELA_OPEN_APP_URL?.trim() || "vela://open";

/**
 * Query keys read from the on-site pay URL (and share links).
 * utm_source, utm_medium, utm_campaign, and visitor utm_content forward to RC checkout;
 * ref is sent as utm_content only when the visit has no utm_content.
 */
export const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "ref",
] as const;

export type AttributionParamKey = (typeof ATTRIBUTION_PARAM_KEYS)[number];

export type PayAttribution = Partial<Record<AttributionParamKey, string>>;

/** First-touch waitlist columns (utm_content is checkout-only). */
export const WAITLIST_ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "ref",
] as const satisfies readonly AttributionParamKey[];
