---
plan_kind: NLSPEC
slug: webpay_rc_live_scheme
plan_version: r2 (ACCEPT in review_plan_high_r2.md; r2 NIT wording applied post-accept, Q4 text only)
date: 2026-10-16
intent: ops/workflows/webpay_golive/INTENT_rc_live_scheme.md (SIGNED Iain 18:38 SAST via Helen)
owners: app desk (vela PR, assigned by Helen), PayPath (vela-website PR)
implementer: Composer (composer-2.5, fast=false)
status: plan-only; no code
verified_on:
  vela main: d5bc3de486603bfd0e99d7e2066ffc16c65ce7a6
  vela-website main: d4b17892461e0e99d895c22e37cc4e19db3e6b36
  method: fresh shallow clones in a scratch dir on Iain's Mac, grep -n (16 Oct 2026 ~18:45 SAST)
---

# NLSPEC PLAN: accept the live RevenueCat redeem scheme (rc-c809f0a40e)

## Intent (verbatim, signed)

Someone who pays on our website with the live checkout taps "Open Véla", and the app opens and gives them Core. The live link works the same way the test link works today, and the test link keeps working.

## Root cause (one sentence)

RevenueCat issues redeem links whose scheme belongs to each web config (sandbox `appbed9aa89d1` → `rc-bed9aa89d1`; live `appc809f0a40e` → `rc-c809f0a40e`, RC `list-apps` 16 Oct), but both the app and the website hardcode only the sandbox scheme. So a live link is not opened by the app, and the website marks it `invalid_shape` and falls back to `vela://open`.

## Verified locations (today's main)

**growthwise68/vela @ d5bc3de4**
| File:line | Current |
|---|---|
| `ios/Runner/Info.plist:47` | `<string>RevenueCat Web Purchase Redemption</string>` (URL type name) |
| `ios/Runner/Info.plist:51` | `<string>rc-bed9aa89d1</string>` (only scheme in that type) |
| `android/app/src/main/AndroidManifest.xml:64` | `<data android:scheme="rc-bed9aa89d1" />` (RC intent-filter) |
| `lib/custom_code/web_purchase_deep_links.dart:18` | `const revenueCatWebRedemptionScheme = 'rc-bed9aa89d1';` |
| `lib/custom_code/web_purchase_deep_links.dart:25` | `if (uri.scheme.toLowerCase() == revenueCatWebRedemptionScheme) {` |
| `test/web_purchase_redemption/manifest_scheme_fixture_test.dart:12,24` | expects the single constant in both manifests |
| `test/web_purchase_redemption/deep_link_dispatch_test.dart:10,48,79` | builds URIs from the constant |
| `test/web_purchase_redemption/redemption_command_replay_test.dart:307,363` | builds URIs from the constant |
| `test/web_purchase_redemption/helpers/web_purchase_flow_test_support.dart:34` | builds URIs from the constant |
(The sandbox literal also appears in docs/specs and other tests; they are not changed.)

**growthwise68/vela-website @ d4b17892**
| File:line | Current |
|---|---|
| `src/components/pay/PaySuccessActions.tsx:59` | `if (parsed.protocol.toLowerCase() !== "rc-bed9aa89d1:") {` inside `decideRedeemUrl` (l.53) |
| `src/components/pay/pay-ui.test.tsx:63,98,200,281,306` | sandbox-scheme fixtures (W1-W5) |

## The change (simplest; one set, no flags)

### PR A: growthwise68/vela (one PR, batched into the next vela batch)
1. `web_purchase_deep_links.dart:18`: keep the existing name `revenueCatWebRedemptionScheme` (sandbox) so existing tests and fixtures compile unchanged, and add exactly one set:
   `const revenueCatWebRedemptionSchemes = {revenueCatWebRedemptionScheme, 'rc-c809f0a40e'};` (a Dart const set may reference a const string, so the sandbox literal exists once).
   **Alternative for review (Q1):** drop the single constant and update the 8 test references. The plan prefers keeping it, because there's less churn and the tests stay green unchanged.
2. `web_purchase_deep_links.dart:25` → `if (revenueCatWebRedemptionSchemes.contains(uri.scheme.toLowerCase())) {`
3. `Info.plist:51`: add `<string>rc-c809f0a40e</string>` on the next line, in the same array.
4. `AndroidManifest.xml:64`: add `<data android:scheme="rc-c809f0a40e" />` on the next line, in the same intent-filter.
5. No new flags, env vars, build modes, files or screens. The executor, claim screen, sign-in and `Purchases.redeemWebPurchase` path stay as they are.

### PR B: growthwise68/vela-website (one PR, single push)
1. `PaySuccessActions.tsx`: add one module constant `const RC_REDEEM_PROTOCOLS = new Set(["rc-bed9aa89d1:", "rc-c809f0a40e:"]);` and change l.59 to `if (!RC_REDEEM_PROTOCOLS.has(parsed.protocol.toLowerCase())) {`. The host check (`redeem_web_purchase`) and the `redemption_token` check stay.
2. No env var. Which link buyers reach stays controlled only by `NEXT_PUBLIC_RC_WEB_PURCHASE_URL`, which this PR doesn't change.

## Tests

**PR A (Flutter)**
- `deep_link_dispatch_test.dart`:
  - **Independent literal check:** `expect(revenueCatWebRedemptionSchemes, equals(<String>{'rc-bed9aa89d1', 'rc-c809f0a40e'}))`. The expected values are written as literals, not read from the production set, so leaving out live fails the test.
  - For each of the two literal URIs `rc-bed9aa89d1://redeem_web_purchase?redemption_token=T1` and `rc-c809f0a40e://redeem_web_purchase?redemption_token=T2` (literals, not built from the constant): `commandFromWebPurchaseUri` returns `WebPurchaseCommandType.redemptionLink`, and `payload` equals the complete input URI string.
  - Negatives: `rc-ffffffffff://redeem_web_purchase?redemption_token=x` and `vela://open` → null. Upper-case `RC-C809F0A40E://redeem_web_purchase?redemption_token=x` → accepted (the existing `toLowerCase` behaviour).
- `manifest_scheme_fixture_test.dart`: assert the two **literals** `<string>rc-bed9aa89d1</string>` and `<string>rc-c809f0a40e</string>` in Info.plist, and `android:scheme="rc-bed9aa89d1"` and `android:scheme="rc-c809f0a40e"` in AndroidManifest (not looped over the production set). Existing structural regexes unchanged.
- Run locally before push: `flutter test test/web_purchase_redemption/` (scratch worktree, Iain's Mac; no Actions).

**PR B (node:test)**
- `pay-ui.test.tsx`: add W6 — the literal `rc-c809f0a40e://redeem_web_purchase?redemption_token=…` makes the Open Véla href equal to the raw link, and `fetch` is not called (same shape as W5). Add W7 — `rc-ffffffffff://redeem_web_purchase?redemption_token=x` is still `invalid_shape` and is reported (redacted). The existing sandbox fixtures W1-W5 (l.63, 98, 281, 306) stay as the sandbox proof.
- `npm test` and `npx tsc --noEmit` green locally.

## Sim smoke (after merge, before release)

Preconditions (from `specs/web_purchase_redemption/SMOKE_REPORT.md` A3: without the RC key the deep-link ready-gate never opens, and the claim UI is silently unreachable):
- Build with `scripts/run.sh` / `scripts/run_app.sh` on Iain's Mac. They source `scripts/vela_revenuecat_defines.sh`, which reads `~/.vela-build.env` (mode 600) for the platform RC key and adds `VELA_IS_TEST_BUILD=true`. Key values are never printed.
- Sign in first with a **Firebase test account** (not a real customer, and an account with no active Core), so identity and RevenueCat are both ready (`lib/main.dart:490-497`, `_setBindingReady` → `_webPurchaseDeepLinks.setReady(ready && isConfigured)`).

PASS rule (each scheme, each platform): the confirm dialog **"Redeem for this Véla account?"** (`lib/custom_code/web_purchase_redemption_confirm.dart:16`) appears. Then tap **Not now**, which doesn't redeem or change Core (SMOKE_REPORT A6). A generic sign-in screen, no dialog, or a crash = FAIL. Fake tokens are fine because nothing is redeemed.

iOS (Simulator):
1. `xcrun simctl openurl booted "rc-c809f0a40e://redeem_web_purchase?redemption_token=smoke_live"` → dialog → Not now.
2. `xcrun simctl openurl booted "rc-bed9aa89d1://redeem_web_purchase?redemption_token=smoke_sandbox"` → dialog → Not now.
3. Core smoke as usual (home, plan, roster) → unchanged.

Android (AVD `vela_api34`, direct Mac build, same test account):
1. `adb shell am start -a android.intent.action.VIEW -d "rc-c809f0a40e://redeem_web_purchase?redemption_token=smoke_live"` → dialog → Not now.
2. Same with `rc-bed9aa89d1://…`.

Website (Vercel preview of PR B): open `/pay/success?redeem_url=<encoded rc-c809f0a40e link>&app_user_id=x` → Open Véla href is the live link; with `rc-ffffffffff` → falls back to `vela://open`. Optional real check: a sandbox purchase on the sandbox link, which still lands on RC's page.

## Must not break

- Paddle-free: no Paddle code, scheme or copy added.
- App Store / Play subscriptions: no IAP, restore or entitlement code touched; `refusedActiveIap` unchanged.
- Existing sandbox redeem (`rc-bed9aa89d1`) in the app and on /pay/success.
- Referral `ref` and UTM attribution (`src/lib/pay/config.ts:23-25`, `attribution.ts`): not touched.
- `vela://` deep links, Profile, sign-in, roster, plan, goal and feedback: no files touched.
- Fail-open report contract on /pay/success (redaction, `pay_success_redeem_url` check id): unchanged.

## Process

1. This plan → Sol 6.1 High plan review until ACCEPT (no code before).
2. Composer implements PR A and PR B.
3. Sol 6.1 High code review per PR; push only after ACCEPT. PR B: exactly one push. PR A: one push, batched; no `ship` label until the batch.
4. Merge: one full Dart run at merge (PR A, batched, no extra Actions minutes). Receipts (with `tokens:` line) in the pre-ship push.
5. Sim smoke after merge (above) + core smoke after main merge.
6. Release order (RC docs, https://www.revenuecat.com/docs/web/redemption-links): ship and get the app widely installed → Redemption Links on `appc809f0a40e` sandbox-only → test → production. That's Iain-only and out of this plan.

## Integrity / simplification checks (for the reviewer)

- [ ] Exactly the files listed; no other product file changes in either PR.
- [ ] One set of two literal schemes per repo; no flag, env var, remote config or build-mode branching.
- [ ] No weakening: host and token checks unchanged; unknown `rc-*` schemes still rejected.
- [ ] No dead code added; no duplicated validity path (one `decideRedeemUrl`, one `commandFromWebPurchaseUri`).
- [ ] Tests prove both schemes with **independent literals** (not derived from the production set) AND a negative case in both repos.
- [ ] Sim smoke PASS = the confirm dialog, with a configured RC key and a signed-in test account.
- [ ] No live switch-on: no RC dashboard, Vercel env or Stripe change in this plan.
- [ ] One push per gate; no force-push; no Actions run outside the batch.

## Open questions (resolve in review)

- **Q1 (r1 answer: keep; the set is the sole routing authority):** Keep the existing single constant (sandbox) alongside the new set, or remove it and update the 8 test references? Plan: keep it (less churn). Reviewer decides.
- **Q2 (r1 answer: yes):** Should the two scheme lists (Dart and TS) carry a comment naming the RC app ids (`appbed9aa89d1`, `appc809f0a40e`) for traceability? Plan: yes, one comment line each.
- **Q3 (r1 answer: same filter):** Does Android need a second `<data>` in the same filter, or its own intent-filter? Plan: same filter. Several `<data>` schemes in one filter are standard Android behaviour, The fixture regex checks structure only; it doesn't enforce a single RC filter (`manifest_scheme_fixture_test.dart:29`).
- **Q4: Does RC's `app_user_id` on the redirect clash with the referral `ref` param or attribution parsing on /pay/success?** Answered from code: **No clash.**
  - `/pay/success` reads only `redeem_url` and `app_user_id` (`PaySuccessActions.tsx:134-135`).
  - Attribution (`utm_source`, `utm_medium`, `ref`; `src/lib/pay/config.ts:23-25`) is picked only on `/pay`: `pickAttributionFromSearchParams` (`src/lib/pay/attribution.ts:6`, allowlist at l.20) is used by `PayCheckoutClient.tsx` (l.25, share links). `pay-page-url.ts:10` uses the serializer `attributionToQuery` (building share URLs), not the picker. Nothing on `/pay/success` parses attribution.
  - The checkout builder appends **no incoming site attribution** (`src/lib/pay/checkout-url.ts:3-7` returns the configured base URL trimmed; test `checkout-url.test.ts:7-13` asserts `ref` is null for the supplied fixture URL). Any parameters already inside the configured `NEXT_PUBLIC_RC_WEB_PURCHASE_URL` are kept as configured. The deployed value isn't established by this code; the 14 Oct production capture showed the button href as `https://pay.rev.cat/sandbox/yjjzwzqykwklzkib/` with no parameters (`/workspace/c11r-live/live-run.txt`).
  - Existing test W1 (`pay-ui.test.tsx:96-111`) already covers a sibling `app_user_id` and asserts it isn't rendered.
  - Side fact, out of scope: this website code doesn't pass incoming `ref` into checkout, so the website can't tie a purchase to a referrer. Whether attribution survives some other way (RC or Stripe metadata, or the app) is **unproven** and outside this code. Flagged for Helen; not a clash.
