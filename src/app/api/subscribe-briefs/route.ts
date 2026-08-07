import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/subscribe-briefs
 *
 * Email-only signup for the Recovery Briefs notification list.
 * Adds the subscriber directly to MailerLite under the group set in
 * MAILERLITE_BRIEFS_GROUP_ID. No Supabase write — the briefs form
 * collects email only, and waitlist_signups requires a name.
 *
 * Env vars:
 *   MAILERLITE_API_KEY        — MailerLite API token (server-side only)
 *   MAILERLITE_BRIEFS_GROUP_ID — MailerLite group ID for Recovery Briefs
 */

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body as { email?: string };

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const emailNorm = email.trim().toLowerCase();
    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId =
      typeof process.env.MAILERLITE_BRIEFS_GROUP_ID === "string"
        ? process.env.MAILERLITE_BRIEFS_GROUP_ID.trim()
        : undefined;

    if (!apiKey) {
      console.warn("[subscribe-briefs] MAILERLITE_API_KEY not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
    }

    console.log(
      `[subscribe-briefs] request — email=${emailNorm} groupId=${groupId ?? "(none)"}`
    );

    const payload: Record<string, unknown> = { email: emailNorm, status: "active" };
    if (groupId) payload.groups = [groupId];

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error(`[subscribe-briefs] MailerLite error ${res.status}:`, JSON.stringify(data));
      return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
    }

    console.log(
      `[subscribe-briefs] ok — status=${res.status} groups=${JSON.stringify(groupId ? [groupId] : [])}`
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("[subscribe-briefs] error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
