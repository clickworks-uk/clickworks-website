import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { VideoFrame } from "@/components/VideoFrame";
import { ServiceCarousel } from "@/components/ServiceCarousel";

export const metadata: Metadata = {
  title: "About Us — Clickworks",
  description: "Why Clickworks exists, and the founder behind it.",
};

export default function AboutPage() {
  return (
    <>
      {/* Same frame as the home page, so the two read as one video slot. */}
      <Container className="pb-12 pt-12 sm:pb-20 sm:pt-20">
        <VideoFrame />
      </Container>

      <div className="pb-16 sm:pb-24">
        <ServiceCarousel />
      </div>
    </>
  );
}
