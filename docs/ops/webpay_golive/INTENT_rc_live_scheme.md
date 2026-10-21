# INTENT: accept the live RevenueCat redeem link in the app (rc-c809f0a40e)

Status: **SIGNED (Iain 18:38 via Helen)**, 16 Oct 2026 SAST. Scope includes the website line `src/components/pay/PaySuccessActions.tsx` l.59 (owner PayPath). No code yet.
Context: Iain, 16 Oct 2026, 18:32 SAST: Stripe via RevenueCat is the live web provider and Paddle is retired (overturns D-019).

## Intent (signed, verbatim)

Someone who pays on our website with the live checkout taps "Open Véla", and the app opens and gives them Core. The live link works the same way the test link works today, and the test link keeps working.

## Root cause (one sentence)

The app only recognises RevenueCat's sandbox redeem link, because the scheme `rc-bed9aa89d1` is hardcoded in three places, and the live RevenueCat Billing app `appc809f0a40e` uses its own scheme, `rc-c809f0a40e`.

Evidence (growthwise68/vela main `d5bc3de486603bfd0e99d7e2066ffc16c65ce7a6`; ~ = line read through the GitHub connector, off by about one):
- `ios/Runner/Info.plist` ~l.49-53: `<string>rc-bed9aa89d1</string>` (only RC entry under CFBundleURLSchemes)
- `android/app/src/main/AndroidManifest.xml` ~l.64-65: `<data android:scheme="rc-bed9aa89d1" />`
- `lib/custom_code/web_purchase_deep_links.dart` ~l.19 and ~l.26: `const revenueCatWebRedemptionScheme = 'rc-bed9aa89d1';` and the `uri.scheme.toLowerCase() == revenueCatWebRedemptionScheme` check
- RC `list-apps` (16 Oct): `appc809f0a40e` "Véla for Crew (RC Billing LIVE)", custom_url_scheme `rc-c809f0a40e`; `appbed9aa89d1` sandbox, `rc-bed9aa89d1`.

## Scope: exactly these three changes

| # | File | Change |
|---|---|---|
| 1 | `ios/Runner/Info.plist` | Add `<string>rc-c809f0a40e</string>` next to `rc-bed9aa89d1` in the same RC URL-type array. |
| 2 | `android/app/src/main/AndroidManifest.xml` | Add `<data android:scheme="rc-c809f0a40e" />` in the same RC intent-filter. |
| 3 | `lib/custom_code/web_purchase_deep_links.dart` | Replace the single constant with one set: `{'rc-bed9aa89d1', 'rc-c809f0a40e'}`; the check becomes "scheme is in the set". |

- No new flags, env vars or build modes. Both schemes are accepted in every build. RevenueCat decides which environment a token belongs to, so the app doesn't need to.
- Nothing else changes: same redemption executor (`Purchases.redeemWebPurchase` path from vela #303 / C11R2 #321), same claim screen, same sign-in.
- Update `test/web_purchase_redemption/manifest_scheme_fixture_test.dart` (it already checks the scheme in the manifests) so it expects both schemes.

## Acceptance

1. Unit test: `commandFromWebPurchaseUri` returns a `redemptionLink` command for `rc-bed9aa89d1://redeem_web_purchase?redemption_token=x` AND `rc-c809f0a40e://redeem_web_purchase?redemption_token=x`; returns null for another scheme (e.g. `rc-ffffffffff://…`, `vela://open`).
2. Manifest fixture test: Info.plist and AndroidManifest both list both schemes.
3. Sim smoke (iOS simulator, after merge): `xcrun simctl openurl booted "rc-c809f0a40e://redeem_web_purchase?redemption_token=test"` opens Véla and reaches the claim screen (no real token needed; a refusal message for a fake token is expected and passes). Repeat with `rc-bed9aa89d1://…` (same result). Android emulator: `adb shell am start -a android.intent.action.VIEW -d "rc-c809f0a40e://redeem_web_purchase?redemption_token=test"`. Optional: a real sandbox purchase → redeem on the device, as on 13-14 Oct.
4. One full Dart run at merge (batched with other app changes; no extra Actions runs). Core smoke after the main merge.

## Must not break

- **Paddle-free:** adds no Paddle code, scheme or copy.
- **App Store / Play subscriptions untouched:** no change to IAP purchase, restore or entitlement code; the existing "already has Core via IAP" refusal (`refusedActiveIap`) stays.
- **Existing sandbox redeem:** `rc-bed9aa89d1` links keep working (acceptance 1 and 3).
- **Referral `ref`:** the `ref` parameter on website/referral links is not touched or dropped. This change only adds a scheme; `vela://` deep links and their query parameters are unchanged.
- Profile flows, sign-in, roster, plan, goal and feedback: no files touched.

## Release order (important)

RevenueCat docs (https://www.revenuecat.com/docs/web/redemption-links, "Update your mobile app(s) to register custom URL schemes from RevenueCat"): *"Any customers on older app versions that aren't configured to accept custom URL schemes will not be able to use these links. You should therefore make sure that as many customers as possible have updated to your new app version before sending them to a purchase flow without an App User ID."* The scheme is "unique to that web config", so the live config needs its own registration.

So: (1) ship this release on App Store and Play; (2) wait until it is widely installed; (3) only then turn on Redemption Links for **production** on `appc809f0a40e` (RC docs recommend "Enable only for Sandbox" first for testing).

## Process

Iain signs this intent → High plan review until ACCEPT → Composer implements → High code review per push → merge with one full Dart run → sim smoke → store release. Owner: app desk (to be assigned by Helen).
