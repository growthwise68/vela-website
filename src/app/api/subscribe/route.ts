import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/subscribe
 *
 * Accepts { responseId, email, name, airline? } from the survey thank-you form.
 * 1. Links the contact details to the survey response in Supabase.
 * 2. Adds the subscriber to MailerLite (group set via MAILERLITE_GROUP_ID).
 *
 * Env vars required:
 *   NEXT_PUBLIC_SUPABASE_URL      — Supabase project URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon key
 *   MAILERLITE_API_KEY            — MailerLite API token (never expose client-side)
 *   MAILERLITE_GROUP_ID           — MailerLite group/segment ID to subscribe into
 */

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { responseId, email, name, airline } = body as {
      responseId?: string;
      email?: string;
      name?: string;
      airline?: string | null;
    };

    // --- Input validation ---
    if (!responseId || typeof responseId !== "string") {
      return NextResponse.json({ error: "Missing response id" }, { status: 400 });
    }
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

    // --- 1. Save to Supabase ---
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Survey service is not configured" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Confirm the survey response exists and hasn't already captured contact details
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

    // Check for duplicate email across all responses
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
      console.error("Supabase subscribe update error:", updateErr);
      return NextResponse.json({ error: "Failed to save your details" }, { status: 500 });
    }

    // --- 2. Add to MailerLite ---
    const mlApiKey = process.env.MAILERLITE_API_KEY;
    const mlGroupId = process.env.MAILERLITE_GROUP_ID;

    if (!mlApiKey) {
      // Supabase save succeeded; MailerLite not configured — log and return success
      console.warn("MAILERLITE_API_KEY not set — skipping email subscription");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const mlPayload: Record<string, unknown> = {
      email: emailNorm,
      fields: {
        name: nameNorm,
        ...(airlineNorm ? { company: airlineNorm } : {}),
      },
      status: "active",
    };

    if (mlGroupId) {
      mlPayload.groups = [mlGroupId];
    }

    const mlRes = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${mlApiKey}`,
      },
      body: JSON.stringify(mlPayload),
    });

    if (!mlRes.ok) {
      // Log the MailerLite error but don't fail the user — their details are saved in Supabase
      const mlError = await mlRes.json().catch(() => ({}));
      console.error("MailerLite API error:", mlRes.status, mlError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
