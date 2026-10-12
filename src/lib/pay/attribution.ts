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

/** Merge incoming params into stored; existing keys are not overwritten (first-touch). */
export function mergeAttributionFirstTouch(
  stored: PayAttribution,
  incoming: PayAttribution
): PayAttribution {
  const merged: PayAttribution = { ...stored };
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = incoming[key];
    if (value && !merged[key]) merged[key] = value;
  }
  return merged;
}

export function attributionToQuery(attribution: PayAttribution): string {
  const q = new URLSearchParams();
  for (const key of ATTRIBUTION_PARAM_KEYS) {
    const value = attribution[key];
    if (value) q.set(key, value);
  }
  return q.toString();
}

export function parseAttributionJson(json: string | null): PayAttribution {
  if (!json) return {};
  try {
    const parsed = JSON.parse(json) as PayAttribution;
    return pickAttributionFromSearchParams(
      new URLSearchParams(attributionToQuery(parsed))
    );
  } catch {
    return {};
  }
}
