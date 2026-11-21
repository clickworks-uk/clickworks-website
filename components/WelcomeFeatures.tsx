import { Container } from "@/components/Container";
import { VideoFrame } from "@/components/VideoFrame";
import { Wordmark } from "@/components/Wordmark";

/**
 * Centred "Welcome to clickworks" over the founder's video.
 *
 * The frame is empty until a file is dropped in `public/` and passed to
 * VideoFrame as `src`.
 */
export function WelcomeFeatures() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <h2 className="flex flex-wrap items-center justify-center gap-x-2.5 text-center text-2xl font-normal tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Welcome to <Wordmark className="h-[0.85em]" />
        </h2>

        <VideoFrame className="mt-10 sm:mt-14" />
      </Container>
    </section>
  );
}
