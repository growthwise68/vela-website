"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { organization, mobileApplication } from "@/lib/structured-data";
import { BodyClockTimeline } from "@/components/preview/BodyClockTimeline";
import { PhoneFrame } from "@/components/preview/PhoneFrame";

export default function PreviewHomeClient() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            { "@context": "https://schema.org", ...organization },
            { "@context": "https://schema.org", ...mobileApplication },
          ]),
        }}
      />

      {/* HERO SECTION — split layout: copy left, timeline right on desktop */}
      <section className="w-full py-20 md:py-28 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-gold mb-6 font-semibold">
                By crew, for crew
              </p>
              <h1 className="font-display text-6xl md:text-7xl font-light leading-tight text-ink mb-6">
                Your roster, mapped before you fly it.
              </h1>
              <p className="font-sans text-xl md:text-2xl font-light text-inkMid mx-auto md:mx-0 max-w-2xl mb-8 leading-relaxed">
                <strong className="font-medium text-ink">VÉLA is a body-clock planning app for long-haul cabin crew.</strong>{" "}
                It turns your roster into a personalised body-clock plan, showing what your body clock will be doing — duty by duty,
                timezone by timezone — with sleep, light, caffeine and meal timing for every trip.
                Built by crew, because someone had to.
              </p>
              <Link
                href="/early-access"
                className="inline-block px-8 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-all hover:scale-105"
              >
                Get Early Access
              </Link>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mt-4">
                VÉLA is currently in early access — join now to be first when it&rsquo;s ready.
              </p>
            </div>

            <div className="hidden md:block">
              <BodyClockTimeline size="large" />
            </div>
          </div>

          {/* Mobile: timeline below the CTA */}
          <div className="md:hidden mt-14">
            <BodyClockTimeline size="large" />
          </div>
        </div>
      </section>

      {/* KEY FACTS SECTION */}
      <section className="w-full py-10 md:py-14 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-gold font-semibold text-center mb-8">
            At a glance
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-ink/10 border-t border-ink/10 md:border-t-0">
            {[
              { label: "Who it's for", line: <>Long-haul cabin crew, built by cabin crew</> },
              { label: "Adding duties", line: <>Date and flight number. Any airline with public flight numbers</> },
              { label: "What it follows", line: <>Your whole roster, days off included, not just one trip</> },
              { label: "What it plans", line: <>Sleep, light, caffeine and meals for every duty and layover</> },
              {
                label: "The science",
                line: (
                  <>
                    <Link
                      href="/how-vela-works"
                      className="text-inkMid underline decoration-gold/50 underline-offset-2 hover:text-gold hover:opacity-100 transition-colors"
                    >
                      Three Process Model of alertness
                    </Link>
                    , CDC adjustment rates
                  </>
                ),
              },
              { label: "What you get", line: <>Estimates, not measurements. Not a medical device</> },
              { label: "Your data", line: <>Independent of any airline. Private to your account</> },
              { label: "Availability", line: <>iPhone and Android, in early access</> },
            ].map((fact, i) => (
              <div key={i} className="px-4 py-5 border-b border-ink/10 md:border-b-0">
                <dt className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold">
                  {fact.label}
                </dt>
                <dd className="font-sans text-sm md:text-base text-inkMid leading-snug mt-2">
                  {fact.line}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* PROBLEM SECTION — navy "night" band, phone frame replaces carousel */}
      <section className="w-full py-20 md:py-32 bg-night">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6 border-b-2 border-gold pb-4">
                Your job breaks your body&rsquo;s clock
              </h2>
              <p className="font-sans text-xl md:text-2xl text-cream/80 mb-6 leading-relaxed">
                The galley at 3am. The jumpseat during taxi. The layover that should have been a city but was
                just blackout curtains and room service. You know the feeling. What&rsquo;s been missing is
                something that tells you what to do about it — before you&rsquo;re already in it.
              </p>
              <p className="font-sans text-xl md:text-2xl text-cream/80 leading-relaxed">
                VÉLA reads your roster and shows you what your body clock will be doing, duty by duty.
                Not after the fact. Before you even pack your bag.
              </p>
            </div>

            <PhoneFrame />
          </div>
        </div>
      </section>

      {/* KNOWLEDGE SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Your body clock has a logic. VÉLA speaks it.
          </h2>
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-8 pl-4 border-l-2 border-gold leading-relaxed">
            Every time you feel wrecked after a short trip, or strangely fine after a long one — that&rsquo;s
            your circadian rhythm doing something specific and predictable.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed">
            It&rsquo;s not random. It&rsquo;s not just &ldquo;jet lag.&rdquo; And it&rsquo;s not something you have to keep
            figuring out alone. VÉLA combines your actual roster with published circadian science
            — and translates it into something you can actually use.
            No jargon. No guesswork. Just your body clock, made readable.
          </p>

          <div className="mb-10 max-w-md mx-auto">
            <BodyClockTimeline size="small" />
          </div>

          <div className="mb-6 preview-gold-swiper">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">DXB&ndash;JFK</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Your DXB&ndash;JFK pattern pushes your low point to 04:00 body time on day two.
                    Here&rsquo;s what that means for your layover.
                  </p>
                  <div className="w-full max-w-md h-32 bg-white rounded-lg shadow-sm border-l-4 border-gold flex items-end justify-around px-4 py-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-16 w-4 bg-gold rounded-t"></div>
                      <span className="text-xs">Day 1</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-8 w-4 bg-gold/60 rounded-t"></div>
                      <span className="text-xs">Day 2</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-4 w-4 bg-gold/30 rounded-t"></div>
                      <span className="text-xs">Day 3</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-6 w-4 bg-gold/40 rounded-t"></div>
                      <span className="text-xs">Day 4</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-20 w-4 bg-gold rounded-t"></div>
                      <span className="text-xs">Day 5</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Flying East</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Flying east is harder than flying west. Here&rsquo;s exactly why your Melbourne turns
                    always hit differently — and what to do before you land.
                  </p>
                  <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-xs font-semibold text-ink">Optimal Sleep: 22:00&ndash;06:00</p>
                      <p className="text-xs text-inkMid">Aligns with your rhythm on Day 3</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-xs font-semibold text-ink">Light Exposure: 08:00</p>
                      <p className="text-xs text-inkMid">Reset circadian rhythm eastward</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-xs font-semibold text-ink">Recovery Priority: Sleep first</p>
                      <p className="text-xs text-inkMid">Fatigue debt highest first 12 hours</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Your Day Off</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Your body clock didn&rsquo;t reset on your day off. VÉLA shows you where it actually
                    is before your next duty starts.
                  </p>
                  <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Body clock position:</strong> Still 4 hours behind home time</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Next duty in:</strong> 18 hours — partial recovery window</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Recommended:</strong> Sleep before 23:00, light at 07:30</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* SUGGESTIONS SECTION — asymmetric split, cards stacked right */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
                Know what&rsquo;s coming. Know what to do.
              </h2>
              <p className="font-sans text-xl text-inkMid leading-relaxed">
                Most crew go into every trip reacting. VÉLA puts you a step ahead. Upload your roster and
                VÉLA gives you a clear picture of what your body clock will need — and when. Simple,
                specific, and built around your actual schedule. Not generic advice. Yours.
              </p>
            </div>
            <div className="space-y-5">
              <div className="bg-parchment/60 border-l-2 border-gold rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-3xl text-ink mb-3">Sleep Timing</h3>
                <p className="font-sans text-lg text-inkMid leading-relaxed">
                  Your estimated best sleep window before Day 3 duty is 22:00&ndash;06:00. Planning around it
                  can help you feel more rested for the jumpseat.
                </p>
              </div>
              <div className="bg-parchment/60 border-l-2 border-gold rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-3xl text-ink mb-3">Light Exposure</h3>
                <p className="font-sans text-lg text-inkMid leading-relaxed">
                  Tomorrow at 07:00, get outside. Ten minutes of morning light after that overnight sector
                  will start pulling your body clock back where it belongs.
                </p>
              </div>
              <div className="bg-parchment/60 border-l-2 border-gold rounded-xl p-6 shadow-sm">
                <h3 className="font-display text-3xl text-ink mb-3">Recovery Priority</h3>
                <p className="font-sans text-lg text-inkMid leading-relaxed">
                  You just landed. Your body is asking for one thing right now — and it isn&rsquo;t the hotel
                  gym. Sleep first. Everything else can wait 12 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT BY CREW SECTION */}
      <section className="w-full pt-20 md:pt-32 pb-12 md:pb-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Built by crew.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed">
            This is where VÉLA came from. Not a strategy session. A crew member who got tired of
            asking the same questions as everyone else — and getting nothing back.
          </p>
          <div className="relative bg-cream rounded-2xl p-8 md:p-12 mb-8 border border-warmLine">
            <span
              aria-hidden="true"
              className="absolute top-4 left-6 font-display text-gold text-7xl md:text-8xl leading-none select-none"
            >
              &ldquo;
            </span>
            <div className="relative pt-10 md:pt-8 pl-2 border-l-2 border-gold">
              <p className="font-display text-2xl md:text-3xl text-ink mb-6 leading-relaxed pl-6">
                Early in my flying career, I was struggling to adjust to the job. Not the service. Not
                the passengers. The schedule. What it was doing to my body, my sleep, my life outside the
                aircraft.
              </p>
              <p className="font-display text-2xl md:text-3xl text-ink mb-6 leading-relaxed pl-6">
                I remember thinking — why has no one built something for this? Why does no one have our backs?
              </p>
              <p className="font-display text-2xl md:text-3xl text-ink mb-6 leading-relaxed pl-6">
                So I decided to build it myself. Using what I was living, and what crew around me were telling
                me. VÉLA exists because that question had no answer.
              </p>
              <p className="font-display text-2xl md:text-3xl text-ink mb-8 leading-relaxed pl-6">
                But I can only see so far from where I&rsquo;m standing. Now I need you too.&rdquo;
              </p>
            </div>
            <p className="font-sans text-base text-inkMid pl-8">
              — A crew member who got tired of being tired
            </p>
          </div>

          {/* Survey CTA — continuation of founder quote */}
          <div className="pt-8">
            <p className="font-sans text-xl md:text-2xl text-ink leading-relaxed mb-4">
              VÉLA started with my own struggle — and it&rsquo;s kept growing because of yours too.
              That hasn&rsquo;t changed. It&rsquo;s still how VÉLA gets built.
            </p>
            <p className="font-sans text-xl md:text-2xl text-ink leading-relaxed">
              <Link
                href="/survey"
                className="text-gold underline underline-offset-2 hover:text-goldSoft hover:opacity-100 transition-colors"
              >
                Take the 3-minute survey
              </Link>{" "}
              → <span className="text-inkMid">(completely anonymous)</span>
            </p>
            <p className="font-sans text-xl md:text-2xl text-inkMid leading-relaxed mt-4">
              <Link
                href="/research/crew-fatigue-survey-2026"
                className="text-gold underline underline-offset-2 hover:text-goldSoft hover:opacity-100 transition-colors"
              >
                Read what 93 crew told us →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION — navy "night" band */}
      <section className="w-full py-20 md:py-32 bg-night">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            Your roster. Your body clock. Finally, both in one place.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop reacting. Start preparing. Use your layovers. Show up for your life outside the aircraft.
          </p>
          <Link
            href="/early-access"
            className="inline-block px-8 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Get Early Access
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-cream/60 mt-4">
            VÉLA is currently in early access — join now to be first when it&rsquo;s ready.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "What is VÉLA?", acceptedAnswer: { "@type": "Answer", text: "VÉLA is a body-clock planning app for long-haul cabin crew. It turns your roster into a personalised body-clock plan, showing what your body clock will be doing on every duty, layover and day off, with sleep, light, caffeine and meal timing for every trip." } },
                { "@type": "Question", name: "Who is VÉLA for?", acceptedAnswer: { "@type": "Answer", text: "Long-haul cabin crew whose rosters cross time zones, with early reports, night sectors and back-to-back trips. It's built around how crew actually work, not around a single holiday flight." } },
                { "@type": "Question", name: "How is VÉLA different from a jet lag app?", acceptedAnswer: { "@type": "Answer", text: "Jet lag apps plan one trip and assume you recover afterwards. Crew rarely do: the next trip starts before your body clock has caught up. VÉLA follows your body clock across your whole roster, including days off, so each plan starts from where your body actually is." } },
                { "@type": "Question", name: "How does VÉLA get my roster?", acceptedAnswer: { "@type": "Answer", text: "You add each duty by entering the date and flight number. VÉLA looks up the departure and arrival times and airports automatically, so there's no need to upload your full roster." } },
                { "@type": "Question", name: "Does it work with my airline?", acceptedAnswer: { "@type": "Answer", text: "Yes, if your airline uses public flight numbers. VÉLA works with any airline's flights, so it isn't limited to one carrier." } },
                { "@type": "Question", name: "Is VÉLA based on science?", acceptedAnswer: { "@type": "Answer", text: "Yes. VÉLA is built on the Three Process Model of alertness from sleep science, with body-clock adjustment rates from CDC jet lag guidance, and shaped by what crew told us about their own experience. Read how VÉLA works at https://velaforcrew.com/how-vela-works." } },
                { "@type": "Question", name: "Is VÉLA medical advice?", acceptedAnswer: { "@type": "Answer", text: "No. VÉLA gives personal planning insights based on your roster. It isn't medical advice and doesn't replace your airline's fatigue-management requirements." } },
                { "@type": "Question", name: "Can my airline see my data?", acceptedAnswer: { "@type": "Answer", text: "No. VÉLA is independent and not affiliated with any airline. You only enter dates and flight numbers, and your data stays private to your account." } },
                { "@type": "Question", name: "Why is flying east harder than flying west?", acceptedAnswer: { "@type": "Answer", text: "Your body clock naturally runs slightly longer than 24 hours, so it finds it easier to stay up later (flying west) than to go to sleep earlier (flying east). Eastbound trips ask your body to shift in the direction it resists most." } },
                { "@type": "Question", name: "How much does VÉLA cost?", acceptedAnswer: { "@type": "Answer", text: "VÉLA Core is $14.99 a month or $139.99 a year. Founding Crew members get the annual plan for $99.99 a year, locked in for as long as they stay subscribed. All plans include a 14-day free trial." } },
                { "@type": "Question", name: "When can I get VÉLA?", acceptedAnswer: { "@type": "Answer", text: "VÉLA is in early access now. Join the list to be first in when it opens to everyone." } },
              ],
            }),
          }}
        />
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-10 border-b-2 border-gold pb-4">
            Questions crew ask
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "What is VÉLA?",
                a: <>VÉLA is a body-clock planning app for long-haul cabin crew. It turns your roster into a personalised body-clock plan, showing what your body clock will be doing on every duty, layover and day off, with sleep, light, caffeine and meal timing for every trip.</>,
              },
              {
                q: "Who is VÉLA for?",
                a: <>Long-haul cabin crew whose rosters cross time zones, with early reports, night sectors and back-to-back trips. It&rsquo;s built around how crew actually work, not around a single holiday flight.</>,
              },
              {
                q: "How is VÉLA different from a jet lag app?",
                a: <>Jet lag apps plan one trip and assume you recover afterwards. Crew rarely do: the next trip starts before your body clock has caught up. VÉLA follows your body clock across your whole roster, including days off, so each plan starts from where your body actually is.</>,
              },
              {
                q: "How does VÉLA get my roster?",
                a: <>You add each duty by entering the date and flight number. VÉLA looks up the departure and arrival times and airports automatically, so there&rsquo;s no need to upload your full roster.</>,
              },
              {
                q: "Does it work with my airline?",
                a: <>Yes, if your airline uses public flight numbers. VÉLA works with any airline&rsquo;s flights, so it isn&rsquo;t limited to one carrier.</>,
              },
              {
                q: "Is VÉLA based on science?",
                a: <>Yes. VÉLA is built on the Three Process Model of alertness from sleep science, with body-clock adjustment rates from CDC jet lag guidance, and shaped by what crew told us about their own experience.{" "}<Link href="/how-vela-works" className="text-gold underline underline-offset-2 hover:text-goldSoft hover:opacity-100 transition-colors">Read how VÉLA works</Link>.</>,
              },
              {
                q: "Is VÉLA medical advice?",
                a: <>No. VÉLA gives personal planning insights based on your roster. It isn&rsquo;t medical advice and doesn&rsquo;t replace your airline&rsquo;s fatigue-management requirements.</>,
              },
              {
                q: "Can my airline see my data?",
                a: <>No. VÉLA is independent and not affiliated with any airline. You only enter dates and flight numbers, and your data stays private to your account.</>,
              },
              {
                q: "Why is flying east harder than flying west?",
                a: <>Your body clock naturally runs slightly longer than 24 hours, so it finds it easier to stay up later (flying west) than to go to sleep earlier (flying east). Eastbound trips ask your body to shift in the direction it resists most.</>,
              },
              {
                q: "How much does VÉLA cost?",
                a: <><Link href="/pricing" className="text-gold underline underline-offset-2 hover:text-goldSoft hover:opacity-100 transition-colors">VÉLA Core</Link> is $14.99 a month or $139.99 a year. Founding Crew members get the annual plan for $99.99 a year, locked in for as long as they stay subscribed. All plans include a 14-day free trial.</>,
              },
              {
                q: "When can I get VÉLA?",
                a: <>VÉLA is in early access now. <Link href="/early-access" className="text-gold underline underline-offset-2 hover:text-goldSoft hover:opacity-100 transition-colors">Join the list</Link> to be first in when it opens to everyone.</>,
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-[18px] border border-warmLine bg-parchment/60 open:bg-parchment/80 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 list-none">
                  <h3 className="font-display text-xl font-light text-ink">{q}</h3>
                  <span className="flex-shrink-0 font-mono text-lg text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-6 pb-5 font-sans text-base text-inkMid leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
