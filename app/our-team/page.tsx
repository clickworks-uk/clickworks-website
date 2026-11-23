import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Our Team — Clickworks",
  description: "The people behind the work.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageIntro title="Our Team" />

      <Container className="pb-28 pt-4 text-center sm:pb-40">
        <p className="text-xl font-normal tracking-tight text-ink-muted sm:text-2xl">
          Coming soon
        </p>
      </Container>
    </>
  );
}
