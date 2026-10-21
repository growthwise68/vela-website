-- L24 waitlist first-touch attribution (capture only; no backfill).
-- Apply once on the website Supabase project after operator deploy GO.

alter table public.waitlist_signups
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists ref text;

comment on column public.waitlist_signups.utm_source is
  'First-touch marketing source from the early-access URL; NULL if untagged.';
comment on column public.waitlist_signups.utm_medium is
  'First-touch marketing medium from the early-access URL; NULL if untagged.';
comment on column public.waitlist_signups.utm_campaign is
  'First-touch marketing campaign from the early-access URL; NULL if untagged.';
comment on column public.waitlist_signups.ref is
  'First-touch referral id from the early-access URL ref param; NULL if untagged.';
