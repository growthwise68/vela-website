---
launch_node: C11R
slug: c11_redeem_handoff
plan_kind: NLSPEC
plan_version: v1.6
date: 2026-10-13
author: Cursor Cloud Agent
map_pr: 294
repos:
  - growthwise68/vela (this document + app change 2)
  - growthwise68/vela-website (app change 1)
investigation: REPORT_ac9c.md (13 Oct 2026, read-only)
status: plan-only
revised_after: C11R-plan-HIGH_REVIEW-r6.md (PR #298)
---

# NLSPEC PLAN — C11R redeem hand-off (Option A, prune-first)

## Intent (verbatim)

Someone new to Véla — from anywhere, including a referrer or an AI chat — lands on our website, pays with Stripe, and already has Core in the app. If they don't have the app yet, they get a download link; if they do, it opens the app they already have. They shouldn't need to paste a code or do extra steps. App Store and Play subscriptions stay separate. Referral is easy: a QR code to scan, or a messenger link — both take them to that same payment page.

## North star (verbatim)

Pay on the website → Open Véla (or the email link) → sign in → Core is on. Pasting a code is only a rare backup. Referral starts with a QR scan or a shared messenger link to the payment page — that path stays open.

## Root cause (one sentence)

RevenueCat already issues a one-hour `redeem_url` on web checkout success, but Véla never surfaces it on `/pay/success`, and the app’s C12 redemption executor refuses every RC JWT until a Firestore `webPurchaseRedemptionTokens` row exists — a row only the legacy `vela_web_…` issuance path creates, which a bare Web Purchase Link never mints.

## Binding scope — exactly two minimal changes

| # | Repo | What |
|---|------|------|
| 1 | `growthwise68/vela-website` | `/pay/success` uses RevenueCat’s `redeem_url` query param as-is for **Open Véla** when it passes a simple validity check; else `VELA_OPEN_APP_URL`. Store badges stay hidden when env URLs are blank. One install-email sentence. |
| 2 | `growthwise68/vela` | RC redemption links go straight to `Purchases.parseAsWebPurchaseRedemption` → `Purchases.redeemWebPurchase` after sign-in — **no** `resolveWebPurchaseRedemption` Firestore preflight and **no** `recordWebPurchaseRedemptionConflict` from the executor. Prune dead client surface. **Profile redeem sheet** (`vela_web_…` paste) and deep-link **`tokenClaim`** unchanged. |

No other files, no dashboard saves, no deploy, no production flip.

---

## Change 1 — `growthwise68/vela-website`

### Files to touch (baseline: `main` @ investigation date)

| File | Role |
|------|------|
| `src/components/pay/PaySuccessActions.tsx` | `useSearchParams`, `openAppHref`, install sentence, checkout copy. |
| `src/app/pay/success/page.tsx` | Wrap `PaySuccessActions` in `<Suspense>` (same pattern as `src/app/pay/page.tsx`). |
| `src/components/pay/pay-ui.test.tsx` | Extend tests; export and unit-test `sendPaySuccessRedeemUrlFault`. |
| `.env.example` | One commented line for `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY=` (empty placeholder; no real key). |

**Do not add** `src/lib/pay/redeem-url.ts`, `redeem-url.test.ts`, or any hand-cut query slicing. **Do not edit** `package.json` or `src/lib/pay/config.ts`. **Do not** add `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_URL` or reuse survey `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Store badges already hide when env strings are empty (`PaySuccessActions.tsx` lines 37–58). `config.ts` lines 11–19 only export those strings.

### Behaviour (all in `PaySuccessActions.tsx`)

1. `const raw = useSearchParams().get('redeem_url')`. The browser / WHATWG `URLSearchParams` returns the full RC value including an embedded `?redemption_token=…`; sibling params such as `app_user_id` stay separate. **No** raw slice from `redeem_url=` to end of query (that would corrupt the href by appending `&app_user_id=…`).
2. **Never-blank rule:** `/pay/success` always renders Open Véla, store badges, and the install sentence. `openAppHref` is `VELA_OPEN_APP_URL` when `raw` is null/empty, when `new URL(raw)` **throws**, or when the parsed URL fails the three checks below. No user-facing error UI and no error boundary requirement.
3. **Report-only diagnostic (replaces `console.warn`):** When `redeem_url` is **missing, unparseable, or invalid** (same three fallback cases above), record **one** fault per faulty load. **Do not** use `console.warn`. **Do not** import `src/lib/supabase.ts` (survey/waitlist project). **Do not** call `fetch` or read `sessionStorage` during render.
   - **Table:** `public.fail_open_reports` (app Supabase project `zajrtrwhqjsyfyskyftp`; migration `supabase/migrations/20261005100000_fail_open_reports.sql`). Policy `fail_open_reports_insert_anon` already allows anon `INSERT` with `WITH CHECK (true)`; **no migration**. Anon has no `SELECT`, so **`Prefer: return=minimal`** stays (same as `_sendRow`).
   - **Route (smallest existing):** `POST https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports` — literal matches `kDefaultSupabaseAnalyticsBaseUrl` in `lib/custom_code/analytics_queue.dart` lines 17–18. Headers: `apikey`, `Authorization: Bearer {anon}`, `Content-Type: application/json`, `Prefer: return=minimal` (`fail_open_report.dart` 328–334). **Not** `vela-lfh-fail-open-ingest`, **not** `vela-d24-matching-ingest`, **not** survey tables.
   - **Env (one new):** `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY` only (app-project anon key; not the survey anon key). If empty, **do not POST**; the page still renders. Do not put a real key in the plan, repo, or row.
   - **Send path:** In `PaySuccessActions.tsx` (no new file), implement **`sendPaySuccessRedeemUrlFault`** (exported for tests): returns a `Promise`, takes exactly **`raw`** (`string | null`), **`appUserId`** (`string | null`), and **`pageUrl`** (`string`). Reads `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY` inside the function; does **not** read `window`. Redaction of `raw` and `pageUrl` happens inside the function, before the 120-character cut and before `JSON.stringify`. Href selection stays synchronous in render. **`window.location` is read only inside the page `useEffect`**, which when the fault predicate is true calls `void sendPaySuccessRedeemUrlFault({ raw, appUserId, pageUrl: window.location.href }).catch(() => {})`, so SSR/`renderToStaticMarkup` never runs the POST and cannot blank the page.
   - **Row (one POST per fault):** `report_id` and `install_id` are each **`crypto.randomUUID()`** on that POST (fresh per report; not phone analytics session; **no `sessionStorage`**). `check_id`: `pay_success_redeem_url`, `occurred_at` (UTC ISO), `result`: `invalid`, `work_state`: `continued`, `account_id`: sibling `app_user_id` when present (else null). **`observed` only** (no `details` column payload): `reason` (`missing` | `unparseable` | `invalid_shape`), `redeem_url_truncated`, `app_user_id` when present, `page_url`.
   - **Redaction (before truncate):** If `raw` contains `redemption_token=`, replace that parameter’s value with `[redacted]` (end at `&` if present). `redeem_url_truncated` = first **120 characters** of that redacted string, or empty when `raw` is null. `page_url` = current page URL with the **`redeem_url` query parameter removed** and any **`redemption_token` value set to `[redacted]`**. Stored body must not contain the token or a prefix of it.
   - **Valid `redeem_url`:** do not call `sendPaySuccessRedeemUrlFault` (pass writes nothing).
4. **Valid** iff `raw` is non-empty, `new URL(raw)` does not throw, and the result has:
   - `protocol` === `rc-bed9aa89d1:` (case-insensitive),
   - `hostname` === `redeem_web_purchase`,
   - non-empty `searchParams.get('redemption_token')` on that parsed URL.
5. `openAppHref` = `raw` when valid; otherwise `VELA_OPEN_APP_URL` (today line 11).
6. **Install sentence** — one sentence inside the existing “Don't have the app yet?” block (still visible when both store URLs are empty):  
   `If the app is not installed yet, install it, then open the purchase confirmation email from RevenueCat.`  
   No QR, no `redeem_url_redirect`, no extra button.
7. **Checkout copy** — replace the paragraph at lines 26–28 exactly with:  
   `Sign in on your phone. Core attaches to the account you confirm — it does not have to be the checkout email, and there is no code to paste.`

App deep-link capture (`lib/custom_code/web_purchase_deep_links.dart` lines 39–46) checks scheme only; **do not** change app capture to match the website validity check.

### Deletions / prunes (website)

- Delete `const openAppHref = VELA_OPEN_APP_URL` as the only source; use the pick above.
- Add only the **one** fail-open anon-key env line in `.env.example` (commented empty). No URL env. No `sessionStorage`. No new Next.js API route, edge function, table, migration, or RC dashboard automation.

### Test (change 1)

**File:** `src/components/pay/pay-ui.test.tsx` only.

Replace the constant empty `useSearchParams` mock (lines 7–10) with a `let` assigned per test (same pattern as `mockWebPurchaseUrl` in that file).

| Test id | Assertion |
|---------|-----------|
| W1 | Documented RC success shape: query includes `redeem_url=rc-bed9aa89d1://redeem_web_purchase?redemption_token=…` **and** sibling `app_user_id` → `open-vela-cta` `href` equals the redeem URL only (does **not** contain `app_user_id`). |
| W2 | Missing, wrong-scheme, or **unparseable** `redeem_url` → `href` is `VELA_OPEN_APP_URL`; markup still includes `pay-success-actions`, install sentence, and `open-vela-cta`. Include **`redeem_url=not-a-url`** (makes `new URL` throw) and assert fallback href plus full success UI present. |
| W3 | Both store URL env values empty → no `ios-download-cta` / `android-download-cta`, and the install sentence is present. |
| W4 | Existing hooks still present (`pay-success-actions`, `open-vela-cta`, “Open Véla”). |
| W5 | **Fail-open report (function contract):** Use a fake JWT-shaped token `TEST_TOKEN` = `eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoicjVxIn0.c2lnbmF0dXJl` (three segments `eyJhbGciOiJIUzI1NiJ9`, `eyJ0ZXN0IjoicjVxIn0`, `c2lnbmF0dXJl`; not a real RC secret). **Page URL fixture** (input `pageUrl` for every call): `https://preview.example/pay/success?redeem_url=` + `encodeURIComponent('rc-bed9aa89d1://redeem_web_purchase?redemption_token=' + TEST_TOKEN)` + `&app_user_id=user-1`. With anon key set to a fake test string, mock `globalThis.fetch` and call **`sendPaySuccessRedeemUrlFault` directly** three times, each with `appUserId` `user-1` and that `pageUrl`: (1) `raw` null → one POST, `reason` `missing`, `redeem_url_truncated` empty; (2) `raw` `not-a-url` → `reason` `unparseable`; (3) `raw` = `rc-bed9aa89d1://wronghost?redemption_token=` + `TEST_TOKEN` (parseable, fails hostname / three-check validity) → `reason` `invalid_shape`, `redeem_url_truncated` contains `[redacted]` and **none** of the three JWT segments. Each call is exactly one `POST` to `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports` with the four headers above. Parse JSON body: `check_id` `pay_success_redeem_url`, `work_state` `continued`, `result` `invalid`. For **every** call, **`observed.page_url`** equals exactly `https://preview.example/pay/success?app_user_id=user-1`. The serialized POST body must not contain `TEST_TOKEN` or **any** of its three dot-separated segments; assert the same absence in **`observed.redeem_url_truncated`** and **`observed.page_url`** (each JWT segment checked separately). Valid W1 redeem URL does **not** call the function. Empty anon key does **not** call `fetch`. **No** `console.warn`. W2 does **not** expect a network call (`renderToStaticMarkup` does not run effects). |

**Run:** `npm test` in `vela-website`.

### Customer recovery (MANUAL — backup)

When `redeem_url` is missing, broken, or invalid, **Open Véla** cannot carry the purchase link. Recovery is **manual for now**: the buyer installs/opens Véla, signs in, and uses Profile → **Redeem a web purchase** (`web_purchase_claim_sheet.dart`) with support/manual follow-up as needed (purchase email, RC receipt, or legacy `vela_web_…` code if they have one). The success page does not auto-fix entitlement; it only falls back to `VELA_OPEN_APP_URL` and records the diagnostic row above.

### PR (website)

Separate draft PR on `growthwise68/vela-website`; link from vela plan PR body. Sandbox/preview only.

---

## Change 2 — `growthwise68/vela`

### Files to touch

| File | Lines (main today) | Action |
|------|-------------------|--------|
| `lib/custom_code/web_purchase_claim.dart` | 483–523, 541–643 | Remove Firestore preflight and conflict calls from redemption executor; delete dead client helpers. |
| `lib/main.dart` | 183–192 | Drop `resolve:` and `recordConflict:` constructor arguments only. |
| `lib/custom_code/web_purchase_deep_links.dart` | — | **No change.** Wait-for-sign-in is `setReady` at lines 182–186, fed by `main.dart` 531–538 and 764–770 (not lines 111–114). |
| `firebase/functions/index.js` | 1236–1300, 1320+, 1726–1732 | **No behavioural change** for C11R. `resolveWebPurchaseRedemption` and `recordWebPurchaseRedemptionConflict` stay deployed for non-mobile callers and existing function tests. The mobile executor **never** calls them (no bare-versus-registered branch). |
| `lib/custom_code/widgets/web_purchase_claim_sheet.dart` | — | **No change** (Profile **Redeem a web purchase** sheet). |

### Behaviour (executor)

In `WebPurchaseRedemptionExecutor.execute` (`web_purchase_claim.dart` 560–643):

1. **Delete** the `redemptionTokenHash` local (line 565), **`await resolve(redemptionTokenHash)`** (579–582), and **`recordConflict(...)`** (590). This executor has **no** bare-versus-registered branch: it never calls resolve or recordConflict, including when a C13-registered row still exists in Firestore.
2. Keep: commerce lease → `isCurrent()` guards → `fetchCustomerInfo` precheck.
3. If precheck shows Core already active → **`return WebPurchaseCommandDispatchResult.refusedActiveIap`** before `redeem` (sheet copy at `web_purchase_claim_sheet.dart` 61–63). Do not call `recordConflict` without a row (`index.js` 1403–1407 throws `Redemption token unavailable`, which the client can mis-map to `failedExpired` and erase the link).
4. Else → **`redeem(fullUrl)`** via `revenueCatRedeemWebPurchaseUrl` (525–532).
5. Leave `main.dart` `_dispatchWebPurchaseCommand` **redemption-link** path (140–154): confirmation dialog → executor — **unchanged**.
6. **Unchanged (not this slice):**
   - **Deep-link `tokenClaim`** — `main.dart` 117–137 (`WebPurchaseCommandType.tokenClaim` → `WebPurchaseClaimCoordinator` / `firebaseClaimWebPurchase`). Not the redemption executor.
   - **Profile redeem sheet** — `a2_profile_new_widget.dart` 208–211 → `presentWebPurchaseClaimSheet` → `main.dart` 736–749 → `coordinator.claim`; UI in `web_purchase_claim_sheet.dart` for pasted `vela_web_…` codes.

### Deletions / prunes (app)

| Item | Location |
|------|----------|
| `resolve` and `recordConflict` parameters + fields | `WebPurchaseRedemptionExecutor` 545–546, 554–555 |
| `await resolve(...)` and `recordConflict(...)` | `execute` 565, 579–582, 590 |
| `typedef ResolveWebPurchaseRedemption` | 483–485 |
| `typedef RecordWebPurchaseRedemptionConflict` | 486–489 |
| `firebaseResolveWebPurchaseRedemption` | 503–511 |
| `firebaseRecordWebPurchaseRedemptionConflict` | 513–523 |
| `webPurchaseRedemptionTokenHash` | 494–501 |
| `import 'dart:convert'` / `import 'package:crypto/crypto.dart'` | top of file, once unused |
| `resolve:` and `recordConflict:` | `lib/main.dart` 186–187 |
| **Comments describing the removed resolve / `recordConflict` / refund path** | `web_purchase_claim.dart` — see list below |

**Delete these comments (do not replace with new resolve/refund prose):**

| Lines (main today) | Text to remove |
|--------------------|----------------|
| 535–540 | Class doc on `WebPurchaseRedemptionExecutor`: “mobile half of D11 step 0”, “submits only the complete-token SHA-256 to the Auth+App-Check resolve callable”, “PLAN D11 specifies”. |
| 568–571 | “skip resolve/redeem” (Auth moved after crew confirmed A). |
| 584–589 | Block on the pre-redeem Core branch: `resolvedByUid`, “conflict handler moves the issuance straight to `refund_pending_iap_conflict`”, “unnecessary identity transition”. |

Pre-redeem Core still returns `refusedActiveIap` with **no** server call.

**Keep:** `registerWebPurchaseRedemptionToken` / server handlers and `firebase/functions/test/web_purchase_redemption_surfaces_test.js` — not on the mobile RC redemption path after this prune.

### Test (change 2)

Drop `resolve:` and `recordConflict:` at **all** executor construction sites:

| File | Lines (main today) |
|------|-------------------|
| `test/web_purchase_redemption/redemption_result_cases_test.dart` | 49, 98, 134, 164, 191, 224 |
| `test/web_purchase_redemption/restore_contract_test.dart` | 11, 40 |
| `test/web_purchase_redemption/commerce_lease_test.dart` | 313 |

**Do not** pass a stub `resolve:` “must not run” — the parameter is deleted.

| Test id | File | Expected |
|---------|------|----------|
| T60′ | `redemption_result_cases_test.dart` ~47–93 | Success `events`: `lease, precheck, redeem, owner, publish, release` (no `resolve`). |
| T60′-iap | `redemption_result_cases_test.dart` ~95+ | Pre-redeem Core: disposition `refusedActiveIap`; `redeem` not called; events `['release']` only. |
| T60′-account | `redemption_result_cases_test.dart` ~219–255 | Drop `resolved` flag; still expect redeem not called and `pausedAwaitingAccount`. |
| T59 | `restore_contract_test.dart` | Constructor arity only; behaviour expectations unchanged aside from removed args. |
| T-lease | `commerce_lease_test.dart` | Remove `'resolve'` from expected events list (~line 349). |
| — | `redemption_result_cases_test.dart` 257–272 | **Delete** hash unit test (`webPurchaseRedemptionTokenHash`). |
| T22 | `redemption_result_cases_test.dart` 7–45 | Unchanged. |
| Deep link | `deep_link_dispatch_test.dart` | Unchanged. |
| `tokenClaim` / Profile sheet | `claim_edge_cases_test.dart`, Profile presenter tests if any | Unchanged — `vela_web_…` via `WebPurchaseClaimCoordinator` does not use `WebPurchaseRedemptionExecutor`. |

**Run:**

```bash
flutter test test/web_purchase_redemption/redemption_result_cases_test.dart \
  test/web_purchase_redemption/restore_contract_test.dart \
  test/web_purchase_redemption/commerce_lease_test.dart
```

### PR (app)

Implementation PR per this plan; reference launch map PR **#294**.

---

## Failure-mode table (product)

| Situation | Expected behaviour | App / site must not |
|-----------|-------------------|---------------------|
| **Expired token** (>1h) | User opens link in app → RevenueCat returns expired → app shows obfuscated billing email + “new link sent” copy (`failedExpired`). User taps **fresh email** from RevenueCat. | Stop the app; invent a code; send user to Profile redeem sheet as default. |
| **Bad or missing `redeem_url` on success page** | Open Véla uses `VELA_OPEN_APP_URL`; page still renders; one fire-and-forget row in `public.fail_open_reports` via `useEffect` + `sendPaySuccessRedeemUrlFault` (skipped only when anon key empty). **Customer recovery MANUAL:** Profile **Redeem a web purchase** sheet + manual follow-up (no auto-link). | Throw from `new URL` uncaught in render; blank success UI; `console.warn`; `fetch`/`sessionStorage` in render; survey `supabase.ts`; token bytes in stored diagnostics. |
| **Different Véla account** | Confirmation dialog names email; **Use another account** pauses until correct Firebase sign-in; one-time link binds to whichever account confirms and redeems. | Silent redeem; merge without warning. |
| **Signed out, then install and wait** | Deep link stored; drain waits for Auth + RC `setReady`; then redeem after sign-in. If >1h, email retry path above. | Clear stored link on spurious “unavailable” preflight. |
| **App not installed** | Custom scheme tap does nothing; success page shows store badges (when URLs set) + install-email sentence. | Deferred / universal install links (out of scope). |
| **Already has Core via App Store / Play** | `refusedActiveIap` — tell user Core is already on; do not consume RC link on a duplicate web entitlement. | Call `recordConflict` without Firestore row (would error). |
| **Wrong checkout email typo** | Receipt + replacement links go to typed billing address; Véla login email may differ; link attaches Core to whichever account redeems. | Require email match in copy. |

---

## Out of scope (explicit)

- Website sign-in / Firebase Auth on web (Option B).
- RevenueCat funnels, hosted login, or second checkout.
- Deferred deep links / associated domains / `FlutterDeepLinkingEnabled` changes.
- Deploying website or app to production; flipping RC purchase-link success redirect on **live** URL (operator action documented in `docs/launch/WEB_CHECKOUT_SUCCESS_REDEEM_STEPS.md`, not in this PR).
- **Collection OFF** — no new Firestore collections or client writes for bare RC redemption.
- C12 plan gate reopen, Rachel backlog, store CTA work, automatic refund for duplicate web+IAP without `vela_web_…` ledger row.
- QR of `redeem_url_redirect`, dashboard success-URL save, analytics, referral funnel changes.
- Editing `docs/launch/launch_map.html` or brief `status:` until implementation ships.
- Profile **Redeem a web purchase** sheet and deep-link **`tokenClaim`** for legacy `vela_web_…` codes (unchanged).

---

## PRINCIPLES self-check (Iain)

| Principle | How this plan honours it |
|-----------|---------------------------|
| **Fix the root cause, never patch** | Deletes the Firestore preflight that blocks RC JWTs; surfaces RC’s `redeem_url` via the platform query parser — no invented slice parser. |
| **Prune, don’t add** | No `redeem-url.ts`; no URL env; no `sessionStorage`; no survey client; no `details` bag; one anon-key env only; executor drops resolve and recordConflict entirely. |
| **Simple at heart** | One component: sync href pick + one `useEffect` POST helper; known Supabase URL literal; one redaction rule; app change is deletion only. |
| **Report faults, never stop the app** | Expired/invalid → existing dispositions; pre-redeem Core → `refusedActiveIap`; bad/missing website `redeem_url` → fallback open link + effect-fired `fail_open_reports` row (not skipped for missing URL — only missing anon key), page still renders. |
| **Sleep plan / `legsCache` truth** | No sleep-plan writer, `legsCache`, `bioState`, or `bioPhaseState` in file list. |
| **No drift / ratchet** | No helper module file; no dead hash; no second identity store; executor has no bare-vs-registered `if`. POST is the operator ruling, not drift. |

---

## Post-implementation smoke (sandbox, operator — not in implementation PR)

1. Configure RC **sandbox** purchase link success redirect → `https://<preview>/pay/success` (operator; not coded here).
2. Pay via bare WPL → land on `/pay/success` → **Open Véla** `href` is `rc-bed9aa89d1://…` (without `app_user_id`).
3. App installed → tap → sign in → Core on, no paste.
4. Repeat signed-out: link waits, sign in, Core on.

---

## Authority / references

- Node brief: `docs/launch/nodes/C11R-c11-redeem-handoff.md`
- High review: `docs/launch/nodes/C11R-plan-HIGH_REVIEW.md`, `C11R-plan-HIGH_REVIEW-r2.md`, `C11R-plan-HIGH_REVIEW-r3.md`, `C11R-plan-HIGH_REVIEW-r4.md`, `C11R-plan-HIGH_REVIEW-r5.md` (PR #298)
- Investigation: REPORT 13 Oct 2026 (Option A recommendation)
- RevenueCat: [Redemption Links](https://www.revenuecat.com/docs/web/redemption-links), [Web Purchase Links — success behavior](https://www.revenuecat.com/docs/web/web-billing/web-purchase-links)
- Sibling (on hold): `docs/launch/nodes/C12-web-purchase-redemption.md`
