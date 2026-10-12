import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildRevenueCatCheckoutUrl } from "./checkout-url";

describe("pay checkout CTA href", () => {
  it("points at RevenueCat sandbox host when configured", () => {
    const href = buildRevenueCatCheckoutUrl(
      { utm_source: "cta-test" },
      "https://pay.rev.cat/sandbox/rc-bed9aa89d1/vela_core_web"
    );
    assert.match(href, /^https:\/\/pay\.rev\.cat\//);
    assert.match(href, /utm_source=cta-test/);
  });
});
