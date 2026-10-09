import type { Metadata } from "next";
import Link from "next/link";
import { FullBleed } from "@/components/FullBleed";
import { Cite } from "./Cite";
import {
  HeroRings,
  HowItWorksSteps,
  ScienceChart,
  EastWestClock,
  LightStrip,
  PlanTiles,
} from "./illustrations";

const PAGE_URL = "https://velaforcrew.com/how-vela-works";

export const metadata: Metadata = {
  title: "How VÉLA Works: The Science Behind Your Body-Clock Plan",
  description:
    "How VÉLA estimates your body clock from your roster: the sleep science behind it, how it plans sleep, light, caffeine and meals for crew, and what it can and can't do.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "How VÉLA Works — The Science Behind Your Body-Clock Plan",
    description:
      "How VÉLA estimates your body clock from your roster: the sleep science behind it, how it plans sleep, light, caffeine and meals for crew, and what it can and can't do.",
    url: PAGE_URL,
    type: "article",
  },
};

const sources = [
  {
    id: 1,
    text: "Borbély AA. A two process model of sleep regulation. Human Neurobiology, 1982;1:195–204.",
  },
  {
    id: 2,
    text: "Daan S, Beersma DG, Borbély AA. Timing of human sleep: recovery process gated by a circadian pacemaker. American Journal of Physiology, 1984;246:R161–R183.",
  },
  {
    id: 3,
    text: "Åkerstedt T, Folkard S. Validation of the S and C components of the three-process model of alertness regulation. Sleep, 1995;18(1):1–6.",
  },
  {
    id: 4,
    text: "Borbély AA, Daan S, Wirz-Justice A, Deboer T. The two-process model of sleep regulation: a reappraisal. Journal of Sleep Research, 2016;25(2):131–143.",
  },
  {
    id: 5,
    text: "Khalsa SBS, Jewett ME, Cajochen C, Czeisler CA. A phase response curve to single bright light pulses in human subjects. Journal of Physiology, 2003;549(3):945–952.",
    href: "https://physoc.onlinelibrary.wiley.com/doi/10.1113/jphysiol.2003.040477",
  },
  {
    id: 6,
    text: "Centers for Disease Control and Prevention. CDC Yellow Book: Jet Lag Disorder.",
    href: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How VÉLA Works: The Science Behind Your Body-Clock Plan",
  description:
    "How VÉLA estimates a cabin crew member's body clock from their roster, and the sleep science behind its sleep, light, caffeine and meal guidance.",
  url: PAGE_URL,
  datePublished: "2026-10-03",
  author: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  publisher: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  citation: sources.map((s) => ({
    "@type": "CreativeWork",
    name: s.text,
    ...(s.href ? { url: s.href } : {}),
  })),
};

const lightCard = (
  <div className="not-prose rounded-xl border border-warmLine bg-cream overflow-hidden my-6 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-warmLine">
    <div className="p-5">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2">
        Shift earlier &mdash; usually flying east
      </p>
      <p className="font-sans text-sm text-inkMid leading-relaxed">
        Get bright light after you wake, and avoid bright light before you sleep.
      </p>
    </div>
    <div className="p-5">
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mb-2">
        Shift later &mdash; usually flying west
      </p>
      <p className="font-sans text-sm text-inkMid leading-relaxed">
        Get light before you sleep, and avoid it after you wake.
      </p>
    </div>
  </div>
);

const questions: { id: string; q: string; answer: React.ReactNode }[] = [
  {
    id: "predicts",
    q: "What does VÉLA actually predict?",
    answer: (
      <>
        <p>
          VÉLA keeps track of your <strong>body time</strong>: what time your body thinks it is,
          which after a few sectors is often very different from the clock on the wall. It
          projects that forward through your roster, using your duties, the rest you&apos;re
          likely to get, your profile and anything you tell it after each trip.
        </p>
        <p>
          From there it estimates two things: where your body clock will be at each point in your
          roster, and how fatigued you&apos;re likely to be. It then plans what to do between now
          and your next duty to close the gap.
        </p>
      </>
    ),
  },
  {
    id: "model",
    q: "What model is VÉLA based on?",
    answer: (
      <>
        <p>
          VÉLA is built on the <strong>Three Process Model of alertness</strong>, a
          well-established framework from sleep science.<Cite n={[1, 2, 3, 4]} /> It describes
          alertness as the combination of three things:
        </p>
        <ul>
          <li>
            <strong>Your body clock (circadian rhythm).</strong> Your internal 24-hour cycle, with
            a natural low point in the early hours of your body&apos;s night.
          </li>
          <li>
            <strong>Sleep pressure.</strong> The need for sleep that builds the longer you&apos;re
            awake and clears when you sleep. Being on duty adds to how quickly it builds.
          </li>
          <li>
            <strong>Sleep inertia.</strong> The groggy period just after you wake up, before
            you&apos;re fully alert.
          </li>
        </ul>
        <p>
          VÉLA applies these principles with its own planning approach, designed around crew
          rosters.
        </p>
      </>
    ),
  },
  {
    id: "adjustment-speed",
    q: "How fast does VÉLA assume your body clock adjusts?",
    answer: (
      <>
        <p>
          Research suggests most people&apos;s body clock can shift by roughly an hour a day when
          it needs to move earlier (usually flying east), and a little faster when it needs to
          move later (usually flying west).<Cite n={[6]} /> VÉLA uses typical rates like these as
          a starting point, then adapts them to you.
        </p>
        <p>
          It also looks at how much time you have before your next duty and how far your body
          clock needs to move. If there isn&apos;t enough time to get all the way there, it tells
          you, rather than pretending you&apos;ll be fully adjusted.
        </p>
      </>
    ),
  },
  {
    id: "east-harder",
    q: "Why is flying east harder?",
    answer: (
      <p>
        Shifting your body clock earlier (flying east) is slower than shifting it later (flying
        west).<Cite n={[6]} /> Going to sleep earlier than your body expects is harder than
        staying up later, so VÉLA gives eastbound trips more time to adjust.
      </p>
    ),
  },
  {
    id: "personalise",
    q: "What does VÉLA personalise?",
    answer: (
      <>
        <p>VÉLA adjusts your plan for:</p>
        <ul>
          <li>Whether you&apos;re an early bird or a night owl</li>
          <li>Your age</li>
          <li>How long you like to sleep, and when</li>
          <li>How quickly you know you tend to adjust</li>
          <li>How sensitive you are to caffeine</li>
        </ul>
        <p>Your plan becomes more personal as you tell VÉLA how your trips actually went.</p>
      </>
    ),
  },
  {
    id: "sleep",
    q: "How does VÉLA plan your sleep?",
    answer: (
      <p>
        VÉLA plans your sleep within the rest your roster actually gives you. It considers how
        much sleep you&apos;ve been missing, when your body is most ready to sleep, which way your
        body clock needs to move and how long you have before your next duty, then suggests when
        to sleep and when a nap would help.
      </p>
    ),
  },
  {
    id: "light",
    q: "How does VÉLA time light exposure?",
    answer: (
      <>
        <p>
          Light is the strongest signal your body clock responds to, and its effect depends on
          timing.<Cite n={[5, 6]} />
        </p>
        {lightCard}
        <p>
          VÉLA turns this into specific times to seek or avoid light, fitted around your sleep and
          duties.
        </p>
      </>
    ),
  },
  {
    id: "caffeine",
    q: "How does VÉLA time caffeine?",
    answer: (
      <p>
        Caffeine stays in your system for hours, so when you have it matters as much as how much.
        VÉLA suggests when to have your last caffeine so it doesn&apos;t get in the way of your
        next sleep, adjusted for how sensitive you are to it.
      </p>
    ),
  },
  {
    id: "meals",
    q: "How does VÉLA time meals?",
    answer: (
      <p>
        Meal guidance follows your body time, not local time. VÉLA suggests when to eat and when
        to simply hydrate, so your meals fit around your body clock, your sleep and your duties.
        Our{" "}
        <Link
          href="/briefs/eating-across-time-zones"
          className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Eating Across Time Zones
        </Link>{" "}
        brief goes into more detail.
      </p>
    ),
  },
  {
    id: "feedback",
    q: "How does your feedback change the plan?",
    answer: (
      <p>
        After a trip, you can tell VÉLA how your sleep actually went and whether you managed to
        follow the light advice. VÉLA then updates your body clock estimate and your upcoming plan
        from what really happened, rather than assuming everything went to plan.
      </p>
    ),
  },
];

export default function HowVelaWorks() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <FullBleed className="bg-parchment pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            The science
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-light text-ink mb-5 leading-tight border-b-2 border-gold pb-4 inline-block">
            How VÉLA works
          </h1>
          <p className="font-sans text-lg text-inkMid">
            VÉLA turns your roster into a plan for your body clock.
          </p>
        </div>
        <div className="mt-10 md:mt-12">
          <HeroRings />
        </div>
      </FullBleed>

      {/* HOW IT WORKS */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-10">
            How it works
          </p>
          <HowItWorksSteps />
        </div>
      </FullBleed>

      {/* THE SCIENCE */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="text-center font-sans text-base text-inkMid mb-10">
            Built on the Three Process Model of alertness.
            <Cite n={[1, 2, 3, 4]} />
          </p>
          <ScienceChart />
        </div>
      </FullBleed>

      {/* EAST VS WEST */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <EastWestClock />
        </div>
      </FullBleed>

      {/* LIGHT */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <LightStrip />
        </div>
      </FullBleed>

      {/* WHAT IT PLANS */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-10">
            What it plans
          </p>
          <PlanTiles />
        </div>
      </FullBleed>

      {/* QUESTIONS ABOUT THE SCIENCE */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-8">
            Questions about the science
          </p>
          <div className="divide-y divide-warmLine">
            {questions.map((item) => (
              <details key={item.id} className="group py-1">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none min-h-11">
                  <h2 className="font-display text-xl md:text-2xl font-light text-ink">
                    {item.q}
                  </h2>
                  <span className="flex-shrink-0 font-mono text-xl text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="prose-vela pb-6">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* SMALL PRINT */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="not-prose rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-parchment/50 px-6 py-6">
            <h2 className="font-display text-xl font-light text-ink mb-3">
              What are VÉLA&apos;s limits?
            </h2>
            <ul className="list-disc pl-5 space-y-2 font-sans text-sm leading-relaxed text-inkMid">
              <li>
                Your body clock is estimated from your roster and what you tell VÉLA, not
                measured. VÉLA doesn&apos;t need blood tests or a wearable.
              </li>
              <li>
                Everyone adjusts differently. Light, cabin conditions, medication, genetics and the
                route itself all play a part,<Cite n={[6]} /> so treat VÉLA&apos;s plan as
                guidance and listen to your body.
              </li>
              <li>
                VÉLA follows the same principles as aviation fatigue management, but it isn&apos;t
                an approved airline fatigue risk management system and doesn&apos;t certify fitness
                for duty.
              </li>
            </ul>

            <h2 className="font-display text-xl font-light text-ink mt-8 mb-3">
              What research is VÉLA built on?
            </h2>
            <p className="font-sans text-sm text-inkMid leading-relaxed mb-4">
              VÉLA&apos;s approach draws on established sleep and body-clock research, including:
            </p>
            <details id="sources-panel" className="group">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.15em] text-gold inline-flex items-center gap-2 min-h-11">
                Sources (6)
                <span className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <ol className="mt-3 divide-y divide-warmLine">
                {sources.map((s) => (
                  <li
                    key={s.id}
                    id={`source-${s.id}`}
                    className="font-sans text-sm leading-relaxed text-inkMid py-2"
                  >
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-gold transition-colors"
                      >
                        {s.text}
                      </a>
                    ) : (
                      s.text
                    )}
                  </li>
                ))}
              </ol>
            </details>

            <p className="mt-6 font-sans text-xs text-inkFaint">
              VÉLA provides personal planning insights based on your roster. It isn&apos;t medical
              advice or a medical device, and doesn&apos;t replace your airline&apos;s
              fatigue-management requirements.{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-inkMid transition-colors"
              >
                Full details
              </Link>
            </p>
          </div>
        </div>
      </FullBleed>

      {/* CLOSING CTA — navy, for rhythm */}
      <FullBleed className="bg-night py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8 flex flex-wrap items-center gap-4">
          <Link
            href="/early-access"
            className="inline-block rounded-xl bg-gold px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink font-semibold transition-colors hover:bg-goldSoft"
          >
            Get early access
          </Link>
          <Link
            href="/research/crew-fatigue-survey-2026"
            className="font-mono text-xs uppercase tracking-[0.12em] text-cream/80 underline underline-offset-2 hover:text-gold transition-colors"
          >
            Read what 93 crew told us →
          </Link>
        </div>
      </FullBleed>
    </div>
  );
}
