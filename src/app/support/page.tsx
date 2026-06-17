import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with VÉLA — contact, frequently asked questions, and how we handle your account and data.",
};

const supportEmail = "founder@velaforcrew.com";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is VÉLA?",
    a: (
      <>
        VÉLA is a lifestyle and wellness companion for people who travel across time zones. It
        turns your roster into clear, personalised body-clock insights and readiness estimates so
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
        layovers, and flights and VÉLA generates your readiness estimates from them. Your schedule
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
        You can request deletion of your account and associated data at any time from within the
        app&rsquo;s settings, or by emailing{" "}
        <a className="text-gold underline decoration-gold/40" href={`mailto:${supportEmail}`}>
          {supportEmail}
        </a>
        . We&rsquo;ll confirm once your data has been removed.
      </>
    ),
  },
  {
    q: "How do billing and subscriptions work?",
    a: (
      <>
        VÉLA is free to start. Where paid plans are offered, they are managed through your App Store
        or Google Play account, and you can view or cancel a subscription from your device&rsquo;s
        subscription settings. For billing questions we can&rsquo;t resolve, email us and we&rsquo;ll
        point you in the right direction.
      </>
    ),
  },
  {
    q: "Is VÉLA medical or fitness-for-duty advice?",
    a: (
      <>
        No. VÉLA&rsquo;s readiness estimates and insights are for{" "}
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
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="font-display text-3xl font-light text-ink">Support</h1>
        <p className="font-sans text-inkMid">
          Need a hand with VÉLA? Email us directly, or check the answers below. This page is the
          public support contact listed in App Store Connect and Google Play.
        </p>
      </header>

      <section className="rounded-[18px] border border-warmLine bg-parchment/80 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">Contact</p>
        <p className="mt-2 font-sans text-base text-ink">Vela4Crew Inc.</p>
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
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-light text-ink">Frequently asked questions</h2>
        <div className="divide-y divide-warmLine border-y border-warmLine">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-sans text-base text-ink marker:content-none">
                <span>{faq.q}</span>
                <span
                  aria-hidden
                  className="font-mono text-lg text-inkFaint transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 font-sans text-sm leading-relaxed text-inkMid">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-[18px] border border-warmLine bg-parchment/50 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">Important</p>
        <p className="mt-2 font-sans text-sm text-inkMid">
          VÉLA is a lifestyle and wellness companion and is <strong>not a medical device</strong>. It
          does not provide medical, health, or safety advice, and does not replace your
          operator&rsquo;s fitness-for-duty requirements or professional medical advice.
        </p>
        <p className="mt-4 font-sans text-xs text-inkFaint">
          Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
        </p>
      </section>
    </div>
  );
}
