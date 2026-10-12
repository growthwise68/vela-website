import type { Metadata } from "next";
import { Suspense } from "react";
import { FullBleed } from "@/components/FullBleed";
import { PayCheckoutClient } from "@/components/pay/PayCheckoutClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get VÉLA Core",
  description:
    "Pay on the website with Stripe, then open VÉLA — Core unlocks when you sign in.",
  alternates: {
    canonical: "https://velaforcrew.com/pay",
  },
  robots: { index: false, follow: false },
};

function PayCheckoutFallback() {
  return (
    <div className="rounded-[18px] border border-warmLine bg-parchment/50 p-8 font-sans text-sm text-inkMid">
      Loading checkout…
    </div>
  );
}

export default function PayPage() {
  const siteOrigin = SITE_URL.replace(/\/$/, "");

  return (
    <div className="w-full">
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <p className="font-mono text-xs md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            Web checkout
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-ink mb-4 leading-tight border-b-2 border-gold pb-4">
            Get VÉLA Core
          </h1>
          <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed">
            Land here from anywhere — a friend&apos;s link, a QR code, or chat. Pay once on the
            web, then open the app you already have (or download it). Sign in and Core is on.
          </p>
        </div>
      </FullBleed>

      <FullBleed className="bg-cream pb-16 md:pb-24">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <Suspense fallback={<PayCheckoutFallback />}>
            <PayCheckoutClient siteOrigin={siteOrigin} />
          </Suspense>
        </div>
      </FullBleed>
    </div>
  );
}
