import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

mock.module("@/components/FullBleed", {
  namedExports: {
    FullBleed: ({ children }: { children?: React.ReactNode }) =>
      React.createElement("div", null, children),
  },
});

mock.module("next/link", {
  defaultExport: ({ href, children }: { href: string; children?: React.ReactNode }) =>
    React.createElement("a", { href }, children),
});

describe("pricing page", () => {
  it("renders corrected prices, savings, equivalents, and metadata", async () => {
    const { default: PricingPage, metadata } = await import("./page");
    const html = renderToStaticMarkup(React.createElement(PricingPage));
    for (const text of [
      "$14.99", "$149.99", "$99.99",
      "$12.50/month, billed yearly", "$8.33/month, billed yearly",
      "$50.00 (33%) less than Core Annual, every year",
      "44% less than paying monthly",
      "Save $29.89 a year versus monthly (about 17%)",
    ]) {
      assert.ok(html.includes(text), `Missing pricing copy: ${text}`);
    }
    assert.doesNotMatch(html, /139\.99|11\.67|39\.89|\$40 less/);
    assert.match(String(metadata.description), /\$149\.99\/year/);
    assert.doesNotMatch(String(metadata.description), /139\.99/);
  });

  it("preserves trial, billing disclosures, and all three signup destinations", async () => {
    const { default: PricingPage } = await import("./page");
    const html = renderToStaticMarkup(React.createElement(PricingPage));
    assert.equal((html.match(/href="\/early-access"/g) ?? []).length, 3);
    assert.equal((html.match(/>14 days free</g) ?? []).length, 3);
    assert.ok(html.includes("Locked in for as long as you stay subscribed."));
    assert.match(html, /sales tax or VAT may be added at checkout/);
    assert.match(html, /Subscriptions renew automatically until cancelled/);
  });
});
