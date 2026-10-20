# L24 independent plan review r7

Required root and branch verified with git before writing. Reviewed signed intent, recorded Iain decisions, PayPath's four conditions, r7 draft, r6 receipt and mandatory factory gates. P1/P2 were not run; no credentials, customer records or RC dashboard were accessed.

All three r6 corrections are present (`plan.md:41,57,77,113–122,129`). Public website main tree `d4b17892461e0e99d895c22e37cc4e19db3e6b36` confirms the checkout-drop diagnosis: [config.ts:21–26](https://github.com/growthwise68/vela-website/blob/d4b17892461e0e99d895c22e37cc4e19db3e6b36/src/lib/pay/config.ts#L21) lacks campaign; [checkout-url.ts:3–7](https://github.com/growthwise68/vela-website/blob/d4b17892461e0e99d895c22e37cc4e19db3e6b36/src/lib/pay/checkout-url.ts#L3) returns the bare URL; `PayCheckoutClient.tsx:17–26` picks source only for sharing. `pay-page-url.ts:5–11` already preserves picked share parameters. `EarlyAccessClient.tsx:38–46` sends no attribution; `api/subscribe/route.ts:265–283` inserts waitlist rows and returns duplicate-email 409, backed by `0002_waitlist_signups.sql:8`. Main lists migrations 0001–0003; planned 0004 correctly needs Iain deploy GO.

Local `supabase/functions/p1-rc-lifecycle-webhook/index.ts:233–256` omits marketing metadata from persisted facts; `349–436,447–495` confirm collection/consent gates, event-id idempotency, conflict 409 and excluded-source 422 after preceding gates, without exclusion-row writes. Migration `20261005160122_p1_rc_lifecycle.sql:46–53` restricts `payload_min` to redemption fields. Neither named surface supplies the proposed customer-source record. The existing source-mapping stub (`index.ts:269–272,466–473`) remains fail-closed; the plan records the P1-GL1 prerequisite. No runtime app-failure check was exercised or newly observed.

[Custom Metadata](https://www.revenuecat.com/docs/web/custom-metadata) documents automatic WPL UTM capture and metadata on purchase webhooks. [Web Purchase Links](https://www.revenuecat.com/docs/web/web-billing/web-purchase-links) and [Redemption Links](https://www.revenuecat.com/docs/web/redemption-links) support anonymous checkout, success handoff, identified/anonymous aliasing and simulator testing. [Customer Attributes](https://www.revenuecat.com/docs/customers/customer-attributes) describe a separate interface; [webhook fields](https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields) distinguish transaction metadata from redemption fields. This supports the server-side route without an app metadata read.

Part W uses PayPath's existing files. Part A is Mo's metadata read, authorized separate first-source record and join; Eve's P1 tables stay unchanged. No additional helper, layer, route, service or carrier is proposed. The obsolete app-write path is removed. The decided requirements have observable pass/fail rules; explicitly deferred implementation questions remain open, not defects.

C11R conditions hold: untouched `redeem_url`, no sessionStorage, unchanged page/share `ref`, and checkout forwarding restricted to source, medium, campaign plus referral as content. First touch is immutable; L22 is capture-only. Narrow note only: incoming real `utm_content` and `ref` compete for one checkout field; Iain's 19:39 carrier decision is resolved and needs no new design from this review.

Smoke method is adequate: post-build at Mo's desk, sandbox only, private per-key persistence comparison, proven redeeming Firebase join, a differently tagged second journey without overwrite/duplicate, untagged and waitlist cases, and boolean-only redacted notes. Missing data or an unproven join cannot PASS; prerequisites remain pending. Dashboard settings are recorded only.

```text
VERDICT: ACCEPT
INTENT_DRIFT: PASS
IRRELEVANT_CONTENT: NONE
SEAT: 3 plan review, Codex gpt-6.1-sol, effort high, one-shot r7 (plan.md r7 DRAFT)
SMOKE_METHOD: OK
OPEN_FLAGGED: Table name, additional columns and migration choice for the separate L24 record; Eve's P1 tables unchanged.
  Server write path and execution location, including sandbox delivery under unchanged P1 gates.
  Metadata-bearing event selection and first-source tie-break.
  Uid join timing/evidence; Mo owns the join and first-source record.
  U11 addendum and privacy-policy coverage.
  Retention UNKNOWN unless Iain agrees.
  Live Redemption Links, restore behaviour and checkout billing engine remain unverified configuration.
tokens: 81194
```
