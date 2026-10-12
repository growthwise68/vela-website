# C11 — Website checkout (sandbox) — REPORT

**Node:** C11 website pay landing only. **Not touched:** C12/C5 Redeem, Rachel C13, P6b rewards, live WPL, production money.

**Signed intent:** `SIGN_PAGE.md` — pay on web → open Véla (or email) → sign in → Core on; referral QR/messenger → same payment page.

## What shipped (this PR)

| Item | Location |
|------|----------|
| Pay landing + RC/Stripe CTA | `/pay` |
| Success: Open Véla + store download CTAs | `/pay/success` |
| Referral QR + messenger/share (pay URL only) | `/pay` (`ReferralSharePanel`) |
| First-touch UTM/`ref` on pay URL (sessionStorage) | `src/lib/pay/attribution.ts` |
| Attribution forwarded to RC WPL query string | `src/lib/pay/checkout-url.ts` |
| Unit tests | `npm test` |

**Pay URL shape (referral / QR / messenger):**

```text
https://<site>/pay?utm_source=<source>&utm_medium=<medium>&ref=<referral_id>
```

Allowed keys: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `ref`, `referral`. First visit wins for the session; same keys are appended to the RevenueCat Web Purchase Link checkout URL.

## Sandbox smoke (local)

1. `cp .env.example .env.local` and set at minimum:
   - `NEXT_PUBLIC_RC_WEB_PURCHASE_URL` — sandbox Web Purchase Link from RevenueCat (default placeholder uses `rc-bed9aa89d1` path; replace with your project link).
   - Optional: `NEXT_PUBLIC_IOS_APP_STORE_URL`, `NEXT_PUBLIC_ANDROID_PLAY_STORE_URL`, `NEXT_PUBLIC_VELA_OPEN_APP_URL`.
2. `npm install && npm run dev` → open `http://localhost:3000/pay?utm_source=smoke&ref=local`.
3. Confirm **Continue to secure checkout** points at `pay.rev.cat` (sandbox) and URL includes `utm_source` / `ref`.
4. Confirm QR and **Share link** encode the **on-site** `/pay?...` URL (not the RC URL).
5. Open `/pay/success` — **Open Véla** uses `NEXT_PUBLIC_VELA_OPEN_APP_URL` (default `vela://open`).
6. `npm test` — attribution + checkout URL + success markup.

**Not run in this agent:** real Stripe sandbox charge, RC redemption in app, or email recovery link.

## RevenueCat dashboard — still needed (human)

1. **Web Purchase Link (sandbox only)** — Create/confirm sandbox WPL for Core web product; copy URL into `NEXT_PUBLIC_RC_WEB_PURCHASE_URL`. Keep **Enable only for Sandbox** on.
2. **Success redirect** — Set WPL success / return URL to `https://<preview-or-staging>/pay/success` (not production until Helen live gate).
3. **Redemption Links** — Enable sandbox redemption / open-in-app flow per PayPath W1; align app universal link with `NEXT_PUBLIC_VELA_OPEN_APP_URL`.
4. **Stripe (test mode)** — Connected under RC; verify test card completes and entitlement appears in RC customer view.
5. **Do not** enable production WPL or live money from this slice.

## Confirm out of scope

- No changes to Profile Redeem, `claimWebPurchase`, C12 webhooks, or C5 admin writers.
- No P6b reward grant.
- No deploy / live funnel lift in this PR.

## SIGN_PAGE alignment (website half)

| SIGN_PAGE expectation | C11 status |
|----------------------|------------|
| Land on website and pay with Stripe | `/pay` → RC WPL CTA |
| No app → download link | Success page store CTAs (env URLs) |
| Has app → open app | **Open Véla** deep link |
| Referral QR/messenger → payment page | QR + share encode `/pay` with tags |
| No paste as happy path | Copy only mentions Redeem as backup |

App-side redemption and “Core already on” proof remain follow-on (W3/W6); this PR is the website half only.
