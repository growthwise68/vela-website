import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  pickAttributionFromSearchParams,
  attributionToQuery,
} from "./attribution";

describe("pay attribution", () => {
  it("picks only site pay URL keys (ignores extra params)", () => {
    const params = new URLSearchParams(
      "utm_source=qr&ref=crew42&foo=bar&utm_medium=messenger&utm_campaign=spring&referral=other"
    );
    assert.deepEqual(pickAttributionFromSearchParams(params), {
      utm_source: "qr",
      utm_medium: "messenger",
      ref: "crew42",
    });
  });

  it("serializes attribution for pay page URLs", () => {
    const q = attributionToQuery({ utm_source: "ai", ref: "wall-e" });
    assert.equal(q, "utm_source=ai&ref=wall-e");
  });
});
