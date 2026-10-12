"use client";

import { useCallback, useEffect, useState } from "react";

type ReferralSharePanelProps = {
  payPageUrl: string;
};

function messengerShareHref(payPageUrl: string): string {
  const text = encodeURIComponent(
    `Get VÉLA Core — pay on our site, then open the app: ${payPageUrl}`
  );
  return `https://wa.me/?text=${text}`;
}

export function ReferralSharePanel({ payPageUrl }: ReferralSharePanelProps) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const QRCode = await import("qrcode");
        const dataUrl = await QRCode.toDataURL(payPageUrl, {
          margin: 1,
          width: 200,
          color: { dark: "#2D2620", light: "#FFFBF8" },
        });
        if (!cancelled) setQrSrc(dataUrl);
      } catch {
        if (!cancelled) setQrSrc(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [payPageUrl]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(payPageUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [payPageUrl]);

  const shareNative = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "VÉLA Core",
          text: "Pay on the website, then open VÉLA — Core unlocks when you sign in.",
          url: payPageUrl,
        });
        return;
      } catch {
        /* user dismissed */
      }
    }
    window.open(messengerShareHref(payPageUrl), "_blank", "noopener,noreferrer");
  }, [payPageUrl]);

  return (
    <div
      className="rounded-[18px] border border-warmLine bg-night p-6 md:p-8 text-cream"
      data-testid="referral-share-panel"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60 mb-2">
        Refer a crewmate
      </p>
      <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
        QR and messenger links point to this same payment page (with your referral tags
        preserved). No reward is granted in this sandbox slice.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="rounded-xl bg-cream p-3 shrink-0">
          {qrSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- inline QR data URL
            <img
              src={qrSrc}
              alt="QR code linking to the VÉLA web payment page"
              width={200}
              height={200}
              className="block"
            />
          ) : (
            <div
              className="w-[200px] h-[200px] flex items-center justify-center font-mono text-xs text-inkFaint text-center px-2"
              aria-hidden
            >
              QR loading…
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/50 mb-1">
              Payment page URL
            </p>
            <p
              className="font-mono text-xs text-cream/90 break-all leading-relaxed"
              data-testid="referral-pay-url"
            >
              {payPageUrl}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gold/60 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.05em] text-gold hover:bg-gold/10 transition-colors"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={shareNative}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.05em] text-ink hover:bg-yellow-600 transition-colors"
              data-testid="messenger-share-cta"
            >
              Share link
            </button>
            <a
              href={messengerShareHref(payPageUrl)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-cream/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.05em] text-cream/80 hover:border-gold/50 transition-colors"
              rel="noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
