"use client";

import { useEffect, useState } from "react";

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

  return (
    <div
      className="rounded-[18px] border border-warmLine bg-night p-6 md:p-8 text-cream"
      data-testid="referral-share-panel"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cream/60 mb-2">
        Refer a crewmate
      </p>
      <p className="font-sans text-sm text-cream/80 leading-relaxed mb-6">
        Scan the QR code or share via WhatsApp — both open this same payment page on the
        website.
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
          <a
            href={messengerShareHref(payPageUrl)}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.05em] text-ink hover:bg-yellow-600 transition-colors"
            rel="noreferrer"
            target="_blank"
            data-testid="messenger-share-cta"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
