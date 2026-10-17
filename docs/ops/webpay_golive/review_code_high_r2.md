# CODE review r2 — vela-website web pay go-live (amended commit cce5f27 on main d4b17892)

Receipt
- seat: Sol 6.1 High via Codex 0.163.0 on Iain's Mac
- model: gpt-6.1-sol, reasoning effort: high, sandbox: read-only, one-shot `codex exec` (new process; given review_code_high_r1.md)
- session id: 01a145bf-32ac-7562-9307-b26edefb0607
- run: 16 Oct 2026 ~19:25-19:28 SAST; scratch dir; fresh fetch of vela-website d4b17892 + `git am site.patch` (local HEAD d77a7fe, same content as cce5f27)
- local checks before the session (no Actions): npm ci OK; lint exit 0; tsc --noEmit exit 0; npm test 29/29 pass
- verdict: REVISE / INTENT_DRIFT: PASS / LEGAL_VERBATIM: FAIL
- tokens: 64,936

## Output (verbatim)

VERDICT: REVISE
INTENT_DRIFT: PASS
LEGAL_VERBATIM: FAIL

r1 finding status:

1. **Privacy — partially fixed.** Approved word order restored, but `src/app/privacy/page.tsx:194` still renders `Stripe’s` instead of draft `Stripe's`. Required change: `Stripe&rsquo;s` → `Stripe&apos;s`.
2. **Refund policy — fixed.** `src/app/refund-policy/page.tsx:54` uses `we&apos;ll`, matching draft `we'll`.

New findings: none.

Legal difference list, comparing rendered replacements with whitespace normalized:

- **Terms:** none.
- **Privacy:** only `Stripe’s` versus `Stripe's` at line 194.
- **Pricing:** none.
- **Refund policy:** none.
- **Support:** none.
- **Delete account:** none.

Rulings:

- **(a) HTML entities:** acceptable only when they render the exact draft character. `&mdash;` matches `—`; `&apos;` matches `'`. `&rsquo;` renders `’`, so it cannot substitute for draft `'`. The report’s privacy “encoding note” incorrectly treats these as identical.
- **(b) Existing mailto wrapper:** acceptable; the rendered email address matches exactly.
- **(c) `[MISSING: …]` JSX comment:** acceptable; it preserves the internal follow-up verbatim without publishing it. Terms’ trailing sentences are also acceptable unchanged existing copy outside the replacement.

Integrity checks: HEAD matches `site.patch`; exactly eight authorized files changed; zero case-insensitive Paddle hits in `src/app`. The two-scheme set, unchanged host/token checks, shared validator, and independent W6/W6b/W7 literals remain correct. No live-switch or configuration changes appear.

The changes are consistent with the r1 report and stated fixes. Exact confirmation that nothing else changed since r1 is unavailable: neither the r1 commit nor its patch exists locally. The pre-existing dirty `tsconfig.tsbuildinfo` remains outside the commit.

Independent verification: TypeScript passed with `--noEmit --incremental false`; **29/29 tests passed**. Lint passed according to `checks.log`, with the existing SiteShell warning.