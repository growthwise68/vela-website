/**
 * Thank-you page strings for `/survey/thank-you`.
 *
 * REVERT: set `THANK_YOU_COPY` to `THANK_YOU_COPY_V1` (see export at bottom).
 *
 * Active **v2** blends survey-v2 tone with v1’s explicit anonymisation / purpose / waitlist
 * separation; includes inline links to `/privacy` and `/terms`.
 */

export type ThankYouCopyBundle = {
  /** Which variant is active (for debugging / analytics if needed later) */
  id: "v1" | "v2";
  heading: string;
  leadParagraphs: string[];
  /** Inline Privacy + Terms links after lead paragraphs; `null` for v1 */
  legalLine: {
    before: string;
    privacyLinkText: string;
    middle: string;
    termsLinkText: string;
    after: string;
  } | null;
  /** Optional heading inside the waitlist card (v2) */
  waitlistTitle: string | null;
  /** Paragraph(s) above the form */
  waitlistLead: string;
  labels: {
    firstName: string;
    email: string;
    airlineOptional: string;
  };
  placeholders: {
    firstName: string;
    email: string;
    airline: string;
  };
  airlineHelper: string;
  submitButton: string;
  submitLoading: string;
  formFooter: string;
  successLine: string;
  noRidMessage: string;
  linkSkip: string;
  linkBack: string;
};

export const THANK_YOU_COPY_V1: ThankYouCopyBundle = {
  id: "v1",
  heading: "Thank you.",
  leadParagraphs: [
    "Your answers are anonymised and are ONLY used to make VÉLA better for cabin crew.",
  ],
  legalLine: null,
  waitlistTitle: null,
  waitlistLead:
    "What you shared in the survey is anonymised and not associated with your details. If you would like to be advised when VÉLA is due to be launched, then add your details below to be added to the waitlist. Otherwise you can skip this step — your responses have been saved.",
  labels: {
    firstName: "First name",
    email: "Email",
    airlineOptional: "Airline",
  },
  placeholders: {
    firstName: "Your first name",
    email: "you@example.com",
    airline: "e.g. Emirates, United, Qantas",
  },
  airlineHelper:
    "If you tell us, we can let you know when VÉLA is upgraded with features relevant to your airline.",
  submitButton: "Join the waitlist",
  submitLoading: "Saving…",
  formFooter: "Unsubscribe anytime.",
  successLine: "You are on the waitlist",
  noRidMessage:
    "If you completed the survey, thank you. To join the waitlist later, use the Support page.",
  linkSkip: "Skip — back to VÉLA",
  linkBack: "Back to VÉLA",
};

export const THANK_YOU_COPY_V2: ThankYouCopyBundle = {
  id: "v2",
  heading: "Done. And genuinely appreciated.",
  leadParagraphs: [
    "Thank you from 38,000 feet. What you\u2019ve just shared is exactly why VÉLA needs to exist.",
    "All anonymous. Nothing you\u2019ve written can be traced back to you. We use your answers only to improve VÉLA for cabin crew.",
  ],
  legalLine: {
    before:
      "The full legal treatment of your data — retention, rights, how to contact us — is on our ",
    privacyLinkText: "Privacy page",
    middle: " and ",
    termsLinkText: "Terms page",
    after: ".",
  },
  waitlistTitle: "Be the first to know.",
  waitlistLead:
    "Add your details and we\u2019ll bring you along as this gets built. A few emails from the crew member behind VÉLA, and a front-row seat when it\u2019s ready.",
  labels: THANK_YOU_COPY_V1.labels,
  placeholders: THANK_YOU_COPY_V1.placeholders,
  airlineHelper: THANK_YOU_COPY_V1.airlineHelper,
  submitButton: "Let me know",
  submitLoading: "Saving…",
  formFooter: THANK_YOU_COPY_V1.formFooter,
  successLine: THANK_YOU_COPY_V1.successLine,
  noRidMessage: THANK_YOU_COPY_V1.noRidMessage,
  linkSkip: THANK_YOU_COPY_V1.linkSkip,
  linkBack: THANK_YOU_COPY_V1.linkBack,
};

/** Active copy — switch to `THANK_YOU_COPY_V1` to restore the pre–survey-v2 thank-you page. */
export const THANK_YOU_COPY: ThankYouCopyBundle = THANK_YOU_COPY_V2;
