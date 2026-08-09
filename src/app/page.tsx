"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
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
            className="inline-block px-8 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Get Early Access
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mt-4">
            V&Eacute;LA is currently in early access &mdash; join now to be first when it&rsquo;s ready.
          </p>
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
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
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
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">The Layover</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md text-center">
                    30 hours in Melbourne. Your body clock is sitting somewhere over the Indian Ocean.
                    V&Eacute;LA shows you when rest will help most, so you can actually use this layover.
                  </p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
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
            figuring out alone. V&Eacute;LA combines your actual roster with published circadian science
            — and translates it into something you can actually use.
            No jargon. No guesswork. Just your body clock, made readable.
          </p>
          <div className="mb-6">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true, dynamicBullets: true }}
              loop={true}
              className="rounded-lg overflow-hidden"
            >
              <SwiperSlide>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
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
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-[320px] md:min-h-[384px] flex flex-col items-center justify-center py-8 text-inkMid px-6">
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
                Your estimated best sleep window before Day 3 duty is 22:00&ndash;06:00. Planning around it
                can help you feel more rested for the jumpseat.
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
      <section className="w-full pt-20 md:pt-32 pb-12 md:pb-16 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6 border-b-2 border-gold pb-4">
            Built by crew.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-10 leading-relaxed">
            This is where V&Eacute;LA came from. Not a strategy session. A crew member who got tired of
            asking the same questions as everyone else — and getting nothing back.
          </p>
          <div className="bg-cream rounded-2xl p-8 md:p-12 mb-8 border border-warmLine">
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

          {/* Survey CTA — continuation of founder quote */}
          <div className="pt-8">
            <p className="font-sans text-xl md:text-2xl text-ink leading-relaxed mb-4">
              V&Eacute;LA started with my own struggle &mdash; and it&rsquo;s kept growing because of yours too.
              That hasn&rsquo;t changed. It&rsquo;s still how V&Eacute;LA gets built.
            </p>
            <p className="font-sans text-xl md:text-2xl text-ink leading-relaxed">
              <Link
                href="/survey"
                className="text-gold underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Take the 3-minute survey
              </Link>{" "}
              &rarr; <span className="text-inkMid">(completely anonymous)</span>
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-display text-5xl md:text-6xl font-light text-ink mb-4">
            Your job shouldn&rsquo;t get to decide how you feel on your days off.
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-light text-inkMid mb-6">
            Your roster. Your body clock. Finally, both in one place.
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop reacting. Start preparing. Use your layovers. Show up for your life outside the aircraft.
          </p>
          <Link
            href="/early-access"
            className="inline-block px-8 py-4 bg-gold text-ink font-semibold rounded-xl text-base hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Get Early Access
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-inkFaint mt-4">
            V&Eacute;LA is currently in early access &mdash; join now to be first when it&rsquo;s ready.
          </p>
        </div>
      </section>
    </div>
  );
}
