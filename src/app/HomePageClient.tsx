"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { organization, mobileApplication } from "@/lib/structured-data";
import { FullBleed } from "@/components/FullBleed";
import { Wave } from "@/components/ui/Wave";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneFrame } from "@/components/home/PhoneFrame";
import { CircadianShiftDemo } from "@/components/home/CircadianShiftDemo";

// "At a glance" icons: 20px, ~1.5 stroke, gold outline by default. Each
// icon's main silhouette also carries `group-hover:fill-gold` so it shifts
// to a solid gold fill on hover (the cell div is the `group`); the wave's
// squiggle and the lock's shackle stay stroke-only and swap to cream so
// they stay visible once their badge shape fills.
function GlancePlaneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <path
        d="M2 11l16-7-6.5 16-2-7-7.5-2z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
    </svg>
  );
}
function GlanceStarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <path
        d="M10 1.5l2.5 5.8 6.2.5-4.7 4.1 1.5 6.1L10 14.9 4.5 18l1.5-6.1-4.7-4.1 6.2-.5L10 1.5z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
    </svg>
  );
}
function GlanceCalendarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" className="text-gold fill-none group-hover:fill-gold transition-colors duration-200">
        <rect x="3" y="5" width="14" height="12" rx="2" />
        <rect x="6.3" y="2.3" width="1.4" height="4" rx="0.7" />
        <rect x="12.3" y="2.3" width="1.4" height="4" rx="0.7" />
      </g>
    </svg>
  );
}
function GlanceRouteIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <path
        d="M10 19s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
    </svg>
  );
}
function GlanceMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinejoin="round"
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
    </svg>
  );
}
function GlanceWaveIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
      <path
        d="M5 10c1-2 2-2 3 0s2 2 3 0 2-2 3 0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.3}
        strokeLinecap="round"
        className="text-gold group-hover:text-cream transition-colors duration-200"
      />
    </svg>
  );
}
function GlanceLockIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <path
        d="M6 8.5V6a4 4 0 1 1 8 0v2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-gold"
      />
      <rect
        x="4"
        y="8.5"
        width="12"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth={1.5}
        className="text-gold fill-none group-hover:fill-gold transition-colors duration-200"
      />
    </svg>
  );
}
function GlancePhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <g stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" className="text-gold fill-none group-hover:fill-gold transition-colors duration-200">
        <rect x="5" y="2.5" width="10" height="15" rx="2" />
        <rect x="8.5" y="1.5" width="3" height="1.2" rx="0.6" />
      </g>
    </svg>
  );
}

const glanceFacts: { icon: () => React.ReactElement; label: string; value: React.ReactNode }[] = [
  { icon: GlancePlaneIcon, label: "For", value: "Long-haul cabin crew" },
  { icon: GlanceStarIcon, label: "Built by", value: "Cabin crew" },
  { icon: GlanceCalendarIcon, label: "You add", value: "Date + flight number" },
  { icon: GlanceRouteIcon, label: "It follows", value: "Your whole roster" },
  { icon: GlanceMoonIcon, label: "It plans", value: "Sleep · light · caffeine · meals" },
  {
    icon: GlanceWaveIcon,
    label: "The science",
    value: (
      <Link
        href="/how-vela-works"
        className="underline decoration-gold/50 underline-offset-2 hover:text-gold transition-colors"
      >
        Three Process Model
      </Link>
    ),
  },
  { icon: GlanceLockIcon, label: "Privacy", value: "Independent of any airline" },
  { icon: GlancePhoneIcon, label: "Available on", value: "iPhone & Android · early access" },
];

export default function HomePageClient() {
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

      {/* HERO + AT A GLANCE — one continuous band, no seam between them */}
      <FullBleed className="pt-20 md:pt-28 pb-10 md:pb-12 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[55fr_45fr] gap-12 md:gap-16 items-center">
            <div className="text-center md:text-left">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-gold mb-6 font-semibold">
                By crew, for crew
              </p>
              <h1 className="font-display text-6xl md:text-7xl font-light leading-tight text-ink mb-6">
                Your roster, mapped before you fly it.
              </h1>
              <p className="font-sans text-xl md:text-2xl font-light text-inkMid mx-auto md:mx-0 max-w-[640px] mb-8 leading-relaxed">
                <strong className="font-medium text-ink">VÉLA is a body-clock planning app for long-haul cabin crew.</strong>{" "}
                It turns your roster into a personalised body-clock plan, showing what your body clock will be doing — duty by duty,
                timezone by timezone — with sleep, light, caffeine and meal timing for every trip.
                Built by crew, because someone had to.
              </p>
              <CtaButton href="/early-access">Get Early Access</CtaButton>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mt-4">
                VÉLA is currently in early access — join now to be first when it&rsquo;s ready.
              </p>
            </div>

            <div className="hidden md:block md:min-w-[480px]">
              <Wave />
            </div>
          </div>

          {/* Mobile: timeline below the CTA */}
          <div className="md:hidden mt-14">
            <Wave />
          </div>
        </div>

        {/* AT A GLANCE — same container/max-width/padding as the hero above, so their left edges align */}
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 mt-10 md:mt-12">
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-gold font-semibold text-center mb-6 md:mb-8">
            VÉLA at a glance
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {glanceFacts.map((fact, i) => {
              const mobileLeft = i % 2 === 1;
              const mobileTop = i >= 2;
              const desktopLeft = i % 4 !== 0;
              const desktopTop = i >= 4;
              return (
                <div
                  key={fact.label}
                  className={`group flex flex-col items-start gap-2 px-4 md:px-2 py-6 md:py-5 min-h-[110px] md:min-h-[96px] border-ink/10 ${
                    mobileLeft ? "max-md:border-l" : ""
                  } ${mobileTop ? "max-md:border-t" : ""} ${desktopLeft ? "md:border-l" : ""} ${
                    desktopTop ? "md:border-t" : ""
                  }`}
                >
                  <fact.icon />
                  <dt className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
                    {fact.label}
                  </dt>
                  <dd className="font-sans text-base text-ink md:whitespace-nowrap">
                    {fact.value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </FullBleed>

      {/* PROBLEM SECTION — navy "night" band, runs edge to edge, phone frame replaces carousel */}
      <FullBleed className="py-20 md:py-32 bg-night">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[55fr_45fr] gap-12 md:gap-16 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6 border-b-2 border-gold pb-4">
                Your job breaks your body&rsquo;s clock
              </h2>
              <p className="font-sans text-xl md:text-2xl text-cream/80 mb-6 leading-relaxed max-w-[640px]">
                The galley at 3am. The jumpseat during taxi. The layover that should have been a city but was
                just blackout curtains and room service. You know the feeling. What&rsquo;s been missing is
                something that tells you what to do about it — before you&rsquo;re already in it.
              </p>
              <p className="font-sans text-xl md:text-2xl text-cream/80 leading-relaxed max-w-[640px]">
                VÉLA reads your roster and shows you what your body clock will be doing, duty by duty.
                Not after the fact. Before you even pack your bag.
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
              <PhoneFrame />
            </div>
          </div>
        </div>
      </FullBleed>

      {/* KNOWLEDGE SECTION */}
      <FullBleed className="py-20 md:py-32 bg-parchment">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4 max-w-[900px]">
            Your body clock has a logic. VÉLA speaks it.
          </h2>
          <p className="font-display text-2xl md:text-3xl italic text-ink mb-8 pl-4 border-l-2 border-gold leading-relaxed max-w-[640px]">
            Every time you feel wrecked after a short trip, or strangely fine after a long one — that&rsquo;s
            your circadian rhythm doing something specific and predictable.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed max-w-[640px]">
            It&rsquo;s not random. It&rsquo;s not just &ldquo;jet lag.&rdquo; And it&rsquo;s not something you have to keep
            figuring out alone. VÉLA combines your actual roster with published circadian science
            — and translates it into something you can actually use.
            No jargon. No guesswork. Just your body clock, made readable.
          </p>

          <div className="mb-6 max-w-2xl mx-auto gold-swiper">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              autoHeight={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[300px] flex flex-col items-center justify-center py-10 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">LHR&ndash;JFK</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Your LHR&ndash;JFK pattern pushes your low point to 04:00 body time on day two.
                    Here&rsquo;s what that means for your layover.
                  </p>
                  <CircadianShiftDemo />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[300px] flex flex-col items-center justify-center py-10 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Flying East</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Flying east is harder than flying west. Here&rsquo;s exactly why your Melbourne turns
                    always hit differently — and what to do before you land.
                  </p>
                  <div className="w-full max-w-md divide-y divide-ink/15">
                    <div className="py-3">
                      <div className="flex items-baseline justify-between gap-4 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                        <span className="font-sans text-base text-inkMid">Optimal Sleep</span>
                        <span className="font-mono text-base text-ink">22:00&ndash;06:00</span>
                      </div>
                      <p className="font-sans text-sm text-inkMid/70 mt-1">Aligns with your rhythm on Day 3</p>
                    </div>
                    <div className="py-3">
                      <div className="flex items-baseline justify-between gap-4 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                        <span className="font-sans text-base text-inkMid">Light Exposure</span>
                        <span className="font-mono text-base text-ink">08:00</span>
                      </div>
                      <p className="font-sans text-sm text-inkMid/70 mt-1">Reset circadian rhythm eastward</p>
                    </div>
                    <div className="py-3">
                      <div className="flex items-baseline justify-between gap-4 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                        <span className="font-sans text-base text-inkMid">Recovery Priority</span>
                        <span className="font-mono text-base text-ink">Sleep first</span>
                      </div>
                      <p className="font-sans text-sm text-inkMid/70 mt-1">Fatigue debt highest first 12 hours</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[300px] flex flex-col items-center justify-center py-10 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Your Day Off</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Your body clock didn&rsquo;t reset on your day off. VÉLA shows you where it actually
                    is before your next duty starts.
                  </p>
                  <div className="w-full max-w-md divide-y divide-ink/15">
                    <div className="flex items-baseline justify-between gap-4 py-3 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                      <span className="font-sans text-base text-inkMid">Body clock position</span>
                      <span className="font-sans text-base text-ink text-right max-[599px]:text-left">Still 4 hours behind home time</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                      <span className="font-sans text-base text-inkMid">Next duty in</span>
                      <span className="font-sans text-base text-ink text-right max-[599px]:text-left">18 hours &mdash; partial recovery window</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3 max-[599px]:flex-col max-[599px]:items-start max-[599px]:gap-0.5">
                      <span className="font-sans text-base text-inkMid">Recommended</span>
                      <span className="font-sans text-base text-ink text-right max-[599px]:text-left">Sleep before 23:00, light at 07:30</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </FullBleed>

      {/* SUGGESTIONS SECTION — asymmetric split, cards stacked right */}
      <FullBleed className="py-20 md:py-32 bg-cream">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
                Know what&rsquo;s coming. Know what to do.
              </h2>
              <p className="font-sans text-xl text-inkMid leading-relaxed max-w-[640px]">
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
      </FullBleed>

      {/* BUILT BY CREW SECTION */}
      <FullBleed className="pt-20 md:pt-32 pb-12 md:pb-16 bg-parchment">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Built by crew.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed max-w-[640px]">
            This is where VÉLA came from. Not a strategy session. A crew member who got tired of
            asking the same questions as everyone else — and getting nothing back.
          </p>
          <div className="relative bg-cream rounded-2xl p-8 md:p-12 mb-8 border border-warmLine max-w-3xl">
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
            <p className="font-sans text-xl md:text-2xl text-ink leading-relaxed mb-4 max-w-[640px]">
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
      </FullBleed>

      {/* FINAL CTA SECTION — navy "night" band, edge to edge */}
      <FullBleed className="py-20 md:py-32 bg-night">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light text-cream mb-6">
            Your roster. Your body clock. Finally, both in one place.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop reacting. Start preparing. Use your layovers. Show up for your life outside the aircraft.
          </p>
          <CtaButton href="/early-access">Get Early Access</CtaButton>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-cream/60 mt-4">
            VÉLA is currently in early access — join now to be first when it&rsquo;s ready.
          </p>
        </div>
      </FullBleed>

      {/* FAQ SECTION */}
      <FullBleed className="py-20 md:py-32 bg-cream">
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
        <div className="max-w-3xl mx-auto px-6 md:px-10">
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
      </FullBleed>
    </div>
  );
}
