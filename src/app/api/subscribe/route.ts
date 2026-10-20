import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { WAITLIST_EMAIL_CONSENT_LABEL } from "@/app/early-access/consent-copy";
import {
  attributionToWaitlistColumns,
  pickAttributionFromJsonBody,
} from "@/lib/pay/attribution";

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
 *     — Does not call MailerLite, does not read email consent, and does not
 *       write a fail-open report.
 *
 *   Without responseId (early-access page):
 *     — Saves to the `waitlist_signups` table with source = "early_access_page",
 *       including the consent choice, server timestamp, and the label shown.
 *     — Guards against duplicate emails.
 *     — Adds the subscriber to MailerLite (MAILERLITE_GROUP_ID) only when
 *       the consent boolean is true. A failed add is reported and does not
 *       change the signup response.
 *
 * Env vars:
 *   NEXT_PUBLIC_SUPABASE_URL          — Supabase project URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY     — Supabase anon key
 *   MAILERLITE_API_KEY   — MailerLite API token (server-side only)
 *   MAILERLITE_GROUP_ID  — Existing waitlist group; used only when early-access consent is true
 *   NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY — App-project anon key for fail-open reports
 */

const FAIL_OPEN_REPORTS_URL =
  "https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports";

const EMAIL_SHAPED = /[^\s@]+@[^\s@]+\.[^\s@]+/;

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

type MailerLiteAddResult =
  | { ok: true; status: number }
  | {
      ok: false;
      status: number | null;
      reason: "not_configured" | "missing_group" | "http_error" | "exception";
      errorName?: string;
      errorMessage?: string;
    };

async function addToMailerLite(
  email: string,
  name: string,
  airline: string | null,
  groupId: string | undefined
): Promise<MailerLiteAddResult> {
  const apiKey = process.env.MAILERLITE_API_KEY?.trim() ?? "";
  if (!apiKey) {
    console.warn("[subscribe] MAILERLITE_API_KEY not set — skipping");
    return { ok: false, status: null, reason: "not_configured" };
  }

  const gid = typeof groupId === "string" ? groupId.trim() : "";
  if (!gid) {
    return { ok: false, status: null, reason: "missing_group" };
  }

  const fields: Record<string, string> = { name };
  if (airline) fields.company = airline;

  const payload: Record<string, unknown> = {
    email,
    fields,
    status: "active",
    groups: [gid],
  };

  try {
    console.log(`[subscribe] MailerLite request — groupId=${gid}`);

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      await res.json().catch(() => ({}));
      console.error(`[subscribe] MailerLite error ${res.status}`);
      return { ok: false, status: res.status, reason: "http_error" };
    }

    await res.json().catch(() => ({}));
    console.log(`[subscribe] MailerLite ok — status=${res.status} groups=${JSON.stringify([gid])}`);
    return { ok: true, status: res.status };
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "Error";
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      ok: false,
      status: null,
      reason: "exception",
      errorName,
      errorMessage,
    };
  }
}

function observedForMailerLiteFault(
  result: Extract<MailerLiteAddResult, { ok: false }>
): Record<string, string | number> {
  switch (result.reason) {
    case "http_error":
      return {
        reason: "http_error",
        http_status: result.status ?? 0,
      };
    case "exception": {
      const observed: Record<string, string> = { reason: "exception" };
      if (result.errorName) {
        observed.error_name = result.errorName;
      }
      if (result.errorMessage && !EMAIL_SHAPED.test(result.errorMessage)) {
        observed.error_message = result.errorMessage;
      }
      return observed;
    }
    case "not_configured":
      return { reason: "not_configured" };
    case "missing_group":
      return { reason: "missing_group" };
    default: {
      const unreachable: never = result.reason;
      return { reason: unreachable };
    }
  }
}

async function reportEarlyAccessMailerLiteFault(
  result: Extract<MailerLiteAddResult, { ok: false }>
): Promise<void> {
  const anonKey =
    process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY?.trim() || "";
  if (!anonKey) {
    console.error("[subscribe] fail-open anon key empty — MailerLite fault not reported");
    return;
  }

  const body = {
    report_id: crypto.randomUUID(),
    install_id: crypto.randomUUID(),
    check_id: "early_access_mailerlite_add",
    occurred_at: new Date().toISOString(),
    result: "invalid",
    work_state: "continued",
    account_id: null,
    observed: observedForMailerLiteFault(result),
  };

  try {
    await fetch(FAIL_OPEN_REPORTS_URL, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    });
  } catch {
    // One attempt. A failed report does not block signup.
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
    const body = (await req.json()) as {
      responseId?: string | null;
      email?: string;
      name?: string;
      airline?: string | null;
      emailConsent?: unknown;
    };

    const { responseId, email, name, airline } = body;

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

      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ----------------------------------------------------------------
    // Flow B: standalone signup (no responseId — early-access form)
    // ----------------------------------------------------------------
    // Note: waitlist_signups RLS allows anon INSERT but not SELECT, so we
    // cannot pre-check for duplicates. Instead we rely on the UNIQUE constraint
    // on the email column and handle the violation (code 23505) as a 409.
    const emailConsent = body.emailConsent === true;
    const waitlistAttribution = attributionToWaitlistColumns(
      pickAttributionFromJsonBody(body as Record<string, unknown>)
    );
    const { error: insertErr } = await supabase.from("waitlist_signups").insert({
      email: emailNorm,
      name: nameNorm,
      airline: airlineNorm,
      source: "early_access_page",
      email_consent: emailConsent,
      email_consent_at: new Date().toISOString(),
      email_consent_wording: WAITLIST_EMAIL_CONSENT_LABEL,
      ...waitlistAttribution,
    });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return NextResponse.json(
          { error: "This email is already on our list" },
          { status: 409 }
        );
      }
      console.error("Waitlist insert error:", insertErr.code, insertErr.message);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    if (emailConsent) {
      const mailerResult = await addToMailerLite(
        emailNorm,
        nameNorm,
        airlineNorm,
        process.env.MAILERLITE_GROUP_ID
      );
      if (!mailerResult.ok) {
        await reportEarlyAccessMailerLiteFault(mailerResult);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
