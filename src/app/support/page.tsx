import type { Metadata } from "next";
import { FullBleed } from "@/components/FullBleed";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with VÉLA — contact, frequently asked questions, and how we handle your account and data.",
  alternates: { canonical: "https://velaforcrew.com/support" },
};

const supportEmail = "founder@velaforcrew.com";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is VÉLA?",
    a: (
      <>
        VÉLA is a lifestyle and wellness companion for people who travel across time zones. It
        turns your roster into clear, personalised body-clock insights and planning estimates so
        you can plan rest and light around your schedule. VÉLA is informational only — it is{" "}
        <strong>not a medical device</strong> and does not provide medical, health, or clinical
        advice.
      </>
    ),
  },
  {
    q: "How do I create an account or sign in?",
    a: (
      <>
        VÉLA uses email and password sign-in. Open the app, choose <em>Sign up</em>, and enter your
        email and a password. If you already have an account, use <em>Sign in</em>. Forgotten your
        password? Use the reset option on the sign-in screen, or email us and we&rsquo;ll help.
      </>
    ),
  },
  {
    q: "How do I get my roster into VÉLA?",
    a: (
      <>
        You build your roster inside the app using the interactive roster builder — add your duties,
        layovers, and flights and VÉLA generates your planning estimates from them. Your schedule
        stays in your private account; it is not shared with your employer or airline.
      </>
    ),
  },
  {
    q: "How is my data handled?",
    a: (
      <>
        Your account details, roster, and preferences live in your private account and are used to
        generate your personal insights. We do not sell your data or share your roster with your
        airline. Full detail is in our{" "}
        <a className="text-gold underline decoration-gold/40" href="/privacy">
          Privacy Policy
        </a>
        .
      </>
    ),
  },
  {
    q: "How do I delete my account?",
    a: (
      <>
        You can delete your account and associated data at any time from within the app under
        Profile, or by emailing{" "}
        <a className="text-gold underline decoration-gold/40" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>{" "}
        if you can&rsquo;t open the app. See our{" "}
        <a className="text-gold underline decoration-gold/40" href="/delete-account">
          account deletion page
        </a>{" "}
        for full details and what gets deleted.
      </>
    ),
  },
  {
    q: "How do billing and subscriptions work?",
    a: (
      <>
        VÉLA is free to start. Paid plans can be bought through the App Store, Google Play, or
        directly on this site. Subscriptions bought through a store are managed in your
        device&rsquo;s subscription settings. Subscriptions bought directly on this site are
        processed by Paddle, our merchant of record &mdash; use the manage-subscription link in your
        purchase receipt, or email us and we will cancel it for you. Prices are shown in USD; sales
        tax or VAT may be added at checkout depending on your country, and the exact total is always
        shown before you pay.
      </>
    ),
  },
  {
    q: "Is VÉLA medical or fitness-for-duty advice?",
    a: (
      <>
        No. VÉLA&rsquo;s estimates and insights are for{" "}
        <strong>personal planning only</strong>. They are not medical assessments, diagnostic
        results, or a substitute for your operator&rsquo;s fitness-for-duty requirements or
        professional medical advice. Always follow your airline&rsquo;s and regulator&rsquo;s
        procedures.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <div className="w-full">
      {/* HEADER */}
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-12 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
            Support
          </h1>
          <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed">
            Need a hand with VÉLA? Email us directly, or check the answers below. This page is the
            public support contact listed in App Store Connect and Google Play.
          </p>
        </div>
      </FullBleed>

      {/* CONTACT */}
      <FullBleed className="bg-cream py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-parchment/70 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">Contact</p>
            <p className="font-sans text-base text-ink">Vela4Crew Inc.</p>
            <p className="mt-2 font-sans text-sm text-inkMid">
              Email:{" "}
              <a className="text-gold underline decoration-gold/40" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
            </p>
            <p className="mt-3 font-sans text-sm text-inkMid">
              We&rsquo;re a small team and read every message. We typically reply within{" "}
              <strong>two business days</strong>. To help us help you faster, tell us the email on your
              account, your device and OS, and what you were doing when the issue happened.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* FAQ — styled like the homepage FAQ */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-10 border-b-2 border-gold pb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[18px] border border-warmLine bg-cream/60 open:bg-cream/80 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 list-none">
                  <h3 className="font-display text-xl font-light text-ink">{faq.q}</h3>
                  <span className="flex-shrink-0 font-mono text-lg text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 font-sans text-base text-inkMid leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* IMPORTANT */}
      <FullBleed className="bg-cream py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="rounded-[14px] border border-warmLine bg-parchment/50 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">Important</p>
            <p className="mt-2 font-sans text-sm text-inkMid">
              VÉLA is a lifestyle and wellness companion and is <strong>not a medical device</strong>. It
              does not provide medical, health, or safety advice, and does not replace your
              operator&rsquo;s fitness-for-duty requirements or professional medical advice.
            </p>
            <p className="mt-4 font-sans text-xs text-inkFaint">
              Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
            </p>
          </div>
        </div>
      </FullBleed>
    </div>
  );
}
