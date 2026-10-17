import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { pickAttributionFromSearchParams } from "./attribution";
import { buildRevenueCatCheckoutUrl } from "./checkout-url";

describe("buildRevenueCatCheckoutUrl", () => {
  it("returns configured WPL without attribution when none is passed", () => {
    const url = buildRevenueCatCheckoutUrl(
      {},
      "https://pay.rev.cat/sandbox/demo?offer=core"
    );
    const parsed = new URL(url);
    assert.equal(parsed.searchParams.get("offer"), "core");
    assert.equal(parsed.searchParams.get("utm_source"), null);
    assert.equal(parsed.searchParams.get("ref"), null);
  });

  it("forwards utm_* and ref as utm_content onto the WPL query", () => {
    const url = buildRevenueCatCheckoutUrl(
      {
        utm_source: "qr",
        utm_medium: "messenger",
        utm_campaign: "spring",
        ref: "crew42",
      },
      "https://pay.rev.cat/sandbox/demo"
    );
    const parsed = new URL(url);
    assert.equal(parsed.searchParams.get("utm_source"), "qr");
    assert.equal(parsed.searchParams.get("utm_medium"), "messenger");
    assert.equal(parsed.searchParams.get("utm_campaign"), "spring");
    assert.equal(parsed.searchParams.get("utm_content"), "crew42");
    assert.equal(parsed.searchParams.get("ref"), null);
  });

  it("URL-encodes forwarded values", () => {
    const url = buildRevenueCatCheckoutUrl(
      { utm_source: "a b", ref: "r&1" },
      "https://pay.rev.cat/sandbox/demo"
    );
    assert.ok(url.includes("utm_source=a+b") || url.includes("utm_source=a%20b"));
    assert.equal(new URL(url).searchParams.get("utm_content"), "r&1");
  });

  it("forwards visitor utm_content when ref is also on /pay", () => {
    const attribution = pickAttributionFromSearchParams(
      new URLSearchParams("utm_content=real&ref=crew")
    );
    const url = buildRevenueCatCheckoutUrl(
      attribution,
      "https://pay.rev.cat/sandbox/demo"
    );
    assert.equal(new URL(url).searchParams.get("utm_content"), "real");
    assert.equal(new URL(url).searchParams.get("ref"), null);
  });

  it("maps ref to utm_content when /pay has ref only", () => {
    const attribution = pickAttributionFromSearchParams(
      new URLSearchParams("ref=crew")
    );
    const url = buildRevenueCatCheckoutUrl(
      attribution,
      "https://pay.rev.cat/sandbox/demo"
    );
    assert.equal(new URL(url).searchParams.get("utm_content"), "crew");
  });

  it("returns base when empty after trim", () => {
    assert.equal(buildRevenueCatCheckoutUrl({}, "  "), "");
  });
});
