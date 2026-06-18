import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/subscribe
 *
 * Unified signup endpoint used by all email-capture forms on the site.
 *
 * Two flows depending on whether a `responseId` is provided:
 *
 *   With responseId (survey thank-you form):
 *     — Links email/name/airline to the matching row in `survey_responses`.
 *     — Guards against duplicate emails and double-submission.
 *
 *   Without responseId (early-access page and any future standalone forms):
 *     — Saves to the `waitlist_signups` table with source = "early_access_page".
 *     — Guards against duplicate emails.
 *
 * Both flows then add the subscriber to MailerLite if MAILERLITE_API_KEY is set.
 *
 * Env vars:
 *   NEXT_PUBLIC_SUPABASE_URL          — Supabase project URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY     — Supabase anon key
 *   MAILERLITE_API_KEY   — MailerLite API token (server-side only)
 *   MAILERLITE_GROUP_ID  — MailerLite group ID; used by both flows
 */

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function addToMailerLite(
  email: string,
  name: string,
  airline: string | null,
  groupId: string | undefined
) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    console.warn("[subscribe] MAILERLITE_API_KEY not set — skipping");
    return;
  }

  // Treat empty string (common when Vercel env var saved with no value) the same as undefined
  const gid = typeof groupId === "string" ? groupId.trim() : undefined;
  const groups = gid ? [gid] : [];

  console.log(`[subscribe] MailerLite request — email=${email} groupId=${gid ?? "(none)"}`);

  const fields: Record<string, string> = { name };
  if (airline) fields.company = airline;

  const payload: Record<string, unknown> = { email, fields, status: "active" };
  if (groups.length > 0) payload.groups = groups;

  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error(`[subscribe] MailerLite error ${res.status}:`, JSON.stringify(body));
  } else {
    console.log(`[subscribe] MailerLite ok — status=${res.status} groups=${JSON.stringify(groups)}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Service is not configured" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await req.json();

    const { responseId, email, name, airline } = body as {
      responseId?: string | null;
      email?: string;
      name?: string;
      airline?: string | null;
    };

    // --- Input validation ---
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const emailNorm = email.trim().toLowerCase();
    const nameNorm = name.trim();
    const airlineNorm =
      typeof airline === "string" && airline.trim().length > 0 ? airline.trim() : null;

    // ----------------------------------------------------------------
    // Flow A: survey-linked signup (responseId provided)
    // ----------------------------------------------------------------
    if (responseId && typeof responseId === "string") {
      const { data: row, error: fetchErr } = await supabase
        .from("survey_responses")
        .select("id, email")
        .eq("id", responseId)
        .maybeSingle();

      if (fetchErr || !row) {
        return NextResponse.json({ error: "Survey response not found" }, { status: 404 });
      }
      if (row.email) {
        return NextResponse.json(
          { error: "This survey already has contact details" },
          { status: 409 }
        );
      }

      const { data: dup } = await supabase
        .from("survey_responses")
        .select("id")
        .eq("email", emailNorm)
        .maybeSingle();

      if (dup) {
        return NextResponse.json(
          { error: "This email is already on our list" },
          { status: 409 }
        );
      }

      const { error: updateErr } = await supabase
        .from("survey_responses")
        .update({ email: emailNorm, name: nameNorm, airline: airlineNorm })
        .eq("id", responseId)
        .is("email", null);

      if (updateErr) {
        console.error("Supabase survey subscribe error:", updateErr);
        return NextResponse.json({ error: "Failed to save your details" }, { status: 500 });
      }

      const groupId = process.env.MAILERLITE_GROUP_ID;
      await addToMailerLite(emailNorm, nameNorm, airlineNorm, groupId).catch((e) =>
        console.error("MailerLite error (non-fatal):", e)
      );

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ----------------------------------------------------------------
    // Flow B: standalone signup (no responseId — early-access form etc.)
    // ----------------------------------------------------------------
    const { data: dup } = await supabase
      .from("waitlist_signups")
      .select("id")
      .eq("email", emailNorm)
      .maybeSingle();

    if (dup) {
      return NextResponse.json(
        { error: "This email is already on our list" },
        { status: 409 }
      );
    }

    const { error: insertErr } = await supabase.from("waitlist_signups").insert({
      email: emailNorm,
      name: nameNorm,
      airline: airlineNorm,
      source: "early_access_page",
    });

    if (insertErr) {
      console.error("Waitlist insert error:", insertErr);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    const groupId = process.env.MAILERLITE_GROUP_ID;
    await addToMailerLite(emailNorm, nameNorm, airlineNorm, groupId).catch((e) =>
      console.error("MailerLite error (non-fatal):", e)
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
