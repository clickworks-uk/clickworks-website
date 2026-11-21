import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageIntro } from "@/components/PageIntro";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = {
  title: "Enquiry — Clickworks",
  description: "Tell us what you are trying to grow.",
};

export default function EnquiryPage() {
  return (
    <>
      <PageIntro
        title="Start an enquiry"
        lede="Tell us what you are trying to grow and we will come back to you."
      />

      <Container className="max-w-3xl pb-20 sm:pb-28">
        <EnquiryForm />
      </Container>
    </>
  );
}
