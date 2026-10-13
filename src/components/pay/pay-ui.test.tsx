import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
let mockSearchParams = new URLSearchParams();

mock.module("next/navigation", {
  namedExports: {
    useSearchParams: () => mockSearchParams,
  },
});

let mockWebPurchaseUrl = "";
mock.module("@/lib/pay/checkout-url", {
  namedExports: {
    buildRevenueCatCheckoutUrl: () => mockWebPurchaseUrl,
  },
});

mock.module("@/components/pay/ReferralSharePanel", {
  namedExports: {
    ReferralSharePanel: () => null,
  },
});

describe("PaySuccessActions markup", () => {
  it("renders Open Véla CTA and success test hooks", async () => {
    mockSearchParams = new URLSearchParams();
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?hooks=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /data-testid="pay-success-actions"/);
    assert.match(html, /data-testid="open-vela-cta"/);
    assert.match(html, /Open Véla/);
  });

  it("uses redeem_url on Open Véla when RevenueCat passes it on the success redirect", async () => {
    const redeem =
      "rc-bed9aa89d1://redeem_web_purchase?redemption_token=sandbox_test_token";
    mockSearchParams = new URLSearchParams({ redeem_url: redeem });
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?redeem=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /href="rc-bed9aa89d1:\/\/redeem_web_purchase\?redemption_token=sandbox_test_token"/);
  });

  it("falls back to the configured open-app URL when redeem_url is missing", async () => {
    mockSearchParams = new URLSearchParams();
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?fallback=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /href="vela:\/\/open"/);
  });
});

describe("PayCheckoutClient markup", () => {
  it("shows Not available yet when the web purchase URL is missing", async () => {
    mockWebPurchaseUrl = "";
    const { PayCheckoutClient } = await import(
      `./PayCheckoutClient.tsx?missing-purchase=${Date.now()}`
    );
    const html = renderToStaticMarkup(
      <PayCheckoutClient siteOrigin="https://velaforcrew.com" />
    );
    assert.match(html, /data-testid="pay-not-available"/);
    assert.match(html, /Not available yet/);
    assert.doesNotMatch(html, /NEXT_PUBLIC_/);
    assert.doesNotMatch(html, /pay-checkout-cta/);
  });

  it("renders checkout when the web purchase URL is set and store URLs are blank", async () => {
    mockWebPurchaseUrl = "https://pay.rev.cat/sandbox/example/wpl";
    const { PayCheckoutClient } = await import(
      `./PayCheckoutClient.tsx?purchase-set=${Date.now()}`
    );
    const html = renderToStaticMarkup(
      <PayCheckoutClient siteOrigin="https://velaforcrew.com" />
    );
    assert.match(html, /data-testid="pay-checkout-cta"/);
    assert.doesNotMatch(html, /Not available yet/);
  });
});
