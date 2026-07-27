import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How VÉLA handles information when you use our services.",
};

export default function PrivacyPage() {
  return (
    <article className="prose-vela">
      <h1 className="font-display text-3xl font-light text-ink">Privacy policy</h1>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint">
        Version 2.1 — 27 July 2026
      </p>

      <h2>Who we are</h2>
      <p>
        VÉLA is a <strong>personal lifestyle planning</strong> tool for people who work
        across time zones. It is operated by Vela4Crew Inc., a Delaware corporation
        (&ldquo;VÉLA&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
        VÉLA is not a medical device and does not provide medical, health, or clinical advice.
      </p>
      <p>
        This policy describes what information we collect when you use the VÉLA website
        (<a className="text-gold underline decoration-gold/40" href="https://velaforcrew.com">velaforcrew.com</a>) and
        the VÉLA mobile application, how we use that information, and the choices you have.
      </p>

      <h2>Information we collect</h2>

      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Account information</strong> — when you create an account we collect an email
          address and any display name you choose.
        </li>
        <li>
          <strong>Schedule and roster data</strong> — duty periods, layover locations, and shift
          patterns you enter to generate planning estimates. When you enter a flight number,
          it is sent to a third-party public flight data service (AeroDataBox) to retrieve route
          and timing information; the flight number is publicly available information and no
          personal data is included in that request. Your assembled roster — the combination of
          your flights and schedule — stays on your device or in your private account and is
          never shared with your employer, airline, or any aviation authority.
        </li>
        <li>
          <strong>Preferences and settings</strong> — sleep timing preferences, notification
          settings, and planning configuration you choose within the app.
        </li>
        <li>
          <strong>Adherence feedback</strong> — the app allows you to optionally record how
          well you followed guidance (for example, sleep timing, light exposure, or nutrition
          suggestions). This information is stored in your private account and is used solely
          to update your personal planning estimates within the app. It is not shared, sold,
          or used for any other purpose.
        </li>
        <li>
          <strong>Survey responses</strong> — if you complete our cabin crew survey, your answers
          are stored anonymously and are never linked to your identity. If you choose to join
          the waitlist at the end of the survey, your contact details are stored in a completely
          separate record with no reference back to your survey answers. It is architecturally
          impossible for us — or anyone else — to connect your survey responses to your identity.
        </li>
        <li>
          <strong>Waitlist and early access sign-ups</strong> — if you join our waitlist or
          request early access, we collect your first name, email address, and optionally your
          airline. This information is used solely to contact you about VÉLA&rsquo;s launch and
          related updates.
        </li>
        <li>
          <strong>Subscription and purchase information</strong> — if you buy a VÉLA
          subscription, we receive a record of <em>what you bought and whether it is still
          active</em> (plan, purchase and renewal dates, trial status, and whether the
          subscription is current, cancelled, or expired), linked to your account so the app
          can unlock the right features. <strong>We never see or store your full card number,
          CVC, or bank details</strong> — those go directly to the payment platform you buy
          through and are never sent to us. See &ldquo;Subscriptions and payments&rdquo; below.
        </li>
        <li>
          <strong>Support communications</strong> — messages you send us via the support page
          or email.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage analytics</strong> — aggregated or pseudonymous data about features
          used, session length, and error events. We use this to understand how the app and
          website are used and to improve them. These events do not include flight numbers,
          names, email addresses, or raw roster text. We do not build individual profiles for
          advertising. In the app, a <strong>Data use</strong> notice explains this and offers
          an <strong>optional research toggle</strong> (&ldquo;Help improve future
          guidance&rdquo;) that is <strong>off unless you turn it on</strong>. App analytics
          are stored in Supabase; website analytics are provided by Vercel Analytics.
        </li>
        <li>
          <strong>Crash and performance reports</strong> — technical diagnostics that help us
          identify and fix issues.
        </li>
        <li>
          <strong>Device information</strong> — operating system version, app version, and
          device type, used for compatibility and support.
        </li>
        <li>
          <strong>IP address (hashed)</strong> — when you submit a survey, a one-way hash of
          your IP address is stored for spam and abuse prevention only. The hash cannot be
          reversed to identify you.
        </li>
      </ul>

      <h3>What we do not collect</h3>
      <p>
        VÉLA does not collect biometric data, vital signs, or clinical health measurements.
        The app&rsquo;s estimates are derived from your schedule and published sleep science
        models — they are not health measurements. We do not access HealthKit, Google Fit, or
        wearable sensor data in the current version of the app.
      </p>
      <p>
        VÉLA also does <strong>not</strong> collect your location (the app requests no location
        permission), does <strong>not</strong> access your camera, photos, microphone, contacts,
        calendar, or files, does <strong>not</strong> contain advertising or advertising
        identifiers, does <strong>not</strong> track you across other companies&rsquo; apps or
        websites, and does <strong>not</strong> store full payment card numbers.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To provide and operate the VÉLA service.</li>
        <li>To generate body-clock and sleep timing estimates based on your schedule.</li>
        <li>To respond to support requests and communications.</li>
        <li>
          To generate personalised advice, including advice written with the help of a language
          model (see &ldquo;Personalised advice and AI&rdquo; below).
        </li>
        <li>
          To sell and manage subscriptions, unlock the features you paid for, restore purchases,
          and handle billing support.
        </li>
        <li>To improve the app using aggregated usage insights.</li>
        <li>To send service-related notifications if you opt in.</li>
        <li>To contact waitlist and early access subscribers about the VÉLA launch.</li>
        <li>To meet legal and compliance obligations.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use your data to provide medical
        advice, diagnostic assessments, or safety-critical guidance.
      </p>

      <h2>Subscriptions and payments</h2>
      <p>
        VÉLA is free to download and offers paid subscriptions. <strong>We do not process
        payments ourselves and we never receive your full card number, CVC, or bank
        details.</strong> Depending on where you subscribe, your payment is handled by:
      </p>
      <ul>
        <li>
          <strong>Google Play Billing</strong> — for subscriptions bought inside the Android
          app. Google handles the payment and holds your payment details under Google&rsquo;s
          own privacy policy.
        </li>
        <li>
          <strong>Apple App Store billing</strong> — for subscriptions bought inside the iOS
          app, on the same basis, under Apple&rsquo;s privacy policy.
        </li>
        <li>
          <strong>Paddle</strong> — our authorised reseller and merchant of record for
          subscriptions bought directly on this website, under Paddle&rsquo;s privacy policy.
        </li>
      </ul>
      <p>
        <strong>RevenueCat</strong> sits behind all of these. It is a subscription-management
        service that tells the app whether your subscription is active so the right features
        unlock. To do that it receives an account identifier for you, the device platform, and
        the purchase and renewal events reported by the store — <strong>not</strong> your card
        details, and <strong>not</strong> your roster, schedule, or advice content. We use this
        information only to give you the access you paid for, to restore purchases on a new
        device, and to handle support and refund requests.
      </p>
      <p>
        Cancelling and refunds are covered in our{" "}
        <a className="text-gold underline decoration-gold/40" href="/terms">terms</a> and{" "}
        <a className="text-gold underline decoration-gold/40" href="/refund-policy">
          refund policy
        </a>
        .
      </p>

      <h2>Personalised advice and AI</h2>
      <p>
        Some of VÉLA&rsquo;s personalised guidance is produced with the help of a{" "}
        <strong>large language model (LLM)</strong>. This happens on our backend, hosted by{" "}
        <strong>Supabase</strong>: the app sends your planning context to our own secure
        function, which builds a prompt and calls an LLM provider — currently{" "}
        <strong>Google (Gemini)</strong>, with <strong>Anthropic (Claude)</strong> as an
        alternative — and returns the wording to your app.
      </p>
      <p>
        <strong>What is sent.</strong> Only the context needed to write the advice: your
        roster and schedule context (flight times, airports, duty and rest periods, time-zone
        shifts) and your planning preferences (for example chronotype, target sleep hours, and
        caffeine cut-off), together with the app&rsquo;s own calculated body-clock estimates.
      </p>
      <p>
        <strong>What is not sent.</strong> Your password, or any password (we never have access
        to your password in any form), your name, your email address, your payment details, and
        your account identifier are <strong>not</strong> included in the prompt sent to the LLM
        provider. Your account is checked for a valid session and an active subscription before
        the request runs, but that check happens on our backend and the identifier used is
        stored only in one-way hashed form in our own logs. We do not permit the LLM provider to
        use your content to train its models.
      </p>
      <p>
        <strong>The output is generated, not human-written.</strong> Advice text produced this
        way is generated automatically by a language model. It is general lifestyle and
        wellness information based on your schedule and published sleep science — it is{" "}
        <strong>not medical advice</strong>, not a diagnosis, not written or reviewed by a
        clinician before you see it, and not operational or regulatory guidance. Generated text
        can be wrong or incomplete. Always use your own judgement, follow your airline&rsquo;s
        procedures, and consult a qualified professional for medical concerns. If a piece of
        generated advice looks wrong, offensive, or unsafe, please tell us at{" "}
        <a className="text-gold underline decoration-gold/40" href="mailto:founder@velaforcrew.com">
          founder@velaforcrew.com
        </a>{" "}
        so we can investigate.
      </p>

      <h2>Information sharing</h2>
      <p>
        We share your information only in the following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers</strong> — we use third-party infrastructure providers to
          operate the service:
          <ul>
            <li>
              <strong>Google Firebase</strong> — sign-in and account management (Firebase
              Authentication), storage of your account, roster, and settings (Firestore),
              crash reports (Crashlytics), and performance diagnostics (Performance
              Monitoring) for the mobile app.
            </li>
            <li>
              <strong>Supabase</strong> — our backend. It hosts the advice function described
              above (including the call to the LLM provider), roster enrichment and lookup
              services, product-usage analytics for the app, and storage of survey responses
              and waitlist sign-ups from the website.
            </li>
            <li>
              <strong>Google (Gemini) / Anthropic (Claude)</strong> — the large language model
              providers our backend calls to write personalised advice. They receive the
              roster and preference context described in &ldquo;Personalised advice and
              AI&rdquo; above, and no account, contact, or payment details.
            </li>
            <li>
              <strong>RevenueCat</strong> — subscription status and entitlement management, so
              the app knows which features to unlock. See &ldquo;Subscriptions and
              payments&rdquo; above.
            </li>
            <li>
              <strong>Google Play Billing, Apple App Store billing, and Paddle</strong> — the
              payment platforms that process subscription purchases. They hold your payment
              details; we do not.
            </li>
            <li>
              <strong>MailerLite</strong> — email delivery for early access and waitlist
              communications. Only subscribers who have explicitly signed up receive emails.
            </li>
            <li>
              <strong>AeroDataBox</strong> — a public flight data API used to look up route
              and timing information from a flight number. Only the flight number is sent;
              no personal data is transmitted.
            </li>
            <li>
              <strong>Vercel</strong> — website hosting and pseudonymous web analytics.
            </li>
          </ul>
          These providers process data on our behalf under their own privacy and security
          standards.
        </li>
        <li>
          <strong>Legal requirements</strong> — we may disclose information if required by law,
          regulation, or valid legal process.
        </li>
        <li>
          <strong>Business transfers</strong> — if VÉLA is acquired or merges with another
          entity, your information may transfer as part of that transaction. We will notify you
          of any such change.
        </li>
      </ul>
      <p>
        We do not share your roster or schedule data with your employer, airline, or any
        regulatory authority unless required by law.
      </p>

      <h2>Independence from your airline</h2>
      <p>
        VÉLA has no connection to your airline, employer, or any aviation authority — and
        that is by design.
      </p>
      <ul>
        <li>We do not request, access, or store any internal airline systems data, crew management data, scheduling system data, or operational information.</li>
        <li>We do not ask for your employee ID, crew ID, staff number, or any airline-issued credential.</li>
        <li>We do not share any information with your airline, employer, union, regulator, or any third party acting on their behalf.</li>
        <li>Your use of VÉLA is entirely private. No one at your airline can see that you use it, what your schedule looks like in the app, or what the app estimates for you.</li>
        <li>VÉLA is not affiliated with, endorsed by, or integrated into any airline&rsquo;s systems or Fatigue Risk Management programme.</li>
      </ul>
      <p>
        The only flight information VÉLA retrieves externally is public route and timing data
        looked up by flight number (see &ldquo;Schedule and roster data&rdquo; above). This
        is the same information available on any public flight tracker.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain your account information and schedule data for as long as your account is
        active. Survey responses are retained indefinitely in anonymised form for product
        research. Waitlist and early access contact details are retained until you unsubscribe
        or request deletion. You may request deletion of your account and associated data at
        any time (see &ldquo;Your choices&rdquo; below). Subscription and transaction records
        are retained by our payment platforms and by RevenueCat for as long as required for
        billing, tax, and accounting purposes, even after an account is deleted. Aggregated
        analytics data that cannot
        identify you individually may be retained for longer to support product improvement.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          <strong>Account deletion</strong> — you can delete your account and associated data
          at any time from within the app, under Settings. Deletion is permanent and cannot be
          undone. You can also request deletion without opening the app by emailing{" "}
          <a className="text-gold underline decoration-gold/40" href="mailto:founder@velaforcrew.com">
            founder@velaforcrew.com
          </a>{" "}
          or using the{" "}
          <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
          Deleting your account does not automatically cancel a subscription bought through
          Google Play, the App Store, or this website — cancel that in your store subscription
          settings or via the manage-subscription link in your receipt.
        </li>
        <li>
          <strong>Research data</strong> — the optional &ldquo;Help improve future
          guidance&rdquo; toggle in the app&rsquo;s Data use notice is off unless you turn it
          on, and you can turn it off again at any time.
        </li>
        <li>
          <strong>Access and correction</strong> — you can update your account details and
          schedule information at any time within the app.
        </li>
        <li>
          <strong>Unsubscribe</strong> — every email we send includes an unsubscribe link.
          You can also contact us directly to be removed from any mailing list.
        </li>
        <li>
          <strong>Analytics opt-out</strong> — where platform controls allow, you can limit
          analytics collection. This does not affect core app functionality.
        </li>
        <li>
          <strong>Regional rights</strong> — depending on your location, you may have
          additional rights under applicable privacy law (for example, GDPR in the European
          Economic Area, or UK GDPR). Contact us to exercise those rights.
        </li>
      </ul>

      <h2>Children</h2>
      <p>
        VÉLA is intended for adults. We do not knowingly collect personal information from
        anyone under the age of 16. If you believe we have inadvertently collected such
        information, please contact us and we will delete it promptly.
      </p>

      <h2>Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect your information.
        No system is completely secure; we encourage you to use a strong password and to
        contact us if you notice any suspicious activity related to your account.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the date at
        the top of this page. For material changes, we will provide notice through the app or
        by email where we have your address.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, account deletion requests, or to exercise your data
        rights, contact us at{" "}
        <a className="text-gold underline decoration-gold/40" href="mailto:founder@velaforcrew.com">
          founder@velaforcrew.com
        </a>{" "}
        or via the{" "}
        <a className="text-gold underline decoration-gold/40" href="/support">support page</a>.
      </p>
      <p>
        Vela4Crew Inc., 131 Continental Dr, Suite 305, Newark, DE 19713, USA.
      </p>

      <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.15em] text-inkFaint">
        Version 2.1 — 27 July 2026
      </p>
    </article>
  );
}
