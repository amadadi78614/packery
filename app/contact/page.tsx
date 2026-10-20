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
      <div className="container-site -mt-12 flex flex-col items-center gap-3 pb-20 text-center">
        <p className="text-sm text-slate-500">Already a client? We&apos;d value your feedback.</p>
        <div className="flex flex-wrap justify-center gap-3">
          {googleReviewUrl && <GoogleReviewButton />}
          <Link href="/review" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition hover:border-accent-500">
            Write a testimonial <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
