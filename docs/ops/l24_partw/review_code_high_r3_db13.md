# L24 Part W — code review r3

- seat: Cursor Grok 4.7 High (cursor-agent 2026.10.14-0f9edde, model grok-4.7-high, --mode ask read-only, one-shot new session b8fe6fc7-76f9-462f-8778-9a8f69d67b8d) on Iain's Mac d713664d; started 21:00 SAST (before 23:51)
- temporary fallback, Sol usage limit, Iain OK 20:35
- tokens: 786900  (input 129671, output 46925, cacheRead 610304, cacheWrite 0)
- reviewer exit code: 0; duration 711s
- base: main d4b1789 + r3 part_w.patch (a512656, applied as a7029eb)
- Tests ran OUTSIDE the reviewer (orchestrator, scratch clone): npm ci 0, npm test 0 (34/34), lint 0 (pre-existing SiteShell.tsx warning only), tsc 0. Logs: r3/logs/; prompt: r3/logs/prompt.txt
- Inputs given: plan r7, r2 receipt, r2 patch, r3 patch, logs, Helen 20:55 rulings a–d

## Reviewer output (verbatim)

I'll review the Part W r3 patch against the accepted plan, your r2 receipt, and Helen's rulings. First I'll read the review inputs and the changed code, without editing anything.The review skill would write session files and check the network, which this seat forbids, so I’m staying read-only and reading the plan, the r2 receipt, and both patches.The file list matches Part W. I’ll read the pay, waitlist, and migration code next, then compare it with the r2 patch.VERDICT: REVISE

1. **minor** — `src/lib/pay/checkout-url.ts:30`  
   When the configured Web Purchase Link already has `utm_content`, the visitor’s `utm_content` is dropped. Ruling c keeps that visitor value, and `ref` must not land in it. `ref` is withheld in this case, which matches plan line 66. The same `if (!existingWplContent)` also skips the visitor. `utm_source`, `utm_medium`, and `utm_campaign` still replace the link (`checkout-url.ts:26`). The comments at `config.ts:23` and `checkout-url.ts:12` say the visitor value is forwarded when it is present. There is no test where the link and the visit both have `utm_content`. On a bare link, visitor-over-`ref` is correct and tested (`checkout-url.test.ts:45`). Apply the visitor value whenever it is present; write `ref` only when the visit and the link both lack `utm_content`.

2. **minor** — `src/app/early-access/early-access-consent.test.tsx:81`  
   The new test builds a body by calling `pickAttributionFromSearchParams` and `attributionToWaitlistColumns` itself. It never renders `EarlyAccessClient` and never submits. Dropping `...visitAttribution` at `EarlyAccessClient.tsx:55` would still pass. `subscribe-consent.test.ts:269` only checks a body that already contains the tags.

3. **nit** — `src/app/api/subscribe/subscribe-consent.test.ts:312`  
   The old `0003` no-`UPDATE` / no-`DEFAULT` check was pointed at `0004` instead of kept beside it. The `0004` check itself is real.

4. **nit** — `src/lib/pay/attribution.ts:4`  
   `AttributionParamKey` is imported and unused after the waitlist return type moved to `WAITLIST_ATTRIBUTION_PARAM_KEYS`. Lint and `tsc` did not flag it.

**r2 findings**

1. **Fixed.** The file is `supabase/migrations/0004_waitlist_attribution.sql`. The SQL is the same sound body as r2: nullable text, no `DEFAULT`, no `UPDATE`, no backfill.
2. **Partial.** A visitor `utm_content` is now read and beats `ref` on a bare link. It still loses when the Web Purchase Link already has `utm_content`. That remainder is finding 1.
3. **Fixed.** `config.ts:21` now says these keys are forwarded to checkout, and when `ref` is sent as `utm_content`.
4. **Closed by ruling b.** `route.ts:276` still inserts the four columns on every early-access signup. There is no column guard and no fallback row shape. A duplicate email is still a 409 and does not update the row.
5. **Partial.** Checkout tests cover forward, encoding, visitor-over-`ref`, `ref`-only, and link-over-`ref`. The `0004` assertion exists. The early-access test still does not post. That remainder is finding 2.

**Ruling a.** Conforms. Migration file name is `0004_waitlist_attribution.sql`.

**Ruling b.** Conforms. No column guard. Signup returns 500 until that migration is applied. That ordering is the accepted fix.

**Ruling c.** Adding `utm_content` to `ATTRIBUTION_PARAM_KEYS` conforms. The page has to read it to keep it. `WAITLIST_ATTRIBUTION_PARAM_KEYS` leaves it off the waitlist insert, so the stored columns stay `utm_source`, `utm_medium`, `utm_campaign`, and `ref`, matching `0004`. Share links still use the query name `ref` (`attribution.test.ts` expects `ref=wall-e`). If the visit already has `utm_content`, the share URL echoes that key as well; `ref` stays `ref`. The Web Purchase Link value winning over the visitor does not conform. See finding 1.

**Ruling d.** The allow-list comment is fixed. The `0004` assertion is in place (finding 3 is only that `0003` was dropped from that test). The tagged early-access test does not post. See finding 2.

**Scope.** Against the r2 patch, the product edits are the migration rename, the visitor-`utm_content` branch, `utm_content` on the pay allow-list, the separate waitlist key list, the comment, and the tests. `route.ts`, `EarlyAccessClient.tsx`, `PayCheckoutClient.tsx`, source/medium/campaign forwarding, the MailerLite log lines, and the SQL body are unchanged from r2. `redeem_url`, `/pay/success`, and `PaySuccessActions.tsx` are untouched. No `sessionStorage`. No per-customer collector and no collection switch. MailerLite logs are group id and status only; the test log line is `MailerLite error 500` with no email and no response body. The commit message still says “timestamp migration”; the file on disk is `0004`. Orchestrator logs: npm ci, test, lint, and tsc all exit 0; 34/34 pass; the only lint warning is the existing one in `SiteShell.tsx`.
