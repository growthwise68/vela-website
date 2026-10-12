import { RC_WEB_PURCHASE_URL, type PayAttribution } from "./config";
import { attributionToQuery } from "./attribution";

/**
 * RC Web Purchase Link with first-party attribution query string appended.
 * RC / Stripe may ignore unknown params; we keep them for Wall-E join later.
 */
export function buildRevenueCatCheckoutUrl(
  attribution: PayAttribution,
  baseUrl: string = RC_WEB_PURCHASE_URL
): string {
  const trimmed = baseUrl.trim();
  if (!trimmed) return "";

  const extra = attributionToQuery(attribution);
  if (!extra) return trimmed;

  const url = new URL(trimmed);
  const incoming = new URLSearchParams(extra);
  incoming.forEach((value, key) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  });
  return url.toString();
}
