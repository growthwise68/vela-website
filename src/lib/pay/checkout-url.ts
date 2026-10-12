import { RC_WEB_PURCHASE_URL } from "./config";

/** RC Web Purchase Link — env URL only; no site query params appended. */
export function buildRevenueCatCheckoutUrl(
  baseUrl: string = RC_WEB_PURCHASE_URL
): string {
  return baseUrl.trim();
}
