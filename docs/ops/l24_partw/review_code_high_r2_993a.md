# L24 Part W — code review r2

- seat: Cursor Grok 4.7 High (cursor-agent 2026.10.14-0f9edde, model grok-4.7-high, --mode ask read-only, one-shot new session 35e0ec14-d43c-4ae8-9d27-d8605c513155) on Iain's Mac d713664d
- temporary fallback, Sol usage limit, Iain OK 20:35
- tokens: 474025  (input 83208, output 48289, cacheRead 342528, cacheWrite 0)
- reviewer exit code: 0; duration 724s
- base: main d4b1789 + part_w.patch (a184aba, applied as 6b15039)
- Tests ran OUTSIDE the reviewer (orchestrator, scratch clone): npm ci 0, npm test 0 (31/31 pass incl. subscribe-consent.test.ts:212), lint 0 (1 pre-existing warning SiteShell.tsx), tsc 0. Logs: see logs/ alongside; prompt in logs/prompt.txt.

## Reviewer output (verbatim)

I'll review Part W read-only against the accepted plan and the four rulings. First I'll read the plan, the patch, and the test logs.The patch is in. Next I’ll read the changed pay and waitlist code, plus the files that must stay the same.VERDICT: REVISE

1. **major** — `supabase/migrations/20261016180000_waitlist_attribution.sql:1`  
   The new file is named as a Supabase timestamp. This repo’s website migrations are sequential: `0001_survey_responses.sql`, `0002_waitlist_signups.sql`, `0003_waitlist_email_consent.sql`. The accepted plan names `0004_waitlist_attribution.sql`. The SQL itself is sound (nullable text, no `DEFAULT`, no `UPDATE`, no backfill). An operator applying the plan’s filename will not find it.

2. **minor** — `src/lib/pay/config.ts:22` and `src/lib/pay/checkout-url.ts:29`  
   A visitor `utm_content` is not on the allow-list, so it is never read. `/pay?utm_content=real&ref=crew` becomes a checkout link with `utm_content=crew`. The guard at `checkout-url.ts:29` only keeps `utm_content` already present on the configured Web Purchase Link. `utm_source`, `utm_medium`, and `utm_campaign` are not replaced by `ref`.

3. **minor** — `src/lib/pay/config.ts:21`  
   The allow-list comment still says these keys are site-only and never forwarded to RevenueCat. Checkout now forwards `utm_source`, `utm_medium`, `utm_campaign`, and `ref` as `utm_content`.

4. **minor** — `src/app/api/subscribe/route.ts:276`  
   Every early-access insert sends the four new columns. Until that SQL is applied, PostgREST rejects the insert and the route returns 500, so signup fails. There is no fallback to the old row shape. The 409 duplicate path still does not update an existing row.

5. **nit** — `src/app/early-access/early-access-consent.test.tsx:16` and `src/app/api/subscribe/subscribe-consent.test.ts:312`  
   The early-access test only stubs empty search params. It never checks that a tagged visit is posted. The migration assertion still reads only `0003_waitlist_email_consent.sql`, so the new file is not checked for `UPDATE` or `DEFAULT`. Checkout unit tests do cover forward, encoding, and the Web Purchase Link `utm_content` guard. Orchestrator run: 31/31 pass, lint 0, tsc 0.

**Ruling 1.** Partially conforms. `ref` is written to `utm_content` only when the Web Purchase Link has no `utm_content` (`checkout-url.ts:29–33`). A visitor’s own `utm_content` is not read, so `ref` takes that slot. That is the collision the plan said to note (plan line 155); the allow-list never included page `utm_content`.

**Ruling 2.** Does not conform. The repo convention is `000N_name.sql`, and the plan’s file is `0004_waitlist_attribution.sql`. The patch uses `20261016180000_waitlist_attribution.sql`.

**Ruling 3.** Conforms. The patch does not change `redeem_url`, `/pay/success`, or `PaySuccessActions.tsx`. Share URLs still use the query name `ref` (`attribution.test.ts` expects `ref=wall-e`). `utm_campaign` is added on `/pay` and share links, which the plan requires. Checkout does not put a `ref` query param on the Web Purchase Link.

**Ruling 4.** Conforms. No `sessionStorage`. This patch does not turn on a per-customer collector. MailerLite logs are group id and status only; the test log shows no email and no response body. Waitlist rows do store the allow-listed tags once the columns exist.
