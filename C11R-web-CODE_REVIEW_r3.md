# C11R website code review — Change 1, round 3

**Verdict: ACCEPT**

| Field | Value |
|---|---|
| Repo | growthwise68/vela-website PR #17 |
| Branch | `cursor/c11r-success-redeem-handoff-d6da` |
| Tip reviewed | `c96571e03233d64865a8baabff5ca1c80fce9240` |
| Behaviour tip | `b01b766e4c4fd9fe7a681d7585787b37adc474eb` (unchanged product) |
| Plan | `docs/C11R-plan-v1.6.md` on this branch. The PR body paste equals that file (259 lines, byte-for-byte). Iain signed Intent and North star at 18:26 SAST; that signature line is in the PR body. |
| vela plan file | **not_run.** `gh` still returns 404 for `growthwise68/vela`. |

Review only. No product edits. The cast experiments below were restored before this file was committed. `git status` was clean.

## Prior revise

Round 2 was REVISE for one reason: `npx tsc --noEmit --incremental false` exited 2 on `setupBrowserDom` in `src/components/pay/pay-ui.test.tsx`.

That is fixed. Lines 73–75 are now:

```ts
globalThis.window = browserWindow as unknown as typeof globalThis.window;
globalThis.document =
  browserWindow.document as unknown as typeof globalThis.document;
```

Replaying the old lines (`as unknown as Window & typeof globalThis`, and `document` with no cast) still exits 2, with TS2322 on the window and TS2740 on the document (`alinkColor`, `all`, `anchors`, `applets`, and 51 more). The tip exits 0.

## The document cast

**Acceptable at this test-only boundary.** It is not a patch over product code.

happy-dom’s `Window` and `Document` do not overlap TypeScript’s DOM lib types. A direct `as typeof globalThis.window` / `as typeof globalThis.document` is illegal: TS2352 says the types do not overlap and tells you to convert to `unknown` first. The `unknown` step is the compiler’s required bridge for an intentional stand-in. It does not widen `decideRedeemUrl`, the fail-open body, or any page prop. The missing fields are legacy document members the test never touches (`alinkColor`, `applets`, and the rest). Teaching happy-dom those fields, or adding a shared DOM adapter, would be a new layer. Excluding tests from `tsc` would hide real test errors. The assertion stays inside `setupBrowserDom`.

There is a tighter spelling of the same stand-in, and it is not a different root fix. After the window assertion, this also exits 0:

```ts
globalThis.window = browserWindow as unknown as typeof globalThis.window;
globalThis.document = globalThis.window.document;
```

Runtime value is still `browserWindow.document`. One assertion site instead of two. The second `as unknown as` is redundant, not load-bearing. Sending the branch back for that tidy would only rearrange the same test double. It does not fail a principle, so it is not a revise.

`return raw as string` on the valid branch is unchanged product code. The decision already encodes “this raw string passed.” Carrying `href` on the valid variant would only delete that one assertion. Not a new regression.

## Product unchanged since b01b766e

`git diff b01b766e HEAD` for `PaySuccessActions.tsx`, `src/app/pay/success/page.tsx`, `.env.example`, `package.json`, `package-lock.json`, and `src/lib/pay/config.ts` is empty.

Blob hashes match at both commits:

- `PaySuccessActions.tsx` `c82b47e9698f562b87c16c70f0455f89478028a8`
- `src/app/pay/success/page.tsx` `0f913185448f4672ff5040932a460313f44c02f6`

`decideRedeemUrl` is the only validity function. `git grep` finds it at three call sites (the function, the report, the href memo) and does not find `isValidRedeemUrl`, `classifyRedeemUrlFaultReason`, or `shouldReportRedeemUrlFault`.

The only code delta since `b01b766e` is the five-line test helper above, plus `C11R-web-CODE_REVIEW_r2.md`.

## PRINCIPLES

Any miss is a fail. No miss.

| Principle | Result | Evidence |
|---|---|---|
| Report faults and never stop or blank the app | PASS | Same component as round 2. Fresh probe: eight bad shapes (empty, spaces, `not-a-url`, `http://%`, `javascript:alert(1)`, a normal https URL, missing token, wrong host) all render `pay-success-actions`, `open-vela-cta`, href `vela://open`, the install sentence, and the sign-in paragraph. `javascript:` is not the href. Server markup of a bad link performs 0 fetches. The POST sits in `useEffect`, and its rejection is swallowed. |
| Sources of truth | PASS | One function, `decideRedeemUrl`, decides usable versus `missing` / `unparseable` / `invalid_shape`. The button and the report both use it. The plan paste in the PR body matches `docs/C11R-plan-v1.6.md`. |
| Fix the root cause, never patch | PASS | Product behaviour is the platform URL parser plus one decision. The new cast does not change that. It names the DOM globals a happy-dom window is standing in for, at the test boundary TypeScript will not accept any other way. |
| Prune, don't add | PASS | No new file, no second dependency, no `package.json` edit since `b01b766e`. No `src/lib/pay/redeem-url.ts`, no URL env, no survey client, no API route, no browser storage. happy-dom remains a devDependency and does not appear in the production `.next` JavaScript. |
| Simple at heart | PASS | Sync href pick from one decision, one effect, one POST helper, redaction then a 120-character cut. `PaySuccessActions.tsx` 214 lines, success page 61, test file 359. No file crosses 1,000 lines. |
| No drift or ratchet | PASS | `tsc` is green again, so the round-2 ratchet (every future typecheck red) is gone. No second classifier. No product cast was added. The plan file and the PR paste have not diverged. |

## What was re-checked

| Check | Result |
|---|---|
| Usable `redeem_url` is the Open Véla href, without `app_user_id` in the HTML | PASS. Server markup (W1) and a fresh client mount. |
| Otherwise fall back to `VELA_OPEN_APP_URL` and still render | PASS. Eight bad shapes, listed above. |
| POST only from `useEffect`, fixed `fail_open_reports` URL, anon key only, `Prefer: return=minimal` | PASS. Bad client mount: one POST to `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports`, reason `unparseable`, href `vela://open`. Committed W5 still checks the four headers. |
| Empty key skips the report | PASS. Unset, `""`, spaces, and a newline: 0 fetches. |
| No browser storage | PASS. No `localStorage`, `sessionStorage`, or cookie use in the product diff. Client mounts of a bad link and a good link recorded 0 `setItem` calls on the happy-dom storages. |
| Token redacted before the 120-character cut, absent from `page_url` and the body | PASS. A 300-character token whose tail is `UNIQUE_TAIL_SHOULD_NOT_LEAK` was cut only after redaction. Slice-first keeps `TTTT`; the stored value does not, and it is `rc-bed9aa89d1://wronghost?redemption_token=[redacted]&extra=1` (length under 120). `page_url` dropped `redeem_url`. A sibling `redemption_token` was stored as `%5Bredacted%5D`, which decodes to `[redacted]`. The body did not contain the test JWT or any of its three segments. |
| Uppercase scheme | PASS. `RC-BED9AA89D1://redeem_web_purchase?redemption_token=valid_token` is the href. A direct report call does not POST. |
| Suspense matches `/pay` | PASS. Unchanged. `PaySuccessActions` is wrapped in `<Suspense>` with a small fallback, same shape as `PayCheckoutFallback`. |
| `.env.example` | PASS. Unchanged. `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY` appears once, commented. No real key. |
| Checkout copy and install sentence | PASS. Both strings match v1.6. |

## Tests

| Command | Result |
|---|---|
| `npm test` | **15 passed, 0 failed** (6 suites). Includes W1–W5. React still prints `The current testing environment is not configured to support act(...)`. The W5 client effect still ran (0 fetches). |
| Fresh probe (eight fallback renders, uppercase scheme, redaction order, empty key, bad and good client mounts, server markup does not fetch) | **6 passed, 0 failed.** Not committed. |
| `npx next lint` | Exit 0. No warnings in the files this PR changes. One existing warning in `src/components/SiteShell.tsx` (ref cleanup). That file is not in the diff. |
| `npx tsc --noEmit` | **Exit 0.** |
| `npx tsc --noEmit --incremental false` | **Exit 0.** |
| `npx next build` | Exit 0. Log line: “Skipping validation of types” (`typescript.ignoreBuildErrors` is already true in `next.config.ts`). `/pay/success` is in the route list. The build is not the typecheck; `tsc` is, and `tsc` is green. |
| Browser | **not_run** |
| Plan file on `growthwise68/vela` | **not_run** (repo 404) |

## Lenses

Thermo-nuclear (separate pass over the diff and the product files): **APPROVE** on structure. No structural regression, no file near 1,000 lines, no new branch in the redeem flow. The second document cast is redundant and does not block. Do not promote it into a shared DOM adapter.

Deslop: the component still has no narrating comments and no `any`. The URL `try/catch` and the effect `.catch(() => {})` are the plan’s rule that a bad value must not blank the page. The new `as unknown as` is confined to the test helper. Nothing in product code needs a slop edit.

Verify-this:

```text
VERIFIED
Claim: At c96571e0, setupBrowserDom types the happy-dom window and document as typeof globalThis.window and typeof globalThis.document, and tsc --noEmit exits 0.

Evidence:
lines 73–75: baseline at the round-2 assignment = TS2322 + TS2740, tsc exit 2; treatment = typeof globalThis.window and typeof globalThis.document, tsc exit 0
direct cast without unknown: tsc exit 2 (TS2352 on both lines)

Reasoning:
The old assignment was replayed on this tip and failed the same way round 2 recorded. The committed lines clear both tsc commands. A single as is not enough, because the happy-dom and DOM lib types do not overlap.
```

```text
VERIFIED
Claim: decideRedeemUrl and the product files are unchanged since b01b766e, and the round-2 behaviour passes still hold.

Evidence:
blobs: PaySuccessActions.tsx and success page.tsx identical at b01b766e and c96571e0
probe: bad client fetches = 1 (reason unparseable, href vela://open), good client fetches = 0 (href is the redeem URL, no app_user_id), eight bad shapes fallback = 8/8, empty-key fetches = 0, slice-first keeps TTTT = true, stored truncated value keeps TTTT = false

Reasoning:
The only code change since the behaviour tip is the test helper’s types. The probe reran the round-2 checks against this tip, including the bad-link client mount that the committed W5 test does not include. origin/main has no useSearchParams and no fetch in this component.
```

## Exact change

None. Do not change `decideRedeemUrl`. Do not add a file. Do not edit `package.json`.
