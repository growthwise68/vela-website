import { describe, it, mock, beforeEach, afterEach } from "node:test";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";
import {
  WAITLIST_EMAIL_CONSENT_LABEL,
  WAITLIST_EMAIL_CONSENT_PRIVACY_HREF,
  WAITLIST_EMAIL_CONSENT_PRIVACY_LINK_TEXT,
} from "@/app/early-access/consent-copy";
let mockSearchParams = new URLSearchParams();

mock.module("next/navigation", {
  namedExports: {
    useRouter: () => ({
      push() {},
    }),
    useSearchParams: () => mockSearchParams,
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

function setupBrowserDom(pageUrl: string): Window {
  const browserWindow = new Window({ url: pageUrl });
  globalThis.window = browserWindow as unknown as typeof globalThis.window;
  globalThis.document =
    browserWindow.document as unknown as typeof globalThis.document;
  return browserWindow;
}

function invokeReactInputChange(element: HTMLInputElement, value: string): void {
  const setter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(element),
    "value"
  )?.set;
  setter?.call(element, value);
  const propsKey = Object.keys(element).find((key) =>
    key.startsWith("__reactProps")
  );
  if (!propsKey) {
    throw new Error("React props were not found on the input element");
  }
  const props = (element as HTMLInputElement & Record<string, { onChange?: (e: {
    target: HTMLInputElement;
    currentTarget: HTMLInputElement;
  }) => void }>)[propsKey];
  props.onChange?.({ target: element, currentTarget: element });
}

describe("early-access visit attribution", () => {
  let browserWindow: Window;
  let postedBody: Record<string, unknown> | null = null;
  let fetchMock: ReturnType<typeof mock.fn<typeof fetch>>;
  const savedFetch = globalThis.fetch;

  beforeEach(() => {
    mockSearchParams = new URLSearchParams(
      "utm_source=ig&utm_medium=social&utm_campaign=launch&ref=crew99"
    );
    postedBody = null;
    browserWindow = setupBrowserDom(
      "https://velaforcrew.com/early-access?utm_source=ig&utm_medium=social&utm_campaign=launch&ref=crew99"
    );

    fetchMock = mock.fn(
      async (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url;
        const method =
          init?.method ?? (input instanceof Request ? input.method : "GET");
        if (url.includes("/api/subscribe") && method === "POST") {
          postedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response("{}", { status: 404 });
      }
    );
    globalThis.fetch = fetchMock as typeof fetch;
  });

  afterEach(() => {
    browserWindow.close();
    globalThis.fetch = savedFetch;
  });

  it("posts URL attribution tags when the form is submitted", async () => {
    const { default: EarlyAccessClient } = await import(
      `./EarlyAccessClient.tsx?visit=${Date.now()}`
    );
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(React.createElement(EarlyAccessClient));
    });

    const nameInput = document.querySelector(
      'input[autocomplete="given-name"]'
    ) as HTMLInputElement;
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const submitButton = document.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    await act(async () => {
      invokeReactInputChange(nameInput, "Ada");
      invokeReactInputChange(emailInput, "ada@example.com");
    });

    await act(async () => {
      submitButton.click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    assert.equal(fetchMock.mock.calls.length, 1);
    assert.ok(postedBody);
    assert.equal(postedBody.utm_source, "ig");
    assert.equal(postedBody.utm_medium, "social");
    assert.equal(postedBody.utm_campaign, "launch");
    assert.equal(postedBody.ref, "crew99");

    root.unmount();
  });
});

describe("early-access consent checkbox", () => {
  it("starts unticked, shows the signed wording, and links only the privacy helper", async () => {
    mockSearchParams = new URLSearchParams();
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
