import {
  ATTRIBUTION_PARAM_KEYS,
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
