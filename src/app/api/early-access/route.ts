import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function addToMailerLite(name: string, email: string, airline: string | null) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) return;

  const fields: Record<string, string> = { name };
  if (airline) fields.airline = airline;

  await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      fields,
      groups: process.env.MAILERLITE_EARLY_ACCESS_GROUP_ID
        ? [process.env.MAILERLITE_EARLY_ACCESS_GROUP_ID]
        : undefined,
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Service is not configured" }, { status: 503 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const body = await req.json();
    const { email, name, airline } = body as {
      email?: string;
      name?: string;
      airline?: string | null;
    };

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const airlineNormalized =
      typeof airline === "string" && airline.trim().length > 0 ? airline.trim() : null;
    const emailLower = email.toLowerCase();

    const { data: dup } = await supabase
      .from("waitlist_signups")
      .select("id")
      .eq("email", emailLower)
      .maybeSingle();

    if (dup) {
      return NextResponse.json(
        { error: "This email is already on our list" },
        { status: 409 }
      );
    }

    const { error: insertErr } = await supabase.from("waitlist_signups").insert({
      email: emailLower,
      name: name.trim(),
      airline: airlineNormalized,
      source: "early_access_page",
    });

    if (insertErr) {
      console.error("Waitlist insert error:", insertErr);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    await addToMailerLite(name.trim(), emailLower, airlineNormalized).catch((e) =>
      console.error("MailerLite error (non-fatal):", e)
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Early access API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
