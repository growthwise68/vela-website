"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pickAttributionFromSearchParams } from "@/lib/pay/attribution";
import { buildRevenueCatCheckoutUrl } from "@/lib/pay/checkout-url";
import {
  createAccountWithEmail,
  isFirebaseWebAuthConfigured,
  signInWithApple,
  signInWithEmail,
  signInWithGoogle,
  signOutFirebase,
  subscribeFirebaseUser,
  type PayFirebaseUser,
} from "@/lib/pay/firebase-auth";
import { buildPayPageUrl } from "@/lib/pay/pay-page-url";
import { ReferralSharePanel } from "@/components/pay/ReferralSharePanel";

type PayCheckoutClientProps = {
  siteOrigin: string;
};

export function PayCheckoutClient({ siteOrigin }: PayCheckoutClientProps) {
  const searchParams = useSearchParams();
  const firebaseEnabled = isFirebaseWebAuthConfigured();

  const [user, setUser] = useState<PayFirebaseUser | null>(null);
  const [authReady, setAuthReady] = useState(!firebaseEnabled);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseEnabled) {
      return;
    }
    return subscribeFirebaseUser((nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
  }, [firebaseEnabled]);

  const attribution = useMemo(
    () => pickAttributionFromSearchParams(searchParams),
    [searchParams]
  );

  const baseCheckoutUrl = useMemo(
    () => buildRevenueCatCheckoutUrl(attribution),
    [attribution]
  );

  const checkoutUrl = useMemo(() => {
    if (!baseCheckoutUrl) return "";
    if (!user) return baseCheckoutUrl;
    return buildRevenueCatCheckoutUrl(attribution, undefined, {
      appUserId: user.uid,
      email: user.email,
    });
  }, [attribution, baseCheckoutUrl, user]);

  const sharePayUrl = useMemo(
    () => buildPayPageUrl(siteOrigin, attribution),
    [siteOrigin, attribution]
  );

  if (!baseCheckoutUrl) {
    return (
      <p className="font-sans text-sm text-inkMid" data-testid="pay-not-available">
        Not available yet
      </p>
    );
  }

  async function handleProviderSignIn(
    action: () => Promise<PayFirebaseUser | null>
  ) {
    setAuthError(null);
    setAuthBusy(true);
    try {
      await action();
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Could not sign in. Please try again."
      );
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleEmailSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setAuthError("Enter your email and password.");
      return;
    }
    await handleProviderSignIn(() =>
      isSignUp
        ? createAccountWithEmail(email, password)
        : signInWithEmail(email, password)
    );
  }

  const requiresSignIn = firebaseEnabled && (!authReady || !user);

  return (
    <div className="space-y-10">
      <div className="rounded-[18px] border border-warmLine bg-parchment/50 p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-2">
          Web checkout
        </p>

        {requiresSignIn ? (
          <div className="space-y-5" data-testid="pay-auth-gate">
            <p className="font-sans text-sm text-inkMid leading-relaxed">
              Sign in with the account you use (or will use) in the VÉLA app so Core attaches
              automatically as soon as you pay.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={authBusy || !authReady}
                onClick={() => void handleProviderSignIn(signInWithApple)}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-ink bg-night px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-cream hover:bg-nightMid transition-colors disabled:opacity-50"
                data-testid="pay-signin-apple"
              >
                Continue with Apple
              </button>
              <button
                type="button"
                disabled={authBusy || !authReady}
                onClick={() => void handleProviderSignIn(signInWithGoogle)}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-warmLine bg-cream px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-ink hover:border-gold transition-colors disabled:opacity-50"
                data-testid="pay-signin-google"
              >
                Continue with Google
              </button>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-3 pt-2 border-t border-warmLine/70">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-warmLine bg-cream px-3.5 py-2.5 font-sans text-sm text-ink placeholder:text-inkFaint focus:border-gold focus:outline-none"
                />
                <input
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-warmLine bg-cream px-3.5 py-2.5 font-sans text-sm text-ink placeholder:text-inkFaint focus:border-gold focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={authBusy || !authReady}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gold px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-ink hover:bg-yellow-600 transition-colors disabled:opacity-50"
                  data-testid="pay-signin-email"
                >
                  {isSignUp ? "Create account with email" : "Sign in with email"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp((prev) => !prev);
                    setAuthError(null);
                  }}
                  className="font-sans text-xs text-inkMid underline underline-offset-2 hover:text-ink"
                >
                  {isSignUp
                    ? "Already have a VÉLA account? Sign in"
                    : "New to VÉLA? Create an account"}
                </button>
              </div>
            </form>

            {authError ? (
              <p className="font-sans text-xs text-red-700" role="alert">
                {authError}
              </p>
            ) : null}
          </div>
        ) : (
          <div>
            {user ? (
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-warmLine bg-cream px-4 py-3 text-sm">
                <span className="font-sans text-inkMid">
                  Signed in as{" "}
                  <strong className="font-medium text-ink">
                    {user.email ?? "your VÉLA account"}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => void signOutFirebase()}
                  className="font-mono text-xs uppercase tracking-[0.04em] text-gold underline underline-offset-2"
                >
                  Switch account
                </button>
              </div>
            ) : null}
            <p className="font-sans text-sm text-inkMid leading-relaxed mb-6">
              Pay with Stripe via RevenueCat. After payment, open VÉLA on your phone and sign in —
              Core should be ready.
            </p>
            <a
              href={checkoutUrl}
              className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl px-8 py-3 font-mono text-sm font-semibold uppercase tracking-[0.03em] transition-colors bg-gold text-ink hover:bg-yellow-600"
              data-testid="pay-checkout-cta"
            >
              Continue to secure checkout
            </a>
          </div>
        )}
      </div>

      <ReferralSharePanel payPageUrl={sharePayUrl} />
    </div>
  );
}
