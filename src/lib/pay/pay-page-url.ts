import { PAY_PAGE_PATH, type PayAttribution } from "./config";
import { attributionToQuery } from "./attribution";

/** Canonical on-site payment page URL (QR + messenger share target). */
export function buildPayPageUrl(
  siteOrigin: string,
  attribution: PayAttribution = {}
): string {
  const origin = siteOrigin.replace(/\/$/, "");
  const query = attributionToQuery(attribution);
  return query ? `${origin}${PAY_PAGE_PATH}?${query}` : `${origin}${PAY_PAGE_PATH}`;
}
