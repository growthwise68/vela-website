# Plan review r1 — webpay_rc_live_scheme PLAN.md (r1)

Receipt
- seat: Sol 6.1 High via Codex 0.163.0 on Iain's Mac
- model: gpt-6.1-sol, reasoning effort: high, sandbox: read-only, one-shot `codex exec`
- session id: 01a145ac-b35f-7a80-8bc4-c6706a67e409
- run: 16 Oct 2026 ~18:55-19:08 SAST, scratch dir (fresh clones vela d5bc3de4, vela-website d4b17892)
- verdict: REVISE / INTENT_DRIFT: PASS
- tokens: 83,012

## Output (verbatim)

VERDICT: REVISE
INTENT_DRIFT: PASS

1. **MAJOR — Smoke permits a false PASS.** `PLAN.md:77` accepts a sign-in prompt, but links remain queued until identity and RevenueCat are ready (`vela/lib/main.dart:494`, `vela/lib/custom_code/web_purchase_deep_links.dart:162`). Ordinary sign-in does not prove classification. **Required:** specify the run script, configured platform key, and authenticated test account; require the actual “Redeem for this Véla account?” dialog for each scheme (`vela/lib/custom_code/web_purchase_redemption_confirm.dart:16`). A generic sign-in screen is insufficient.

2. **MAJOR — Dart tests derive their expected schemes from the implementation.** Both proposed tests iterate the production set (`PLAN.md:66`, `PLAN.md:67`); accidentally omitting live could leave them green. **Required:** independently assert the set contains exactly the two signed scheme literals, then test classification, complete payload preservation, manifest registration, and negatives.

3. **MINOR — Q4 overstates its evidence.** `PLAN.md:122` incorrectly says `pay-page-url.ts` uses the attribution picker; it uses the serializer (`vela-website/src/lib/pay/pay-page-url.ts:10`). `PLAN.md:123` says `ref` never reaches RC, but the checkout builder preserves any configured URL parameters (`vela-website/src/lib/pay/checkout-url.ts:7`). **Required:** say incoming site attribution is not appended; qualify the post-payment attribution claim as unproven outside this website code.

Q1: **Keep the compatibility constant**, with the new set as the sole routing authority. This is the smallest change; the question explicitly permits this choice. All cited production scheme locations match, and no additional production scheme literal was found. The RC app-to-scheme mapping is supplied by `INTENT_rc_live_scheme.md:18`, rather than independently verified here.

Q2: **Yes.** One short app-ID mapping comment per production set.

Q3: **Same intent-filter.** Both entries specify only schemes, so they introduce no host/path combinations. The existing fixture regex checks structure; it does not enforce exactly one RC filter (`vela/test/web_purchase_redemption/manifest_scheme_fixture_test.dart:29`).

Q4: **No clash, verified with the qualifications above.** Success reads `redeem_url` and `app_user_id` (`vela-website/src/components/pay/PaySuccessActions.tsx:134`); attribution selects only its allowlisted keys (`vela-website/src/lib/pay/attribution.ts:20`). Incoming `ref` remains available for share links (`vela-website/src/components/pay/PayCheckoutClient.tsx:25`).

The remaining scope preserves sandbox redemption, IAP guards, fail-open reporting and Paddle exclusion. The stated review/push batching and single Dart gate are consistent; live activation remains explicitly outside this plan.