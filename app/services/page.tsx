import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { SERVICE_SLIDES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Clickworks",
  description:
    "Web development, social media, branding, SEO, digital marketing, consultation, graphic design and software development.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="All services"
        lede="Pick the one you need and tell us what you are trying to grow."
      />

      <Container className="pb-20 sm:pb-28">
        {/*
          A grid rather than the rail: every service visible at once, three
          to a row, each cell an equal share of the width. Seven services
          leaves the last row short, so the rules live on the cells rather
          than on a filled container behind them — otherwise the empty
          ninth cell shows up as a grey block.
        */}
        <ul className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLIDES.map((service) => (
            <li key={service.slug} className="border-b border-r border-line">
              <a
                href={`/enquiry?service=${service.slug}`}
                className="flex h-full flex-col items-center justify-start gap-5 px-6 py-10 transition-colors hover:bg-paper-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt=""
                    width={420}
                    height={420}
                    sizes="(max-width: 640px) 40vw, 160px"
                    className="size-[clamp(84px,22vw,128px)] object-contain"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="size-[clamp(84px,22vw,128px)] bg-paper-soft ring-1 ring-line"
                  />
                )}

                <h2 className="text-balance text-center text-base font-normal tracking-tight text-ink sm:text-lg">
                  {service.label}
                </h2>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
