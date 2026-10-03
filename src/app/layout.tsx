import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/SiteShell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VÉLA — Body-Clock Planning App for Long-Haul Cabin Crew",
    template: "%s — VÉLA",
  },
  description:
    "VÉLA reads your roster and maps your body clock duty by duty, with sleep, light, caffeine and meal timing for every trip. Built by crew, for long-haul cabin crew.",
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
