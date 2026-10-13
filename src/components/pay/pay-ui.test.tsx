import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PaySuccessActions } from "./PaySuccessActions";

mock.module("next/navigation", {
  namedExports: {
    useSearchParams: () => new URLSearchParams(),
  },
});

describe("PaySuccessActions markup", () => {
  it("renders Open Véla CTA and success test hooks", () => {
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /data-testid="pay-success-actions"/);
    assert.match(html, /data-testid="open-vela-cta"/);
    assert.match(html, /Open Véla/);
  });
});

describe("PayCheckoutClient markup", () => {
  it("shows customer copy when checkout env is not configured", async () => {
    const { PayCheckoutClient } = await import("./PayCheckoutClient");
    const html = renderToStaticMarkup(
      <PayCheckoutClient siteOrigin="https://velaforcrew.com" />
    );
    assert.match(html, /data-testid="pay-not-available"/);
    assert.match(html, /Not available yet/);
    assert.doesNotMatch(html, /NEXT_PUBLIC_/);
    assert.doesNotMatch(html, /pay-checkout-cta/);
  });
});
