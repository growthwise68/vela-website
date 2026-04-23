/**
 * Canonical site URL for sitemap, robots, and metadata.
 * Set NEXT_PUBLIC_SITE_URL in Vercel to override (e.g. custom domain later).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vela-website-lilac.vercel.app"
).replace(/\/$/, "");
