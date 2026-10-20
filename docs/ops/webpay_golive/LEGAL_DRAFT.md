# LEGAL DRAFT: replace Paddle on velaforcrew.com (Stripe via RevenueCat)

Status: **FINAL** proposed text for Iain's approval (16 Oct 2026 19:10 SAST). Text only; not legal advice (an accountant/lawyer may want to check the tax wording). Nothing deployed, no code edited.
Decision basis: Iain 16 Oct 2026 18:32 SAST (Stripe via RevenueCat is live; Paddle retired) and 18:39 SAST answers:
1. Vela4Crew Inc. is seller and merchant of record. Stripe does not handle tax (no Stripe Tax, no Managed Payments). Payments processed by Stripe through RevenueCat. (Internal only, NOT for public text: this is temporary; a move back to Paddle is expected later.)
2. 14-day refund window starts at the FIRST CHARGE (after the free trial).
3. Paddle sweep beyond the six pages: see "Paddle sweep" below.

Source lines re-verified 16 Oct 2026 ~18:45 SAST against **vela-website main `d4b17892`** (read-only `git grep`). All line ranges below match main.

## Background facts

- RC Web Purchase Links docs: Paddle Billing = "Paddle acts as billing engine and merchant of record". No such statement for RevenueCat Billing (Stripe-backed), our live setup (`appc809f0a40e`, Stripe `acct_1Ty4H9I63Ebz0Zkv`).
- RC tax docs: RC Billing only calculates/collects tax via a connected provider (Stripe Tax or Avalara). Iain confirms none is connected, so **no tax is added at checkout**; the checkout price is the total charged. Registration/filing/remittance, where required, rest with Vela4Crew Inc.
- vela `docs/launch/nodes/C9-web-checkout-infrastructure.md` l.161 (vela main `d5bc3de4`): "RevenueCat Billing + standard Stripe | Vela4Crew Inc. | Filing/remittance on Vela4Crew".

## Shared wording (used in several pages)

- **SELLER:** "sold by **Vela4Crew Inc.**, the seller and merchant of record. Payments are processed securely by Stripe through RevenueCat, our subscription platform; we never see or store your full card details."
- **PRICE/TAX:** "Prices are in US dollars and are shown at checkout before you pay. The amount shown at checkout is the total you are charged. Vela4Crew Inc. is responsible for any sales tax or VAT that applies to these purchases."
- **RECEIPT:** "After each payment you receive an emailed receipt for your purchase from Vela4Crew Inc. It includes a manage-subscription link you can use to cancel or update your payment method."

## Replacements

### 1. Terms — `src/app/terms/page.tsx`

**l.154-160 (old):**
> Purchases made directly through this website are sold by **Paddle.com**, our authorised reseller and **merchant of record**. Paddle handles payment processing, invoicing and applicable sales tax or VAT for those purchases, and appears as the seller on your statement and receipt. Those transactions are additionally subject to Paddle's own buyer terms. Purchases made through the App Store or Google Play are governed by the terms of the respective store.

**New:**
> Purchases made directly through this website are sold by **Vela4Crew Inc.**, the seller and **merchant of record** (Vela4Crew Inc., a Delaware corporation, 131 Continental Dr, Suite 305, Newark, DE 19713, USA). Payments are processed securely by Stripe through RevenueCat, our subscription platform; we never see or store your full card details. Prices are in US dollars and are shown at checkout before you pay; the amount shown at checkout is the total you are charged. Vela4Crew Inc. is responsible for any sales tax or VAT that applies to these purchases, and issues the receipt for each payment. No sales tax or VAT is added at checkout. Purchases made through the App Store or Google Play are governed by the terms of the respective store.

**l.165-166 (old):**
> VÉLA uses third-party infrastructure (including Google Firebase, Supabase, MailerLite, and Vercel) to operate the service, and Paddle for payments made through this website.

**New:**
> VÉLA uses third-party infrastructure (including Google Firebase, Supabase, MailerLite, and Vercel) to operate the service, and RevenueCat and Stripe for payments made through this website.

### 2. Privacy — `src/app/privacy/page.tsx`

**l.192-193 (old):**
> **Paddle** — our authorised reseller and merchant of record for subscriptions bought directly on this website, under Paddle's privacy policy.

**New (replace with one list item; RevenueCat already appears elsewhere on this page, so merge with that entry rather than duplicating it):**
> **Stripe** — processes card payments for subscriptions bought directly on this website, under Stripe's privacy policy. Stripe holds your payment details; we do not. Vela4Crew Inc. is the seller of these subscriptions.

**l.286-288 (old):**
> **Google Play Billing, Apple App Store billing, and Paddle** — the payment platforms that process subscription purchases. They hold your payment details; we do not.

**New:**
> **Google Play Billing, Apple App Store billing, and Stripe (through RevenueCat)** — the payment platforms that process subscription purchases. They hold your payment details; we do not.

### 3. Pricing — `src/app/pricing/page.tsx`

**l.232-243 (old):**
> VÉLA subscriptions are available through the App Store, Google Play, or directly at velaforcrew.com. Purchases made directly through this site are processed securely by [Paddle.com](https://www.paddle.com), our authorized reseller and merchant of record.

**New (remove the paddle.com `<a>` link, l.235-242):**
> VÉLA subscriptions are available through the App Store, Google Play, or directly at velaforcrew.com. Purchases made directly through this site are sold by Vela4Crew Inc., the seller and merchant of record, and processed securely by Stripe. Prices are in US dollars and are shown at checkout before you pay; the amount shown at checkout is the total you are charged.

### 4. Refund policy — `src/app/refund-policy/page.tsx`

**l.51-62 (old):**
> Subscriptions purchased directly through this website are processed by [Paddle.com](https://www.paddle.com), our authorized reseller and merchant of record. If you contact us within **14 days** of purchase, we'll issue a full refund to your original payment method, processed by Paddle.

**New (remove the paddle.com `<a>` link, l.52-58):**
> Subscriptions purchased directly through this website are sold by Vela4Crew Inc., the seller and merchant of record, and paid through Stripe. Your free trial costs nothing. If you contact us within **14 days of your first charge** — the first payment taken after your free trial ends — we'll issue a full refund of that charge to your original payment method.

**l.79-82 (old):**
> If you subscribed directly on this site, use the manage-subscription link in the receipt Paddle emailed you, or contact us at founder@velaforcrew.com and we will cancel it…

**New:**
> If you subscribed directly on this site, use the manage-subscription link in your emailed purchase receipt, or contact us at founder@velaforcrew.com and we will cancel it…

[MISSING: the sender name/address shown on live RC Billing receipt emails — unknown until the first live purchase; confirm it reads as Vela4Crew/VÉLA so "your emailed purchase receipt" is recognisable.]

### 5. Support — `src/app/support/page.tsx`

**l.83-87 (old):**
> Subscriptions bought directly on this site are processed by Paddle, our merchant of record — use the manage-subscription link in your purchase receipt, or email us and we will cancel it for you. Prices are shown in USD; sales tax or VAT may be added at checkout depending on your country, and the exact total is always shown before you pay.

**New (replaces the whole sentence through l.87 "shown before you pay."):**
> Subscriptions bought directly on this site are sold by Vela4Crew Inc. and paid through Stripe — use the manage-subscription link in your emailed purchase receipt, or email us and we will cancel it for you. Prices are in USD and are shown at checkout; the amount shown at checkout is the total you pay.

### 6. Delete account — `src/app/delete-account/page.tsx`

**l.76-77 (old):**
> …does **not** cancel an active subscription — cancel it separately in your App Store, Google Play, or Paddle subscription settings first, or ask us to help.

**New:**
> …does **not** cancel an active subscription — cancel it separately first in your App Store or Google Play subscription settings, or with the manage-subscription link in your website purchase receipt, or ask us to help.

## [MISSING] items

1. ~~Seller identity~~ FILLED (Iain 19:05): Delaware corporation, 131 Continental Dr, Suite 305, Newark, DE 19713, USA. Source: vela-website main `d4b17892`, `src/app/terms/page.tsx`:216 (same string in privacy:422, pricing:260, refund-policy:88, support:178, delete-account:104, `src/components/SiteShell.tsx`:271, `src/lib/structured-data.ts`:12). Note: the Google Play developer listing shows a different address, "8 The Grn Dover, DE 19901-3618" (likely the registered agent); the website copy uses Newark, as above.
2. ~~Tax registration~~ FILLED (Iain 19:06): not registered for VAT or sales tax (no revenue yet). The public text makes no VAT ID or registration claim and keeps only "Vela4Crew Inc. is responsible for any sales tax or VAT that applies". No VAT ID on receipts.
3. [MISSING: the sender name on live RC Billing receipt emails, known only after the first live purchase. Confirm it reads as Vela4Crew/VÉLA.]

## Paddle sweep (read-only, 16 Oct 2026 ~18:45 SAST)

Method: vela-website main `d4b17892`, `git grep -n -i paddle` over ALL files. vela main `d5bc3de4` (growthwise68/vela), GitHub code search `paddle` (case-insensitive; 120 files returned), then line-level reads of every non-docs hit.

### A. User-facing copy needing rewrite — 15 lines, all in the six pages above (no other website file matches)
- `src/app/terms/page.tsx`:155, 156, 158, 166
- `src/app/privacy/page.tsx`:192, 193, 286
- `src/app/pricing/page.tsx`:237, 241
- `src/app/refund-policy/page.tsx`:54, 58, 62, 80
- `src/app/support/page.tsx`:84
- `src/app/delete-account/page.tsx`:77
Replacement text: sections 1-6 above. **Vela app: 0 user-facing hits** — no match in `lib/`, `assets/`, l10n/ARB, `ios/`/`android/` strings, or Firebase functions email templates; no Supabase/MailerLite email template files in either repo contain Paddle. So no extra replacement text is needed beyond sections 1-6.

### B. Code/config (note only, don't change) — 10 lines, vela repo
- `supabase/functions/p1-rc-lifecycle-webhook/index.ts`:31 `"PADDLE",` (RC store enum); :100 `"apple" | "google" | "stripe" | "paddle" | "unknown"`; :104 `if (store === "PADDLE") return "paddle";`; :139 `fact.rail === "paddle" || fact.store === "TEST_STORE" ||` (paddle rail parked)
- `supabase/functions/p1-rc-lifecycle-webhook/index_test.ts`:91 `body("RENEWAL", { store: "PADDLE" })`
- `supabase/migrations/20261005160122_p1_rc_lifecycle.sql`:25 `'PADDLE'` store enum; :45 and :93 rail CHECK incl. `'paddle'`; :99 `'paddle_parked'` reason
- `firebase/functions/test/c12_deploy_safety_contract_test.js`:114 `"stripe", "paddle", …` (rejected-mode values); :237 `assert.doesNotMatch(source, /paddle\.com|paddle\.io/i)`
Harmless for Stripe go-live; keep (they also support the later move back).

### C. Docs/specs/ops/governance (note only) — 116 files in vela main
`docs/` (incl. `docs/launch/DECISIONS.md` D-019, C9/C11/C12/C13 nodes, `docs/Financial/*`), `specs/` (incl. `specs/launch_rail_paddle_d019/*`, `specs/web_checkout_infrastructure/*`), `ops/workflows/*` (incl. fixture `wall-e-trial-paid-churn/fixtures/rc_webhooks/paddle_renewal.json`). Governance update is Roz's; full file list reproducible with the code search above. Not listed line by line.

### Not searchable from here (need a manual check)
- MailerLite templates/automations stored only in the MailerLite UI.
- Supabase Auth email templates and Firebase Auth email templates set in their consoles (none stored in the repos).
- RevenueCat Billing receipt/purchase emails and the RC web purchase page/paywall copy (RC dashboard).
- Stripe account public details (statement descriptor, public business name) — live account not visible to my connector.
- App Store / Google Play listing text and in-app purchase descriptions (store consoles).
- Already-sent emails (e.g. L10 founding warm-up drafts exist only as docs under `docs/launch/handoff/`).
- Caveat: GitHub code search skips files >384 KB and some binaries; vela-website was searched exhaustively with git.

## Notes
- No AI or developer tools are named in any public text; only payment processors/infrastructure already listed.
- The "temporary / back to Paddle" point is deliberately absent from all public text.

## Out-of-reach sweep (read-only, 16 Oct 2026 ~19:10 SAST)

- **MailerLite**: no MailerLite connector. The box has no MailerLite env var set. Vercel project `vela-website` has env vars `MAILERLITE_API_KEY`, `MAILERLITE_GROUP_ID` and `MAILERLITE_BRIEFS_GROUP_ID`, so the key exists (names only, not decrypted). No sanctioned read path for template content → **NEEDS IAIN'S DASHBOARD**: MailerLite → Automations and Campaigns (waitlist/welcome emails), search the body for "Paddle".
- **Supabase Auth email templates** (oetczltunjmysntwoufr, zajrtrwhqjsyfyskyftp): the Supabase MCP has no auth-config/template read tool, and the templates aren't in SQL-readable tables → **NEEDS IAIN'S DASHBOARD**: Supabase → each project → Authentication → Emails → Templates (Confirm signup, Magic link, Reset password, Change email, Invite).
- **Firebase Auth templates**: the Firebase MCP has no template read tool → **NEEDS IAIN'S DASHBOARD**: Firebase console → Authentication → Templates (email verification, password reset, email change).
- **RevenueCat**: READ, no hits. Project `proje19b8bb6`, only paywall "Founders Paywall" `pwb53b7bc2769a4968` (published 11 Oct, rev 143), full component config: 0 "Paddle", 0 "Stripe"; the links are velaforcrew.com/privacy and /terms only. Web Purchase Link checkout page copy and RC Billing receipt email styling aren't exposed via the API → **NEEDS IAIN'S DASHBOARD**: RevenueCat → Web → Web Purchase Links (live link) → appearance/checkout settings, and the Web Billing customer email settings.
- **Stripe public business details**: no Stripe connector here → **NEEDS IAIN'S DASHBOARD**: Stripe (live account) → Settings → Business → Public details (public business name, statement descriptor, support address).
- **App Store**: READ, no hits. iTunes lookup for bundle com.velaforcrew.vela (id6790456841): seller "Vela4Crew Inc", 0 "Paddle" in the listing metadata.
- **Google Play**: READ, no hits. play.google.com listing com.velaforcrew.vela: 0 "Paddle". The developer contact shows "Vela4crew Inc." at 8 The Grn, Dover, DE 19901-3618 (see MISSING item 1 note).
