import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/briefs",
    "/briefs/2am-wake-up",
    "/briefs/eating-across-time-zones",
    "/early-access",
    "/pricing",
    "/survey",
    "/privacy",
    "/terms",
    "/support",
  ];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
