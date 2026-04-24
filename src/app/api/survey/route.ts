import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
      fatigue_challenge,
      recovery_time,
      coping_strategies,
      circadian_awareness,
      app_utility,
      willingness_to_pay,
      email,
      name,
    } = body;

    // Validation checks
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
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
      "fatigue_challenge",
      "recovery_time",
      "circadian_awareness",
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

    // Check if email already exists
    const { data: existing } = await supabase
      .from("survey_responses")
      .select("email")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "This email has already submitted a survey" },
        { status: 409 }
      );
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
          fatigue_challenge,
          recovery_time,
          coping_strategies: Array.isArray(coping_strategies)
            ? coping_strategies
            : [],
          circadian_awareness,
          app_utility: parseInt(app_utility),
          willingness_to_pay,
          email: email.toLowerCase(),
          name: name.trim(),
          ip_hash,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit survey" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Survey submitted successfully",
        email: email,
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
