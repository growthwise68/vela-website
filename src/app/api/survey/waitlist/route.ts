import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Survey service is not configured" }, { status: 503 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const body = await req.json();
    const { responseId, email, name, airline } = body as {
      responseId?: string;
      email?: string;
      name?: string;
      airline?: string | null;
    };

    const airlineNormalized =
      typeof airline === "string" && airline.trim().length > 0 ? airline.trim() : null;

    if (!responseId || typeof responseId !== "string") {
      return NextResponse.json({ error: "Missing response id" }, { status: 400 });
    }

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required for the waitlist" }, { status: 400 });
    }

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
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (dup) {
      return NextResponse.json(
        { error: "This email is already on our list" },
        { status: 409 }
      );
    }

    const { error: updateErr } = await supabase
      .from("survey_responses")
      .update({
        email: email.toLowerCase(),
        name: name.trim(),
        airline: airlineNormalized,
      })
      .eq("id", responseId)
      .is("email", null);

    if (updateErr) {
      console.error("Waitlist update error:", updateErr);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Waitlist API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
