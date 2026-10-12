import { describe, it } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PaySuccessActions } from "./PaySuccessActions";

describe("PaySuccessActions markup", () => {
  it("renders Open Véla CTA and success test hooks", () => {
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /data-testid="pay-success-actions"/);
    assert.match(html, /data-testid="open-vela-cta"/);
    assert.match(html, /Open Véla/);
  });
});
