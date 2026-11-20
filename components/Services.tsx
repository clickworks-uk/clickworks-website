import { Container } from "@/components/Container";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { ArrowUpRight } from "lucide-react";

export function Services() {
  return (
    <section id="features" className="scroll-mt-20 pb-8 pt-6 sm:pb-24 sm:pt-10">
      {/* Services rail — full-bleed, so it can run off the right edge */}
      <div id="services" className="scroll-mt-24">
        <ServiceCarousel />
      </div>

      <Container>

        {/* Human proof */}
        <p className="mx-auto mt-12 max-w-3xl text-balance text-center text-xl font-bold leading-[1.2] tracking-tight text-ink sm:mt-20 sm:text-3xl">
          Real people providing world-class, evidence-based strategies.
        </p>
      </Container>

      <Container className="mt-6 flex justify-center sm:mt-12">
        <a
          href="#community"
          className="inline-flex items-center gap-2 rounded-full border border-[#f2f2f2] bg-paper px-4 py-2 text-sm font-normal text-[#545454] shadow-soft transition-colors hover:border-line sm:gap-3 sm:px-16 sm:py-3 sm:text-base"
        >
          Meet Core Team
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 sm:size-5"
            strokeWidth={2}
          />
        </a>
      </Container>
    </section>
  );
}
