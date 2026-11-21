import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { TeamRow } from "@/components/TeamRow";

export const metadata: Metadata = {
  title: "Our Team — Clickworks",
  description: "The people behind the work.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageIntro title="Our Team" />
      <TeamRow />
    </>
  );
}
