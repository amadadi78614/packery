import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import GoogleReviewButton from "@/components/GoogleReviewButton";
import { googleReviewUrl } from "@/lib/reviews";
import { fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact S Packery Inc., chartered accountants and registered auditors at ${fullAddress}. Call or WhatsApp 066 557 2559 or email admin@packery.co.za.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about"
        highlight="your numbers."
        subtitle="Call, WhatsApp, email or visit us in Sonheuwel, Nelspruit. For a tailored proposal, use our quick quote form."
        crumbs={[{ label: "Contact" }]}
      >
        <Link href="/quote" className="btn-accent group px-8 py-4 text-base">
          Get a free quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </PageHero>
      <Contact />
      {googleReviewUrl && (
        <div className="container-site -mt-12 pb-20 text-center">
          <p className="mb-3 text-sm text-slate-500">Already a client? We&apos;d value your feedback.</p>
          <GoogleReviewButton />
        </div>
      )}
    </>
  );
}
