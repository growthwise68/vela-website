import type { Metadata } from "next";
import { BriefLayout, type BriefStage } from "@/components/BriefLayout";
import { CrewNote, BoardingPassCard } from "@/components/BriefBlocks";

const URL = "https://velaforcrew.com/briefs/eating-across-time-zones";
const PDF = "/downloads/vela-recovery-brief-002-eating-across-time-zones.pdf";

const sources = [
  "Chrononutrition and Gut Health: Exploring the Relationship Between Meal Timing and the Gut Microbiome. PubMed, 2025.",
  "Circadian rhythms, gut microbiota, and diet: possible implications for health. Nutrition, Metabolism & Cardiovascular Diseases, 2023.",
  "Meal timing is a critical factor for maintenance of gut homeostasis around the clock. bioRxiv, 2025.",
  "VÉLA crew survey, n=93, 2026.",
  "Health Implications of Shift Work in Airline Pilots and Cabin Crew: A Narrative Review and Pilot Study Findings. MDPI Nutrients, 2025.",
  "Circadian rhythm and the gut microbiome: a synchrony to the metabolic response to diet. The Egyptian Journal of Internal Medicine, 2026.",
  "Unraveling the Impact of Travel on Circadian Rhythm and Crafting Optimal Management Approaches: A Systematic Review. Cureus / PMC, 2026.",
  "Circadian Disorganization Alters Intestinal Microbiota. PLOS One, 2014.",
  "Shift work, gut dysbiosis, and circadian misalignment: the combined impact of nighttime light exposure, nutrients, and microbiota rhythmicity. Chronobiology International, 2025.",
  "Gut Microbiota-Derived Short Chain Fatty Acids Induce Circadian Clock Entrainment in Mouse Peripheral Tissue. Scientific Reports, 2018.",
];

export const metadata: Metadata = {
  title: "How to Eat Across Time Zones: A Cabin Crew Guide — Recovery Brief 002",
  description:
    "Why long-haul crew get bloating, cramping and mismatched appetite on trips, and how meal timing on days off, in flight and on layovers helps keep your gut clock on schedule.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Eating Across Time Zones — VÉLA Recovery Brief 002",
    description:
      "Your gut has its own body clock. Here's how to keep it on schedule across time zones. By crew, for crew.",
    url: URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Eat Across Time Zones: A Cabin Crew Guide",
  description:
    "Why long-haul crew get digestive problems on trips, and how meal timing helps keep the gut clock on schedule.",
  url: URL,
  datePublished: "2026-08-30",
  author: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  publisher: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  isPartOf: { "@type": "CollectionPage", name: "VÉLA Recovery Briefs", url: "https://velaforcrew.com/briefs" },
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s })),
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

const stages: BriefStage[] = [
  {
    id: "why",
    label: "The why",
    bg: "cream",
    nextLabel: "Next · The research ↓",
    children: (
      <>
        <h2>Why do cabin crew get bloating and stomach problems on trips?</h2>
        <p>
          Your gut runs on its own internal clock, influenced by when you eat. Your brain runs
          on a separate clock, set mainly by light.<Cite n={[1]} /> Cross time zones while your
          meal schedule keeps shifting, and the two can stop working together. When that
          happens, digestion can suffer, showing up as bloating, irregular bowel habits, and
          other gut symptoms.<Cite n={[2, 3]} />
        </p>
        <p>
          We asked 93 crew about their body clock. 71% said they&apos;ve never really thought
          about it, or don&apos;t track it at all.<Cite n={[4]} /> The gut clock is usually the
          last thing on that list, even though it&apos;s often the first thing to complain.
        </p>
      </>
    ),
  },
  {
    id: "research",
    label: "The research",
    bg: "parchment",
    nextLabel: "Next · Days off ↓",
    children: (
      <>
        <h2>What does the research show about crew and digestion?</h2>
        <ul>
          <li>
            A review of shift work in airline pilots and cabin crew found significantly higher
            rates of indigestion, IBS-like symptoms, and constipation compared to day workers,
            with the strongest effects in long-haul and night operations.<Cite n={[5]} />
          </li>
          <li>
            The same review found that half of respondents had limited access to nutritious
            food while on duty.<Cite n={[5]} />
          </li>
        </ul>

        <h2>Does when you eat matter as much as what you eat?</h2>
        <ul>
          <li>
            Studies link heavy, sugary meals eaten during your body&apos;s normal sleep hours
            with more digestive problems and a gut thrown out of balance. The same meals, eaten
            during your body&apos;s daytime hours, cause less disruption.<Cite n={[8, 9]} />
          </li>
          <li>
            Late, heavy meals in particular are linked to a disrupted gut and a slower-running
            metabolism, regardless of how much you eat across the whole day.<Cite n={[9]} />
          </li>
          <li>
            Fibre-rich foods may also support the gut clock. As gut bacteria break fibre down,
            they produce compounds that can influence the internal clocks running in your
            body&apos;s tissues, including your gut&apos;s, based on early research in animal
            studies.<Cite n={[10]} />
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "days-off",
    label: "Days off",
    bg: "cream",
    nextLabel: "Next · In flight ↓",
    children: (
      <>
        <h2>How should you eat on your days off?</h2>
        <ul>
          <li>
            <strong>Keep your meal times fixed, even with nothing to plan around.</strong>{" "}
            A day off with no fixed mealtimes is one of the easiest ways to lose the alignment
            you built on your last trip.<Cite n={[1]} />
          </li>
          <li>
            <strong>The day before report is day one of the trip.</strong> If your next report
            is unusually early or late, shift your meal times toward it a day ahead. Don&apos;t
            adjust cold on report morning.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "in-flight",
    label: "In flight",
    bg: "parchment",
    nextLabel: "Next · On layover ↓",
    children: (
      <>
        <h2>What should you eat in flight, and when?</h2>
        <ul>
          <li>
            <strong>Pick one clock, origin or destination, and stick to it.</strong>{" "}
            Longer stays: sync to destination. Short turnarounds: stay closer to origin. The
            important part is choosing deliberately, not eating simply because service happens
            to arrive.<Cite n={[2]} />
          </li>
          <li>
            <strong>Treat the overnight meal as optional for your gut.</strong> A full meal at
            a time your body still reads as the middle of the night works against the reset,
            not for it.<Cite n={[2, 3]} />
          </li>
          <li>
            <strong>Pair meals with light, window shade up or down.</strong> The two signals
            reinforce each other rather than working separately.<Cite n={[1]} />
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "layover",
    label: "On layover",
    bg: "cream",
    nextLabel: "Next · Your gut resets when you eat like you mean it ↓",
    children: (
      <>
        <h2>How should you time meals on a layover?</h2>
        <ul>
          <li>
            <strong>Eat on destination time from your first meal. Don&apos;t wait for appetite.</strong>{" "}
            Realigning meal timing to your destination is one of the more effective ways to
            help your gut clock catch up alongside the rest of your body.<Cite n={[6, 7]} />
          </li>
          <li>
            <strong>Short layover? Don&apos;t fully re-anchor.</strong> If you&apos;re turning
            back before your body would&apos;ve adjusted anyway, staying closer to origin
            timing means less whiplash on the way home.
          </li>
        </ul>

        <BoardingPassCard from="HOME" to="SYD" detail="Lands 07:00 local · Your body thinks 23:00">
          <p className="font-sans text-[15px] leading-relaxed text-inkMid">
            You land at 07:00 local, and your body still thinks it&apos;s 23:00. Rather than
            waiting for your appetite to catch up, the first meal on the ground goes on Sydney
            time. That&apos;s &ldquo;eat on destination time from your first meal,&rdquo; put
            into practice.
          </p>
        </BoardingPassCard>

        <CrewNote>
          <p className="font-sans text-[15px] leading-relaxed text-inkMid">
            None of this fully resolves on a job built around irregular hours. The goal
            isn&apos;t a perfect gut. It&apos;s fewer bad days.
          </p>
        </CrewNote>
      </>
    ),
  },
];

export default function Brief002() {
  return (
    <BriefLayout
      jsonLd={jsonLd}
      briefLabel="VÉLA Recovery Briefs · No. 002"
      title="How to eat across time zones"
      shortVersion={
        <p>
          Your gut runs on its own body clock, set largely by when you eat, while your
          brain&apos;s clock is set mainly by light. When long-haul crew cross time zones and
          meal times keep shifting, the two fall out of step, which can show up as bloating,
          cramping and mismatched appetite. To help: keep meal times fixed on days off, pick
          one clock in flight (origin or destination) and stick to it, treat the overnight meal
          as optional, and on a longer layover eat on destination time from your first meal
          instead of waiting for your appetite to adjust.
        </p>
      }
      hook={
        <p>
          Cruising altitude. Meal service done. And your stomach still doesn&apos;t know what
          time it thinks it is. Bloating. Cramping. No appetite, or too much of it. Not because
          something&apos;s wrong with you. Because your gut is trying to run on a schedule
          nobody told it about.
        </p>
      }
      stages={stages}
      closing={{
        bigLine: (
          <>
            Your gut doesn&apos;t reset when you land.
            <br />
            It resets when you eat like you mean it.
          </>
        ),
        paragraph: (
          <>
            <h2 className="font-display text-2xl text-cream mb-3">
              Your gut resets when you eat like you mean it
            </h2>
            <p>
              This is one brief. Your roster changes every few days. That&apos;s where VÉLA
              comes in. Inside VÉLA, your meal timing guidance updates automatically with your
              roster, so your gut isn&apos;t the last thing anyone thinks about.
            </p>
          </>
        ),
        pdfHref: PDF,
        signOff: (
          <>
            Sincerely,
            <br />
            A crew member who got tired of being tired
          </>
        ),
        extra: (
          <>
            <h2 id="sources">Sources</h2>
            <p>
              This brief draws on peer-reviewed research and VÉLA&apos;s own crew survey (n=93,
              2026).
            </p>
            <ol className="not-prose mt-3 divide-y divide-warmLine">
              {sources.map((s, i) => (
                <li
                  key={i}
                  id={`source-${i + 1}`}
                  className="font-sans text-sm leading-relaxed text-inkMid py-2"
                >
                  {s}
                </li>
              ))}
            </ol>
          </>
        ),
      }}
    />
  );
}
