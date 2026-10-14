# C11R website code review — Change 1, round 2

**Verdict: REVISE**

| Field | Value |
|---|---|
| Repo | growthwise68/vela-website PR #17 |
| Branch | `cursor/c11r-success-redeem-handoff-d6da` |
| Tip reviewed | `b01b766e4c4fd9fe7a681d7585787b37adc474eb` |
| Fix commit | `0191af333a091e76db2f98cffe0ce7705fd6ecb4` |
| Plan | `docs/C11R-plan-v1.6.md` on this branch (C11R v1.6, Change 1) |
| vela plan file | **not_run.** `gh` still returns 404 for `growthwise68/vela`. The checks below use the snapshot committed on this branch. The PR body says the plan is pasted underneath, and the paste is not in the body. |

Review only. No product edits. The type experiment below was reverted before this file was committed.

## Prior revise

All three items from `C11R-web-CODE_REVIEW.md` (tip `8b956d39`) are fixed at this tip.

| Item | Result | Evidence |
|---|---|---|
| One decision drives the button and the report | PASS | `decideRedeemUrl` is the only validity function. The href memo uses `redeemDecision.valid`. `sendPaySuccessRedeemUrlFault` calls the same function and returns before `fetch` when `valid` is true. |
| The duplicate is gone | PASS | `git grep` at this tip finds `decideRedeemUrl` and does not find `isValidRedeemUrl`, `classifyRedeemUrlFaultReason`, or `shouldReportRedeemUrlFault`. At `8b956d39` the classifier returned `invalid_shape` after the protocol, host, and token checks had passed. That return is gone. |
| W5 runs the real client effect | PASS | Same harness as the new test (`happy-dom` `Window`, `createRoot`, `act`). A bad `redeem_url` (`not-a-url`) with the anon key set: **1** POST, reason `unparseable`, href `vela://open`. A usable RC link: **0** POSTs, and the anchor `href` is that redeem URL. React prints `The current testing environment is not configured to support act(...)`. The effect still ran. |

## Two additions

**happy-dom is not a needless addition.** The plan says do not edit `package.json`. The last review required a client render that actually runs `useEffect`. `renderToStaticMarkup` does not, and this repo’s runner is `node:test` with no DOM. `happy-dom` is a devDependency. The only import is `pay-ui.test.tsx`. A search of the production build output finds no `happy-dom`. The app does not ship it.

**The plan file in this repo is not a needless addition.** Its home in the plan front matter is `growthwise68/vela`, which this review cannot open. The website app does not import `docs/C11R-plan-v1.6.md`. It is a snapshot so Change 1 can be checked here. It must stay a snapshot. It is not a second living plan.

## PRINCIPLES

Any miss is a fail. One miss, so the verdict is REVISE. The miss is the new test’s typecheck. The redeem-link behaviour matches the plan.

| Principle | Result | Evidence |
|---|---|---|
| Report faults and never stop or blank the app | PASS | Empty, spaces, `not-a-url`, `http://%`, `javascript:alert(1)`, a normal https URL, a missing token, and a wrong host all render `data-testid="pay-success-actions"`, `open-vela-cta`, href `vela://open`, the install sentence, and the sign-in paragraph. The POST sits in `useEffect` and its rejection is swallowed. `renderToStaticMarkup` does not run that effect. |
| Sources of truth | PASS | One function, `decideRedeemUrl`, decides usable versus `missing` / `unparseable` / `invalid_shape`. The button and the report both use it. |
| Fix the root cause, never patch | PASS | A link with protocol `rc-bed9aa89d1:` (any case), host `redeem_web_purchase`, and a non-empty `redemption_token` is `{ valid: true }`. Open Véla uses that raw string. The report function returns without POST. Uppercase `RC-BED9AA89D1:` is still the href, and a direct call with that URL does not POST. |
| Prune, don't add | PASS | No `src/lib/pay/redeem-url.ts`, no URL env, no survey client, no API route, no browser storage. happy-dom and the plan snapshot are the two extras judged above. Neither is needless. |
| Simple at heart | PASS | Sync href pick from one decision, one effect, one POST helper, redaction then a 120-character cut. Files stay small: `PaySuccessActions.tsx` 214 lines, success page 61, test file 358. No file crosses 1,000 lines. |
| No drift or ratchet | FAIL | Product copy, fallback, Suspense, and the report URL match v1.6. `npx tsc --noEmit --incremental false` was clean at the previous review and now exits **2** on the two new assignments in `setupBrowserDom`. Those are the only errors, including after `next build`. Every future typecheck stays red until those two lines are fixed. |

## What was re-checked

| Check | Result |
|---|---|
| Usable `redeem_url` is the Open Véla href, without `app_user_id` in the HTML | PASS. Client mount and server markup. |
| Otherwise fall back to `VELA_OPEN_APP_URL` and still render | PASS. Eight bad shapes, listed above. `javascript:` is not the href. |
| POST only from `useEffect`, fixed `fail_open_reports` URL, anon key only, `Prefer: return=minimal` | PASS. Bad client mount: one POST to `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports`. Headers are exactly `apikey`, `Authorization: Bearer`, `Content-Type`, and `Prefer`, all using the fake anon key. |
| Empty key skips the report | PASS. Unset, `""`, spaces, and a newline: **0** fetches. The page still renders. |
| No browser storage | PASS. No `localStorage`, `sessionStorage`, or cookie use in the diff. Client mounts of a bad link and a good link recorded **0** storage writes. |
| Token redacted before the 120-character cut, absent from `page_url` and the body | PASS. A 300-character token whose tail is `UNIQUE_TAIL_SHOULD_NOT_LEAK` was cut only after redaction. The stored value is `rc-bed9aa89d1://wronghost?redemption_token=[redacted]&extra=1`. Cutting first would have kept `TTTT`. `page_url` dropped `redeem_url`. A sibling `redemption_token` was stored as `%5Bredacted%5D` (the encoded form of `[redacted]`). The body did not contain the test JWT or any of its three segments. |
| Suspense matches `/pay` | PASS. `PaySuccessActions` is wrapped in `<Suspense>` with a small fallback, same shape as `PayCheckoutFallback`. |
| `.env.example` | PASS. `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY` appears once, commented, with the banner line above it. No real key. |
| Checkout copy and install sentence | PASS. Both strings match v1.6, including the install sentence inside the “Don't have the app yet?” block. |

## Tests

| Command | Result |
|---|---|
| `npm test` | **15 passed, 0 failed** (6 suites). Includes W1–W5. |
| Local probe (client `createRoot` for a bad link and a good link, direct reporter calls, eight fallback renders) | **4 passed, 0 failed.** |
| `npx next lint` | Exit 0. No warnings in the files this PR changes. One existing warning in `src/components/SiteShell.tsx` (ref cleanup). That file is not in the diff. |
| `npx tsc --noEmit --incremental false` | **Exit 2.** Two errors, both in `src/components/pay/pay-ui.test.tsx` lines 73–74. |
| `npx next build` | Exit 0. Log line: “Skipping validation of types” (`typescript.ignoreBuildErrors` is already true in `next.config.ts`). `/pay/success` is in the route list. The build does not clear the `tsc` failure. |
| Browser | **not_run** |
| Plan file on `growthwise68/vela` | **not_run** (repo 404) |

`tsc` errors on the tip:

- Line 73: happy-dom’s `Window` is not assignable to the DOM `Window` (`__NEXT_DATA__` is missing). The cast names the imported happy-dom class, so it does not reach the DOM type.
- Line 74: happy-dom’s `Document` is missing the DOM `Document` fields. That line has no cast.

A local edit of those two lines to `as unknown as typeof globalThis.window` and `as unknown as typeof globalThis.document` made `tsc --noEmit --incremental false` exit 0. That edit was reverted. It is not in this commit.

## Lenses

Thermo-nuclear (separate pass over the diff and the three product files): **APPROVE** on structure. One `decideRedeemUrl` result drives the href and the fail-open skip. The old split, where a usable link was still `invalid_shape`, is gone. No 1,000-line file. No new module under `src/lib/pay`. The href cast `raw as string` and the one-line `truncateRedeemUrlRedacted` are residue, not a second design. That pass did not run `tsc`. The type errors above are the exception.

Deslop: the component has no narrating comments and no `any`. The URL `try/catch` and the effect `.catch(() => {})` are the plan’s rule that a bad value must not blank the page. The test’s `as unknown as Window` cast is the slop that fails `tsc`, because `Window` there is the happy-dom import.

Verify-this:

```text
VERIFIED
Claim: At b01b766e, one decideRedeemUrl drives the Open Véla href and the fail-open report, and the old second classifier is gone.

Evidence:
classifier names: baseline at 8b956d39 = isValidRedeemUrl + classifyRedeemUrlFaultReason (final return invalid_shape), treatment at b01b766e = decideRedeemUrl only, delta = duplicate names absent, threshold = zero duplicate classifiers
client harness: bad link fetches = 1 (reason unparseable, href vela://open), good link fetches = 0 (href is the redeem URL), threshold = good link sends no report after useEffect

Reasoning:
The bad-link mount is the positive control the committed W5 test does not include. The same createRoot path posts once for not-a-url and stays silent for a usable RC URL, so the silent test is not a render that never ran the effect. origin/main has no useSearchParams and no fetch in this component.
```

```text
VERIFIED
Claim: The token is redacted before the 120-character cut, kept out of page_url, and the report is skipped when the anon key is empty.

Evidence:
truncated body: slice-first keeps TTTT = true, treatment truncated value contains [redacted] and TTTT = false, length <= 120
page_url: redeem_url present = false, redemption_token decoded value = [redacted], JWT segments in body = 0
empty key: fetches for unset, "", spaces, and newline = 0, threshold = 0

Reasoning:
The long token was on an invalid host, so a report was required. Redaction ran first. The page URL fixture carried the test JWT inside redeem_url and again as its own query parameter. Neither survived in the POST body.
```

## Exact change

1. In `src/components/pay/pay-ui.test.tsx`, `setupBrowserDom`, assign the happy-dom window and document onto the DOM globals so `npx tsc --noEmit --incremental false` exits 0:

```ts
globalThis.window = browserWindow as unknown as typeof globalThis.window;
globalThis.document =
  browserWindow.document as unknown as typeof globalThis.document;
```

Do not change `decideRedeemUrl`. Do not add a file. Do not edit `package.json` again.
