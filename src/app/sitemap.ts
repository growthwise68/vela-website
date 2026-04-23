import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/privacy", "/terms", "/support"];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
