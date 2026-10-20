import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import College from "@/components/College";
import { GraduationCap } from "lucide-react";
import CollegeApply from "@/components/CollegeApply";
import { WhatsAppIcon } from "@/components/icons/Brand";
import { college, waLink, waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "EZ Accounting College — SAICA-accredited AT(SA) Programme",
  description:
    "Apply to EZ Accounting College, a division of S Packery Inc.: a SAICA-accredited AT(SA) programme of 12 to 18 months for SETA-funded learners with an NQF 5 accounting or related qualification.",
};

export default function CollegePage() {
  return (
    <>
      <PageHero
        variant="ez"
        eyebrow={college.tagline}
        title={college.name}
        subtitle={`${college.motto} A ${college.programme} for SETA-funded learners, trained and mentored inside a working chartered accountancy and audit practice.`}
        crumbs={[{ label: "EZ Accounting College" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#apply" className="btn group bg-ez-gold px-8 py-4 text-base text-ez-deep hover:bg-ez-light">
            <GraduationCap className="h-5 w-5" /> Apply now
          </a>
          <a href={waLink(waMessages.college)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] px-8 py-4 text-base text-white hover:bg-[#1ebe5b]">
            <WhatsAppIcon className="h-5 w-5" /> Ask how to apply
          </a>
        </div>
      </PageHero>
      <College />
      <CollegeApply />
    </>
  );
}
