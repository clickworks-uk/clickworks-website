import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";

export function Hero() {
  return (
    <section id="top">
      {/*
        The hero fills the first screen — 100svh less the 4rem sticky nav — so
        nothing else shows until the visitor scrolls. `svh` rather than `vh`
        keeps mobile browser chrome from cropping it.
      */}
      <div className="hero-sky">
        <Container className="flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-20 text-center sm:py-24">
          <p className="text-5xl font-semibold leading-none tracking-tight text-white sm:text-7xl">
            Introducing
          </p>
          {/*
            Flex blockifies the logo, so the h1 is exactly the artwork's height
            rather than a full line box with baseline space underneath. That
            dead space was most of the gap between the two lines.
          */}
          <h1 className="mt-1 flex justify-center text-6xl sm:text-8xl lg:text-9xl">
            <Wordmark onDark priority />
          </h1>


        </Container>
      </div>
    </section>
  );
}
