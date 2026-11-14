-- Keep clean installs aligned with the existing production survey schema.
-- New submissions populate these nullable columns from answers JSON.
-- No existing responses are changed or backfilled.
alter table public.survey_responses
  add column if not exists job_taken_from_life text,
  add column if not exists one_thing_energy_help text;
