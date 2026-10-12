import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildRevenueCatCheckoutUrl } from "./checkout-url";

describe("pay checkout CTA href", () => {
  it("points at RevenueCat host when configured", () => {
    const href = buildRevenueCatCheckoutUrl(
      "https://pay.rev.cat/sandbox/example/wpl"
    );
    assert.equal(href, "https://pay.rev.cat/sandbox/example/wpl");
    assert.match(href, /^https:\/\/pay\.rev\.cat\//);
  });
});
