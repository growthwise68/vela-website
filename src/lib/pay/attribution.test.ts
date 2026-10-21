import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  pickAttributionFromSearchParams,
  attributionToQuery,
  attributionToWaitlistColumns,
} from "./attribution";

describe("pay attribution", () => {
  it("picks only site pay URL keys (ignores extra params)", () => {
    const params = new URLSearchParams(
      "utm_source=qr&ref=crew42&foo=bar&utm_medium=messenger&utm_campaign=spring&referral=other"
    );
    assert.deepEqual(pickAttributionFromSearchParams(params), {
      utm_source: "qr",
      utm_medium: "messenger",
      utm_campaign: "spring",
      ref: "crew42",
    });
    assert.deepEqual(
      pickAttributionFromSearchParams(
        new URLSearchParams("utm_content=real&ref=crew")
      ),
      { utm_content: "real", ref: "crew" }
    );
  });

  it("maps waitlist columns with nulls for missing tags", () => {
    assert.deepEqual(
      attributionToWaitlistColumns({ utm_source: "qr", ref: "a" }),
      {
        utm_source: "qr",
        utm_medium: null,
        utm_campaign: null,
        ref: "a",
      }
    );
    assert.deepEqual(attributionToWaitlistColumns({}), {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      ref: null,
    });
  });

  it("serializes attribution for pay page URLs", () => {
    const q = attributionToQuery({
      utm_source: "ai",
      utm_campaign: "wall",
      ref: "wall-e",
    });
    assert.equal(q, "utm_source=ai&utm_campaign=wall&ref=wall-e");
  });
});
