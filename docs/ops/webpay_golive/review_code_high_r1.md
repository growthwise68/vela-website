# CODE review r1 — vela-website web pay go-live (Composer commit b4e99b1 on main d4b17892)

Receipt
- seat: Sol 6.1 High via Codex 0.163.0 on Iain's Mac
- model: gpt-6.1-sol, reasoning effort: high, sandbox: read-only, one-shot `codex exec` (new process)
- session id: 01a145b8-a86e-7451-b402-2e2c78549b27
- run: 16 Oct 2026 ~19:17-19:22 SAST; scratch dir; fresh fetch of vela-website d4b17892 + `git am site.patch` (local HEAD 884f4e8, same content as b4e99b1)
- local checks before the session (no Actions): npm ci OK; lint exit 0 (existing SiteShell warning only); tsc --noEmit exit 0; npm test 29/29 pass
- verdict: REVISE / INTENT_DRIFT: PASS / LEGAL_VERBATIM: FAIL
- tokens: 89,381

## Output (verbatim)

VERDICT: REVISE
INTENT_DRIFT: PASS
LEGAL_VERBATIM: FAIL

1. **MAJOR — `src/app/privacy/page.tsx:193–195`:** The approved Stripe sentence was rewritten. Restore its exact wording and punctuation while retaining the RevenueCat merge.
2. **MINOR — `src/app/refund-policy/page.tsx:54`:** `we&rsquo;ll` renders as `we’ll`, whereas the draft specifies `we'll`. Use `we&apos;ll` to preserve the approved apostrophe.

Plan and integrity checks pass: one two-scheme set and unchanged host/token checks (`PaySuccessActions.tsx:54–70`); one validator shared by reporting and rendering (`:93`, `:140`). W6/W6b/W7 use independent literals and exercise production code (`pay-ui.test.tsx:161–244`). No flags, weakened checks, duplicate validation implementation, or live-switch/config changes appear in the patch.

HEAD matches `site.patch` and changes exactly the eight authorized files. Case-insensitive grep finds **zero Paddle hits in `src/app`**. A pre-existing uncommitted `tsconfig.tsbuildinfo` modification is outside the commit. Independent verification: **29/29 tests pass**, TypeScript passes with `--noEmit --incremental false`; lint passes according to `checks.log`, with its existing SiteShell warning.

Legal difference list, comparing rendered replacement text:

- **Terms — `src/app/terms/page.tsx:154–170`:** None; both replacements match.
- **Privacy — `src/app/privacy/page.tsx:193–194`:**
  - Draft: “Stripe — processes card payments for subscriptions bought directly on this website, under Stripe's privacy policy.”
  - Code: “For subscriptions bought directly on this website, Stripe processes card payments under Stripe’s privacy policy.”
  - Differences: reordered wording, added opening “For”, removed em dash, moved comma, and straight `'` changed to curly `’` through `&rsquo;`. The following seller/payment-details sentences and the sharing-list replacement at `:285–287` match. Structurally, the former list item is merged into the RevenueCat paragraph.
- **Pricing — `src/app/pricing/page.tsx:232–236`:** None.
- **Refund policy — `src/app/refund-policy/page.tsx:54`:**
  - Draft: “we'll issue a full refund”
  - Code: “we’ll issue a full refund”
  - Only difference: straight `'` versus curly `’` from `&rsquo;`. Cancellation wording matches the draft excerpt. The receipt-sender note at `:79` is preserved verbatim as a non-rendered comment.
- **Support — `src/app/support/page.tsx:83–86`:** None; `&mdash;` renders the approved em dash.
- **Delete account — `src/app/delete-account/page.tsx:76–78`:** None.

Deviation rulings:

- **(a) Merge: acceptable structurally; wording: unacceptable.** The draft explicitly requests merging with RevenueCat, but does not authorize paraphrasing the approved Stripe sentence.
- **(b) W6b: acceptable.** It adds an independent uppercase-input regression check without changing behavior or weakening existing tests.
- **(c) JSX receipt-sender comment: acceptable.** It preserves the explicitly unresolved internal follow-up without publishing it or inventing a sender identity.