# U11 data-use addendum: first-signup-source record (r3, APPROVED by Iain 20:17)
Status: APPROVED (Iain 20:17, via Helen). Being folded into website #19. Source: Helen 19:51; the record is Mo's L24 spec.

## A. Internal data-use addendum (U11)
**What we record:** one "first signup source" record per account, written once at first signup and never overwritten:
- the campaign tags present on the link the person arrived by: utm_source, utm_medium, utm_campaign, and the referral code (`ref`, carried to checkout as utm_content);
- the time of first signup;
- a join key linking the record to the account (the Firebase user id after sign-in).

**What we do not record:** IP address, browser or device user-agent, email address, or any other contact detail. Nothing is sent to advertising networks.

**Purpose:** measuring which channels and referrals bring signups, and (later) crediting referrals. It is not used for advertising profiling or sold.
**Legal basis:** legitimate interest in understanding how people find VÉLA (minimal data). Confirmed by Iain 20:11.
**Access:** VÉLA staff and our own analytics only.
**Retention:** 24 months from first signup (Iain 20:09). Deleted with the account through the existing delete-account flow.

**Waitlist (/early-access):** the same allowed tags (utm_source, utm_medium, utm_campaign, ref) are saved on the person's waitlist_signups row, which also holds the email they gave to join the waitlist. First touch only; untagged visits save empty values. Same purpose and legal basis (legitimate interest). The tags are kept for at most 24 months, and are removed sooner if the waitlist entry is deleted (Iain 20:17). No IP or user-agent is stored.

## B. Privacy policy line (for `src/app/privacy/page.tsx`)
> **How you found us.** When you first sign up, we keep a note of how you reached VÉLA: the campaign tags on the link you used (such as its source, medium and campaign name) and any referral code, along with the date you signed up. We link this to your account so we can see which channels and referrals work. We do not store your IP address, device details or email address as part of this record. We keep it for 24 months, and we delete it if you delete your account.
>
> If you join our early-access waitlist, we store the same campaign tags and referral code alongside the email address you give us, so we know how you heard about VÉLA. We keep them for up to 24 months, and delete them sooner if your waitlist entry is removed.

## Open for Iain
1. ~~Retention period~~ DECIDED: 24 months (Iain 20:09).
2. ~~Legal basis~~ DECIDED: legitimate interest (Iain 20:11).
3. ~~Waitlist tag retention~~ DECIDED: capped at 24 months (Iain 20:17).
