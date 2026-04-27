import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export type SurveyResponse = {
  id?: string;
  created_at?: string;
  energy: number;
  route_type: string;
  timezone_crossings: string;
  fatigue_challenge: string;
  recovery_time: string;
  coping_strategies: string[];
  circadian_awareness: string;
  app_utility: number;
  willingness_to_pay: string;
  email: string;
  name: string;
  airline?: string | null;
  ip_hash?: string;
};
