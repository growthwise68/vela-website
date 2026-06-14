"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gold mb-6 font-semibold">
            By crew, for crew
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-tight text-ink mb-6">
            Your roster, mapped before you fly it.
          </h1>
          <p className="font-sans text-xl md:text-2xl font-light text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            V&Eacute;LA reads your schedule and shows you what your body clock will be doing — duty by duty,
            timezone by timezone. What to expect. How to prepare. Built by crew, because someone had to.
          </p>
          <Link
            href="/early-access"
            className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Get Early Access
          </Link>
        </div>
      </section>

      {/* DISCLAIMER BOX */}
      <section className="w-full py-12 md:py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="rounded-[20px] border border-warmLine bg-parchment/80 p-8">
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-inkFaint mb-3 font-semibold">
              Important
            </p>
            <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed">
              V&Eacute;LA is a <strong className="font-medium text-ink">personal lifestyle planning</strong> tool. It
              is not a medical device and does not provide medical, health, or safety advice. Readiness
              scores are estimates for personal planning only&mdash;not for safety-critical or fitness-for-duty
              decisions. V&Eacute;LA is not part of any airline Fatigue Risk Management System (FRMS) and does
              not replace your operator&rsquo;s fitness-for-duty requirements or professional medical advice.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Your job breaks your body&rsquo;s clock
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-6 leading-relaxed">
            The galley at 3am. The jumpseat during taxi. The layover that should have been a city but was
            just blackout curtains and room service. You know the feeling. What&rsquo;s been missing is
            something that tells you what to do about it — before you&rsquo;re already in it.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-8 leading-relaxed">
            V&Eacute;LA reads your roster and shows you what your body clock will be doing, duty by duty.
            Not after the fact. Before you even pack your bag.
          </p>
          <div className="mb-6">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">The Departure</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md text-center">
                    Your report time is 02:00. Your body thinks it&rsquo;s the middle of the night — because
                    it is. V&Eacute;LA saw this coming three days ago.
                  </p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">The Layover</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md text-center">
                    30 hours in Melbourne. Your body clock is sitting somewhere over the Indian Ocean.
                    V&Eacute;LA tells you exactly when to sleep to actually use this layover.
                  </p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">The Return</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md text-center">
                    You&rsquo;re home. Your days off start now. V&Eacute;LA shows you why the first 24 hours
                    matter most — and what to do with them.
                  </p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Your body clock has a logic. V&Eacute;LA speaks it.
          </h2>
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-8 pl-4 border-l-2 border-gold leading-relaxed">
            Every time you feel wrecked after a short trip, or strangely fine after a long one — that&rsquo;s
            your circadian rhythm doing something specific and predictable.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-8 leading-relaxed">
            It&rsquo;s not random. It&rsquo;s not just &ldquo;jet lag.&rdquo; And it&rsquo;s not something you have to keep
            figuring out alone. V&Eacute;LA combines your actual roster with the same circadian science used in
            space and military operational planning — and translates it into something you can actually use.
            No jargon. No guesswork. Just your body clock, made readable.
          </p>
          <div className="mb-6">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={true}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Your Day Off</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md text-center">
                    Your body clock didn&rsquo;t reset on your day off. V&Eacute;LA shows you where it actually
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

      {/* SUGGESTIONS SECTION */}
      <section className="w-full py-20 md:py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Know what&rsquo;s coming. Know what to do.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-12 leading-relaxed">
            Most crew go into every trip reacting. V&Eacute;LA puts you a step ahead. Upload your roster and
            V&Eacute;LA gives you a clear picture of what your body clock will need — and when. Simple,
            specific, and built around your actual schedule. Not generic advice. Yours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Sleep Timing</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                Your best sleep window before Day 3 duty is 22:00&ndash;06:00. Hit that and you&rsquo;ll feel
                the difference on the jumpseat.
              </p>
            </div>
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Light Exposure</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                Tomorrow at 07:00, get outside. Ten minutes of morning light after that overnight sector
                will start pulling your body clock back where it belongs.
              </p>
            </div>
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Recovery Priority</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                You just landed. Your body is asking for one thing right now — and it isn&rsquo;t the hotel
                gym. Sleep first. Everything else can wait 12 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT BY CREW SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Built by crew.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed">
            This is where V&Eacute;LA came from. Not a strategy session. A crew member who got tired of
            asking the same questions as everyone else — and getting nothing back.
          </p>
          <div className="bg-cream rounded-2xl p-8 md:p-12 mb-16 border border-warmLine">
            <p className="font-display text-2xl md:text-3xl italic text-gold mb-6 leading-relaxed">
              &ldquo;Early in my flying career, I was struggling to adjust to the job. Not the service. Not
              the passengers. The schedule. What it was doing to my body, my sleep, my life outside the
              aircraft.
            </p>
            <p className="font-display text-2xl md:text-3xl italic text-gold mb-6 leading-relaxed">
              I remember thinking — why has no one built something for this? Why does no one have our backs?
            </p>
            <p className="font-display text-2xl md:text-3xl italic text-gold mb-6 leading-relaxed">
              So I decided to build it myself. Using what I was living, and what crew around me were telling
              me. V&Eacute;LA exists because that question had no answer.
            </p>
            <p className="font-display text-2xl md:text-3xl italic text-gold mb-8 leading-relaxed">
              But I can only see so far from where I&rsquo;m standing. Now I need you too.&rdquo;
            </p>
            <p className="font-sans text-base text-inkMid">
              — A crew member who got tired of being tired
            </p>
          </div>

          {/* Survey CTA */}
          <div className="text-center">
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
              Help shape V&Eacute;LA
            </p>
            <h3 className="font-display text-4xl md:text-5xl font-light text-ink mb-6">
              Your experience should shape this.
            </h3>
            <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
              Three minutes. Completely anonymous. Tell us what this job really feels like — and help make
              V&Eacute;LA better for every crew member who needs it.
            </p>
            <Link
              href="/survey"
              className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105"
            >
              Take the survey &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6">
            Your roster. Your body clock. Finally, both in one place.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-6 leading-relaxed">
            Download V&Eacute;LA. Upload your roster. And for the first time, see exactly what&rsquo;s coming
            — before it hits you.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-10 leading-relaxed">
            This is what it feels like to stop reacting and start preparing. To actually use your layovers.
            To show up for your life outside the aircraft.
          </p>
          <div className="rounded-[20px] border border-warmLine bg-parchment/80 p-6 mb-8 max-w-2xl mx-auto text-left">
            <p className="font-sans text-sm text-inkMid leading-relaxed">
              A note before you download: V&Eacute;LA is a{" "}
              <strong className="font-medium text-ink">personal lifestyle planning</strong> tool, not a
              medical device. What you&rsquo;ll find here is roster-based insight to help you plan — not
              clinical advice, and not a replacement for your airline&rsquo;s fatigue management requirements.
            </p>
          </div>
          <Link
            href="/early-access"
            className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Get Early Access
          </Link>
        </div>
      </section>

      {/* APP STORE LINKS */}
      <section className="w-full py-12 md:py-16 bg-cream border-t border-warmLine">
        <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center gap-6">
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-inkFaint font-semibold">
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
