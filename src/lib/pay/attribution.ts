import {
  ATTRIBUTION_PARAM_KEYS,
  WAITLIST_ATTRIBUTION_PARAM_KEYS,
  type PayAttribution,
} from "./config";

export function pickAttributionFromSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): PayAttribution {
  const out: PayAttribution = {};
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) {
      const v = params.get(key);
      return v && v.trim() ? v.trim() : undefined;
    }
    const raw = params[key];
    if (Array.isArray(raw)) return raw[0]?.trim() || undefined;
    return raw?.trim() || undefined;
  };

  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function attributionToQuery(attribution: PayAttribution): string {
  const q = new URLSearchParams();
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = attribution[key];
    if (value) q.set(key, value);
  }
  return q.toString();
}

/** First-touch waitlist columns (null when the visit had no tag for that key). */
export function attributionToWaitlistColumns(
  attribution: PayAttribution
): Record<(typeof WAITLIST_ATTRIBUTION_PARAM_KEYS)[number], string | null> {
  const out = {} as Record<
    (typeof WAITLIST_ATTRIBUTION_PARAM_KEYS)[number],
    string | null
  >;
  for (const key of WAITLIST_ATTRIBUTION_PARAM_KEYS) {
    const value = attribution[key]?.trim();
    out[key] = value ? value : null;
  }
  return out;
}

export function pickAttributionFromJsonBody(
  body: Record<string, unknown>
): PayAttribution {
  const record: Record<string, string | string[] | undefined> = {};
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const raw = body[key];
    if (typeof raw === "string") {
      record[key] = raw;
    }
  }
  return pickAttributionFromSearchParams(record);
}
