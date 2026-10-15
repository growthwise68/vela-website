# review_plan_high_r1.md

**Verdict: REVISE**

| Field | Value |
|---|---|
| Repo | growthwise68/vela-website, draft PR #18 |
| Tip reviewed | `0c441dc32654c74193fe08e5fa28e61f86906907` |
| Plan | `ops/workflows/l22-consent/PLAN.md` (NLSPEC v1, 2026-10-15) |
| Signed intent | Iain, email consent v2, website waitlist slice |
| This review | Plan only. No application edits, no commit, no push, no labels, no deploy. |

INTENT_DRIFT: FAIL
IRRELEVANT_CONTENT: FAIL
PRINCIPLES: FAIL

## PRINCIPLES

Any miss is a fail. Four misses, so the verdict is REVISE.

| Principle | Result | Evidence |
|---|---|---|
| Report faults and never stop the flow | PASS | Flow B saves the row first. A missing key, a missing group, a non-OK MailerLite response, a thrown `fetch`, and a failed fail-open POST all still return 200. An unticked box writes no fault row. |
| Fix the root cause, never patch | FAIL | The live form's unconditional add is gated, and the dead `/api/early-access` route is deleted. The same handler still adds to `MAILERLITE_GROUP_ID` with no tick when `responseId` is set (Flow A, `src/app/api/subscribe/route.ts` lines 151–154). The new test makes that remaining add required. |
| Prune, don't add | FAIL | Deleting `src/app/api/early-access/route.ts` is the right prune. Flow A has no caller anywhere in `src/`, and the plan adds a test that its MailerLite call must keep firing. |
| Simple at heart | FAIL | One checkbox and one group on Flow B, then a second MailerLite rule on Flow A for a branch no page sends. |
| No drift and no ratchet | FAIL | The Flow A test locks an unticked add into the spec. The column comment says NULL means the row predates the box, while `/api/survey/waitlist` will keep inserting NULL after the columns exist. The intent block quotes the in-app box as the signed text. |

## Checks

| Check | Result |
|---|---|
| Wording is exact | PASS. The label constant is `Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month.` The helper is `Unsubscribe any time. Privacy Policy`, with `Privacy Policy` linking to `/privacy`. "See our" is excluded. The box starts from `useState(false)`, uses `checked`, and has no `defaultChecked` and no `required`. It is not a terms control, and the plan does not add a terms checkbox. |
| Consent evidence (time and text) | PASS on the Flow B prose. A new insert stores `email_consent` (`true` only for JSON boolean `true`), `email_consent_at` from server time, and `email_consent_wording` from the label constant. The client cannot supply the sentence. The consented-path test does not assert those three fields. |
| MailerLite only on consent | FAIL. Flow B calls `addToMailerLite` only when the stored boolean is `true`, and a blank group skips the POST. Flow A still calls it with `MAILERLITE_GROUP_ID` and no tick. `.env.example` names that variable the main waitlist group. |
| Failure is non-blocking and reported with full diagnostics | FAIL on diagnostics. Non-blocking behavior is specified and matches the four cases `not_configured`, `missing_group`, `http_error` plus `http_status`, and `exception`. Omitting the MailerLite body is required, because that body echoes the email. A thrown `fetch` stores only `exception`. The error name and message are the diagnosis, and they are not the email. |
| Cross-project fault reporting, no client secrets | PASS. Live `public.fail_open_reports` on `zajrtrwhqjsyfyskyftp` has the columns the body sets. The only constraint is the primary key on `report_id`. `account_id` is nullable text. Policy `fail_open_reports_insert_anon` is insert for `anon` with `WITH CHECK (true)`, and `anon` has `INSERT`. `result = invalid` and `work_state = continued` already occur on `check_id = pay_success_redeem_url` (4 rows). The POST is server-side, reuses `NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY`, and does not send `MAILERLITE_API_KEY` to the browser. The row excludes email, name, airline, the MailerLite body, and the API key. |
| No backfill | PASS. Live `public.waitlist_signups` on `oetczltunjmysntwoufr` has 666 rows, earliest `2026-06-18 11:17:57+00`, latest `2026-09-13 15:28:29+00`, columns `id`, `created_at`, `email`, `name`, `airline`, `source`. The migration list is empty. The SQL adds three nullable columns with no `DEFAULT` and no `UPDATE`. Unique constraint `waitlist_signups_email_key` still returns 409 with no rewrite of the old row and no MailerLite call. |
| No duplicate paths | FAIL. Nothing in `src/` fetches `/api/early-access`, and deleting that route removes the second writer and the `MAILERLITE_EARLY_ACCESS_GROUP_ID` call. Flow A is the duplicate that remains: same route, same group, no tick. No page sends `responseId`. The survey thank-you posts to `/api/survey/waitlist` (line 40) and that route does not call MailerLite. |

## Exact changes

The revision is these five edits to `PLAN.md`. The early-access checkbox, the existing group, the nullable columns, the server-side fail-open POST, and the deletion of `src/app/api/early-access/route.ts` stay.

1. Replace the Intent (verbatim) block with the signed website text: the waitlist box reads "Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month." with "Unsubscribe any time. Privacy Policy". It is never pre-ticked and kept separate from the terms. Each choice is saved with a timestamp and the exact wording shown. Only people who tick it are added to MailerLite; waitlist sign-ups go to the existing group. A failed add is reported and never blocks sign-up. There is no backfill of the existing 666. Keep the north star sentence as it stands. Keep one line that the in-app box is out of scope, and keep the line that a waitlist signup has no app account id and this plan must not invent one. Remove the in-app checkbox sentence, the "App users" group, and any subscriber account-id field from the intent.

2. Flow A still updates `survey_responses` when a real `responseId` is posted, still returns 200, and does not call MailerLite. It does not read `emailConsent`, and it does not gain a consent column or a fail-open report. Replace the route-test row "Flow A still calls MailerLite" with: survey update succeeds, status 200, no `waitlist_signups` write, no request to `connect.mailerlite.com`. The route comment that both flows add the subscriber to MailerLite is updated to match. `/api/survey/waitlist` and `/api/subscribe-briefs` stay unchanged.

3. For `reason: exception`, `observed` includes the error name and the error message. If that message contains an email-shaped substring, store the reason and omit the message. For `http_error`, `observed` stays `reason` plus `http_status`, with the MailerLite response body left out. The fail-open POST remains one server-side attempt; a failed report still returns 200.

4. The three column comments say NULL means no choice was recorded. That covers the existing 666 and any later insert that does not ask, including `/api/survey/waitlist`. The header can keep the sentence that the 666 stay NULL, neither a yes nor a recorded no. This plan does not add the early-access box to the survey form.

5. The Flow B test for `emailConsent: true` and MailerLite 200 asserts the insert payload: `email_consent: true`, `email_consent_wording` equal to the label constant, and a non-empty `email_consent_at`. The blank-group case sets `MAILERLITE_GROUP_ID` to spaces, expects `missing_group`, and expects no MailerLite POST. Flow B treats a group id whose trim is empty as blank.

## What was checked

Live website project `oetczltunjmysntwoufr`, read only, 2026-10-15:

- `waitlist_signups`: 666 rows (641 `early_access_page`, 25 `survey_waitlist`, 0 other). Columns and timestamps match the plan. No triggers. Policies: only `public insert` for `anon`, `WITH CHECK (true)`. RLS is on, so the table-level grants do not give `anon` a select or update path. Unique constraint name `waitlist_signups_email_key` matches the plan. `list_migrations` returned an empty list.

Live app project `zajrtrwhqjsyfyskyftp`, read only:

- `fail_open_reports` columns include every field the plan sends, plus nullable `operation_id`, `item_id`, `item_kind`, `stage`, `expected`, `observed`, and `details`. Primary key on `report_id` is the only constraint. Insert policies for `anon` and `authenticated` use `WITH CHECK (true)`. `anon` has `INSERT` and no `SELECT`. Existing `pay_success_redeem_url` rows use `result = invalid`, `work_state = continued`, a null `account_id`, and `observed` keys `reason`, `page_url`, `redeem_url_truncated`.

Code at this tip:

- `EarlyAccessClient.tsx` posts name, email, and airline to `/api/subscribe` (lines 31–38). There is no checkbox. "Unsubscribe anytime." is on line 146.
- Flow B (`route.ts` lines 159–186) inserts `source: "early_access_page"` and then always calls MailerLite. `addToMailerLite` (lines 32–73) logs a non-OK response and does not throw. A thrown `fetch` is caught at lines 184–186 and signup still returns 200.
- `src/app/api/early-access/route.ts` inserts into `waitlist_signups` and can call MailerLite with `MAILERLITE_EARLY_ACCESS_GROUP_ID` (lines 24–26). No page fetches it. `next.config.ts` does not redirect it.
- `PaySuccessActions.tsx` lines 11–12 and 109–129 match the URL, the four headers, and the anon-key env var the plan reuses.
- `package.json` `test` script lists files explicitly and already uses `node --experimental-test-module-mocks --import tsx --test`.

These stay out of the revision. Recovery Briefs uses `MAILERLITE_BRIEFS_GROUP_ID` and is a different list. The survey thank-you writer does not call MailerLite; its future NULL consent columns are covered by change 4. The footer line "Unsubscribe anytime." stays, as the plan says. The hero and "a few emails while you wait" copy stay. A person already in the 666 who submits again still gets 409, with no update and no MailerLite call. The stored consent sentence stays the checkbox label.
