# Review receipt — Grok 4.7 High r2 — vela-website PR #11

**Verdict: REVISE**

| Field | Value |
|---|---|
| Target | growthwise68/vela-website PR #11 (draft) |
| Tip reviewed | `cursor/c11-website-checkout-d1b2` @ `203b77d4c8906604e80efeaece3dd7cf4cb597fe` |
| Parent tip | `d4c404d00b9adeb9552c38a70bf115290be1a4b2` (receipt #12, REVISE) |
| Base compared | `main` @ `e37ab436a8c83722b6fa2095224199cf3d7980b7` |
| Strip agent | `bc-e9cf62b8-13b2-5ebb-a2f2-fdf884fe3810` (`originalModelName`: `composer-2.5`) |
| This receipt | Review only. No product checkout edits, no merge, no deploy. |
| Path note | `ops/workflows/paypath_investigation/` is not on this tip. Receipt written at the fallback path. |

**Signed intent scored:** SIGN_PAGE north star — pay on the website → Open Véla (or the email link) → sign in → Core is on. Redeem paste is a rare backup. Referral QR or messenger goes to the same payment page. Boundary: journey up to sign-in, before app onboarding. Rachel C13 is not this PR. The revise keep list requires the Stripe+RC checkout CTA on `/pay`.

INTENT_DRIFT: FAIL

IRRELEVANT_CONTENT: Customer-visible sandbox copy on the success page when the App Store URL is unset — “for sandbox demos” (`src/components/pay/PaySuccessActions.tsx:48-51`).

## Checklist

| # | Gate | Result |
|---|---|---|
| 1 | Signed simple intent only | **PASS** |
| 2 | No drift/ratchet; no new helpers/chronology/display/extra layers vs signed intent | **FAIL** |
| 3 | Map node C11 + position + docs present and truthful | **PASS** |
| 4 | Seating: Composer implement; this High; Codex OFF; Collection OFF; no deploy; fast=false | **PASS** |
| 5 | INTENT_DRIFT PASS and IRRELEVANT_CONTENT NONE | **FAIL** |

One FAIL is enough. Gates 2 and 5 fail. Do not accept.

## What the strip got right

Checked on `203b77d` against the revise list. These are gone from product behavior:

- No `sessionStorage`, no `vela_pay_attribution_v1`, no first-visit-wins merge (`src/lib/pay/attribution.ts` is current-URL pick and query serialize only).
- RevenueCat URL is the env string trimmed. Site `utm_` / `ref` are not appended (`src/lib/pay/checkout-url.ts:4-8`). The Wall-E join comment is gone from that file.
- Extra keys `utm_campaign`, `utm_content`, `utm_term`, and `referral` are not in `ATTRIBUTION_PARAM_KEYS` (`src/lib/pay/config.ts:22-26`). A test feeds those keys in and expects them dropped (`src/lib/pay/attribution.test.ts:9-17`).
- No store-download block on `/pay` before payment (`src/components/pay/PayCheckoutClient.tsx`). Store links stay on `/pay/success` when env URLs are set.
- No copy-link control and no native share. QR + WhatsApp only, and both use the on-site `/pay` URL (`src/components/pay/ReferralSharePanel.tsx:9-13`, `:24`, `:85-93`).
- Customer lines “Sandbox checkout”, “Test cards only”, “Check your email if you need an open link”, and “No reward is granted” are gone.
- No hard-coded `vela_core_web` fallback. `NEXT_PUBLIC_RC_WEB_PURCHASE_URL` defaults to empty (`.env.example:26`, `src/lib/pay/config.ts:8-9`).
- REPORT no longer assigns W1 redemption, a Helen live gate, or W3/W6 as work to do. Those names appear only in the stripped-items list the revise asked for (`REPORT.md:7-16`).
- REPORT states this PR does not prove “Core already on” (`REPORT.md:71`).
- RC success redirect is documented as a dashboard step, not an in-code wire (`REPORT.md:51`).
- No new site-wide nav link to `/pay`. Diff vs `main` does not touch Redeem, C12, or C5 writers.
- `npm test` on this tip: 6 passed, 0 failed. The success markup test checks “Open Véla” only. It does not forbid the sandbox sentence.

Kept, and required by the revise: `/pay` Stripe+RC CTA, `/pay/success` Open Véla, Redeem as rare-backup copy, QR + WhatsApp → on-site `/pay`. Success copy stops at sign-in. There is no app-onboarding flow.

## 1. Signed simple intent only — PASS

The page set matches the signed keep and the sign-in boundary.

- `/pay` is the payment landing. The CTA is “Continue to secure checkout” and its href is the env Web Purchase Link only (`src/components/pay/PayCheckoutClient.tsx:22`, `:41-51`).
- `/pay/success` leads with Open Véla (`src/components/pay/PaySuccessActions.tsx:19-24`).
- Redeem is a sentence, not a paste field (`src/components/pay/PaySuccessActions.tsx:68-70`).
- QR and WhatsApp encode the website pay URL.
- Rachel C13 is not implemented. The empty env slot does not invent her product slug.
- PR #11 remains draft. This review did not merge or deploy.

The leftover sandbox sentence is scored under gates 2 and 5. It does not replace the journey.

## 2. No drift / no ratchet — FAIL

The first-touch ratchet is gone. Keys are read from the current page URL and are not stored, and they are not copied onto the RevenueCat link. `utm_source`, `utm_medium`, and `ref` on the site URL are the revise allowance (“if any UTM remains, it stays on the site `/pay` URL only”).

The gate still fails. Customer copy about sandbox was on the required strip list. This sentence is still rendered on `/pay/success` whenever `NEXT_PUBLIC_IOS_APP_STORE_URL` is empty, which is the default:

```48:51:src/components/pay/PaySuccessActions.tsx
            <p className="font-sans text-sm text-inkMid">
              App Store link — set{" "}
              <span className="font-mono text-xs">NEXT_PUBLIC_IOS_APP_STORE_URL</span> for
              sandbox demos.
```

That paragraph was already in `d4c404d` and the strip did not remove it. It is the same class as the sandbox label receipt #12 ordered off the customer page.

## 3. Map node C11 + position + docs — PASS

- Node name C11 is in `REPORT.md:3`.
- Map position is the binding node line: `main@f77d804f` (PR #276). The strip agent copied that line from the composer prompt. It did not resolve the SHA with git.
- This website repo’s `main` is `e37ab436a8c83722b6fa2095224199cf3d7980b7`. There is no PR #276 in growthwise68/vela-website. The line is a launch-map citation, not a claim that this repo’s HEAD is that commit. The map repository is not available from this checkout, so this review does not re-prove the SHA. It does match the locked node sentence the revise called the truthful map line.
- The signed-intent paraphrase in `REPORT.md:5` matches SIGN_PAGE: pay on the web → Open Véla (or the email link) → sign in → Core on. “(or email)” is the signed alternate open path. The stripped item was the separate customer line “Check your email if you need an open link”, and that line is gone.
- Docs that were untrue on `d4c404d` are corrected on this tip: no invented `vela_core_web` URL, no W1/W3/W6 work program, no claim that this PR proved Core.

## 4. Seating — PASS

| Seat | Evidence |
|---|---|
| Composer implement, fast=false | Strip run `bc-e9cf62b8-13b2-5ebb-a2f2-fdf884fe3810`, `originalModelName` `composer-2.5` (not `composer-2.5-fast`). User task on that run: `model fast=false`. Commit `203b77d` is that run. Original builder `bc-0ef871a0-91c6-5e80-a4a4-e1a2a8b5d1b2` is also `composer-2.5`. |
| This High, fast=false | This receipt is run `bc-74c8e8f4-a463-5f15-bcbd-7be1eefc127d`, `originalModelName` `grok-4.7` (not a `-fast` slug). Review only. |
| Codex OFF | Strip-run tools were file reads, search, edits, `npm test`, and git commit/push. No Codex tool. |
| Collection OFF | Same. No Collection tool. Prompt said Collection OFF. |
| No deploy | PR #11 `isDraft` true, state OPEN, not merged. Strip-run event list is empty (no deploy event). This review did not deploy. Vercel’s GitHub preview check on the branch is the existing preview integration (updated `2026-10-12T16:53:38Z`). It is not an agent production deploy. |

## 5. Drift lines

INTENT_DRIFT: FAIL

The kept journey matches the signed page and the revise keep list. The tip does not match the full strip. Customer sandbox copy is still on the success page.

IRRELEVANT_CONTENT: Customer-visible sandbox copy on the success page when the App Store URL is unset — “for sandbox demos” (`src/components/pay/PaySuccessActions.tsx:48-51`).

Checked and not added to that list:

- `src/lib/pay/attribution.test.ts:21` uses sample ref `wall-e`. The Wall-E join comment is gone from `checkout-url.ts`. The sample id is not a join feature and is not customer copy.
- Operator lines that say “sandbox WPL” in `.env.example`, `config.ts` comments, and REPORT dashboard steps match the sandbox-only scope. They are not the customer sandbox label.
- Test hosts `pay.rev.cat/sandbox/...` are fixtures. The product default URL is empty.

IRRELEVANT_CONTENT is not NONE.

## Required lines

INTENT_DRIFT: FAIL

IRRELEVANT_CONTENT: Customer-visible sandbox copy on the success page when the App Store URL is unset — “for sandbox demos” (`src/components/pay/PaySuccessActions.tsx:48-51`).

**ACCEPT or REVISE: REVISE**
