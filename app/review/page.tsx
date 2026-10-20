import type { Metadata } from "next";
import { Star, MessageSquareQuote } from "lucide-react";
import PageHero from "@/components/PageHero";
import TestimonialForm from "@/components/TestimonialForm";
import { googleReviewUrl } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Share Your Experience",
  description: "Clients of S Packery Inc.: leave a Google review or write a testimonial about your experience with our accounting, tax and audit services.",
};

export default function ReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Client feedback"
        title="Share your"
        highlight="experience."
        subtitle="Thank you for trusting S Packery Inc. Your feedback helps other businesses in Mpumalanga find an accountant they can rely on."
        crumbs={[{ label: "Share your experience" }]}
      />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            {googleReviewUrl && (
              <div className="rounded-[2rem] border border-amber-200 bg-amber-50/60 p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm"><Star className="h-6 w-6 fill-amber-400 text-amber-400" /></span>
                <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">Review us on Google</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  The quickest way to help us. It takes a minute and appears on our Google listing. You&apos;ll need a Google account.
                </p>
                <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn-navy mt-6">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Write a Google review
                </a>
              </div>
            )}
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-900 text-accent-400"><MessageSquareQuote className="h-6 w-6" /></span>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy-900">Or write a testimonial</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                No Google account needed. Use the form and choose how your name appears. We review every testimonial before publishing it on our website.
              </p>
            </div>
          </div>
          <TestimonialForm />
        </div>
      </section>
    </>
  );
}
