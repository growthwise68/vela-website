import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

const SITE = "https://velaforcrew.com";

export const metadata: Metadata = {
  title: "VÉLA — Body-Clock Planning App for Long-Haul Cabin Crew",
  description:
    "VÉLA reads your roster and maps your body clock duty by duty, with sleep, light, caffeine and meal timing for every trip. Built by crew, for long-haul cabin crew.",
  alternates: {
    canonical: SITE,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
