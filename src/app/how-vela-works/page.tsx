import type { Metadata } from "next";
import Link from "next/link";

const PAGE_URL = "https://velaforcrew.com/how-vela-works";

export const metadata: Metadata = {
  title: "How VÉLA Works: The Science Behind Your Body-Clock Plan",
  description:
    "How VÉLA estimates your body clock from your roster: the Three Process Model of alertness, how fast it assumes you adapt east and west, how sleep, light, caffeine and meals are timed, and its limits.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "How VÉLA Works — The Science Behind Your Body-Clock Plan",
    description:
      "The model, the research and the limits behind VÉLA's sleep, light, caffeine and meal timing for cabin crew.",
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
    "How VÉLA estimates a cabin crew member's body clock from their roster, and how it times sleep, light, caffeine and meals.",
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
    <sup className="font-mono text-[9px] text-gold">
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

function FullBleed({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] ${className}`}>
      {children}
    </div>
  );
}

const keyNumbers = [
  { value: "1 h/day", label: "Flying east" },
  { value: "1.5 h/day", label: "Flying west" },
  { value: "04:00", label: "Body-clock low" },
  { value: "6 h", label: "Caffeine cut-off" },
];

export default function HowVelaWorks() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
            The science
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
            How VÉLA works
          </h1>

          <div className="rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">
              The short version
            </p>
            <p className="font-sans text-base leading-relaxed text-inkMid">
              VÉLA estimates where your body clock is from your roster, then plans sleep, light,
              caffeine and meal timing to help it move where your next duty needs it. It&apos;s
              built on the Three Process Model of alertness, which describes how your body clock,
              your build-up of sleep pressure and your grogginess after waking combine to shape
              how alert you feel.<Cite n={[1, 2, 3, 4]} /> VÉLA assumes your body clock can shift
              by roughly 1 hour a day when flying east and 1.5 hours a day when flying west,
              <Cite n={[6]} /> adjusted for your chronotype, age and feedback. Everything it shows
              you is an estimate, not a measurement.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-8 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-hidden="false">
            {keyNumbers.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border-l-4 border-gold bg-parchment/60 px-4 py-4"
              >
                <p className="font-display text-3xl md:text-4xl font-light text-ink whitespace-nowrap">
                  {k.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mt-1 whitespace-nowrap">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* CHAPTER 01 — THE MODEL */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="01" label="The model" />
          <div className="prose-vela">
            <h2>What does VÉLA actually predict?</h2>
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

            <h2>What model is VÉLA based on?</h2>
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
              VÉLA applies these principles with its own planning rules, designed around crew
              rosters. It doesn&apos;t use or reproduce proprietary commercial fatigue models such
              as SAFTE/FAST or the Boeing Alertness Model.
            </p>

            <h2>How fast does VÉLA assume your body clock adjusts?</h2>
            <p>
              By default, VÉLA assumes your body clock can move about{" "}
              <strong>1 hour per day when it needs to shift earlier</strong> (usually flying east)
              and about <strong>1.5 hours per day when it needs to shift later</strong> (usually
              flying west). These are the average rates in the CDC&apos;s jet lag guidance.
              <Cite n={[6]} />
            </p>
            <p>
              They&apos;re starting points, not a promise that your body will adapt at exactly
              that speed. VÉLA also looks at how much time you have before your next duty and how
              far your body clock needs to move. If there isn&apos;t enough time to get all the
              way there, it tells you, rather than pretending you&apos;ll be fully adjusted.
            </p>

            <h2>Why is flying east harder?</h2>
            <p>
              Shifting your body clock earlier (flying east) is slower than shifting it later
              (flying west), which is why VÉLA plans a slower rate for eastbound trips.
              <Cite n={[6]} /> Going to sleep earlier than your body expects is harder than staying
              up later.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* CHAPTER 02 — YOUR PLAN */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="02" label="Your plan" />
          <div className="prose-vela">
            <h2>What does VÉLA personalise?</h2>
            <ul>
              <li>
                <strong>Chronotype.</strong> VÉLA assumes your body clock&apos;s low point is
                around 04:00 body time. If you&apos;re an early bird it moves that to around
                02:00, and if you&apos;re a night owl to around 06:00.
              </li>
              <li>
                <strong>Age.</strong> From age 40, VÉLA gradually assumes your body clock shifts a
                little more slowly, by up to 20% at most.
              </li>
              <li>
                <strong>Sleep preferences.</strong> How long you like to sleep and when shape your
                sleep plan, within what your roster allows.
              </li>
              <li>
                <strong>Your own adjustment limits.</strong> If you know you adjust faster or
                slower than average, you can change the east and west rates.
              </li>
              <li>
                <strong>Caffeine sensitivity.</strong> This sets how early your last caffeine
                should be before sleep (see below).
              </li>
            </ul>
            <p>
              This is broad personalisation. VÉLA doesn&apos;t measure your individual body clock
              or fit a model to your biology.
            </p>

            <h2>How does VÉLA plan your sleep?</h2>
            <p>
              VÉLA first works within the rest time your roster actually gives you, and deals with
              any urgent sleep debt. Then it aims for one main, unbroken sleep near your body
              clock&apos;s low point, adding a nap where it helps. Where you place that sleep also
              depends on which way your body clock needs to move and how long you have before
              you&apos;re next on duty.
            </p>

            <h2>How does VÉLA time light exposure?</h2>
            <p>
              Light is the strongest signal your body clock responds to, and its effect depends on
              timing.<Cite n={[5, 6]} />
            </p>
            <div className="not-prose rounded-xl border border-warmLine bg-cream overflow-hidden my-6 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-warmLine">
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-2">
                  Shift earlier &mdash; usually flying east
                </p>
                <p className="font-sans text-sm text-inkMid leading-relaxed">
                  Get bright light after you wake, and avoid bright light before you sleep.
                </p>
              </div>
              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-2">
                  Shift later &mdash; usually flying west
                </p>
                <p className="font-sans text-sm text-inkMid leading-relaxed">
                  Get light before you sleep, and avoid it after you wake.
                </p>
              </div>
            </div>
            <p>
              VÉLA gives you roughly two-hour windows to seek or avoid light, fitted around your
              planned sleep. It&apos;s timing guidance. VÉLA doesn&apos;t measure how much light
              you actually get.
            </p>

            <h2>How does VÉLA time caffeine?</h2>
            <p>
              VÉLA sets a caffeine cut-off before your next main sleep, so caffeine doesn&apos;t
              get in the way of it. By default that&apos;s <strong>6 hours before sleep</strong>,
              or 8 hours if you&apos;re sensitive to caffeine and 4 hours if you&apos;re not.
            </p>

            <h2>How does VÉLA time meals?</h2>
            <p>
              Meal guidance follows your body time, not local time. VÉLA suggests avoiding eating
              and focusing on hydration between about 20:00 and 05:00 body time, then gives
              breakfast, lunch and dinner windows that fit around your sleep and duties.
            </p>
            <p>
              To be clear about what this does: research links meal timing to your metabolism and
              to rhythms in organs like your gut, but not to resetting your main body clock. So in
              VÉLA, meal times support how you feel and digest. They don&apos;t move your body
              clock estimate. Our{" "}
              <Link
                href="/briefs/eating-across-time-zones"
                className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Eating Across Time Zones
              </Link>{" "}
              brief goes into more detail.
            </p>

            <h2>How does your feedback change the plan?</h2>
            <p>After a trip, you can tell VÉLA what actually happened:</p>
            <ul>
              <li>
                <strong>Sleep:</strong> how long you slept, and whether you went to sleep earlier,
                on time or later than planned.
              </li>
              <li>
                <strong>Light:</strong> whether you followed the light advice (none, some, mostly
                or all of it).
              </li>
            </ul>
            <p>
              VÉLA then recalculates your body clock, your fatigue estimate and your upcoming plan
              from what really happened, rather than assuming everything went to plan.
            </p>
          </div>
        </div>
      </FullBleed>

      {/* CHAPTER 03 — THE HONEST PART */}
      <FullBleed className="bg-cream py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <ChapterDivider n="03" label="The honest part" />
          <div className="prose-vela">
            <h2>What are VÉLA&apos;s limits?</h2>
            <div className="not-prose rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-parchment/70 px-6 py-5 my-6">
              <ul className="list-disc pl-5 space-y-2 font-sans text-[15px] leading-relaxed text-inkMid">
                <li>
                  Your body clock and sleep are <strong>estimated</strong>, not measured. VÉLA
                  doesn&apos;t use blood tests, wearables or live sleep tracking.
                </li>
                <li>
                  It assumes the sleep it plans is possible, even when in reality it might be
                  shorter or more broken.
                </li>
                <li>
                  Personalisation is broad (chronotype and age). It isn&apos;t fitted to your
                  individual biology.
                </li>
                <li>
                  Real light levels, cabin conditions, medication, genetics and many
                  route-specific factors aren&apos;t fully modelled, and all of these can affect
                  how you adjust.
                  <Cite n={[6]} />
                </li>
                <li>
                  Your feedback improves the estimate, but can&apos;t verify your sleep stages,
                  light exposure or true body-clock position.
                </li>
                <li>
                  VÉLA follows the same principles as aviation fatigue management, but it
                  isn&apos;t an approved airline fatigue risk management system and doesn&apos;t
                  certify fitness for duty.
                </li>
              </ul>
            </div>

            <h2>What research is VÉLA built on?</h2>
            <p>
              VÉLA&apos;s model draws on the sleep and body-clock research below. Its sleep
              planning also draws on NASA research on planned rest during long-haul operations
              (Rosekind and colleagues), research on sleep inertia (Tassi and Muzet) and sleep
              consolidation (Skorucak and colleagues). Light guidance also draws on Duffy and
              Czeisler, and meal guidance on Wehrens, Chellappa and Manoogian and their colleagues.
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

            <nav className="not-prose mt-10 pt-6 border-t border-warmLine flex flex-wrap gap-4">
              <Link
                href="/early-access"
                className="inline-block rounded-xl bg-night px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-gold hover:text-ink"
              >
                Get early access
              </Link>
              <Link
                href="/research/crew-fatigue-survey-2026"
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-inkMid underline underline-offset-2 hover:text-gold transition-colors self-center"
              >
                Read what 93 crew told us →
              </Link>
            </nav>
          </div>
        </div>
      </FullBleed>
    </div>
  );
}
