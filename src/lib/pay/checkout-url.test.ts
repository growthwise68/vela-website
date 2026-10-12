import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildRevenueCatCheckoutUrl } from "./checkout-url";

describe("buildRevenueCatCheckoutUrl", () => {
  it("appends attribution without clobbering existing RC params", () => {
    const url = buildRevenueCatCheckoutUrl(
      { utm_source: "referrer", ref: "test" },
      "https://pay.rev.cat/sandbox/demo?offer=core"
    );
    const parsed = new URL(url);
    assert.equal(parsed.searchParams.get("offer"), "core");
    assert.equal(parsed.searchParams.get("utm_source"), "referrer");
    assert.equal(parsed.searchParams.get("ref"), "test");
  });

  it("returns base when attribution empty", () => {
    assert.equal(
      buildRevenueCatCheckoutUrl({}, "https://pay.rev.cat/sandbox/x"),
      "https://pay.rev.cat/sandbox/x"
    );
  });
});
