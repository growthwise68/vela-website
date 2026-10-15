import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  WAITLIST_EMAIL_CONSENT_LABEL,
  WAITLIST_EMAIL_CONSENT_PRIVACY_HREF,
  WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT,
} from "@/app/early-access/consent-copy";

mock.module("next/navigation", {
  namedExports: {
    useRouter: () => ({
      push() {},
    }),
  },
});

mock.module("@/components/FullBleed", {
  namedExports: {
    FullBleed: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => React.createElement("div", { className }, children),
  },
});

mock.module("next/link", {
  defaultExport: function Link({
    href,
    children,
    className,
  }: {
    href: string;
    children?: React.ReactNode;
    className?: string;
  }) {
    return React.createElement("a", { href, className }, children);
  },
});

describe("early-access consent checkbox", () => {
  it("starts unticked, shows the signed wording, and links only the privacy helper", async () => {
    const { default: EarlyAccessClient } = await import("./EarlyAccessClient");
    const html = renderToStaticMarkup(React.createElement(EarlyAccessClient));

    const checkbox = html.match(/<input[^>]*type="checkbox"[^>]*>/);
    assert.ok(checkbox);
    assert.equal(checkbox[0].includes("checked"), false);
    assert.equal(checkbox[0].includes("required"), false);

    assert.equal(html.includes(WAITLIST_EMAIL_CONSENT_LABEL), true);
    assert.match(html, /<label[^>]*for="early-access-email-consent"[^>]*>[^<]*Send me early access/);
    assert.equal(
      html.includes(`Unsubscribe any time. `) &&
        html.includes(WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT),
      true
    );

    const privacyLinks = html.match(/href="\/privacy"/g) ?? [];
    assert.equal(privacyLinks.length, 1);
    assert.equal(html.includes(`>${WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT}<`), true);
    assert.equal(WAITLIST_EMAIL_CONSENT_PRIVACY_HREF, "/privacy");
    assert.equal(html.includes('href="/terms"'), false);
    assert.equal(html.toLowerCase().includes(">terms<"), false);
  });
});
