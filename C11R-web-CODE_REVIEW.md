# C11R website code review — Change 1

**Verdict: REVISE**

| Field | Value |
|---|---|
| Repo | growthwise68/vela-website PR #17 (draft) |
| Branch | `cursor/c11r-success-redeem-handoff-d6da` |
| Tip reviewed | `8b956d390e257fa53c01e796962dda3afdb8595b` |
| Plan | `docs/launch/nodes/C11R-plan.md` v1.6, Change 1, intended at `1d6fd222` on `growthwise68/vela` branch `cursor/c11r-redeem-handoff-plan-c40a` |
| Plan file | **not_run.** `gh` and `git` return 404 for `growthwise68/vela`. This GitHub installation can see `vela-website` only. The checks below are the Change 1 rules in the review request, measured on this tip. Wording of the sign-in paragraph and the install sentence was **not** compared to the plan file. |

Review only. No product edits.

## PRINCIPLES

Any miss is a fail. Three misses, so the verdict is REVISE.

| Principle | Result | Evidence |
|---|---|---|
| Report faults and never stop or blank the app | PASS | A bad, empty, or unparseable `redeem_url` still renders Open Véla with `href="vela://open"`. A thrown `fetch` leaves the button in place. The report runs from `useEffect` and its rejection is swallowed. |
| Sources of truth | FAIL | Two functions decide whether the redeem link is usable, and they disagree. `isValidRedeemUrl` accepts a real RevenueCat link. `classifyRedeemUrlFaultReason` labels that same link `invalid_shape`. |
| Fix the root cause, never patch | FAIL | After `new URL` succeeds, every branch in the classifier returns `invalid_shape`, including the branch where the protocol, host, and token already passed. The page hides that with a second check instead of making the classification true. |
| Prune, don't add | PASS | The diff is four existing files. No helper file, no URL env var, no survey client, no API route. |
| Simple at heart | FAIL | The href memo, the report memo, and the POST each parse the same string. The report function cannot say "this link is usable." |
| No drift or ratchet | PASS | The old sign-in sentence was replaced. Open Véla still falls back to `VELA_OPEN_APP_URL`. The success page uses the same `Suspense` shape as `/pay`. |

## Exact changes

1. In `src/components/pay/PaySuccessActions.tsx`, make one decision for the redeem link and use it for both the button and the report. A link with protocol `rc-bed9aa89d1:`, host `redeem_web_purchase`, and a non-empty `redemption_token` is usable: Open Véla uses that raw URL, and `sendPaySuccessRedeemUrlFault` does not POST. Anything else keeps `VELA_OPEN_APP_URL` and may report `missing`, `unparseable`, or `invalid_shape`. Delete the path that returns `invalid_shape` after those checks have passed (`classifyRedeemUrlFaultReason`, the `return "invalid_shape"` after the token check). Do not add a file.

2. In `src/components/pay/pay-ui.test.tsx`, the test named "valid redeem URL path does not invoke sendPaySuccessRedeemUrlFault via render" only calls `renderToStaticMarkup`, which never runs `useEffect`. A usable link must be checked after the effect runs, with the anon key set, and the fetch count must stay 0. Keep the existing W5 body checks for a bad link.

## What was checked

| Check | Result |
|---|---|
| Usable `redeem_url` is the Open Véla href | PASS. Probe: 300-character token, href contains that URL. `app_user_id` is not in the HTML. |
| Otherwise fall back to `VELA_OPEN_APP_URL`, including garbage and a URL throw | PASS. Empty, spaces, `not-a-url`, `http://%`, `javascript:alert(1)`, wrong host, and a missing token all render `data-testid="pay-success-actions"` and `href="vela://open"`. The token is not in that HTML. |
| `sendPaySuccessRedeemUrlFault(raw, appUserId, pageUrl)` | PASS on the argument names. The function takes one object with those three fields. |
| POST only from `useEffect`, fixed `fail_open_reports` URL, anon key only, `Prefer: return=minimal` | PASS on the page. The only component call is inside `useEffect`. Probe: one POST for a bad link, zero for a usable link, URL `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports`, headers `apikey` and `Authorization: Bearer` set to the same anon key, plus `Content-Type` and `Prefer`. |
| Empty key skips the report | PASS. Unset, `""`, spaces, and a newline do not call `fetch`. |
| No browser storage | PASS. No `localStorage` / `sessionStorage` / cookie use in the diff. The effect probe recorded 0 storage writes. |
| Token redacted before the 120-character cut, absent from `page_url` and the body | PASS for the standard `redemption_token=` form. A 300-character token is replaced with `[redacted]` and then cut. Cutting first would have kept `TTTT` in the first 120 characters. `page_url` was `https://preview.example/pay/success?app_user_id=user-1`. |
| Suspense wrapper is the one on `/pay` | PASS. `src/app/pay/success/page.tsx` wraps `PaySuccessActions` in `<Suspense>`, with a small fallback, same shape as `PayCheckoutFallback` on `/pay`. |
| `.env.example` has one commented anon-key line | PASS. `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY` appears once, and the line is commented. A banner comment sits above it. |
| No URL env, survey client, API routes, or helper files | PASS. `git diff origin/main...HEAD --name-only` is `.env.example`, `src/app/pay/success/page.tsx`, `src/components/pay/PaySuccessActions.tsx`, `src/components/pay/pay-ui.test.tsx`. |

Calling `sendPaySuccessRedeemUrlFault` directly with a usable redeem URL does POST. Body `result` is `invalid` and `observed.reason` is `invalid_shape`. The token is still absent from that body. The page effect does not make this call today. That split is the revise item.

## Tests

| Command | Result |
|---|---|
| `npm test` | **14 passed, 0 failed** (6 suites). Includes W1–W5. |
| Local probe (`renderToStaticMarkup`, direct reporter calls, jsdom `useEffect`) | **6 passed, 0 failed.** |
| `npx next lint` on the three changed TS/TSX files | No warnings or errors. |
| `npx tsc --noEmit` | Exit 0. |
| `next build` | **not_run** |
| Browser | **not_run** |
| Plan file `C11R-plan.md` at `1d6fd222` | **not_run** (repo 404) |

## Lenses

Thermo-nuclear: **BLOCK.** The classifier cannot represent a usable link, and its host and token checks do not change the reason. One result in this same file can drive the href and the effect. Files stay small (230, 310, and 61 lines). No 1k-line breach. Do not add a module under `src/lib/pay`.

Deslop: the dead `invalid_shape` return is the problem above. `truncateRedeemUrlRedacted` is only `slice(0, 120)`. The URL `try/catch` and the effect `.catch` are what keep a bad value from blanking the page. No `any` casts and no narrating comments in the component.

Verify-this: render fallback, redact-then-truncate, effect POST gate, empty key, and no storage are **VERIFIED** against `main` (main has no `useSearchParams` and no `fetch`). The false `invalid_shape` report on a direct call with a usable link is **VERIFIED** as the defect.
