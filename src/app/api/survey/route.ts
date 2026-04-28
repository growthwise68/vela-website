import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

/**
 * survey_responses legacy columns:
 * - For answers.survey_version "15q_v2", `app_utility` stores the Q6 tiredness worry scale (1–5);
 *   `route_type`, `timezone_crossings`, and `willingness_to_pay` use placeholder strings.
 * Full question labels and open text live in `answers` JSON.
 */

function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const direct = req.headers.get("x-real-ip");
  return forwarded ? forwarded.split(",")[0].trim() : direct || "unknown";
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: "Survey service is not configured" },
        { status: 503 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const body = await req.json();

    // Validate required fields
    const {
      energy,
      route_type,
      timezone_crossings,
      recovery_time,
      coping_strategies,
      app_utility,
      willingness_to_pay,
      email,
      name,
      answers,
    } = body;

    const emailTrimmed = typeof email === "string" ? email.trim().toLowerCase() : "";
    const nameTrimmed = typeof name === "string" ? name.trim() : "";
    const hasContact = emailTrimmed.length > 0;

    if (hasContact) {
      if (!validateEmail(emailTrimmed)) {
        return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
      }
      if (!nameTrimmed) {
        return NextResponse.json({ error: "Name is required when email is provided" }, { status: 400 });
      }
    }

    if (!energy || energy < 1 || energy > 5) {
      return NextResponse.json(
        { error: "Energy level must be between 1-5" },
        { status: 400 }
      );
    }

    if (!app_utility || app_utility < 1 || app_utility > 5) {
      return NextResponse.json(
        { error: "App utility score must be between 1-5" },
        { status: 400 }
      );
    }

    const requiredFields = [
      "route_type",
      "timezone_crossings",
      "recovery_time",
      "willingness_to_pay",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    if (hasContact) {
      const { data: existing } = await supabase
        .from("survey_responses")
        .select("email")
        .eq("email", emailTrimmed)
        .maybeSingle();

      if (existing) {
        return NextResponse.json(
          { error: "This email has already been used" },
          { status: 409 }
        );
      }
    }

    // Hash IP for spam detection
    const clientIP = getClientIP(req);
    const ip_hash = hashIP(clientIP);

    // Insert survey response
    const { data, error } = await supabase
      .from("survey_responses")
      .insert([
        {
          energy: parseInt(energy),
          route_type,
          timezone_crossings,
          recovery_time,
          coping_strategies: Array.isArray(coping_strategies) ? coping_strategies : [],
          app_utility: parseInt(app_utility),
          willingness_to_pay,
          email: hasContact ? emailTrimmed : null,
          name: hasContact ? nameTrimmed : null,
          ip_hash,
          answers: answers ?? {},
        },
      ])
      .select("id");

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit survey" },
        { status: 500 }
      );
    }

    const row = data?.[0];
    return NextResponse.json(
      {
        success: true,
        message: "Survey submitted successfully",
        id: row?.id ?? null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Survey API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
