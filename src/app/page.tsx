"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Note: Metadata must be exported separately for client components
// Moving to layout.tsx if needed

export default function HomePage() {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
            By crew, for crew
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-tight text-ink mb-6">
            Plan rest and readiness around your roster
          </h1>
          <p className="font-sans text-xl md:text-2xl font-light text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            Véla helps you see how sleep timing and time zones may affect your readiness—using
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
            <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-inkFaint mb-3 font-semibold">
              Important
            </p>
            <p className="font-sans text-base md:text-lg text-inkMid leading-relaxed">
              Véla is a <strong className="font-medium text-ink">personal lifestyle planning</strong> tool. It
              is not a medical device and does not provide medical, health, or safety advice. Readiness
              scores are estimates for personal planning only—not for safety-critical or fitness-for-duty
              decisions. Véla is not part of any airline Fatigue Risk Management System (FRMS) and does
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
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-8 leading-relaxed">
            Crossing time zones, working at night, sleeping at odd hours—long-haul flying disrupts everything your body expects. You might feel exhausted after a short trip, alert after a long one. You don&rsquo;t know if it&rsquo;s jet lag, accumulated sleep debt, or the roster itself. This unpredictability means you&rsquo;re always guessing how ready you really are.
          </p>
          {/* Problem Section Carousel */}
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
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Day 1–2: Departure & Adaptation</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md">Overnight duty + time zone shift. Sleep debt builds. Your body clock is disrupted.</p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Day 3–4: Peak Fatigue Window</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md">Sleep window doesn&rsquo;t align with your circadian rhythm. This is when readiness dips most.</p>
                  <div className="flex gap-3 justify-center text-xs font-mono">
                    <span className="px-3 py-1 bg-blue-200 text-blue-900 rounded">Sleep</span>
                    <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Flight</span>
                    <span className="px-3 py-1 bg-yellow-200 text-yellow-900 rounded">Rest</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-80 md:h-96 flex flex-col items-center justify-center text-inkMid px-6">
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Day 5+: Recovery Begins</h3>
                  <p className="text-lg md:text-xl mb-4 max-w-md">Sleep timing starts to align. Readiness recovers if you prioritize rest. Understanding helps you act.</p>
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
            Understand why you feel the way you do
          </h2>
          <p className="font-display text-2xl md:text-3xl italic text-gold mb-8 pl-4 border-l-2 border-gold leading-relaxed">
            Knowledge is power. When you understand the mechanism—not just the symptom—you can make better choices for yourself.
          </p>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-8 leading-relaxed">
            Véla doesn&rsquo;t tell you what to do. It shows you why you feel the way you do. By combining your actual roster with published sleep science, Véla reveals how sleep timing, time zones, and duty patterns affect your readiness. This is transparency you can trust.
          </p>
          {/* Knowledge Section Carousel */}
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
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Your Readiness Forecast</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md">A 7-day outlook shows how sleep timing and time zones affect your readiness score.</p>
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
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Sleep Timing Suggestions</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md">Get specific, schedule-based recommendations for sleep windows and light exposure.</p>
                  <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-xs font-semibold text-ink">Optimal Sleep: 22:00–06:00</p>
                      <p className="text-xs text-inkMid">Aligns with your rhythm on Day 3</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-xs font-semibold text-ink">Light Exposure: 08:00</p>
                      <p className="text-xs text-inkMid">Reset circadian rhythm</p>
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
                  <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">Your Personal Insights</h3>
                  <p className="text-lg md:text-xl mb-6 max-w-md">Over time, Véla learns your patterns and helps you understand what works for you.</p>
                  <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Pattern:</strong> You recover fastest with 8+ hours of sleep</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Observation:</strong> Light exposure before 09:00 helps reset rhythm</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-inkMid"><strong>Tip:</strong> Post-flight rest &gt; activity during first 24 hours</p>
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
            Get practical guidance tailored to your roster
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid mb-12 leading-relaxed">
            Based on your schedule, Véla suggests optimal sleep timing, light exposure windows, and meal timing to help you manage fatigue. These aren&rsquo;t medical directives—they&rsquo;re starting points you can test and refine. Over time, you&rsquo;ll learn what works for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Suggestion Card 1 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Sleep Timing</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                Sleep window 22:00–06:00 will boost your readiness for Day 3 duty. Plan light exposure after waking.
              </p>
            </div>
            {/* Suggestion Card 2 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Light Exposure</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                Seek light at 07:00 tomorrow to reset your circadian rhythm after the overnight flight.
              </p>
            </div>
            {/* Suggestion Card 3 */}
            <div className="bg-cream border-l-2 border-gold rounded-xl p-6 shadow-sm">
              <h3 className="font-display text-3xl text-ink mb-3">Recovery Priority</h3>
              <p className="font-sans text-lg text-inkMid leading-relaxed">
                Post-flight: prioritize sleep over activity. Your fatigue debt is highest in the first 12 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BY-CREW-FOR-CREW SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-12 border-b-2 border-gold pb-4">
            Built with people who live this
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Placeholder for crew photo */}
            <div className="w-72 h-72 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-white text-center p-6">
              <p className="text-sm">Stock crew photo<br />(Pilot or Flight Attendant)</p>
            </div>
            {/* Testimonial quote */}
            <div>
              <p className="font-display text-3xl md:text-4xl italic text-gold mb-6 leading-relaxed">
                &ldquo;Every feature in Véla is shaped by cabin crew who work these routes every month. It&rsquo;s transparent, it&rsquo;s science-backed, and it&rsquo;s built for us—not for airlines or regulators.&rdquo;
              </p>
              <p className="font-sans text-lg text-inkMid">
                <strong className="text-ink text-xl">Flight Attendant or Pilot</strong><br />
                <span className="text-base">International Carrier</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SURVEY SECTION */}
      <section className="w-full py-20 md:py-32 bg-parchment border-t border-warmLine">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
            Help shape Vela
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6">
            Tell us about your fatigue
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            3 minutes. Your story. No spam. Your responses directly shape what we build next.
          </p>
          <Link
            href="/survey"
            className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105"
          >
            Take the survey →
          </Link>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-parchment/50 to-cream/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-5xl md:text-6xl font-light text-ink mb-6">
            Your personal readiness companion
          </h2>
          <p className="font-sans text-xl md:text-2xl text-inkMid max-w-2xl mx-auto mb-8 leading-relaxed">
            Download Véla. Enter your roster. See your readiness forecast and sleep timing suggestions. No medical jargon. No airline bureaucracy. Just clear, understandable insights you can act on.
          </p>
          <button className="inline-block px-6 py-3 bg-gold text-ink font-semibold rounded hover:bg-yellow-600 transition-all hover:scale-105">
            Get TestFlight Access
          </button>
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
