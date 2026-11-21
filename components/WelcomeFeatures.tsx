import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";

/**
 * Centred "Welcome to clickworks" over a single landscape panel.
 *
 * The panel is an empty square-cornered slot waiting on artwork — drop a
 * landscape image in here and it fills the frame.
 */
export function WelcomeFeatures() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <h2 className="flex flex-wrap items-center justify-center gap-x-2.5 text-center text-2xl font-normal tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Welcome to <Wordmark className="h-[0.85em]" />
        </h2>

        <div
          aria-hidden="true"
          className="relative mt-10 aspect-video w-full overflow-hidden bg-paper-soft ring-1 ring-line sm:mt-14"
        />
      </Container>
    </section>
  );
}
