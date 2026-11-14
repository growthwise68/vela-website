// Website display prices in USD cents. Billing products are managed separately.
export const PRICES_USD_CENTS = {
  monthly: 1499,
  annual: 14999,
  foundingAnnual: 9999,
} as const;

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const discount = (price: number, baseline: number) =>
  Math.round(((baseline - price) / baseline) * 100);
const monthlyYear = PRICES_USD_CENTS.monthly * 12;

export const pricingCopy = {
  monthly: usd(PRICES_USD_CENTS.monthly),
  annual: usd(PRICES_USD_CENTS.annual),
  foundingAnnual: usd(PRICES_USD_CENTS.foundingAnnual),
  annualMonthlyEquivalent: usd(PRICES_USD_CENTS.annual / 12),
  foundingMonthlyEquivalent: usd(PRICES_USD_CENTS.foundingAnnual / 12),
  annualSavingVsMonthly: usd(monthlyYear - PRICES_USD_CENTS.annual),
  annualDiscountVsMonthly: discount(PRICES_USD_CENTS.annual, monthlyYear),
  foundingSavingVsAnnual: usd(PRICES_USD_CENTS.annual - PRICES_USD_CENTS.foundingAnnual),
  foundingDiscountVsAnnual: discount(PRICES_USD_CENTS.foundingAnnual, PRICES_USD_CENTS.annual),
  foundingDiscountVsMonthly: discount(PRICES_USD_CENTS.foundingAnnual, monthlyYear),
} as const;
