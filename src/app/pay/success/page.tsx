import type { Metadata } from "next";
import Link from "next/link";
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

export default function PaySuccessPage() {
  return (
    <div className="w-full">
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-14">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            Payment received
          </p>
          <h1
            className="font-display text-4xl md:text-5xl font-light text-ink mb-4 leading-tight"
            data-testid="pay-success-heading"
          >
            You&apos;re in
          </h1>
          <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed">
            Thanks for supporting VÉLA. Open the app on your phone and sign in — your Core
            access from this web purchase should already be waiting.
          </p>
        </div>
      </FullBleed>

      <FullBleed className="bg-cream pb-16 md:pb-24">
        <div className="max-w-xl mx-auto px-6 md:px-8">
          <PaySuccessActions />
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
