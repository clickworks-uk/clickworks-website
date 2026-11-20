import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import { SERVICE_SLIDES, type ServiceSlide } from "@/lib/content";

/**
 * The services rail: a heading and arrows on one line, a hairline beneath,
 * then a row of divided cells that scrolls sideways and bleeds off the right
 * edge. Cells are left-aligned rather than centred so the dividers read as a
 * continuous grid starting at the page gutter.
 */
export function ServiceCarousel({
  heading = "What we do.",
  subheading = "Three disciplines, one team.",
  slides = SERVICE_SLIDES,
  className,
}: {
  heading?: string;
  subheading?: string;
  slides?: ServiceSlide[];
  className?: string;
}) {
  return (
    <Carousel
      label="Services"
      heading={heading}
      subheading={subheading}
      arrowsPlacement="header"
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
    // many slides there are, and the first one lands exactly on the page
    // gutter alongside the heading.
    <article className="w-[clamp(150px,40vw,210px)] shrink-0 snap-start border-l border-line last:border-r">
      <div className="flex h-[clamp(120px,30vw,170px)] items-center justify-center px-5">
        {slide.image ? (
          <Image
            src={slide.image}
            alt={slide.alt ?? ""}
            width={160}
            height={160}
            sizes="(max-width: 640px) 40vw, 210px"
            className="max-h-full w-auto object-contain"
          />
        ) : (
          <div
            aria-hidden="true"
            className="size-[clamp(64px,16vw,96px)] rounded-xl bg-paper-soft ring-1 ring-line"
          />
        )}
      </div>

      <h3 className="px-5 pb-8 pt-2 text-sm text-ink sm:text-base">
        {slide.label}
      </h3>
    </article>
  );
}
