# C11 — Website checkout — REPORT

**Node:** C11 website pay landing only. **Map position:** main@f77d804f (PR #276). **Not touched:** C12/C5 Redeem, Rachel C13, P6b rewards, deploy.

**Signed intent:** `SIGN_PAGE.md` — pay on web → open Véla (or email) → sign in → Core on; referral QR/messenger → same on-site `/pay` URL.

## Helen REVISE (stripped from prior tip)

- sessionStorage first-touch attribution (`vela_pay_attribution_v1`, merge / first-visit-wins)
- Forwarding UTM/`ref` onto the RevenueCat Web Purchase Link
- Extra pay-URL keys: `utm_campaign`, `utm_content`, `utm_term`, `referral`
- Store download block on `/pay` before checkout (downloads stay on `/pay/success` when env URLs are set)
- Copy-link and native “Share link” controls (QR + WhatsApp only)
- Customer copy: sandbox label, test cards, email recovery, “no reward”
- Hard-coded default `pay.rev.cat/.../vela_core_web` fallback (env-only `NEXT_PUBLIC_RC_WEB_PURCHASE_URL`)
- REPORT claims: W1 redemption gate, Helen live gate, W3/W6 chronology, “Core already on” as proven in this PR

## What shipped (this PR)

| Item | Location |
|------|----------|
| Pay landing + RC/Stripe CTA | `/pay` |
| Success: Open Véla + optional store download CTAs | `/pay/success` |
| Referral QR + WhatsApp (on-site `/pay` URL only) | `/pay` (`ReferralSharePanel`) |
| Pay URL query keys (current page only, site URL) | `utm_source`, `utm_medium`, `ref` |
| Unit tests | `npm test` |

**Referral / QR / WhatsApp URL shape:**

```text
https://<site>/pay?utm_source=<source>&utm_medium=<medium>&ref=<referral_id>
```

Tags apply to the **website** `/pay` URL only. Checkout CTA uses `NEXT_PUBLIC_RC_WEB_PURCHASE_URL` with no extra query string from the site.

## Local smoke

1. `cp .env.example .env.local` and set `NEXT_PUBLIC_RC_WEB_PURCHASE_URL` to your sandbox Web Purchase Link from RevenueCat.
   - Optional: `NEXT_PUBLIC_IOS_APP_STORE_URL`, `NEXT_PUBLIC_ANDROID_PLAY_STORE_URL`, `NEXT_PUBLIC_VELA_OPEN_APP_URL`.
2. `npm install && npm run dev` → open `http://localhost:3000/pay?utm_source=smoke&ref=local`.
3. **Continue to secure checkout** href is exactly the env WPL (no `utm_` / `ref` on that URL).
4. QR and **WhatsApp** encode the on-site `/pay?...` URL (not the RC URL).
5. `/pay/success` — **Open Véla** uses `NEXT_PUBLIC_VELA_OPEN_APP_URL` (default `vela://open`).
6. `npm test`.

**Not run in this agent:** real Stripe charge, in-app entitlement proof, or production deploy.

## RevenueCat dashboard — human steps

1. **Web Purchase Link** — Create/confirm sandbox WPL; copy URL into `NEXT_PUBLIC_RC_WEB_PURCHASE_URL`.
2. **Success redirect** — In the RC dashboard, set the WPL success / return URL to `https://<your-site>/pay/success` (not wired in app code when the WPL URL is env-only).
3. **Stripe** — Connected under RC for the web product.

## Confirm out of scope

- No changes to Profile Redeem, `claimWebPurchase`, C12 webhooks, or C5 admin writers.
- No P6b reward grant.
- No deploy in this PR.
- PayPath stops at sign-in boundary; post-sign-in onboarding is out of scope.

## SIGN_PAGE alignment (website half)

| SIGN_PAGE expectation | C11 status |
|----------------------|------------|
| Land on website and pay with Stripe | `/pay` → RC WPL CTA |
| No app → download link | `/pay/success` store CTAs when env URLs set |
| Has app → open app | **Open Véla** deep link |
| Referral QR/messenger → payment page | QR + WhatsApp encode `/pay` |
| No paste as happy path | Redeem mentioned as rare backup only |

This PR does not prove “Core already on” after sign-in — that remains app / PayPath follow-on.
