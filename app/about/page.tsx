import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import About from "@/components/About";
import Affiliations from "@/components/Affiliations";
import WhyUs from "@/components/WhyUs";
import CtaBand from "@/components/CtaBand";
import SocialProof from "@/components/SocialProof";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us & Our Team",
  description:
    "S Packery Inc. — Nelspruit chartered accountants and registered auditors since June 2013. Meet founder Suhayl Packery CA(SA) and Ishaq Packery, Head of Risk & Legal.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Where integrity"
        highlight="balances every ledger."
        subtitle={`Established in ${site.established} in Nelspruit, S Packery Inc. drives transparency, elevates compliance and helps shape the future of the profession.`}
        crumbs={[{ label: "About" }]}
      />
      <About />
      <SocialProof />
      <Affiliations />
      <WhyUs />
      <CtaBand />
    </>
  );
}
