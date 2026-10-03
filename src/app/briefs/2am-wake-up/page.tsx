import type { Metadata } from "next";
import Link from "next/link";

const URL = "https://velaforcrew.com/briefs/2am-wake-up";
const PDF = "/downloads/vela-recovery-brief-001-2am-wakeup.pdf";

export const metadata: Metadata = {
  title: "How to Prepare for a 2am Wake-Up: A Cabin Crew Guide — Recovery Brief 001",
  description:
    "A 24-hour plan for cabin crew facing a 2am wake-up: when to stop caffeine, how to fall asleep at 7pm, what to do the moment your alarm goes, and how to recover after landing.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Preparing for a 2am Wake-Up — VÉLA Recovery Brief 001",
    description:
      "The full 24-hour plan for the earliest, hardest reports. By crew, for crew.",
    url: URL,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Prepare for a 2am Wake-Up: A Cabin Crew Guide",
  description:
    "A 24-hour plan for cabin crew facing a 2am wake-up and early report.",
  url: URL,
  datePublished: "2026-08-07",
  author: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  publisher: { "@type": "Organization", name: "VÉLA", url: "https://velaforcrew.com" },
  isPartOf: { "@type": "CollectionPage", name: "VÉLA Recovery Briefs", url: "https://velaforcrew.com/briefs" },
};

const timeline: [string, string][] = [
  ["12:00", "Last coffee"],
  ["17:30", "Dinner"],
  ["18:30", "Lights dim"],
  ["19:00", "Magnesium, if you use it"],
  ["19:30", "In bed"],
  ["02:00", "Wake"],
  ["02:10", "Bright light"],
  ["02:20", "Protein breakfast"],
  ["03:30", "Report for duty"],
];

export default function Brief001() {
  return (
    <article className="prose-vela max-w-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold mb-4">
        VÉLA Recovery Briefs · No. 001
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-light text-ink mb-6 leading-tight">
        How to prepare for a 2am wake-up
      </h1>

      {/* Answer-first summary: this is the paragraph AI engines are most likely to quote. */}
      <div className="rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5 mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">
          The short version
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-inkMid">
          For a 2am wake-up, stop caffeine by midday, get daylight early and dim the lights by
          early evening, eat your last full meal by about 17:30, and be in bed by around 19:30 in
          a fully dark room. When the alarm goes, switch on bright overhead light straight away,
          eat a protein-forward breakfast, and save your caffeine for after you wake. Expect an
          energy dip around hours 3–4 of the duty. If it&apos;s a turnaround, keep any nap at
          home to 20 minutes.
        </p>
      </div>

      <p>
        2:00am. Your alarm goes off. Your body is convinced it&apos;s still the middle of the
        night, and you&apos;re wondering how you&apos;re supposed to smile at passengers in four
        hours. By 6am you&apos;ll be doing exactly that. The secret isn&apos;t surviving
        tomorrow. It&apos;s preparing today.
      </p>

      <h2>Why is a 2am wake-up so hard on your body?</h2>
      <p>
        An early report doesn&apos;t just shorten your sleep. It asks your body to perform while
        its circadian rhythm is still signalling &ldquo;night.&rdquo; Every recommendation in
        this brief is designed to reduce that mismatch, so you arrive more alert, not just more
        awake.
      </p>

      <h2>The 24-hour timeline (for a 02:00 wake, 03:30 report)</h2>
      <ol className="not-prose mt-3 mb-6 space-y-2">
        {timeline.map(([time, step]) => (
          <li key={time} className="flex items-baseline gap-3 font-sans text-[15px] leading-relaxed text-inkMid">
            <time className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold flex-shrink-0 w-10">
              {time}
            </time>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <h2>How do you fall asleep at 7pm before an early report?</h2>
      <p>
        With a 2am wake-up, the real challenge isn&apos;t waking up. It&apos;s falling asleep
        unnaturally early, around 6–7pm, so you get a full cycle in first.
      </p>
      <ul>
        <li>
          <strong>No caffeine after 12:00.</strong> Otherwise it&apos;s still in your system at
          your target bedtime, quietly working against you.
        </li>
        <li>
          <strong>Get daylight early, dim everything by early evening.</strong>{" "}
          This is what actually convinces your body it&apos;s &ldquo;night&rdquo; a few hours
          earlier than usual. Light is the strongest signal your body clock listens to.
        </li>
        <li>
          <strong>Last full meal by early evening.</strong> A heavy meal too close to bed
          disrupts the exact sleep quality you&apos;re relying on tonight.
        </li>
        <li>
          <strong>Light movement is fine.</strong> Nothing intense within a few hours of bed.
          You don&apos;t want your body still running hot when you&apos;re trying to wind it
          down.
        </li>
        <li>
          <strong>Choose your sleep strategy.</strong> Split sleep, a normal-length sleep from
          early evening (e.g. 7pm–1am), is often easier to fall into than forcing sleep at a
          strange hour cold. Or try a nap plus an early night: a 20–30 minute nap
          mid-afternoon, then bed by 7–8pm.
        </li>
        <li>
          <strong>Blackout curtains or an eye mask are non-negotiable.</strong>{" "}
          Your body clock will fight you on daylight hours no matter how tired you are, and
          this removes that fight entirely.
        </li>
        <li>
          Some crew find <strong>magnesium</strong> helpful before an unusually early bedtime.
          If you already use it, this can be a good time to take it. If you already use
          low-dose <strong>melatonin</strong>, an early bedtime like this is one situation
          where it may help anchor sleep onset; it isn&apos;t necessary for everyone.
        </li>
      </ul>

      <aside className="not-prose rounded-[14px] border border-warmLine bg-parchment/70 px-6 py-5 my-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint mb-2">
          Crew note
        </p>
        <p className="font-sans text-[15px] leading-relaxed text-inkMid">
          If you couldn&apos;t get to sleep by 7pm, don&apos;t panic. One difficult early
          doesn&apos;t undo everything. Focus on light, hydration and a short recovery nap
          afterwards. You&apos;ll still be better off than if you&apos;d done nothing.
        </p>
      </aside>

      <h2>What should you prepare the night before?</h2>
      <p>Make life easy for 2am you.</p>
      <ul>
        <li>
          <strong>Lay your uniform out now.</strong> At 2am, even tiny decisions feel harder
          than they should.
        </li>
        <li>
          <strong>Pack your bag, shoes by the door.</strong> One less thing for a half-asleep
          brain to manage.
        </li>
        <li>
          <strong>Two alarms, phone across the room, plus a backup</strong> (hotel wake-up call
          or a second device). If one fails, you need a second line of defence, not a second
          chance at luck.
        </li>
        <li>
          <strong>Pre-make overnight oats or a protein shake.</strong> Future you won&apos;t
          want to think about food at 2am. She&apos;ll just want it ready.
        </li>
        <li>
          <strong>Fill your water bottle before bed.</strong> You&apos;ll wake up slightly
          dehydrated, and removing one more decision matters more than it sounds like it should.
        </li>
      </ul>

      <h2>What should you do the moment your 2am alarm goes off?</h2>
      <ul>
        <li>
          <strong>Bright light immediately,</strong> from the overhead light, not just your
          phone screen. Light is the fastest way to tell your brain it&apos;s time to be alert,
          even at 2am.
        </li>
        <li>
          <strong>Cold water on your face, or a quick cool shower.</strong> Right now it does
          more for alertness than caffeine.
        </li>
        <li>
          <strong>Protein-forward, not carbs alone:</strong> eggs, yoghurt, a shake. This keeps
          blood sugar stable through report time and the first hours of the flight, instead of
          spiking and crashing mid-service.
        </li>
        <li>
          <strong>Caffeine now, not before.</strong> This is the right time for it.
        </li>
      </ul>

      <h2>On the way in</h2>
      <ul>
        <li>
          <strong>Hydrate.</strong> Overnight sleep plus an early start means you&apos;re often
          already mildly dehydrated before the day has begun.
        </li>
        <li>
          <strong>Get light.</strong> A short walk in bright light, or actual dawn light if
          it&apos;s up, helps lock in the alertness you just built.
        </li>
      </ul>

      <h2>Why do you crash a few hours into an early duty?</h2>
      <ul>
        <li>
          <strong>Expect a dip around hours 3–4 of the duty day.</strong> This is your
          circadian trough showing up on schedule, not a sign anything&apos;s wrong. A short
          caffeine top-up or a 5-minute galley walk works better than pushing through it.
        </li>
        <li>
          <strong>Protein over carbs at your crew meal,</strong> to avoid a second crash later
          in the sector.
        </li>
      </ul>

      <h2>Should you nap after an early turnaround?</h2>
      <p>
        Resist the urge to nap the second you&apos;re home. A short nap of 20 minutes at most
        is fine. A long one will wreck tonight&apos;s sleep and restart the whole cycle. Aim to
        get back to your normal bedtime if you can.
      </p>

      <h2>How prepared are you?</h2>
      <p>Before report, ask yourself:</p>
      <ul>
        <li>No caffeine after lunch</li>
        <li>Lights dimmed early</li>
        <li>Protein ready</li>
        <li>Bag packed</li>
        <li>Water ready</li>
        <li>Two alarms</li>
        <li>Early bedtime</li>
      </ul>
      <p>
        <strong>6–7 ticks:</strong> you&apos;re setting yourself up for your best possible
        early. <strong>3–5 ticks:</strong> you&apos;ll probably get through the duty, but
        recovery becomes more important afterwards.{" "}
        <strong>0–2 ticks:</strong> don&apos;t worry. Tomorrow won&apos;t be perfect, but
        these are the biggest opportunities to improve next time.
      </p>

      <h2>Recovery starts the day before</h2>
      <p>
        This is one report. Your roster has dozens. That&apos;s where VÉLA comes in. Inside
        VÉLA, your recovery plan updates automatically every time your roster changes, so you
        always know when to sleep, eat and recover.
      </p>

      <div className="not-prose flex flex-wrap gap-4 items-center mt-2 mb-8">
        <Link
          href="/early-access"
          className="inline-block rounded-xl bg-night px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cream transition-colors hover:bg-gold hover:text-ink"
        >
          Get early access
        </Link>
        <a
          href={PDF}
          download
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-inkMid underline underline-offset-2 hover:text-gold transition-colors"
        >
          Download this brief as a PDF
        </a>
      </div>

      <p>Sincerely,<br />A crew member who got tired of being tired</p>

      <p>
        <small className="font-sans text-xs text-inkFaint">
          VÉLA provides personal planning insights. It isn&apos;t medical advice or a substitute
          for your airline&apos;s fatigue-management requirements.{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-inkMid transition-colors">
            Full details
          </Link>
        </small>
      </p>

      <nav className="not-prose mt-10 pt-6 border-t border-warmLine">
        <Link
          href="/briefs"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-inkFaint hover:text-gold transition-colors"
        >
          ← All Recovery Briefs
        </Link>
      </nav>
    </article>
  );
}
