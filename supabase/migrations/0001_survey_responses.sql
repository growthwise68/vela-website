-- Vela website: survey + waitlist storage
-- Run in the Supabase SQL editor for the project NEXT_PUBLIC_SUPABASE_URL points to.
--
-- Backs two endpoints:
--   POST /api/survey           -> INSERT a response (anonymous; email/name null)
--   POST /api/survey/waitlist  -> UPDATE that row with email/name/airline
--
-- Columns mirror src/app/api/survey/route.ts and .../waitlist/route.ts exactly.

create table if not exists public.survey_responses (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  energy              int,
  route_type          text,
  timezone_crossings  text,
  recovery_time       text,
  coping_strategies   jsonb default '[]'::jsonb,
  app_utility         int,
  willingness_to_pay  text,
  email               text,
  name                text,
  airline             text,
  ip_hash             text,
  answers             jsonb default '{}'::jsonb
);

-- Speeds up the waitlist duplicate-email check.
create index if not exists survey_responses_email_idx
  on public.survey_responses (email);

-- RLS: the website talks to Supabase with the anonymous/publishable key,
-- so anon needs explicit insert + select + update grants. Without these,
-- inserts are silently rejected even though the table exists.
alter table public.survey_responses enable row level security;

-- Allow anonymous survey submissions.
create policy "anon can insert survey responses"
  on public.survey_responses
  for insert
  to anon
  with check (true);

-- Allow the waitlist endpoint to look up the just-created row by id
-- and run its duplicate-email check.
create policy "anon can read survey responses"
  on public.survey_responses
  for select
  to anon
  using (true);

-- Allow the waitlist endpoint to attach contact details, but only to a row
-- that has not yet been claimed (email is still null).
create policy "anon can attach contact to unclaimed rows"
  on public.survey_responses
  for update
  to anon
  using (email is null)
  with check (true);
