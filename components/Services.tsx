import { ServiceCarousel } from "@/components/ServiceCarousel";

export function Services() {
  return (
    <section id="features" className="scroll-mt-20 pb-8 pt-6 sm:pb-24 sm:pt-10">
      {/* Services rail — full-bleed, so it can run off the right edge */}
      <div id="services" className="scroll-mt-24">
        <ServiceCarousel />
      </div>
    </section>
  );
}
