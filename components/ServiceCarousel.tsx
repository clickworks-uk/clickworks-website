import Image from "next/image";
import { clsx } from "@/lib/clsx";
import { SERVICE_SLIDES, type ServiceSlide } from "@/lib/content";

/**
 * The services marquee: divided cells scrolling continuously and repeating
 * without a seam.
 *
 * The track holds the slides twice and shifts by half its own width, so the
 * moment it wraps, the second copy is sitting exactly where the first began
 * and the jump is invisible. It pauses on hover, and stops altogether when
 * motion is reduced — by the OS setting or by the site's own toolbar — where
 * the duplicate half is dropped and the row becomes a plain scrollable strip.
 */
export function ServiceCarousel({
  slides = SERVICE_SLIDES,
  className,
}: {
  slides?: ServiceSlide[];
  className?: string;
}) {
  return (
    <section
      aria-label="Services"
      className={clsx(
        "marquee-viewport group relative overflow-hidden border-t border-line",
        "motion-reduce:overflow-x-auto",
        className,
      )}
    >
      <div
        className={clsx(
          "marquee-track flex w-max",
          "animate-[marquee_32s_linear_infinite]",
          "group-hover:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        {slides.map((slide) => (
          <Cell key={slide.label} slide={slide} />
        ))}

        {/*
          The second copy is the same content again, so it is hidden from
          assistive tech and dropped entirely when motion is reduced.
        */}
        <div aria-hidden="true" className="marquee-clone flex motion-reduce:hidden">
          {slides.map((slide) => (
            <Cell key={`${slide.label}-clone`} slide={slide} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Cell({ slide }: { slide: ServiceSlide }) {
  return (
    // The divider belongs to the cell, so the grid keeps its rhythm however
    // many slides there are and however far the track has travelled.
    <article className="w-[clamp(160px,42vw,228px)] shrink-0 border-l border-line">
      <div className="flex h-[clamp(120px,30vw,170px)] items-center justify-center px-5">
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.alt ?? ""}
            width={420}
            height={420}
            sizes="(max-width: 640px) 42vw, 228px"
            className="size-[clamp(72px,18vw,110px)] object-contain"
          />
        ) : (
          <div
            aria-hidden="true"
            className="size-[clamp(64px,16vw,96px)] rounded-xl bg-paper-soft ring-1 ring-line"
          />
        )}
      </div>

      {/* Same treatment as the project and team card titles. */}
      <h3 className="text-balance px-5 pb-8 pt-2 text-base font-semibold tracking-tight text-ink sm:text-lg">
        {slide.label}
      </h3>
    </article>
  );
}
