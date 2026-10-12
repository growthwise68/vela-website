import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  mergeAttributionFirstTouch,
  pickAttributionFromSearchParams,
  attributionToQuery,
} from "./attribution";

describe("pay attribution", () => {
  it("picks only known UTM/ref keys", () => {
    const params = new URLSearchParams(
      "utm_source=qr&ref=crew42&foo=bar&utm_medium=messenger"
    );
    assert.deepEqual(pickAttributionFromSearchParams(params), {
      utm_source: "qr",
      utm_medium: "messenger",
      ref: "crew42",
    });
  });

  it("first-touch merge does not overwrite stored keys", () => {
    const stored = { utm_source: "organic", ref: "a" };
    const incoming = { utm_source: "qr", utm_campaign: "spring" };
    assert.deepEqual(mergeAttributionFirstTouch(stored, incoming), {
      utm_source: "organic",
      ref: "a",
      utm_campaign: "spring",
    });
  });

  it("serializes attribution for pay page URLs", () => {
    const q = attributionToQuery({ utm_source: "ai", ref: "wall-e" });
    assert.equal(q, "utm_source=ai&ref=wall-e");
  });
});
