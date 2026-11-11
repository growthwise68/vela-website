import Image from "next/image";

/**
 * Static hero phone showing the real app home screen — same frame style as
 * the navy-section carousel (PhoneFrame), just non-interactive and sized for
 * the cream hero band instead of the navy one.
 */
export function HeroPhone() {
  return (
    <div className="relative flex justify-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-gold/20 blur-3xl"
      />
      <div className="relative w-[240px] md:w-[300px] rounded-[2.5rem] border-[6px] border-navy bg-navy p-2 ring-1 ring-gold/30 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        <div className="absolute left-1/2 top-2 -translate-x-1/2 w-16 md:w-20 h-4 md:h-5 rounded-full bg-navy z-10" />
        <div className="relative rounded-[2rem] overflow-hidden" style={{ aspectRatio: "924 / 2000" }}>
          <Image
            src="/images/app/app-home.webp"
            alt="VÉLA home screen showing today's duty, body clock status and next rest window"
            fill
            sizes="(min-width: 768px) 300px, 240px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
