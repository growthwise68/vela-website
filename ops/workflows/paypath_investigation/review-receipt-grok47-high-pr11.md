# Review receipt — Grok 4.7 High — vela-website PR #11

**Verdict: REVISE**

| Field | Value |
|---|---|
| Target | growthwise68/vela-website PR #11 (draft) |
| Head | `cursor/c11-website-checkout-d1b2` @ `d4c404d00b9adeb9552c38a70bf115290be1a4b2` |
| Base compared | `main` @ `e37ab436a8c83722b6fa2095224199cf3d7980b7` |
| Implementer run | `bc-0ef871a0-91c6-5e80-a4a4-e1a2a8b5d1b2` (`originalModelName`: `composer-2.5`) |
| This receipt | Review only. No product checkout edits, no merge, no deploy. |
| Diff size | 17 files, +1515 / −5 vs `main` |

**Signed intent scored (Iain, this gate):** Stripe+RC handle customers as defined via the PayPath journey — website pay → Véla welcome/open app → Core already active; paste Redeem backup only; referral QR/messenger → payment page. Rachel C13/WPL rail is HELD (not this PR).

INTENT_DRIFT: FAIL

IRRELEVANT_CONTENT: Wall-E join comment and UTM copy onto the RevenueCat link; sessionStorage first-touch chronology; pay-page store-download block; copy-link and native-share controls; customer copy about sandbox, test cards, email recovery, and “no reward”; REPORT steps for W1 redemption, Helen live gate, and W3/W6; assembled `pay.rev.cat` path `vela_core_web` (not in the signed page).

## Checklist

| # | Gate | Result |
|---|---|---|
| 1 | Signed simple intent only | **FAIL** |
| 2 | No drift/ratchet; no new helpers/chronology/display/extra layers vs signed intent | **FAIL** |
| 3 | Map node C11 + position + docs present and truthful | **FAIL** |
| 4 | Seating: Composer implement; this High; Codex OFF; Collection OFF; no deploy; fast=false | **PASS** |
| 5 | INTENT_DRIFT PASS and IRRELEVANT_CONTENT NONE | **FAIL** |

One FAIL is enough. Three gates fail. Do not accept.

## What matches the journey

These pieces sit on the signed path and are not the reason for REVISE:

- `/pay` exists as a payment landing (`src/app/pay/page.tsx`).
- `/pay/success` has an Open Véla control (`src/components/pay/PaySuccessActions.tsx:19-24`).
- Redeem is copy-only backup, not a paste field (`src/components/pay/PaySuccessActions.tsx:68-70`).
- QR and the WhatsApp link encode the on-site pay URL (`src/components/pay/ReferralSharePanel.tsx:25`, `:9-13`).
- Diff vs `main` does not touch Redeem, C12, or C5 writers.
- PR #11 is still draft. The implementer event log has `pr_created` only.

## 1. Signed simple intent only — FAIL

The commit does not stop at the journey. It builds a Web Purchase Link handoff, which this gate holds as Rachel’s C13/WPL rail, and it adds state, share chrome, and dashboard work that the signed sentence does not name.

**Held rail is the checkout itself.**

- `src/lib/pay/config.ts:8-10` defaults the button to `https://pay.rev.cat/sandbox/rc-bed9aa89d1/vela_core_web`.
- `src/components/pay/PayCheckoutClient.tsx:47-49` and `:69-79` send the customer there (“Continue to secure checkout”).
- `.env.example:25-27` documents that same URL as the C11 sandbox checkout.

The binding uploads the implementer read do not contain a `pay.rev.cat` URL or the slug `vela_core_web`. The string `rc-bed9aa89d1` appears there only as an app sandbox scheme (“Sandbox scheme partially present”), not as a website purchase link. The page treats an assembled link as the customer’s Stripe checkout.

**Welcome is not wired to payment.**

- `src/lib/pay/checkout-url.ts:8-23` appends attribution query keys only. There is no success/return URL.
- `/pay/success` is a separate route (`src/app/pay/success/page.tsx`). Nothing in the diff points the checkout at it.
- `REPORT.md:42` leaves that join as a human RevenueCat dashboard step. The signed journey is website pay → Véla welcome. This PR does not connect those two steps in code.

**No site entry.** `git grep /pay` on `main` is empty, and the PR does not add a link from the existing pages. The only in-repo link to `/pay` is “Return to checkout” on the success page (`src/app/pay/success/page.tsx:42`).

## 2. No new helpers, chronology, display, or extra layers — FAIL

North star on the implementer prompt was “simple — no extra layers” and “light … persistence on the pay URL only.” The diff adds a helper stack and then copies that state off the pay URL.

**Helpers (new modules, none of them on `main`):**

- `src/lib/pay/config.ts`
- `src/lib/pay/attribution.ts` (`pickAttributionFromSearchParams`, `mergeAttributionFirstTouch`, `attributionToQuery`, `parseAttributionJson`)
- `src/lib/pay/checkout-url.ts` (`buildRevenueCatCheckoutUrl`)
- `src/lib/pay/pay-page-url.ts` (`buildPayPageUrl`)

**Chronology / ratchet.** First visit wins for the browser session, then those keys are written onto the RevenueCat link “for Wall-E join later.”

- `src/lib/pay/attribution.ts:27-37` — stored keys are not overwritten.
- `src/components/pay/PayCheckoutClient.tsx:28-44` — `sessionStorage` key `vela_pay_attribution_v1`.
- `src/lib/pay/config.ts:22-33` — seven keys: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ref`, `referral`.
- `src/lib/pay/checkout-url.ts:4-6` and `:15-23` — same keys appended to the WPL.
- `REPORT.md:15` and `:24` record that forward as shipped behavior.

That is a second store and a second URL. The signed referral line is QR/messenger → payment page. It is not a first-touch memory that rides into the held WPL.

**Display beyond the journey.**

- Store badges on the pay page, before payment: `src/components/pay/PayCheckoutClient.tsx:89-120`. The welcome/download step belongs after pay.
- Copy link and native share beside WhatsApp: `src/components/pay/ReferralSharePanel.tsx:40-64` and `:113-134`. Signed share is QR or messenger.
- Process language on the customer page: “Sandbox checkout” and “Test cards only” (`src/components/pay/PayCheckoutClient.tsx:62-83`); “No reward is granted in this sandbox slice” (`src/components/pay/ReferralSharePanel.tsx:74-76`); “Check your email if you need an open link” (`src/components/pay/PaySuccessActions.tsx:26-28`).

**Tests do not lock the journey.** `src/lib/pay/pay-cta.test.ts:5-13` calls `buildRevenueCatCheckoutUrl` with a passed-in URL. It never renders the button and never checks the default in `config.ts`. `src/components/pay/pay-ui.test.tsx:8-13` only asserts that the success markup contains “Open Véla”.

## 3. Map node C11 + position + docs — FAIL

Node name “C11” is present. Map position is not. The doc that is present is not truthful.

- Implementer prompt node line: `C11 — Website checkout page. Map: main@f77d804f (PR #276).`
- `REPORT.md:3` says “Node: C11 website pay landing only” and does not record `f77d804f` or PR #276.
- No other file in the `d4c404d` diff contains that map position. `SIGN_PAGE.md` is cited at `REPORT.md:5` and is not in the tree (absent on `main` and absent in the PR).

**Untruthful claims.**

- `REPORT.md:29` and `src/lib/pay/config.ts:8-10` present `https://pay.rev.cat/sandbox/rc-bed9aa89d1/vela_core_web` as the sandbox Web Purchase Link. That full URL is not in the signed page or the composer prompt. A GET of that URL returns the generic RevenueCat shell (`<title>Loading...</title>`, 940 bytes). That is not evidence of a Véla Core product.
- `REPORT.md:43` tells a human to “Enable sandbox redemption / open-in-app flow per PayPath W1”. W1 in the draft plan is a different package (sandbox redemption links), not this website page.
- `REPORT.md:63` says “Core already on” proof stays follow-on (W3/W6). The customer pages say the opposite outcome is already waiting: `src/app/pay/success/page.tsx:30-33` and `src/components/pay/PaySuccessActions.tsx:26-28`.

## 4. Seating — PASS

| Seat | Evidence |
|---|---|
| Composer implement | User task: “You are Composer on launch-map node C11”. Run `bc-0ef871a0-91c6-5e80-a4a4-e1a2a8b5d1b2` records `originalModelName` `composer-2.5`. Commit `d4c404d` author is Cursor Agent. |
| This High | This receipt is the High review of that tip. It does not edit product code. |
| Codex OFF | Composer prompt out-of-scope line includes Codex. No Codex model on the run. |
| Collection OFF | Same out-of-scope line includes Collection. Draft plan header: Collection OFF, Codex OFF. No collection call in the run. |
| No deploy | PR #11 state OPEN, `isDraft` true. Run events: one event, `pr_created`. No deploy commit. |
| fast=false | Recorded model slug is `composer-2.5`, not `composer-2.5-fast`. |

## 5. Drift lines

INTENT_DRIFT: FAIL

The tip is not the signed journey alone. It (a) makes a Web Purchase Link the customer CTA while that rail is held, (b) invents the link from an app scheme id plus a product slug that the signed docs do not contain, (c) keeps a session chronology and copies it onto that link, and (d) leaves `/pay/success` unwired.

IRRELEVANT_CONTENT:

- `src/lib/pay/checkout-url.ts:6` — “we keep them for Wall-E join later.”
- `src/lib/pay/checkout-url.ts:15-23` — attribution copied onto the RevenueCat URL.
- `src/lib/pay/attribution.ts:27-37` and `src/components/pay/PayCheckoutClient.tsx:28-44` — first-touch `sessionStorage`.
- `src/lib/pay/config.ts:25-32` — campaign/content/term plus a second `referral` key.
- `src/components/pay/PayCheckoutClient.tsx:62-64` and `:81-83` — “Sandbox checkout”, “Test cards only”.
- `src/components/pay/PayCheckoutClient.tsx:89-120` — store links on the pay page.
- `src/components/pay/ReferralSharePanel.tsx:74-76` — “No reward is granted in this sandbox slice.”
- `src/components/pay/ReferralSharePanel.tsx:113-127` — Copy link and native share.
- `src/components/pay/PaySuccessActions.tsx:28` — email open-link recovery.
- `REPORT.md:39-45` — W1 redemption, Helen live gate, Stripe dashboard program.
- `REPORT.md:63` — W3/W6 chronology.
- `src/lib/pay/config.ts:10` and `.env.example:27` — assembled path `vela_core_web`.

IRRELEVANT_CONTENT is not NONE.

## Required lines

INTENT_DRIFT: FAIL

IRRELEVANT_CONTENT: Wall-E join comment and UTM copy onto the RevenueCat link; sessionStorage first-touch chronology; pay-page store-download block; copy-link and native-share controls; customer copy about sandbox, test cards, email recovery, and “no reward”; REPORT steps for W1 redemption, Helen live gate, and W3/W6; assembled `pay.rev.cat` path `vela_core_web` (not in the signed page).

**ACCEPT or REVISE: REVISE**
