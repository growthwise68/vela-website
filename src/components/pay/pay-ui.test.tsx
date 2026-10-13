import { describe, it, mock, afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { Window } from "happy-dom";

let mockSearchParams = new URLSearchParams();
let mockIosStoreUrl = "";
let mockAndroidStoreUrl = "";

mock.module("next/navigation", {
  namedExports: {
    useSearchParams: () => mockSearchParams,
  },
});

mock.module("@/lib/pay/config", {
  namedExports: {
    PAY_PAGE_PATH: "/pay",
    RC_WEB_PURCHASE_URL: "",
    get IOS_APP_STORE_URL() {
      return mockIosStoreUrl;
    },
    get ANDROID_PLAY_STORE_URL() {
      return mockAndroidStoreUrl;
    },
    VELA_OPEN_APP_URL: "vela://open",
    ATTRIBUTION_PARAM_KEYS: ["utm_source", "utm_medium", "ref"],
  },
});

let mockWebPurchaseUrl = "";
mock.module("@/lib/pay/checkout-url", {
  namedExports: {
    buildRevenueCatCheckoutUrl: () => mockWebPurchaseUrl,
  },
});

mock.module("@/components/pay/ReferralSharePanel", {
  namedExports: {
    ReferralSharePanel: () => null,
  },
});

const INSTALL_EMAIL_SENTENCE =
  "If the app is not installed yet, install it, then open the purchase confirmation email from RevenueCat.";

const FAIL_OPEN_REPORTS_URL =
  "https://zajrtrwhqjsyfyskyftp.supabase.co/rest/v1/fail_open_reports";

const TEST_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoicjVxIn0.c2lnbmF0dXJl";

const TEST_TOKEN_SEGMENTS = [
  "eyJhbGciOiJIUzI1NiJ9",
  "eyJ0ZXN0IjoicjVxIn0",
  "c2lnbmF0dXJl",
];

function w5PageUrlFixture(): string {
  const redeem =
    "rc-bed9aa89d1://redeem_web_purchase?redemption_token=" + TEST_TOKEN;
  return (
    "https://preview.example/pay/success?redeem_url=" +
    encodeURIComponent(redeem) +
    "&app_user_id=user-1"
  );
}

function setupBrowserDom(pageUrl: string): void {
  const browserWindow = new Window({ url: pageUrl });
  globalThis.window = browserWindow as unknown as Window & typeof globalThis;
  globalThis.document = browserWindow.document;
}

function assertBodyOmitsJwtSegments(serialized: string): void {
  for (const segment of TEST_TOKEN_SEGMENTS) {
    assert.equal(
      serialized.includes(segment),
      false,
      `body must not contain JWT segment ${segment}`
    );
  }
  assert.equal(serialized.includes(TEST_TOKEN), false);
}

describe("PaySuccessActions markup", () => {
  beforeEach(() => {
    mockIosStoreUrl = "";
    mockAndroidStoreUrl = "";
    delete process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY;
  });

  it("W1 — RC success shape with sibling app_user_id", async () => {
    const redeem =
      "rc-bed9aa89d1://redeem_web_purchase?redemption_token=rc_test_token_value";
    mockSearchParams = new URLSearchParams([
      ["redeem_url", redeem],
      ["app_user_id", "user-1"],
    ]);
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?w1=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(
      html,
      new RegExp(`href="${redeem.replace(/\?/g, "\\?")}"`)
    );
    assert.doesNotMatch(html, /app_user_id/);
  });

  it("W2 — missing, wrong-scheme, or unparseable redeem_url falls back with full UI", async () => {
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?w2=${Date.now()}`
    );

    const cases = [
      new URLSearchParams(),
      new URLSearchParams({
        redeem_url: "https://example.com/not-rc",
      }),
      new URLSearchParams({ redeem_url: "not-a-url" }),
    ];

    for (const params of cases) {
      mockSearchParams = params;
      const html = renderToStaticMarkup(<PaySuccessActions />);
      assert.match(html, /href="vela:\/\/open"/);
      assert.match(html, /data-testid="pay-success-actions"/);
      assert.match(html, /data-testid="open-vela-cta"/);
      assert.match(html, new RegExp(INSTALL_EMAIL_SENTENCE));
    }
  });

  it("W3 — store badges hidden when env URLs empty; install sentence present", async () => {
    mockIosStoreUrl = "";
    mockAndroidStoreUrl = "";
    mockSearchParams = new URLSearchParams();
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?w3=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.doesNotMatch(html, /data-testid="ios-download-cta"/);
    assert.doesNotMatch(html, /data-testid="android-download-cta"/);
    assert.match(html, new RegExp(INSTALL_EMAIL_SENTENCE));
  });

  it("W4 — existing success hooks still present", async () => {
    mockSearchParams = new URLSearchParams();
    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?w4=${Date.now()}`
    );
    const html = renderToStaticMarkup(<PaySuccessActions />);
    assert.match(html, /data-testid="pay-success-actions"/);
    assert.match(html, /data-testid="open-vela-cta"/);
    assert.match(html, /Open Véla/);
  });
});

describe("sendPaySuccessRedeemUrlFault (W5)", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("W5 — fail-open report contract and redaction", async () => {
    process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY = "fake-anon-key";
    const pageUrl = w5PageUrlFixture();
    const fetchCalls: { url: string; init: RequestInit }[] = [];
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      fetchCalls.push({
        url: String(url),
        init: init ?? {},
      });
      return new Response(null, { status: 201 });
    }) as typeof fetch;

    const { sendPaySuccessRedeemUrlFault } = await import(
      `./PaySuccessActions.tsx?w5=${Date.now()}`
    );

    await sendPaySuccessRedeemUrlFault({
      raw: null,
      appUserId: "user-1",
      pageUrl,
    });
    await sendPaySuccessRedeemUrlFault({
      raw: "not-a-url",
      appUserId: "user-1",
      pageUrl,
    });
    await sendPaySuccessRedeemUrlFault({
      raw: `rc-bed9aa89d1://wronghost?redemption_token=${TEST_TOKEN}`,
      appUserId: "user-1",
      pageUrl,
    });

    assert.equal(fetchCalls.length, 3);
    const expectedPageUrl =
      "https://preview.example/pay/success?app_user_id=user-1";

    const reasons: string[] = [];
    for (const call of fetchCalls) {
      assert.equal(call.url, FAIL_OPEN_REPORTS_URL);
      const headers = call.init.headers as Record<string, string>;
      assert.equal(headers.apikey, "fake-anon-key");
      assert.equal(headers.Authorization, "Bearer fake-anon-key");
      assert.equal(headers["Content-Type"], "application/json");
      assert.equal(headers.Prefer, "return=minimal");

      const bodyText = String(call.init.body);
      assertBodyOmitsJwtSegments(bodyText);
      const body = JSON.parse(bodyText) as {
        check_id: string;
        work_state: string;
        result: string;
        observed: {
          reason: string;
          redeem_url_truncated: string;
          page_url: string;
        };
      };
      assert.equal(body.check_id, "pay_success_redeem_url");
      assert.equal(body.work_state, "continued");
      assert.equal(body.result, "invalid");
      assert.equal(body.observed.page_url, expectedPageUrl);
      reasons.push(body.observed.reason);
      assertBodyOmitsJwtSegments(body.observed.redeem_url_truncated);
      assertBodyOmitsJwtSegments(body.observed.page_url);
    }

    assert.deepEqual(reasons, ["missing", "unparseable", "invalid_shape"]);

    const invalidBody = JSON.parse(String(fetchCalls[2].init.body)) as {
      observed: { redeem_url_truncated: string };
    };
    assert.match(invalidBody.observed.redeem_url_truncated, /\[redacted\]/);

    const missingBody = JSON.parse(String(fetchCalls[0].init.body)) as {
      observed: { redeem_url_truncated: string };
    };
    assert.equal(missingBody.observed.redeem_url_truncated, "");
  });

  it("W5 — empty anon key does not call fetch", async () => {
    const fetchCalls: unknown[] = [];
    globalThis.fetch = (async (...args: unknown[]) => {
      fetchCalls.push(args);
      return new Response(null, { status: 201 });
    }) as typeof fetch;

    const { sendPaySuccessRedeemUrlFault } = await import(
      `./PaySuccessActions.tsx?w5-empty=${Date.now()}`
    );

    await sendPaySuccessRedeemUrlFault({
      raw: null,
      appUserId: "user-1",
      pageUrl: w5PageUrlFixture(),
    });

    assert.equal(fetchCalls.length, 0);
  });

  it("W5 — valid redeem URL does not POST (sendPaySuccessRedeemUrlFault)", async () => {
    process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY = "fake-anon-key";
    const fetchCalls: unknown[] = [];
    globalThis.fetch = (async (...args: unknown[]) => {
      fetchCalls.push(args);
      return new Response(null, { status: 201 });
    }) as typeof fetch;

    const redeem =
      "rc-bed9aa89d1://redeem_web_purchase?redemption_token=valid_token";
    const { sendPaySuccessRedeemUrlFault } = await import(
      `./PaySuccessActions.tsx?w5-valid-fn=${Date.now()}`
    );

    await sendPaySuccessRedeemUrlFault({
      raw: redeem,
      appUserId: "user-1",
      pageUrl: w5PageUrlFixture(),
    });

    assert.equal(fetchCalls.length, 0);
  });

  it("W5 — valid redeem URL client path runs useEffect without fetch", async () => {
    process.env.NEXT_PUBLIC_VELA_FAIL_OPEN_SUPABASE_ANON_KEY = "fake-anon-key";
    const fetchCalls: unknown[] = [];
    globalThis.fetch = (async (...args: unknown[]) => {
      fetchCalls.push(args);
      return new Response(null, { status: 201 });
    }) as typeof fetch;

    setupBrowserDom("https://preview.example/pay/success");

    const redeem =
      "rc-bed9aa89d1://redeem_web_purchase?redemption_token=valid_token";
    mockSearchParams = new URLSearchParams({ redeem_url: redeem });

    const { PaySuccessActions } = await import(
      `./PaySuccessActions.tsx?w5-valid-client=${Date.now()}`
    );

    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(<PaySuccessActions />);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    assert.equal(fetchCalls.length, 0);

    await act(async () => {
      root.unmount();
    });
    container.remove();
  });
});

describe("PayCheckoutClient markup", () => {
  it("shows Not available yet when the web purchase URL is missing", async () => {
    mockWebPurchaseUrl = "";
    const { PayCheckoutClient } = await import(
      `./PayCheckoutClient.tsx?missing-purchase=${Date.now()}`
    );
    const html = renderToStaticMarkup(
      <PayCheckoutClient siteOrigin="https://velaforcrew.com" />
    );
    assert.match(html, /data-testid="pay-not-available"/);
    assert.match(html, /Not available yet/);
    assert.doesNotMatch(html, /NEXT_PUBLIC_/);
    assert.doesNotMatch(html, /pay-checkout-cta/);
  });

  it("renders checkout when the web purchase URL is set and store URLs are blank", async () => {
    mockWebPurchaseUrl = "https://pay.rev.cat/sandbox/example/wpl";
    const { PayCheckoutClient } = await import(
      `./PayCheckoutClient.tsx?purchase-set=${Date.now()}`
    );
    const html = renderToStaticMarkup(
      <PayCheckoutClient siteOrigin="https://velaforcrew.com" />
    );
    assert.match(html, /data-testid="pay-checkout-cta"/);
    assert.doesNotMatch(html, /Not available yet/);
  });
});
