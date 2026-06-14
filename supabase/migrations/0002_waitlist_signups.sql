-- Early-access waitlist signups (separate from survey_responses).
-- Source values: 'early_access_page' (homepage CTA → /early-access)
-- More sources can be added as new CTAs are built.

create table if not exists waitlist_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  name        text not null,
  airline     text,
  source      text not null default 'early_access_page'
);

-- Allow the anon key to insert (public form) but not read or update.
alter table waitlist_signups enable row level security;

create policy "public insert"
  on waitlist_signups
  for insert
  to anon
  with check (true);
