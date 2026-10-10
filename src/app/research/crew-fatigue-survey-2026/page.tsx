import type { Metadata } from "next";
import Link from "next/link";
import { FullBleed } from "@/components/FullBleed";
import { StatCard, CopyAnchorButton, CitationBox, ResultTable, AutoOpenFromHash } from "@/components/ResearchBlocks";

const URL = "https://velaforcrew.com/research/crew-fatigue-survey-2026";
const N = 93;

export const metadata: Metadata = {
  title: "What 93 Cabin Crew Told Us About Fatigue: 2026 Survey Results",
  description:
    "97% of cabin crew in VÉLA's 2026 survey said their airline has never properly acknowledged their fatigue, and 85% have thought about leaving the job. Full results from 93 crew.",
  alternates: { canonical: URL },
  openGraph: {
    title: "What 93 Cabin Crew Told Us About Fatigue — 2026 Survey",
    description:
      "Anonymous survey of 93 cabin crew on fatigue, recovery and rosters. Full results and methodology.",
    url: URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What 93 Cabin Crew Told Us About Fatigue: 2026 Survey Results",
  description:
    "Results of an anonymous survey of 93 cabin crew on fatigue, recovery, rosters and the impact of the job on life outside work.",
  url: URL,
  datePublished: "2026-10-03",
  author: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  publisher: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  about: ["Cabin crew fatigue", "Flight attendant fatigue", "Circadian rhythm", "Jet lag"],
};

type Option = { label: string; n: number };
type Finding = {
  id: string;
  heading: string;
  headline: string;
  question: string;
  sub?: string;
  options: Option[];
  multi?: boolean;
  highlight: string[];
  bg: "cream" | "parchment";
};

const findings: Finding[] = [
  {
    id: "airline-acknowledgment",
    heading: "Do airlines acknowledge cabin crew fatigue?",
    headline:
      "97% of crew said their airline has never properly acknowledged their fatigue. 70% said it has never been acknowledged at all.",
    question:
      "Has your airline ever actually sat down with you and acknowledged what the schedule does to your body?",
    options: [
      { label: "Never", n: 65 },
      { label: "Once or twice, kind of", n: 25 },
      { label: "Yes, properly", n: 3 },
    ],
    highlight: ["Never", "Once or twice, kind of"],
    bg: "cream",
  },
  {
    id: "leaving",
    heading: "How many cabin crew think about leaving because of fatigue?",
    headline:
      "85% of crew (79 of 93) have thought about leaving the job. 43% (40 of 93) have either actively looked at other options or think about it more than they'd like to.",
    question: "Has the fatigue ever made you seriously think about leaving the job?",
    options: [
      { label: "It crosses my mind occasionally", n: 39 },
      { label: "Yes — I've actively looked at other options", n: 20 },
      { label: "I think about it more than I'd like to", n: 20 },
      { label: "No — I love the job despite it", n: 14 },
    ],
    highlight: [
      "It crosses my mind occasionally",
      "Yes — I've actively looked at other options",
      "I think about it more than I'd like to",
    ],
    bg: "parchment",
  },
  {
    id: "running-on-empty",
    heading: "How often are cabin crew running on empty?",
    headline:
      "57% of crew said they're running on empty more often than not, including 17% who said it's almost every duty.",
    question: "How often do you show up to work already running on empty?",
    options: [
      { label: "More often than not", n: 37 },
      { label: "Sometimes", n: 35 },
      { label: "Almost every duty", n: 16 },
      { label: "Rarely", n: 5 },
    ],
    highlight: ["More often than not", "Almost every duty"],
    bg: "cream",
  },
  {
    id: "recovery",
    heading: "How long does it take cabin crew to recover after a long-haul trip?",
    headline:
      "42% of crew need three days or more to recover after a long-haul trip, and 13% said they're never fully back before the next one.",
    question:
      "After a long or medium-haul flight, how long before you actually feel like yourself again?",
    options: [
      { label: "A day or two", n: 51 },
      { label: "Three or four days", n: 24 },
      { label: "I'm never fully back before the next trip", n: 12 },
      { label: "Less than a day", n: 3 },
      { label: "Five days or more", n: 3 },
    ],
    highlight: ["Three or four days", "I'm never fully back before the next trip", "Five days or more"],
    bg: "parchment",
  },
  {
    id: "wrong-moment",
    heading: "Do cabin crew feel fatigue at the wrong moment?",
    headline:
      "Only 2 of 93 crew said it never happens to them. 27% said it's just part of the job now.",
    question:
      "You know that feeling when your body just wants to give up at exactly the wrong moment on a flight?",
    sub: "Boarding. Taxi. Takeoff. Landing. Those moments.",
    options: [
      { label: "More than I'd like to admit", n: 34 },
      { label: "Occasionally", n: 32 },
      { label: "It's just part of the job now", n: 25 },
      { label: "Never happens to me", n: 2 },
    ],
    highlight: ["It's just part of the job now"],
    bg: "cream",
  },
  {
    id: "episodes",
    heading: "How often do cabin crew hit serious tiredness each month?",
    headline: "Almost one in five crew (19%) said they've stopped counting.",
    question:
      "In the past month — how many times did tiredness actually get the better of you? On a flight, a layover, days off?",
    options: [
      { label: "A handful of times", n: 43 },
      { label: "Once or twice", n: 29 },
      { label: "I stopped counting", n: 18 },
      { label: "Honestly, zero", n: 3 },
    ],
    highlight: ["I stopped counting"],
    bg: "parchment",
  },
  {
    id: "body-clock",
    heading: "Do cabin crew track their body clock across time zones?",
    headline:
      "71% of crew don't track their body clock at all, and only 8% actively track it.",
    question:
      "At any given point in your roster — do you actually know what time zone your body thinks it's in?",
    options: [
      { label: "Not really — I just know I'm tired", n: 40 },
      { label: "Never even thought about it", n: 26 },
      { label: "Roughly", n: 20 },
      { label: "Yeah, I track it", n: 7 },
    ],
    highlight: ["Not really — I just know I'm tired", "Never even thought about it"],
    bg: "cream",
  },
  {
    id: "roster-planning",
    heading: "Do cabin crew plan their rest around their roster?",
    headline:
      "Only 6% of crew plan deliberately around their roster. 39% said they just show up and deal with it.",
    question:
      "When your roster drops, do you plan around it — sleep, recovery, all of it?",
    options: [
      { label: "No — I just show up and deal with it", n: 36 },
      { label: "I try, but I'm guessing most of the time", n: 26 },
      { label: "Only when I know a trip's going to destroy me", n: 25 },
      { label: "Yes, I'm pretty deliberate about it", n: 6 },
    ],
    highlight: ["No — I just show up and deal with it"],
    bg: "parchment",
  },
  {
    id: "tools",
    heading: "Why don't sleep and jet lag apps work for cabin crew?",
    headline:
      "54% of crew said there's genuinely nothing out there built for crew, and 48% said existing tools are made for people with normal schedules.",
    question:
      "What's your issue with the sleep and fatigue tools that already exist?",
    sub: "Pick everything that applies.",
    multi: true,
    options: [
      { label: "There's genuinely nothing out there for crew", n: 50 },
      { label: "They're made for people with normal schedules", n: 45 },
      { label: "I don't use anything — I just push through", n: 42 },
      { label: "Nothing ever connects to my actual roster", n: 30 },
      { label: "They track stuff but never tell me what to actually do", n: 27 },
    ],
    highlight: ["There's genuinely nothing out there for crew", "They're made for people with normal schedules"],
    bg: "cream",
  },
];

const quotes = [
  "My days off is to recover and not actually live. I just survive.",
  "I don't feel like myself when I'm at home. I feel like a shell of my real self.",
  "I'm not a good parent when I'm exhausted.",
  "I never thought about it. I was convinced this lack of energy is a part of job.",
  "A sleep tracker that actually gets that I'm going to be up all night.",
];

const experience: Option[] = [
  { label: "Under 1 year", n: 9 },
  { label: "1–3 years", n: 42 },
  { label: "4–7 years", n: 23 },
  { label: "8–15 years", n: 16 },
  { label: "16+ years", n: 3 },
];

const roles: Option[] = [
  { label: "Economy", n: 49 },
  { label: "Business", n: 27 },
  { label: "Cabin Supervisor / Manager", n: 7 },
  { label: "Purser", n: 6 },
  { label: "First", n: 4 },
];

const headlineStats: { value: string; label: string; href: string }[] = [
  { value: "97%", label: "say their airline has never properly acknowledged their fatigue", href: "#airline-acknowledgment" },
  { value: "85%", label: "have thought about leaving the job", href: "#leaving" },
  { value: "42%", label: "need three or more days to recover after a long-haul trip", href: "#recovery" },
  { value: "13%", label: "are never fully recovered before their next trip", href: "#recovery" },
  { value: "57%", label: "are running on empty more often than not", href: "#running-on-empty" },
  { value: "54%", label: "say there's nothing built for crew", href: "#tools" },
];

const featuredOrder = ["airline-acknowledgment", "leaving", "recovery", "running-on-empty", "tools"];
const accordionOrder = ["wrong-moment", "episodes", "body-clock", "roster-planning"];

const featuredFindings = featuredOrder.map((id) => findings.find((f) => f.id === id)!);
const accordionFindings = accordionOrder.map((id) => findings.find((f) => f.id === id)!);

export default function CrewSurvey2026() {
  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER — H1 with an oversized gold stat beside it */}
      <FullBleed className="pt-16 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-[1120px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-12 items-center mb-10">
            <div>
              <p className="font-mono text-xs md:text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-4">
                VÉLA Research · Crew Survey 2026
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 leading-tight border-b-2 border-gold pb-4">
                What 93 cabin crew told us about fatigue
              </h1>
            </div>
            <div className="text-center lg:text-right">
              <p className="font-display text-7xl md:text-8xl font-light text-gold leading-none">
                97%
              </p>
              <p className="font-sans text-base text-ink mt-2">
                Never properly acknowledged
              </p>
            </div>
          </div>

          <div className="max-w-3xl rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint mb-3">
              Key findings
            </p>
            <p className="font-sans text-base leading-relaxed text-inkMid">
              In an anonymous survey of 93 cabin crew run by VÉLA between 19 June and 30 July
              2026, 97% said their airline has never properly acknowledged their fatigue, 85%
              have thought about leaving the job, and 57% said they&apos;re running on empty more
              often than not. 42% need three days or more to recover after a long-haul trip, and
              13% are never fully recovered before their next one. Only 8% actively track their
              body clock, and 54% said there&apos;s nothing out there built for crew.
            </p>
          </div>
        </div>

        <div className="max-w-[1120px] mx-auto px-6 md:px-10 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {headlineStats.map((s, i) => (
              <StatCard key={i} value={s.value} label={s.label} href={s.href} />
            ))}
          </div>
        </div>
      </FullBleed>

      {/* FEATURED FINDINGS — five in full, alternating cream/parchment */}
      {featuredFindings.map((f, i) => (
        <FullBleed key={f.id} className={`${i % 2 === 0 ? "bg-cream" : "bg-parchment"} py-14 md:py-20 scroll-mt-20`} id={f.id}>
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <h2 className="group font-display text-2xl md:text-3xl font-light text-ink mb-4 leading-snug">
              {f.question}
              <CopyAnchorButton anchorId={f.id} />
            </h2>
            {f.multi && (
              <p className="font-mono text-[13px] text-inkFaint leading-relaxed mb-1">
                (crew could choose more than one answer, so percentages add up to more than 100%)
              </p>
            )}
            <ResultTable options={f.options} total={N} multi={f.multi} />
          </div>
        </FullBleed>
      ))}

      {/* MORE FROM THE SURVEY — remaining four as an accordion */}
      <FullBleed className="bg-parchment py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <AutoOpenFromHash ids={accordionOrder} />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-6">
            More from the survey
          </p>
          <div className="divide-y divide-warmLine">
            {accordionFindings.map((f) => (
              <details key={f.id} id={f.id} className="group py-1 scroll-mt-20">
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none min-h-11">
                  <h2 className="font-display text-xl md:text-2xl font-light text-ink leading-snug">
                    {f.question}
                  </h2>
                  <span className="font-mono text-xl text-gold flex-shrink-0 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <ResultTable options={f.options} total={N} multi={f.multi} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* IN THEIR OWN WORDS — navy, cream-on-navy pull quotes */}
      <FullBleed className="bg-night py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-light text-cream mb-4 leading-snug">
            In their own words
          </h2>
          <p className="font-sans text-base text-cream/70 leading-relaxed mb-10">
            We asked crew what this job has taken from their life outside it, and what would
            actually help. A few of their answers:
          </p>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-12">
            {quotes.map((q) => (
              <blockquote key={q} className="pl-5 border-l-2 border-gold">
                <p className="font-display text-xl md:text-3xl italic text-cream leading-relaxed">
                  &ldquo;{q}&rdquo;
                </p>
                <footer className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-cream/50">
                  — Cabin crew member, VÉLA survey 2026
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </FullBleed>

      {/* WHO TOOK PART — quieter, sand */}
      <FullBleed className="bg-parchment py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-xl md:text-2xl font-light text-ink mb-3 leading-snug">
            Who took part
          </h2>
          <p className="font-sans text-sm text-inkMid leading-relaxed mb-4">
            93 cabin crew answered the survey. Most had between one and seven years of flying
            experience.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <ResultTable options={experience} total={N} caption="Flying experience" />
            <ResultTable options={roles} total={N} caption="Cabin role" />
          </div>
        </div>
      </FullBleed>

      {/* METHOD — quieter */}
      <FullBleed className="bg-cream py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-xl md:text-2xl font-light text-ink mb-3 leading-snug">
            How the survey was run
          </h2>
          <div className="not-prose rounded-[14px] border border-warmLine border-l-4 border-l-gold bg-cream/70 px-6 py-5">
            <ul className="space-y-3">
              {[
                ["Who", "93 cabin crew."],
                ["When", "19 June – 30 July 2026."],
                [
                  "How",
                  "A 15-question online survey, shared through VÉLA's Instagram, the Crew2Crew community and the VÉLA website.",
                ],
                ["Anonymity", "Fully anonymous. We didn't collect names, emails or airlines."],
                [
                  "Limits",
                  "This is a self-selected sample, not a random one. Crew who chose to answer may feel more strongly about fatigue than crew who didn't, so the results describe the people who took part rather than every cabin crew member. Percentages are rounded to the nearest whole number.",
                ],
              ].map(([label, text]) => (
                <li key={label} className="flex gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-gold flex-shrink-0 pt-0.5 w-20">
                    {label}
                  </span>
                  <span className="font-sans text-sm text-inkMid leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FullBleed>

      {/* CLOSING */}
      <FullBleed className="bg-gradient-to-b from-parchment/50 to-cream/50 py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-4 leading-snug">
            Using these results
          </h2>
          <p className="font-sans text-base text-inkMid leading-relaxed mb-4">
            You&apos;re welcome to quote or cite these findings. Please credit
            &ldquo;VÉLA Crew Survey 2026 (n=93)&rdquo; and link to this page.
          </p>
          <div className="mb-10">
            <CitationBox text={`VÉLA Crew Survey 2026 (n=93). ${URL}`} />
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-light text-ink mb-4 leading-snug">
            Why we ran it
          </h2>
          <p className="font-sans text-base text-inkMid leading-relaxed mb-10">
            VÉLA is a body-clock planning app for long-haul cabin crew, built by crew. We ran this
            survey to understand what fatigue actually looks like from the jumpseat, and these
            answers shape how VÉLA gets built.{" "}
            <Link href="/early-access" className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              Get early access
            </Link>{" "}
            or read our free{" "}
            <Link href="/briefs" className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity">
              Recovery Briefs
            </Link>.
          </p>

          <p className="font-sans text-sm text-inkMid mb-10">
            Sincerely,<br />A crew member who got tired of being tired
          </p>

          <nav className="pt-6 border-t border-warmLine">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-[0.18em] text-inkFaint hover:text-gold transition-colors"
            >
              ← Back to VÉLA
            </Link>
          </nav>
        </div>
      </FullBleed>
    </div>
  );
}
