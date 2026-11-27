import { RC_WEB_PURCHASE_URL, type PayAttribution } from "./config";

function setUtmIfPresent(url: URL, key: string, value?: string): void {
  const trimmed = value?.trim();
  if (trimmed) {
    url.searchParams.set(key, trimmed);
  }
}

export type CheckoutIdentity = {
  appUserId?: string | null;
  email?: string | null;
};

/**
 * RC Web Purchase Link with optional identified appUserId path segment,
 * email prefill, and allow-listed checkout attribution merged onto the query.
 * Visitor utm_content is forwarded when present; otherwise ref becomes utm_content.
 */
export function buildRevenueCatCheckoutUrl(
  attribution: PayAttribution = {},
  baseUrl: string = RC_WEB_PURCHASE_URL,
  identity?: CheckoutIdentity
): string {
  const trimmedBase = baseUrl.trim();
  if (!trimmedBase) {
    return "";
  }

  const url = new URL(trimmedBase);

  const appUserId = identity?.appUserId?.trim();
  if (appUserId) {
    const cleanPath = url.pathname.replace(/\/+$/, "");
    url.pathname = `${cleanPath}/${encodeURIComponent(appUserId)}`;
  }

  const email = identity?.email?.trim();
  if (email) {
    url.searchParams.set("email", email);
  }

  setUtmIfPresent(url, "utm_source", attribution.utm_source);
  setUtmIfPresent(url, "utm_medium", attribution.utm_medium);
  setUtmIfPresent(url, "utm_campaign", attribution.utm_campaign);

  const visitorContent = attribution.utm_content?.trim();
  const ref = attribution.ref?.trim();
  if (visitorContent) {
    url.searchParams.set("utm_content", visitorContent);
  } else if (ref) {
    url.searchParams.set("utm_content", ref);
  }

  return url.toString();
}
