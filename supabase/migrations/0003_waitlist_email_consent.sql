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
