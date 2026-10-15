# review_plan_high_r2.md

**Verdict: REVISE**

| Field | Value |
|---|---|
| Repo | growthwise68/vela-website, draft PR #18 |
| Tip reviewed | `b11256c1e8831112089b24551b32bc751754a5c1` (`cursor/l22-consent-plan-cba1`) |
| Plan | `ops/workflows/l22-consent/PLAN.md` |
| Compared with | r1 tip `0c441dc32654c74193fe08e5fa28e61f86906907` |
| This review | Plan only. No application edits, no commit, no push, no labels, no deploy. |

INTENT_DRIFT: FAIL
IRRELEVANT_CONTENT: PASS
PRINCIPLES: FAIL

## r1 exact changes

| # | Result | Evidence at this tip |
|---|---|---|
| 1. Signed intent text | FAIL | The in-app checkbox sentence, the “App users” group, and the subscriber account id are gone from the intent. The north star is unchanged. These two lines are present word for word: “The in-app box is out of scope.” and “A waitlist signup has no app account id and this plan must not invent one.” The Intent (verbatim) body is still the old paragraph with the app half cut out. It is not the signed paragraph. It still says “the right MailerLite group” and “the exact wording they saw.” |
| 2. Flow A does not call MailerLite | PASS | Current-code section, the files table, and the data-flow paragraph say Flow A updates `survey_responses`, returns 200, does not call MailerLite, does not read `emailConsent`, and gains no consent column and no fail-open report. The header comment is to be updated to match. The route test expects status 200, no `waitlist_signups` write, and no request to `connect.mailerlite.com`. `/api/survey/waitlist` and `/api/subscribe-briefs` stay unedited. |
| 3. Exception diagnostics | PASS | The failure table, the report body, and the fetch-rejects test say `exception` plus the error name and message. An email-shaped substring in that message means store the reason and omit the message. `http_error` stays `reason` plus `http_status`, with the MailerLite body left out. One server-side attempt; a failed report still returns 200. |
| 4. NULL comments | PASS | All three column comments say “NULL means no choice was recorded.” The SQL header still says the 666 stay NULL, neither a yes nor a recorded no. The following sentence covers the 666 and any later insert that does not ask, including `/api/survey/waitlist`, and says this plan does not add the early-access box to the survey form. |
| 5. Consented insert and blank group | PASS | The MailerLite-200 test asserts `email_consent: true`, `email_consent_wording` equal to the label constant, and a non-empty `email_consent_at`. The group case sets `MAILERLITE_GROUP_ID` to spaces, expects `missing_group`, and expects no MailerLite POST. Flow B treats a group id whose trim is empty as blank, including whitespace only. |

`/api/early-access` stays deleted in the plan: delete `src/app/api/early-access/route.ts`, do not replace it, and do not redirect it. This tip is still plan-only, so `src/app/api/early-access/route.ts` is still in the tree. That matches the plan rule that this PR does not change application code.

## PRINCIPLES

Any miss is a fail. One miss.

| Principle | Result | Evidence |
|---|---|---|
| Report faults and never stop the flow | PASS | Insert first. Missing key, missing or whitespace group, HTTP error, thrown `fetch`, and a failed fail-open POST still return 200. An unticked box writes no fault row. |
| Fix the root cause, never patch | PASS | Flow B is gated on the stored boolean. Flow A’s MailerLite call is removed. The dead early-access route is still deleted rather than wrapped. |
| Prune, don't add | PASS | The diff adds no route, group, env var, column, or survey checkbox. The r1 review file is in the tree and is not part of the build. |
| Simple at heart | PASS | One checkbox, one existing group, MailerLite only when the stored boolean is `true`. |
| No drift and no ratchet | FAIL | The section titled Intent (verbatim) is still not the signed text. “the right MailerLite group” is the leftover lead-in from the removed app-group sentence. |

## Exact change

Replace only the body of `## Intent (verbatim)` with this paragraph:

the waitlist box reads "Send me early access and crew-tested tips for rest and recovery between duties. No spam, about twice a month." with "Unsubscribe any time. Privacy Policy". It is never pre-ticked and kept separate from the terms. Each choice is saved with a timestamp and the exact wording shown. Only people who tick it are added to MailerLite; waitlist sign-ups go to the existing group. A failed add is reported and never blocks sign-up. There is no backfill of the existing 666.

Leave the north star, the two scope lines, changes 2 through 5, the out-of-scope list, and the early-access deletion as they are.
