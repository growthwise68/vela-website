import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PRICES_USD_CENTS, pricingCopy } from "./pricing";
import { mobileApplication } from "./structured-data";

describe("website USD pricing", () => {
  it("keeps the approved monthly, annual, and founding prices", () => {
    assert.deepEqual(PRICES_USD_CENTS, {
      monthly: 1499,
      annual: 14999,
      foundingAnnual: 9999,
    });
    assert.equal(pricingCopy.monthly, "$14.99");
    assert.equal(pricingCopy.annual, "$149.99");
    assert.equal(pricingCopy.foundingAnnual, "$99.99");
  });

  it("calculates equivalents and savings from annual totals, not rounded monthly equivalents", () => {
    assert.equal(pricingCopy.annualMonthlyEquivalent, "$12.50");
    assert.equal(pricingCopy.foundingMonthlyEquivalent, "$8.33");
    assert.equal(pricingCopy.annualSavingVsMonthly, "$29.89");
    assert.equal(pricingCopy.annualDiscountVsMonthly, 17);
    assert.equal(pricingCopy.foundingSavingVsAnnual, "$50.00");
    assert.equal(pricingCopy.foundingDiscountVsAnnual, 33);
    assert.equal(pricingCopy.foundingDiscountVsMonthly, 44);
  });

  it("keeps structured offers and the public text summary aligned", () => {
    assert.deepEqual(mobileApplication.offers.map(({ price }) => price), [
      "14.99", "149.99", "99.99",
    ]);
    assert.ok(mobileApplication.offers.every(({ priceCurrency }) => priceCurrency === "USD"));
    const summary = readFileSync("public/llms.txt", "utf8");
    assert.ok(summary.includes(`${pricingCopy.monthly}/month or ${pricingCopy.annual}/year`));
    assert.ok(summary.includes(`${pricingCopy.foundingAnnual}/year`));
    assert.ok(!summary.includes("139.99"));
  });
});
