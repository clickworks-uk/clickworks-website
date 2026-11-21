import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
          A column per service: the tile opens the enquiry form with that
          service chosen, and the individual services sit underneath it,
          separated by hairlines. Columns start at the top so a long list
          does not stretch its neighbours.
        */}
        <ul className="grid grid-cols-1 items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_SLIDES.map((service) => (
            <li key={service.slug}>
              <a
                href={`/enquiry?service=${service.slug}`}
                className="group flex items-center gap-4 bg-paper-soft px-5 py-4 ring-1 ring-line transition-colors hover:bg-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {service.image ? (
                  <Image
                    src={service.image}
                    alt=""
                    width={420}
                    height={420}
                    sizes="48px"
                    className="size-10 shrink-0 object-contain"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-10 shrink-0 bg-paper ring-1 ring-line"
                  />
                )}

                <h2 className="min-w-0 flex-1 text-balance text-base font-normal leading-snug tracking-tight text-ink">
                  {service.label}
                </h2>

                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="size-5 shrink-0 text-ink-muted transition-transform duration-300 ease-(--ease-out-soft) group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {service.includes && (
                <ul className="mt-6 border-t border-line">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="border-b border-line py-3 text-sm leading-snug text-ink sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
