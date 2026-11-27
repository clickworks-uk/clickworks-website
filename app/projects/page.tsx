import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro, PhotoSlot } from "@/components/PageIntro";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { Testimonials } from "@/components/Testimonials";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects — Clickworks",
  description: "Selected work from Clickworks.",
};



export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        title="Projects"
        lede="A selection of the work, and what it was built to do."
      />

      <Container>
        {/*
          Two across rather than four: these are landscape tiles, and four in
          a row leaves each one too small to show anything.
        */}
        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-7">
          {PROJECTS.map((project) => (
            <li key={project.client}>
              <article className="group">
                <PhotoSlot
                  className="aspect-video w-full transition-transform duration-500 ease-(--ease-out-soft) group-hover:-translate-y-1"
                  label={project.client}
                />
                <h2 className="mt-4 text-base font-semibold tracking-tight text-ink sm:text-lg">
                  {project.client}
                </h2>
                {project.discipline && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                    {project.discipline}
                  </p>
                )}
                {project.summary && (
                  <p className="mt-2 text-sm leading-snug text-ink-muted">
                    {project.summary}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <div className="py-16 sm:py-24">
        <ServiceCarousel />
      </div>

      <Testimonials />
    </>
  );
}
