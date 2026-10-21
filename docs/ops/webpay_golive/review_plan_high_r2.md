# Plan review r2 — webpay_rc_live_scheme PLAN.md (r2)

Receipt
- seat: Sol 6.1 High via Codex 0.163.0 on Iain's Mac
- model: gpt-6.1-sol, reasoning effort: high, sandbox: read-only, one-shot `codex exec` (new process; given review_plan_high_r1.md to verify)
- session id: 01a145b1-1253-7f32-bf07-9bd3a602d484
- run: 16 Oct 2026 ~19:10-19:13 SAST, scratch dir (fresh clones vela d5bc3de4, vela-website d4b17892)
- verdict: ACCEPT / INTENT_DRIFT: PASS (1 NIT)
- tokens: 65,493

## Output (verbatim)

VERDICT: ACCEPT
INTENT_DRIFT: PASS

1. **NIT — Q4 retains two unsupported details.** `PLAN.md:133` describes `checkout-url.test.ts:13` as testing the default base; it actually passes an explicit fixture URL (`vela-website/src/lib/pay/checkout-url.test.ts:7-9`). Neither that test nor the builder (`checkout-url.ts:7`) establishes today’s deployed configuration. **Required change:** say “the supplied fixture URL” and remove “today’s value has none,” unless separately evidenced.

All three r1 findings are resolved: smoke requires the actual confirmation dialog with configuration and identity ready; Dart expectations use independent literals; Q4 correctly distinguishes incoming attribution from configured URL parameters.

**Q1:** Keep the compatibility constant; make the set the sole routing authority. This is the smallest change. All cited production scheme locations match; no additional production scheme hardcodes were found.

**Q2:** Yes—one short app-ID mapping comment per set. The mapping comes from signed intent (`INTENT_rc_live_scheme.md:18`), not independent dashboard verification.

**Q3:** Use the same Android intent-filter. Both entries specify schemes only (`vela/android/app/src/main/AndroidManifest.xml:59-65`).

**Q4:** No clash. Success reads `redeem_url` and `app_user_id` (`PaySuccessActions.tsx:134-135`); attribution selects its separate allowlist (`attribution.ts:20`, `config.ts:23-25`). Incoming attribution feeds share links (`PayCheckoutClient.tsx:17-25`); checkout preserves the configured URL without appending it (`checkout-url.ts:7`). Purchase attribution beyond this code remains unproven.

The remaining scope preserves sandbox redemption, IAP guards, referral handling and fail-open reporting, adds no Paddle, and keeps live activation outside the plan. Batching, push gates and the single full Dart run at merge are consistent.