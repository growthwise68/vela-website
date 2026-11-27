import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FullBleed } from "@/components/FullBleed";
import { PaySuccessActions } from "@/components/pay/PaySuccessActions";

export const metadata: Metadata = {
  title: "Welcome to VÉLA Core",
  description:
    "Your web purchase is complete. Open VÉLA or download the app — sign in and Core should already be active.",
  alternates: {
    canonical: "https://velaforcrew.com/pay/success",
  },
  robots: { index: false, follow: false },
};

function PaySuccessActionsFallback() {
  return (
    <div className="rounded-[18px] border border-warmLine bg-parchment/50 p-8 font-sans text-sm text-inkMid">
      Loading…
    </div>
  );
}

export default function PaySuccessPage() {
  return (
    <div className="w-full">
      <FullBleed className="pt-16 md:pt-24 pb-16 md:pb-24 bg-cream">
        <div className="max-w-xl mx-auto px-6 md:px-8">
          <Suspense fallback={<PaySuccessActionsFallback />}>
            <PaySuccessActions />
          </Suspense>
          <p className="mt-10 text-center font-sans text-sm text-inkMid">
            Wrong page?{" "}
            <Link href="/pay" className="text-gold underline underline-offset-2">
              Return to checkout
            </Link>
          </p>
        </div>
      </FullBleed>
    </div>
  );
}
