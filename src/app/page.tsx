import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

const SITE = "https://velaforcrew.com";

export const metadata: Metadata = {
  title: "VÉLA — Rest & Recovery App for Long-Haul Cabin Crew",
  description:
    "VÉLA is the rest and recovery app for long-haul cabin crew. It reads your roster and plans your sleep, light and caffeine across every duty, layover and day off. Built by crew, for crew.",
  alternates: {
    canonical: SITE,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
