import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/SiteShell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted (not next/font/google): Vercel's build runner intermittently
// fails to fetch Google Fonts CSS at build time, which crashes the google
// loader with "Cannot read properties of null (reading '1')" and fails the
// whole build. These are the same latin-subset files Google serves, just
// bundled locally so the build has no external network dependency.
const cormorant = localFont({
  src: "./fonts/cormorant-garamond-variable.woff2",
  weight: "300 600",
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = localFont({
  src: "./fonts/outfit-variable.woff2",
  weight: "200 500",
  variable: "--font-outfit",
  display: "swap",
});

const dmMono = localFont({
  src: [
    { path: "./fonts/dm-mono-300.woff2", weight: "300" },
    { path: "./fonts/dm-mono-400.woff2", weight: "400" },
    { path: "./fonts/dm-mono-500.woff2", weight: "500" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VÉLA — Rest & Recovery App for Long-Haul Cabin Crew",
    template: "%s — VÉLA",
  },
  description:
    "VÉLA is the rest and recovery app for long-haul cabin crew. It reads your roster and plans your sleep, light and caffeine across every duty, layover and day off. Built by crew, for crew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <body>
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
