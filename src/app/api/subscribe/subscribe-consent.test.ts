import { describe, it, mock, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { NextRequest } from "next/server";
import { WAITLIST_EMAIL_CONSENT_LABEL } from "@/app/early-access/consent-copy";

const FAIL_OPEN_REPORTS_URL =
  "https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports";
const MAILERLITE_URL = "https://connect.mailerlite.com/api/subscribers";

type InsertCall = { table: string; payload: Record<string, unknown> };
type FetchCall = { url: string; init: RequestInit | undefined };

let inserts: InsertCall[] = [];
let insertError: { code: string; message: string } | null = null;
let fetchCalls: FetchCall[] = [];
let mailerMode: "ok" | "http" | "throw" | "throw-email" = "ok";
const originalFetch = globalThis.fetch;

const savedEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  mailerKey: process.env.MAILERLITE_API_KEY,
  groupId: process.env.MAILERLITE_GROUP_ID,
  failOpenKey: process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY,
};

function restoreEnv(): void {
  const entries: Array<[string, string | undefined]> = [
    ["NEXT_PUBLIC_SUPABASE_URL", savedEnv.url],
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY", savedEnv.key],
    ["MAILERLITE_API_KEY", savedEnv.mailerKey],
    ["MAILERLITE_GROUP_ID", savedEnv.groupId],
    ["NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY", savedEnv.failOpenKey],
  ];
  for (const [name, value] of entries) {
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
  }
}

function setBaseEnv(): void {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon";
  process.env.MAILERLITE_API_KEY = "test-mailer-key";
  process.env.MAILERLITE_GROUP_ID = "grp-waitlist";
  process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY = "fail-open-anon";
}

function requestUrl(input: string | URL | Request): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    return input.toString();
  }
  return input.url;
}

beforeEach(() => {
  inserts = [];
  insertError = null;
  fetchCalls = [];
  mailerMode = "ok";
  setBaseEnv();
  globalThis.fetch = mock.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = requestUrl(input);
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    fetchCalls.push({ url, init: { ...init, method } });

    if (url === MAILERLITE_URL) {
      if (mailerMode === "throw") {
        throw new TypeError("socket hang up");
      }
      if (mailerMode === "throw-email") {
        throw new Error("rejected ada@crew.example");
      }
      if (mailerMode === "http") {
        return new Response(JSON.stringify({ email: "secret@example.com", error: "bad" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ data: { id: "ml-1" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url === FAIL_OPEN_REPORTS_URL) {
      return new Response(null, { status: 201 });
    }

    if (url.includes("/rest/v1/waitlist_signups") && method === "POST") {
      inserts.push({
        table: "waitlist_signups",
        payload: JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>,
      });
      if (insertError) {
        return new Response(JSON.stringify(insertError), {
          status: 409,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(null, { status: 201 });
    }

    if (url.includes("/rest/v1/survey_responses") && method === "GET") {
      if (url.includes("id=eq.")) {
        return new Response(JSON.stringify([{ id: "survey-1", email: null }]), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("[]", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.includes("/rest/v1/survey_responses") && method === "PATCH") {
      return new Response(null, { status: 204 });
    }

    return new Response(JSON.stringify({ message: "unexpected" }), { status: 500 });
  }) as typeof fetch;
});

afterEach(() => {
  restoreEnv();
  globalThis.fetch = originalFetch;
});

async function post(payload: Record<string, unknown>) {
  const { POST } = await import("./route");
  const req = new NextRequest("http://localhost/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return POST(req);
}

function mailerCalls(): FetchCall[] {
  return fetchCalls.filter((call) => call.url === MAILERLITE_URL);
}

function failOpenCalls(): FetchCall[] {
  return fetchCalls.filter((call) => call.url === FAIL_OPEN_REPORTS_URL);
}

function failOpenBody(call: FetchCall): {
  check_id: string;
  result: string;
  work_state: string;
  account_id: null;
  observed: Record<string, string | number>;
} {
  assert.equal(call.init?.method, "POST");
  const headers = call.init?.headers as Record<string, string>;
  assert.equal(headers.apikey, "fail-open-anon");
  assert.equal(headers.Authorization, "Bearer fail-open-anon");
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Prefer, "return=minimal");
  return JSON.parse(String(call.init?.body));
}

const baseFields = { email: "Crew@Example.com", name: "Ada", airline: "Example Air" };

describe("early-access consent subscribe", () => {
  it("stores a declined choice and does not call MailerLite", async () => {
    const res = await post({ ...baseFields, emailConsent: false });
    assert.equal(res.status, 200);
    assert.equal(inserts.length, 1);
    assert.equal(inserts[0].table, "waitlist_signups");
    assert.equal(inserts[0].payload.email_consent, false);
    assert.equal(inserts[0].payload.email_consent_wording, WAITLIST_EMAIL_CONSENT_LABEL);
    assert.equal(typeof inserts[0].payload.email_consent_at, "string");
    assert.ok(String(inserts[0].payload.email_consent_at).length > 0);
    assert.equal(mailerCalls().length, 0);
    assert.equal(failOpenCalls().length, 0);
  });

  it("stores consent and posts to the existing group when MailerLite accepts", async () => {
    const res = await post({ ...baseFields, emailConsent: true });
    assert.equal(res.status, 200);
    assert.equal(inserts[0].payload.email_consent, true);
    assert.equal(inserts[0].payload.email_consent_wording, WAITLIST_EMAIL_CONSENT_LABEL);
    assert.equal(typeof inserts[0].payload.email_consent_at, "string");
    assert.ok(String(inserts[0].payload.email_consent_at).length > 0);
    assert.equal(mailerCalls().length, 1);
    const mailerBody = JSON.parse(String(mailerCalls()[0].init?.body));
    assert.deepEqual(mailerBody.groups, ["grp-waitlist"]);
    assert.equal(failOpenCalls().length, 0);
  });

  it("reports an HTTP failure without the MailerLite body and still returns 200", async () => {
    mailerMode = "http";
    const res = await post({ ...baseFields, emailConsent: true });
    assert.equal(res.status, 200);
    assert.equal(failOpenCalls().length, 1);
    const reported = failOpenBody(failOpenCalls()[0]);
    assert.equal(reported.check_id, "early_access_mailerlite_add");
    assert.equal(reported.result, "invalid");
    assert.equal(reported.work_state, "continued");
    assert.equal(reported.account_id, null);
    assert.deepEqual(reported.observed, { reason: "http_error", http_status: 500 });
    const serialized = JSON.stringify(reported);
    assert.equal(serialized.includes("secret@example.com"), false);
    assert.equal(serialized.includes("bad"), false);
  });

  it("reports a thrown MailerLite fetch, and drops a message that contains an email", async () => {
    mailerMode = "throw";
    const plain = await post({ ...baseFields, emailConsent: true });
    assert.equal(plain.status, 200);
    assert.equal(failOpenCalls().length, 1);
    const plainObserved = failOpenBody(failOpenCalls()[0]).observed;
    assert.equal(plainObserved.reason, "exception");
    assert.equal(plainObserved.error_name, "TypeError");
    assert.equal(plainObserved.error_message, "socket hang up");

    fetchCalls = [];
    mailerMode = "throw-email";
    const withEmail = await post({ ...baseFields, email: "Bea@Example.com", emailConsent: true });
    assert.equal(withEmail.status, 200);
    assert.equal(failOpenCalls().length, 1);
    const redacted = failOpenBody(failOpenCalls()[0]).observed;
    assert.equal(redacted.reason, "exception");
    assert.equal(redacted.error_name, "Error");
    assert.equal("error_message" in redacted, false);
    assert.equal(JSON.stringify(redacted).includes("ada@crew.example"), false);
  });

  it("reports a missing MailerLite key without calling MailerLite", async () => {
    delete process.env.MAILERLITE_API_KEY;
    const res = await post({ ...baseFields, emailConsent: true });
    assert.equal(res.status, 200);
    assert.equal(mailerCalls().length, 0);
    assert.equal(failOpenCalls().length, 1);
    assert.equal(failOpenBody(failOpenCalls()[0]).observed.reason, "not_configured");
  });

  it("treats a whitespace-only group id as missing and does not post to MailerLite", async () => {
    process.env.MAILERLITE_GROUP_ID = "   ";
    const res = await post({ ...baseFields, emailConsent: true });
    assert.equal(res.status, 200);
    assert.equal(mailerCalls().length, 0);
    assert.equal(failOpenCalls().length, 1);
    assert.equal(failOpenBody(failOpenCalls()[0]).observed.reason, "missing_group");
  });

  it("does not opt in when consent is missing or the string true", async () => {
    const missing = await post(baseFields);
    assert.equal(missing.status, 200);
    assert.equal(inserts[0].payload.email_consent, false);
    assert.equal(mailerCalls().length, 0);

    inserts = [];
    fetchCalls = [];
    const asString = await post({ ...baseFields, emailConsent: "true" });
    assert.equal(asString.status, 200);
    assert.equal(inserts[0].payload.email_consent, false);
    assert.equal(mailerCalls().length, 0);
  });

  it("stores first-touch attribution columns and nulls when tags are absent", async () => {
    const tagged = await post({
      ...baseFields,
      emailConsent: false,
      utm_source: "ig",
      utm_medium: "social",
      utm_campaign: "launch",
      ref: "crew99",
    });
    assert.equal(tagged.status, 200);
    assert.equal(inserts[0].payload.utm_source, "ig");
    assert.equal(inserts[0].payload.utm_medium, "social");
    assert.equal(inserts[0].payload.utm_campaign, "launch");
    assert.equal(inserts[0].payload.ref, "crew99");

    inserts = [];
    fetchCalls = [];
    const untagged = await post({ ...baseFields, emailConsent: false });
    assert.equal(untagged.status, 200);
    assert.equal(inserts[0].payload.utm_source, null);
    assert.equal(inserts[0].payload.utm_medium, null);
    assert.equal(inserts[0].payload.utm_campaign, null);
    assert.equal(inserts[0].payload.ref, null);
  });

  it("returns 409 for a duplicate email and does not call MailerLite", async () => {
    insertError = { code: "23505", message: "duplicate key" };
    const res = await post({ ...baseFields, emailConsent: true });
    assert.equal(res.status, 409);
    assert.equal(mailerCalls().length, 0);
    assert.equal(failOpenCalls().length, 0);
  });

  it("updates the survey row and does not call MailerLite when responseId is set", async () => {
    const res = await post({ ...baseFields, responseId: "survey-1", emailConsent: true });
    assert.equal(res.status, 200);
    const waitlistWrites = fetchCalls.filter(
      (call) => call.url.includes("/rest/v1/waitlist_signups")
    );
    assert.equal(waitlistWrites.length, 0);
    assert.equal(mailerCalls().length, 0);
  });

  it("migration files have no UPDATE and no DEFAULT statement", () => {
    for (const file of [
      "0003_waitlist_email_consent.sql",
      "0004_waitlist_attribution.sql",
    ]) {
      const sql = readFileSync(
        path.join(process.cwd(), "supabase/migrations", file),
        "utf8"
      );
      const executable = sql
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n");
      assert.equal(executable.includes("UPDATE"), false, file);
      assert.equal(executable.includes("DEFAULT"), false, file);
    }
    const consentSql = readFileSync(
      path.join(process.cwd(), "supabase/migrations/0003_waitlist_email_consent.sql"),
      "utf8"
    );
    assert.equal(consentSql.includes("NULL means no choice was recorded."), true);
    const attributionSql = readFileSync(
      path.join(process.cwd(), "supabase/migrations/0004_waitlist_attribution.sql"),
      "utf8"
    );
    assert.equal(attributionSql.includes("utm_source"), true);
    assert.equal(attributionSql.includes("waitlist_signups"), true);
  });
});
