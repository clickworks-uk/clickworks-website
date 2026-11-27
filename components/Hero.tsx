import Link from "next/link";
import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { ENQUIRY_HREF } from "@/lib/links";

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

          {/*
            The pair wraps rather than shrinks on narrow phones: two pills
            squeezed onto one line would leave tap targets below the 44px
            minimum.
          */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ENQUIRY_HREF}
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-soft transition-colors hover:bg-accent-strong"
            >
              Get Started
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/45 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}
