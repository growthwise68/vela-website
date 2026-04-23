import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Vela: plan rest and readiness around your roster. Built for long-haul cabin crew.",
};

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-4">
            Long-haul cabin crew
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light leading-tight text-ink mb-6">
            Plan rest and readiness around your roster
          </h1>
          <p className="font-sans text-lg font-light text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            Vela helps you see how sleep timing and time zones may affect your readiness—using
            transparent, schedule-based estimates. Built for crew, with science you can
            understand.
          </p>
          <button className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105">
            Get Early Access
          </button>
        </div>
      </section>

      {/* DISCLAIMER BOX */}
      <section className="w-full py-12 md:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="rounded-[20px] border border-warmLine bg-parchment/80 p-8">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-inkFaint mb-3">
              Important
            </p>
            <p className="font-sans text-sm text-inkMid leading-relaxed">
              Vela is a <strong className="font-medium text-ink">personal lifestyle planning</strong> tool. It
              is not a medical device and does not provide medical, health, or safety advice. Readiness
              scores are estimates for personal planning only—not for safety-critical or fitness-for-duty
              decisions. Vela is not part of any airline Fatigue Risk Management System (FRMS) and does
              not replace your operator&rsquo;s fitness-for-duty requirements or professional medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Your job breaks your body's clock
          </h2>
          <p className="font-sans text-lg text-inkMid mb-8 leading-relaxed">
            Crossing time zones, working at night, sleeping at odd hours—long-haul flying disrupts everything your body expects. You might feel exhausted after a short trip, alert after a long one. You don&rsquo;t know if it&rsquo;s jet lag, accumulated sleep debt, or the roster itself. This unpredictability means you&rsquo;re always guessing how ready you really are.
          </p>
          {/* Carousel placeholder - will be replaced with actual Swiper carousel */}
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg h-80 md:h-96 flex items-center justify-center text-inkMid mb-6">
            <div className="text-center">
              <p className="text-sm mb-4">[Carousel: 7-day roster timeline showing sleep, flight, and rest blocks]</p>
              <div className="flex gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-gold"></div>
                <div className="w-3 h-3 rounded-full bg-inkFaint"></div>
                <div className="w-3 h-3 rounded-full bg-inkFaint"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Understand why you feel the way you do
          </h2>
          <p className="font-display text-xl italic text-gold mb-8 pl-4 border-l-2 border-gold leading-relaxed">
            Knowledge is power. When you understand the mechanism—not just the symptom—you can make better choices for yourself.
          </p>
          <p className="font-sans text-lg text-inkMid mb-8 leading-relaxed">
            Vela doesn&rsquo;t tell you what to do. It shows you why you feel the way you do. By combining your actual roster with published sleep science, Vela reveals how sleep timing, time zones, and duty patterns affect your readiness. This is transparency you can trust.
          </p>
          {/* Carousel placeholder */}
          <div className="bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg h-80 md:h-96 flex items-center justify-center text-inkMid">
            <div className="text-center">
              <p className="text-sm mb-4">[Carousel: Readiness curve graph and app screenshots]</p>
              <div className="flex gap-2 justify-center">
                <div className="w-3 h-3 rounded-full bg-inkFaint"></div>
                <div className="w-3 h-3 rounded-full bg-gold"></div>
                <div className="w-3 h-3 rounded-full bg-inkFaint"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUGGESTIONS SECTION */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Get practical guidance tailored to your roster
          </h2>
          <p className="font-sans text-lg text-inkMid mb-12 leading-relaxed">
            Based on your schedule, Vela suggests optimal sleep timing, light exposure windows, and meal timing to help you manage fatigue. These aren&rsquo;t medical directives—they&rsquo;re starting points you can test and refine. Over time, you&rsquo;ll learn what works for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Suggestion Card 1 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-2xl text-ink mb-3">Sleep Timing</h3>
              <p className="font-sans text-inkMid leading-relaxed">
                Sleep window 22:00–06:00 will boost your readiness for Day 3 flying. Plan light exposure after waking.
              </p>
            </div>
            {/* Suggestion Card 2 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-2xl text-ink mb-3">Light Exposure</h3>
              <p className="font-sans text-inkMid leading-relaxed">
                Seek light at 07:00 tomorrow to reset your circadian rhythm after the overnight flight.
              </p>
            </div>
            {/* Suggestion Card 3 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-2xl text-ink mb-3">Recovery Priority</h3>
              <p className="font-sans text-inkMid leading-relaxed">
                Post-flight: prioritize sleep over activity. Your fatigue debt is highest in the first 12 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BY-CREW-FOR-CREW SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-12 border-b-2 border-gold pb-4">
            Built with people who live this
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Placeholder for crew photo */}
            <div className="w-72 h-72 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-white text-center p-6">
              <p className="text-sm">Stock crew photo<br />(Pilot or Flight Attendant)</p>
            </div>
            {/* Testimonial quote */}
            <div>
              <p className="font-display text-2xl italic text-gold mb-6 leading-relaxed">
                "Every feature in Vela is shaped by crew who fly these routes every month. It&rsquo;s transparent, it&rsquo;s science-backed, and it&rsquo;s built for us—not for airlines or regulators."
              </p>
              <p className="font-sans text-inkMid">
                <strong className="text-ink">Captain or First Officer</strong><br />
                <span className="text-sm">International Carrier</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-light text-ink mb-6">
            Your personal readiness companion
          </h2>
          <p className="font-sans text-lg text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            Download Vela. Enter your roster. See your readiness forecast and sleep timing suggestions. No medical jargon. No airline bureaucracy. Just clear, understandable insights you can act on.
          </p>
          <button className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105">
            Get TestFlight Access
          </button>
        </div>
      </section>

      {/* APP STORE LINKS */}
      <section className="w-full py-12 md:py-16 bg-cream border-t border-warmLine">
        <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-inkFaint">
            App store links
          </span>
          <p className="font-sans text-sm text-inkMid">
            TestFlight, App Store, and Play Store links coming soon
          </p>
        </div>
      </section>
    </div>
  );
}
