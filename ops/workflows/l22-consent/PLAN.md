---
launch_node: L22
slug: l22_website_waitlist_consent
plan_kind: NLSPEC
plan_version: v1
date: 2026-10-15
author: Cursor Cloud Agent
signed: 2026-10-15 16:12 SAST
signed_source: email_consent_v2.md
repo: growthwise68/vela-website
status: plan-only
scope: website waitlist only
map_note: Launch-map node L22 is being added by Roz. This plan does not edit the launch map.
---

# NLSPEC PLAN — L22 website waitlist email consent

Plan only. No application code, no migration applied, no workflow, no Vercel deploy.

## Intent (verbatim)

On the website waitlist, the unticked box reads: "Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month.", with "Unsubscribe any time. Privacy Policy" under it. The box is never pre-ticked and sits separately from the terms. Each person's choice is saved with a timestamp and the exact wording they saw. Only people who tick it are added to the right MailerLite group: waitlist sign-ups go to the existing group. A failed MailerLite add is reported and never blocks sign-up. There's no backfill of the existing 666 contacts.

## North star (verbatim)

every new user who consents reaches the correct MailerLite list, linked to their account, and nobody is emailed without consent.

## Website slice this plan implements

- Unticked box, exact label: `Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month.`
- Helper under that box: `Unsubscribe any time. Privacy Policy`, with `Privacy Policy` linking to the existing privacy page.
- Never pre-ticked. Separate from the terms. This form has no terms checkbox today; do not add one.
- Save the choice, a server timestamp, and that exact label on the new signup row.
- Add the person to the existing MailerLite group only when the box is ticked.
- A failed MailerLite add is reported and the signup still succeeds.
- Do not backfill the existing 666 contacts.

The in-app box is out of scope. A waitlist signup has no app account id and this plan must not invent one.

## Where the 666 rows are

Read on 2026-10-15, no rows changed:

| Project | Name | What is there |
|---------|------|----------------|
| `oetczltunjmysntwoufr` | vela-website | `public.waitlist_signups`. `count(*)` = **666**. Earliest `created_at` `2026-06-18 11:17:57+00`. Latest `2026-09-13 15:28:29+00`. Columns today: `id`, `created_at`, `email`, `name`, `airline`, `source`. |
| `zajrtrwhqjsyfyskyftp` | Véla (app) | `public.fail_open_reports`. No `waitlist_signups` table. |

The migration below is applied to **`oetczltunjmysntwoufr` only**. Applying it to the app project would not touch the 666 contacts, because that table is not there.

`supabase/migrations/` in this repo is the website schema (`0001_survey_responses.sql`, `0002_waitlist_signups.sql`). The website project's migration history list is empty; those two files were applied outside that history. The new file follows the repo numbering. Apply its SQL once, on the website project. Do not apply it twice.

## Current code (read before writing this plan)

The early-access page is the website waitlist. `src/app/early-access/EarlyAccessClient.tsx` posts name, email, and airline to `/api/subscribe` (lines 31–38). There is no checkbox. Under the button the form already says `Unsubscribe anytime.` (line 146). Leave that line as it is. The new helper is a second line, under the new box, with the signed wording (`any time`, two words) and the privacy link.

`src/app/api/subscribe/route.ts` Flow B (no `responseId`, lines 159–186) inserts into `waitlist_signups` with `source: "early_access_page"`, then **always** calls MailerLite with `MAILERLITE_GROUP_ID`. That is the behaviour this plan changes. `addToMailerLite` (lines 32–73) logs a non-OK HTTP response and does not throw, so a failed add is not reported anywhere except the server log, and the handler still returns 200. Network throws are caught at lines 184–186 and also do not block signup.

`src/app/api/early-access/route.ts` is a second waitlist writer. Nothing in `src/` fetches `/api/early-access`. The live form uses `/api/subscribe`. The dead route inserts into `waitlist_signups` and calls MailerLite with `MAILERLITE_EARLY_ACCESS_GROUP_ID` (lines 24–26), with no consent check. Delete the file. Do not replace it and do not redirect it.

Fail-open reporting already exists on the pay success page, not on this form. `src/components/pay/PaySuccessActions.tsx` posts one row to `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports` (lines 11–12 and 109–129) with the anon key `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY`, headers `apikey`, `Authorization: Bearer`, `Content-Type`, `Prefer: return=minimal`. The table's only constraint is the primary key on `report_id`. Policy `fail_open_reports_insert_anon` allows anon insert. Reuse that URL, those headers, and that key. Do not add a table, a route, or an env var. Do not point the report at the website Supabase project.

The privacy page is `src/app/privacy/page.tsx` (`/privacy`). Link there. Do not edit the policy text.

Flow A in `src/app/api/subscribe/route.ts` today updates `survey_responses` when a `responseId` is posted, then calls MailerLite. No current page sends `responseId`. This plan keeps the survey update and the 200, and removes the MailerLite call. The route header comment that both flows add the subscriber to MailerLite is updated to match.

Other writers, left unchanged:

- `src/app/survey/thank-you/ThankYouClient.tsx` posts to `/api/survey/waitlist` (line 40). `src/app/api/survey/waitlist/route.ts` inserts `source: "survey_waitlist"` and does not call MailerLite.
- `src/app/api/subscribe-briefs/route.ts` is the briefs list, a different group.

## Files to touch

| File | What |
|------|------|
| `src/app/early-access/consent-copy.ts` | **New.** The signed label and the helper strings, exported once. The form renders them. The API stores the same label constant. The client does not get to send a different sentence. |
| `src/app/early-access/EarlyAccessClient.tsx` | Unticked checkbox and helper. Post `emailConsent` as a boolean. No other copy changes. |
| `src/app/api/subscribe/route.ts` | Flow B: write the three columns; call MailerLite only when the boolean is `true`; report a failed add. Flow A still updates `survey_responses` and returns 200, and does not call MailerLite. Update the header comment that both flows add the subscriber to MailerLite so it matches. |
| `src/app/api/early-access/route.ts` | **Delete.** |
| `supabase/migrations/0003_waitlist_email_consent.sql` | **New.** Nullable columns. No `UPDATE`. No defaults. |
| `src/app/api/subscribe/subscribe-consent.test.ts` | **New.** Route behaviour below. |
| `src/app/early-access/early-access-consent.test.tsx` | **New.** Checkbox starts unticked; label and helper match the signed strings; privacy href is `/privacy`. |
| `package.json` | Add those two test files to the existing `test` script list. No dependency changes. |

Do not edit `.env.example`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/api/survey/waitlist/route.ts`, `src/app/api/subscribe-briefs/route.ts`, `src/components/pay/PaySuccessActions.tsx`, or the survey thank-you form.

## Copy constant

`src/app/early-access/consent-copy.ts` exports exactly:

```ts
export const WAITLIST_EMAIL_CONSENT_LABEL =
  "Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month.";

export const WAITLIST_EMAIL_CONSENT_HELPER_LEAD = "Unsubscribe any time. ";

export const WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT = "Privacy Policy";

export const WAITLIST_EMAIL_CONSENT_PRIVACY_HREF = "/privacy";
```

The helper the person sees is the lead plus the link text, which together are `Unsubscribe any time. Privacy Policy`. Do not add "See our". That phrase belongs to the app box, which is out of scope.

## Form

In `EarlyAccessClient.tsx`, inside the existing `<form>`, after the airline helper and before the error line:

- `const [emailConsent, setEmailConsent] = useState(false)`.
- `<input type="checkbox">` with `checked={emailConsent}`. No `defaultChecked`. No `required`. Disabled only while `status === "loading"`, same as the other fields.
- The visible label is `WAITLIST_EMAIL_CONSENT_LABEL`, associated with the checkbox (`htmlFor` / `id`).
- Under the label, the helper: `WAITLIST_EMAIL_CONSENT_HELPER_LEAD` then a `Link` to `WAITLIST_EMAIL_CONSENT_PRIVACY_HREF` whose text is `WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT`.
- The checkbox is not a terms control. Do not link it to `/terms`. Do not wrap it in a terms acceptance.

The JSON body gains one field: `emailConsent` (the boolean state). Name, email, and airline stay as they are.

Unticked is a valid submit. The button stays `Let me know`.

## Migration SQL

File: `supabase/migrations/0003_waitlist_email_consent.sql`.

Apply on project `oetczltunjmysntwoufr` only, after this plan is approved. Do not run it as part of the plan PR.

```sql
-- L22 website waitlist email consent.
-- Nullable columns, no defaults, no UPDATE.
-- The existing 666 rows stay NULL: not a yes, and not a recorded no.
-- Apply on Supabase project oetczltunjmysntwoufr (vela-website) only.
-- Do not apply on zajrtrwhqjsyfyskyftp.

alter table public.waitlist_signups
  add column email_consent boolean,
  add column email_consent_at timestamptz,
  add column email_consent_wording text;

comment on column public.waitlist_signups.email_consent is
  'Early-access checkbox. NULL means no choice was recorded.';
comment on column public.waitlist_signups.email_consent_at is
  'Server time the choice was recorded. NULL means no choice was recorded.';
comment on column public.waitlist_signups.email_consent_wording is
  'Exact checkbox sentence shown. NULL means no choice was recorded.';
```

NULL means no choice was recorded. That covers the existing 666 and any later insert that does not ask, including `/api/survey/waitlist`. This plan does not add the early-access box to the survey form.

No `DEFAULT`. A volatile default such as `now()` would rewrite the existing 666 rows. That is a backfill.

No policy change. Policy `public insert` on `waitlist_signups` is insert-for-anon with `WITH CHECK (true)`, so the new columns are already allowed on insert. Anon still cannot select or update. Do not add an update policy. A duplicate email still hits unique constraint `waitlist_signups_email_key` and Flow B still returns 409 `This email is already on our list`, with no write to the old row and no MailerLite call.

## Data flow

1. The person opens `/early-access`. The box is unchecked.
2. They submit. The browser posts the existing fields plus `emailConsent: true` or `emailConsent: false`.
3. Flow B validates email and name as it does today.
4. The insert adds three fields, and only on this new insert:
   - `email_consent`: `true` only when the JSON value is the boolean `true`. Any other value (`false`, missing, `"true"`, `1`) is stored as `false`. A bad payload must not opt anyone in.
   - `email_consent_at`: server time at insert (`new Date().toISOString()`), not a time sent by the browser.
   - `email_consent_wording`: `WAITLIST_EMAIL_CONSENT_LABEL`. Ignore any wording in the request body.
5. If the insert returns unique violation `23505`, respond 409 as today. Stop. No MailerLite call.
6. If the insert returns any other error, respond 500 as today. Stop. No MailerLite call.
7. If `email_consent` was stored `false`, do not call MailerLite. Return `{ success: true }` with status 200.
8. If `email_consent` was stored `true`, call the existing `addToMailerLite` helper with `process.env.MAILERLITE_GROUP_ID`. Then return 200 whether that call worked or not.
9. The page's success line and the redirect home stay as they are.

`addToMailerLite` keeps using `https://connect.mailerlite.com/api/subscribers`, the same payload (`email`, `fields.name`, `fields.company` for airline, `status: "active"`, `groups` when a group id is present). Flow B treats a group id whose trim is empty as blank, including a whitespace-only value. Flow B must not call MailerLite when the group id is missing or blank after trim: a subscriber POST with no group would put them on the account outside the existing group. Treat that as a failed add (below) and skip the POST.

Flow A still updates `survey_responses` when a real `responseId` is posted, still returns 200, and does not call MailerLite. It does not read `emailConsent`, and it does not gain a consent column or a fail-open report.

## Failure handling

Signup is already saved before MailerLite runs. MailerLite cannot undo it and cannot change the HTTP status.

Report one row when the box was ticked and the add did not happen:

| Situation | MailerLite POST | `observed.reason` |
|-----------|-----------------|-------------------|
| `MAILERLITE_API_KEY` missing or blank | do not call | `not_configured` |
| `MAILERLITE_GROUP_ID` missing or blank after trim, including whitespace only | do not call | `missing_group` |
| HTTP response not OK | called | `http_error`, plus `http_status` |
| `fetch` throws | called | `exception`, plus the error name and message |

Change `addToMailerLite` so it returns that outcome instead of only logging it. Flow B uses the return value. Flow A does not call it.

The report is one server-side POST, after the insert, before the 200 response:

- URL: `https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports`
- Headers: same four as `sendPaySuccessRedeemUrlFault` in `PaySuccessActions.tsx`.
- Key: `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY`. If that key is empty, do not POST. `console.error` once and still return 200. Do not add a new key and do not use the website anon key (wrong project).
- Body: `report_id` and `install_id` each `crypto.randomUUID()`; `check_id` `early_access_mailerlite_add`; `occurred_at` UTC ISO; `result` `invalid`; `work_state` `continued`; `account_id` null. For `http_error`, `observed` is `reason` plus `http_status`, and the MailerLite response body is left out. For `exception`, `observed` includes the error name and the error message. If that message contains an email-shaped substring, store the reason and omit the message.
- Do not put email, name, airline, the MailerLite response body, or the API key in the row. The waitlist row already holds who consented. The MailerLite error body echoes the email address.
- If the fail-open POST itself throws or returns non-OK, swallow it and still return 200. One attempt. No retry loop.

An unticked box writes no fail-open row. Nothing failed.

A ticked box whose MailerLite call succeeds writes no fail-open row.

## Tests

Runner stays `node --experimental-test-module-mocks --import tsx --test`, with the two new files added to the `package.json` `test` script. Follow the mock style in `src/components/pay/pay-ui.test.tsx` (`node:test`, `mock.module`). No live Supabase, no live MailerLite, no live fail-open POST.

Form (`early-access-consent.test.tsx`):

- First render: the checkbox exists, is not checked, and is not required.
- Its label text equals `WAITLIST_EMAIL_CONSENT_LABEL`.
- The helper text is `Unsubscribe any time. Privacy Policy`.
- The only new link is `Privacy Policy` to `/privacy`.
- No control is labelled as terms, and nothing in this form points the consent box at `/terms`.

Route (`subscribe-consent.test.ts`), with `fetch` and the Supabase client mocked:

| Case | Expect |
|------|--------|
| Flow B, `emailConsent: false` | Insert payload has `email_consent: false`, `email_consent_wording` equal to the label constant, and a non-empty `email_consent_at`. No request to `connect.mailerlite.com`. No request to `fail_open_reports`. Status 200. |
| Flow B, `emailConsent: true`, MailerLite 200 | Insert payload has `email_consent: true`, `email_consent_wording` equal to the label constant, and a non-empty `email_consent_at`. One MailerLite POST whose `groups` array is exactly `[MAILERLITE_GROUP_ID]`. No fail-open POST. Status 200. |
| Flow B, `emailConsent: true`, MailerLite 500 | Status 200. One fail-open POST. `check_id` `early_access_mailerlite_add`, `result` `invalid`, `work_state` `continued`. `observed` is `reason` `http_error` plus `http_status`. `observed` has no email and no MailerLite response body. |
| Flow B, `emailConsent: true`, MailerLite `fetch` rejects | Status 200. One fail-open POST with `reason` `exception`, plus the error name and the error message. If that message contains an email-shaped substring, the message is omitted. |
| Flow B, `emailConsent: true`, API key unset | Status 200. No MailerLite POST. One fail-open POST with `reason` `not_configured`. |
| Flow B, `emailConsent: true`, `MAILERLITE_GROUP_ID` set to spaces | Status 200. No MailerLite POST. One fail-open POST with `reason` `missing_group`. |
| Flow B, `emailConsent` missing or the string `"true"` | Stored `email_consent` is `false`. No MailerLite POST. Status 200. |
| Flow B, duplicate insert code `23505` | Status 409. No MailerLite POST. |
| Flow A, `responseId` set, survey update succeeds | Status 200. No `waitlist_signups` write. No request to `connect.mailerlite.com`. |

The migration file is asserted, in the route test or a one-file read, to contain no `UPDATE` and no `DEFAULT`.

## Rollback

Code: revert the implementation commit. That restores `/api/early-access` and the old "always add to MailerLite" Flow B.

Database, on `oetczltunjmysntwoufr` only, and only if the columns must come off:

```sql
alter table public.waitlist_signups
  drop column if exists email_consent,
  drop column if exists email_consent_at,
  drop column if exists email_consent_wording;
```

Dropping the columns does not delete the 666 people. It deletes only the choice, time, and wording recorded after the column existed.

People already added to MailerLite are not removed by this rollback. Unsubscribing them is a manual MailerLite action, not a code change in this plan. Do not build an unsubscribe tool here.

## Out of scope

- The in-app signup box, the "App users" group, and storing an account id on a MailerLite subscriber.
- Backfill or a one-off push of the existing 666 rows.
- An update path for someone who is already on the list and later wants to tick the box. Anon has no update policy. The duplicate response stays 409.
- Survey thank-you (`/api/survey/waitlist`). It is not the early-access form, it does not call MailerLite, and this plan does not add the early-access box to it.
- Recovery Briefs (`/api/subscribe-briefs`, `MAILERLITE_BRIEFS_GROUP_ID`).
- Editing the privacy policy or the terms page. The new helper only links to `/privacy`.
- A new env var, a new Supabase table, a new API route, or a new MailerLite group.
- Launch-map HTML. Roz is adding the L22 node.
- Applying the migration, triggering a workflow, or deploying.

## PRINCIPLES self-check

| Principle | How this plan honours it |
|-----------|---------------------------|
| **Fix the root cause, never patch** | The live form's route adds every signup to MailerLite, and the helper swallows a failed HTTP response so it is never reported. Flow B gains a real boolean and reports the failed add. The stored sentence is the same constant the form renders, not a string the browser can rewrite. The dead `/api/early-access` route is a second writer into a different group with no box; deleting it removes that bypass rather than wrapping it. |
| **Prune, don't add** | Delete `src/app/api/early-access/route.ts`. No new API route, no new MailerLite group, no new env var, no new fail-open table. Three nullable columns on the table that already holds the signup. The copy file is the one shared sentence, so the form and the row cannot drift. |
| **Simple at heart** | One checkbox, default `false`. One boolean on the existing POST. MailerLite runs only when that boolean is `true`, through the helper that already uses `MAILERLITE_GROUP_ID`. One fail-open POST, same URL and headers as the pay page. Existing 666 rows are left null. |
| **Report faults, never stop the app** | Insert happens first. MailerLite failure, a missing key, a missing group, and a failed fail-open POST all still return `{ success: true }` at status 200. The person stays on the waitlist. An unticked box does not produce a fault row. |
