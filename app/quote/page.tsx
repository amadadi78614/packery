import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Request a free, no-obligation quote from S Packery Inc. for accounting, tax, auditing or business services in Nelspruit — online or on WhatsApp.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Get a quote"
        title="Your tailored quote,"
        highlight="in three quick steps."
        subtitle="Tell us what you need and we'll come back with a clear, fixed-scope proposal. No obligation, no jargon."
        crumbs={[{ label: "Get a Quote" }]}
      />
      <QuoteWizard />
    </>
  );
}
