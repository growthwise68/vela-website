import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

const originalFetch = globalThis.fetch;
const savedUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const savedKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let insertedRows: Record<string, unknown>[] = [];
let methods: string[] = [];
let failInsert = false;

const baseFields = {
  energy: 3,
  route_type: "Not collected — survey v2",
  timezone_crossings: "Not collected — survey v2",
  recovery_time: "Two days",
  coping_strategies: ["Nothing connects to my roster"],
  app_utility: 4,
  willingness_to_pay: "Not collected — survey v2",
  email: null,
  name: null,
};

beforeEach(() => {
  insertedRows = [];
  methods = [];
  failInsert = false;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon";
  globalThis.fetch = mock.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = input instanceof Request ? input.url : String(input);
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    methods.push(method);
    assert.equal(new URL(url).origin, "https://example.supabase.co");
    assert.equal(new URL(url).pathname, "/rest/v1/survey_responses");
    assert.equal(method, "POST", "Survey submission must only insert a new response");
    insertedRows.push(...JSON.parse(String(init?.body)) as Record<string, unknown>[]);
    return new Response(
      JSON.stringify(failInsert ? { message: "Test insert failed" } : [{ id: "new-survey-id" }]),
      { status: failInsert ? 500 : 201, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (savedUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  else process.env.NEXT_PUBLIC_SUPABASE_URL = savedUrl;
  if (savedKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = savedKey;
  mock.restoreAll();
});

async function post(answers?: unknown) {
  const { POST } = await import("./route");
  return POST(new NextRequest("http://localhost/api/survey", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...baseFields, answers }),
  }));
}

describe("survey open-text columns", () => {
  it("copies both v2 answers into the new row and preserves the complete answers JSON", async () => {
    const answers = {
      survey_version: "15q_v2",
      job_taken_from_life: "Time with family.",
      one_thing_energy_help: "A plan that follows my roster.",
      role: "Economy",
    };
    const response = await post(answers);
    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), {
      success: true, message: "Survey submitted successfully", id: "new-survey-id",
    });
    assert.equal(insertedRows.length, 1);
    assert.equal(insertedRows[0].job_taken_from_life, answers.job_taken_from_life);
    assert.equal(insertedRows[0].one_thing_energy_help, answers.one_thing_energy_help);
    assert.deepEqual(insertedRows[0].answers, answers);
    assert.deepEqual(methods, ["POST"]);
  });

  it("trims outer whitespace while preserving multiline text and the original JSON", async () => {
    const answers = {
      job_taken_from_life: "  Family time.\nAnd weekends.  ",
      one_thing_energy_help: "\nCafé breaks and a better roster.\t",
    };
    assert.equal((await post(answers)).status, 201);
    assert.equal(insertedRows[0].job_taken_from_life, "Family time.\nAnd weekends.");
    assert.equal(insertedRows[0].one_thing_energy_help, "Café breaks and a better roster.");
    assert.deepEqual(insertedRows[0].answers, answers);
  });

  it("stores null for omitted answers on older submissions", async () => {
    for (const answers of [undefined, null, {}, { survey_version: "legacy" }]) {
      assert.equal((await post(answers)).status, 201);
      const row = insertedRows.at(-1)!;
      assert.equal(row.job_taken_from_life, null);
      assert.equal(row.one_thing_energy_help, null);
      assert.deepEqual(row.answers, answers ?? {});
    }
  });

  it("does not convert blank or non-text answers into misleading text", async () => {
    for (const value of ["", " \n\t", null, 123, true, {}, ["answer"]]) {
      assert.equal((await post({ job_taken_from_life: value, one_thing_energy_help: value })).status, 201);
      const row = insertedRows.at(-1)!;
      assert.equal(row.job_taken_from_life, null);
      assert.equal(row.one_thing_energy_help, null);
    }
  });

  it("keeps each column independent when only one answer is present", async () => {
    assert.equal((await post({ job_taken_from_life: "Missed birthdays" })).status, 201);
    assert.equal(insertedRows[0].job_taken_from_life, "Missed birthdays");
    assert.equal(insertedRows[0].one_thing_energy_help, null);
    assert.equal((await post({ one_thing_energy_help: "Rest planning" })).status, 201);
    assert.equal(insertedRows[1].job_taken_from_life, null);
    assert.equal(insertedRows[1].one_thing_energy_help, "Rest planning");
  });

  it("does not report success when the insert fails", async () => {
    failInsert = true;
    mock.method(console, "error", () => {});
    const response = await post({ job_taken_from_life: "Family time", one_thing_energy_help: "Sleep plan" });
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), { error: "Failed to submit survey" });
  });
});
