import type { Metadata } from "next";
import Link from "next/link";
import { FullBleed } from "@/components/FullBleed";
import { Wave } from "@/components/ui/Wave";
import { TableOfContents } from "@/components/ui/TableOfContents";

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

function Cite({ n }: { n: number[] }) {
  return (
    <sup className="font-mono text-xs text-gold">
      {n.map((x, i) => (
        <span key={x}>
          {i > 0 && <span className="text-inkFaint">,</span>}
          <a href={`#source-${x}`} className="hover:underline underline-offset-1">
            {x}
          </a>
        </span>
      ))}
    </sup>
  );
}

function ChapterDivider({ n, label }: { n: string; label: string }) {
  return (
    <div className="not-prose flex items-center gap-4 mb-10">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold whitespace-nowrap">
        {n} &mdash; {label}
      </span>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  );
}

const keyNumbers = [
  { value: "3", label: "Processes of alertness" },
  { value: "4", label: "Levers: sleep, light, caffeine, meals" },
  { value: "Every", label: "Duty, layover and day off" },
  { value: "0", label: "Wearables needed" },
];

const tocItems = [
  { id: "predicts", label: "What VÉLA predicts" },
  { id: "model", label: "The model" },
  { id: "adjustment-speed", label: "Adjustment speed" },
  { id: "east-harder", label: "Why east is harder" },
  { id: "personalise", label: "Personalisation" },
  { id: "sleep", label: "Sleep" },
  { id: "light", label: "Light" },
  { id: "caffeine", label: "Caffeine" },
  { id: "meals", label: "Meals" },
  { id: "feedback", label: "Feedback" },
  { id: "limits", label: "Limits" },
  { id: "research", label: "Research" },
];

export default function HowVelaWorks() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER — sand hero, wave on the right at desktop */}
      <FullBleed className="bg-parchment pt-16 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-mono text-xs md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
                The science
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
                How VÉLA works
              </h1>

              <div className="rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-cream/70 px-6 py-5">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-2">
                  The short version
                </p>
                <p className="font-sans text-base leading-relaxed text-inkMid">
                  VÉLA estimates where your body clock is from your roster, then plans sleep, light,
                  caffeine and meal timing to help it get where your next duty needs it. It&apos;s
                  built on the Three Process Model of alertness, which describes how your body clock,
                  your build-up of sleep pressure and your grogginess after waking combine to shape
                  how alert you feel.<Cite n={[1, 2, 3, 4]} /> It starts from typical adjustment
                  rates from jet lag research,<Cite n={[6]} /> then adapts to you and to what
                  actually happens on your trips. Everything it shows you is an estimate, not a
                  measurement.
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <Wave
                points={[
                  { hour: 8, time: "08:00", label: "Light", side: "below" },
                  { hour: 4, time: "04:00", label: "Low point", side: "above" },
                  { hour: 16, time: "16:00", label: "Caffeine cut-off", side: "below" },
                  { hour: 22, time: "22:00", label: "Sleep", side: "above" },
                ]}
                ariaLabel="A 24-hour body-clock wave marking light timing, the circadian low point, the caffeine cut-off and sleep window"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-hidden="false">
            {keyNumbers.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border-l-4 border-gold bg-cream/60 px-4 py-4"
              >
                <p className="font-display text-3xl md:text-4xl font-light text-ink whitespace-nowrap">
                  {k.value}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold mt-1">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* CHAPTERS 01–03 — TOC sits in the left margin, starting here so it
          never overlaps the wider hero above. The zero-width absolutely
          positioned wrapper takes no layout space, so it doesn't affect the
          FullBleed chapters' full-bleed math; the sticky child tracks
          scroll across all three chapters since it shares this wrapper's
          full height. */}
      <div className="relative">
        <div className="hidden xl:block absolute top-0 left-0 h-full w-0">
          <TableOfContents
            items={tocItems}
            className="sticky top-28 -ml-[220px] w-[200px] max-h-[70vh] overflow-y-auto rounded-xl border border-warmLine bg-cream/95 backdrop-blur-sm px-4 py-5 z-10"
          />
        </div>

        {/* CHAPTER 01 — THE MODEL */}
        <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="01" label="The model" />
          <div className="prose-vela">
            <h2 id="predicts">What does VÉLA actually predict?</h2>
            <p>
              VÉLA keeps track of your <strong>body time</strong>: what time your body thinks it
              is, which after a few sectors is often very different from the clock on the wall. It
              projects that forward through your roster, using your duties, the rest you&apos;re
              likely to get, your profile and anything you tell it after each trip.
            </p>
            <p>
              From there it estimates two things: where your body clock will be at each point in
              your roster, and how fatigued you&apos;re likely to be. It then plans what to do
              between now and your next duty to close the gap.
            </p>

            <h2 id="model">What model is VÉLA based on?</h2>
            <p>
              VÉLA is built on the <strong>Three Process Model of alertness</strong>, a
              well-established framework from sleep science.<Cite n={[1, 2, 3, 4]} /> It describes
              alertness as the combination of three things:
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="rounded-xl border border-warmLine bg-cream p-5">
              <p className="font-display text-xl text-ink mb-2">
                Your body clock (circadian rhythm)
              </p>
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                Your internal 24-hour cycle, with a natural low point in the early hours of your
                body&apos;s night.
              </p>
            </div>
            <div className="rounded-xl border border-warmLine bg-cream p-5">
              <p className="font-display text-xl text-ink mb-2">Sleep pressure</p>
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                The need for sleep that builds the longer you&apos;re awake and clears when you
                sleep. Being on duty adds to how quickly it builds.
              </p>
            </div>
            <div className="rounded-xl border border-warmLine bg-cream p-5">
              <p className="font-display text-xl text-ink mb-2">Sleep inertia</p>
              <p className="font-sans text-sm text-inkMid leading-relaxed">
                The groggy period just after you wake up, before you&apos;re fully alert.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <div className="prose-vela">
            <p>
              VÉLA applies these principles with its own planning approach, designed around crew
              rosters.
            </p>

            <h2 id="adjustment-speed">How fast does VÉLA assume your body clock adjusts?</h2>
            <p>
              Research suggests most people&apos;s body clock can shift by roughly an hour a day
              when it needs to move earlier (usually flying east), and a little faster when it
              needs to move later (usually flying west).<Cite n={[6]} /> VÉLA uses typical rates
              like these as a starting point, then adapts them to you.
            </p>
            <p>
              It also looks at how much time you have before your next duty and how far your body
              clock needs to move. If there isn&apos;t enough time to get all the way there, it
              tells you, rather than pretending you&apos;ll be fully adjusted.
            </p>

            <h2 id="east-harder">Why is flying east harder?</h2>
            <p>
              Shifting your body clock earlier (flying east) is slower than shifting it later
              (flying west).<Cite n={[6]} /> Going to sleep earlier than your body expects is
              harder than staying up later, so VÉLA gives eastbound trips more time to adjust.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* CHAPTER 02 — YOUR PLAN */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="02" label="Your plan" />
          <div className="prose-vela">
            <h2 id="personalise">What does VÉLA personalise?</h2>
            <p>VÉLA adjusts your plan for:</p>
            <ul>
              <li>Whether you&apos;re an early bird or a night owl</li>
              <li>Your age</li>
              <li>How long you like to sleep, and when</li>
              <li>How quickly you know you tend to adjust</li>
              <li>How sensitive you are to caffeine</li>
            </ul>
            <p>
              Your plan becomes more personal as you tell VÉLA how your trips actually went.
            </p>

            <h2 id="sleep">How does VÉLA plan your sleep?</h2>
            <p>
              VÉLA plans your sleep within the rest your roster actually gives you. It considers
              how much sleep you&apos;ve been missing, when your body is most ready to sleep,
              which way your body clock needs to move and how long you have before your next
              duty, then suggests when to sleep and when a nap would help.
            </p>

            <h2 id="light">How does VÉLA time light exposure?</h2>
            <p>
              Light is the strongest signal your body clock responds to, and its effect depends on
              timing.<Cite n={[5, 6]} />
            </p>
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
            <p>
              VÉLA turns this into specific times to seek or avoid light, fitted around your sleep
              and duties.
            </p>

            <h2 id="caffeine">How does VÉLA time caffeine?</h2>
            <p>
              Caffeine stays in your system for hours, so when you have it matters as much as how
              much. VÉLA suggests when to have your last caffeine so it doesn&apos;t get in the
              way of your next sleep, adjusted for how sensitive you are to it.
            </p>

            <h2 id="meals">How does VÉLA time meals?</h2>
            <p>
              Meal guidance follows your body time, not local time. VÉLA suggests when to eat and
              when to simply hydrate, so your meals fit around your body clock, your sleep and
              your duties. Our{" "}
              <Link
                href="/briefs/eating-across-time-zones"
                className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Eating Across Time Zones
              </Link>{" "}
              brief goes into more detail.
            </p>

            <h2 id="feedback">How does your feedback change the plan?</h2>
            <p>
              After a trip, you can tell VÉLA how your sleep actually went and whether you
              managed to follow the light advice. VÉLA then updates your body clock estimate and
              your upcoming plan from what really happened, rather than assuming everything went
              to plan.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* CHAPTER 03 — THE HONEST PART */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="03" label="The honest part" />
          <div className="prose-vela">
            <h2 id="limits">What are VÉLA&apos;s limits?</h2>
            <div className="not-prose rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-parchment/70 px-6 py-5 my-6">
              <ul className="list-disc pl-5 space-y-2 font-sans text-[15px] leading-relaxed text-inkMid">
                <li>
                  Your body clock is estimated from your roster and what you tell VÉLA, not
                  measured. VÉLA doesn&apos;t need blood tests or a wearable.
                </li>
                <li>
                  Everyone adjusts differently. Light, cabin conditions, medication, genetics and
                  the route itself all play a part,<Cite n={[6]} /> so treat VÉLA&apos;s plan as
                  guidance and listen to your body.
                </li>
                <li>
                  VÉLA follows the same principles as aviation fatigue management, but it
                  isn&apos;t an approved airline fatigue risk management system and doesn&apos;t
                  certify fitness for duty.
                </li>
              </ul>
            </div>

            <h2 id="research">What research is VÉLA built on?</h2>
            <p>
              VÉLA&apos;s approach draws on established sleep and body-clock research, including:
            </p>
            <ol id="sources" className="not-prose mt-3 divide-y divide-warmLine">
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

            <p className="mt-8">
              <small className="font-sans text-xs text-inkFaint">
                VÉLA provides personal planning insights based on your roster. It isn&apos;t
                medical advice or a medical device, and doesn&apos;t replace your airline&apos;s
                fatigue-management requirements.{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-2 hover:text-inkMid transition-colors"
                >
                  Full details
                </Link>
              </small>
            </p>
          </div>
        </div>
        </FullBleed>
      </div>

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
