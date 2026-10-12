import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildRevenueCatCheckoutUrl } from "./checkout-url";

describe("buildRevenueCatCheckoutUrl", () => {
  it("returns configured WPL without appending site query params", () => {
    const url = buildRevenueCatCheckoutUrl(
      "https://pay.rev.cat/sandbox/demo?offer=core"
    );
    const parsed = new URL(url);
    assert.equal(parsed.searchParams.get("offer"), "core");
    assert.equal(parsed.searchParams.get("utm_source"), null);
    assert.equal(parsed.searchParams.get("ref"), null);
  });

  it("returns base when empty after trim", () => {
    assert.equal(buildRevenueCatCheckoutUrl("  "), "");
  });
});
