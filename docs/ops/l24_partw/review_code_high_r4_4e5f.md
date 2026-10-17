# L24 Part W — code review r4

- seat: Sol 6.1 High — Codex 0.163.0 (codex-cli), model gpt-6.1-sol, reasoning effort high, sandbox read-only, one-shot new --ephemeral session 01a14633-46e7-7471-80e5-fd11e1fcd77b, on Iain's Mac d713664d. No Grok fallback.
- seat pre-check: gpt-6.1-sol present in Codex model list; trivial prompt returned "OK" (11,484 tokens), no usage-limit message.
- tokens: 87706
- reviewer exit code: 0
- base: main d4b1789 + r4 part_w.patch (Composer 356a680). The r4 file is a plain `git diff` (no mbox header), so `git am` failed ("Patch format detection failed"); applied with `git apply --index` (clean check) and committed locally in the scratch clone.
- Tests ran OUTSIDE the reviewer sandbox (orchestrator, scratch clone): npm ci 0, npm test 0 (33/33), lint 0 (pre-existing SiteShell.tsx warning only), tsc 0. Logs: r4/logs/; prompt: r4/logs/prompt.txt; full Codex transcript: r4/logs/review_full.log

## URL check (Web Purchase Links carry no utm_* tags)

- Sandbox — Vercel vela-website NEXT_PUBLIC_RC_WEB_PURCHASE_URL (type plain; production env id KwkRV9yRWvQMqbH5 and preview env id ITOuX8YzyAYjTJsT, same value; public link path, no secret):
  `https://pay.rev.cat/sandbox/yjjzwzqykwklzkib/` — no query string, no utm_*. HTTP 200 (curl).
- Live: `https://pay.rev.cat/osvxmwaqqcojdxqs/` — no query string, no utm_*. HTTP 200 (curl from Mac; the WebFetch provider got a 404 page, treated as a fetch-provider quirk).

## Reviewer output (verbatim)

VERDICT: ACCEPT

1. **nit** — `src/lib/pay/checkout-url.test.ts:45` — The precedence tests still use a bare WPL. Add cases with existing WPL `utm_content`, asserting that visitor content wins and that ref wins when visitor content is absent. The implementation is correct; this is a regression-coverage gap.

r3 finding status:

1. **Closed** — `src/lib/pay/checkout-url.ts:29–34`: visitor content is forwarded regardless of WPL content; ref is the fallback.
2. **Closed** — `src/app/early-access/early-access-consent.test.tsx:129`: renders `EarlyAccessClient`, submits the form, and asserts tags on the captured POST. Removing the component’s attribution spread would fail it.
3. **Closed** — `src/app/api/subscribe/subscribe-consent.test.ts:314`: both 0003 and 0004 receive no-UPDATE/no-DEFAULT checks.
4. **Closed** — `src/lib/pay/attribution.ts:1`: unused type import removed.

Ruling notes:

- **21:13:** Conforms. Visitor `utm_content` wins; otherwise ref supplies it. Removing the test that required WPL content to beat ref is appropriate. The 34→33 count follows that deletion.
- **20:55(a):** Correct filename: `0004_waitlist_attribution.sql`; nullable columns, no defaults or backfill.
- **20:55(b):** No route column guard. Migration-before-deploy remains required.
- **20:55(d):** Config comment matches behavior; component submission and 0004 assertions are present.
- **Protected behavior:** Redeem handling, success page/actions, share-link plumbing, and `/pay` ref semantics remain unchanged. No sessionStorage or collection enablement added. MailerLite logging excludes email and response bodies.

Scope: r3→r4 changes are confined to the four fixes, the 21:13 precedence/comment/test adjustment, and incidental fetch-mock restoration in subscribe tests. No unrelated production changes found.

Supplied orchestrator evidence: ci/test/lint/tsc exit 0; 33/33 tests pass. Logs include React test warnings and the existing SiteShell lint warning. No npm commands, network access, or file edits performed.
