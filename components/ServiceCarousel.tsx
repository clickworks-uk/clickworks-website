import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import { SERVICE_SLIDES, type ServiceSlide } from "@/lib/content";

/**
 * The services rail: divided cells that advance on their own and run off the
 * right edge. No heading and no arrows — the rule above the cells is the only
 * chrome. Autoplay pauses on hover, touch and keyboard focus, and does not
 * start at all when motion is reduced.
 */
export function ServiceCarousel({
  slides = SERVICE_SLIDES,
  className,
}: {
  slides?: ServiceSlide[];
  className?: string;
}) {
  return (
    <Carousel
      label="Services"
      autoplay
      interval={3500}
      arrows={false}
      align="start"
      rule
      gap="none"
      className={className}
    >
      {slides.map((slide) => (
        <Cell key={slide.label} slide={slide} />
      ))}
    </Carousel>
  );
}

function Cell({ slide }: { slide: ServiceSlide }) {
  return (
    // The divider belongs to the cell, so the grid keeps its rhythm however
    // many slides there are, and the first one lands on the page gutter.
    // The ceiling is set so the five current slides just fit the 72rem
    // measure: the rail then sits still on a wide screen instead of nudging a
    // few pixels and snapping back, and still auto-scrolls on narrower ones
    // where they genuinely overflow. Add more slides and it scrolls there too.
    <article className="w-[clamp(160px,42vw,228px)] shrink-0 snap-start border-l border-line last:border-r">
      <div className="flex h-[clamp(120px,30vw,170px)] items-center justify-center px-5">
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.alt ?? ""}
            width={160}
            height={160}
            sizes="(max-width: 640px) 42vw, 228px"
            className="max-h-full w-auto object-contain"
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
