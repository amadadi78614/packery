import type { Metadata } from "next";
import { Sparkle } from "lucide-react";
import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CtaBand from "@/components/CtaBand";
import { Reveal } from "@/components/motion";
import { allServices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting, Tax, Audit & Business Services",
  description:
    "Full-service accounting and auditing practice in Nelspruit: annual financial statements, taxation, SARS facilitation, statutory and forensic audits, BEE, CIPC, company registrations and business advisory.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="A full-service practice,"
        highlight="under one roof."
        subtitle="From monthly accounts to forensic audits, SARS negotiations to company registrations — corporate expertise with a personal touch."
        crumbs={[{ label: "Services" }]}
      />
      <Services />
      <section className="py-20 sm:py-24">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">The full list</span>
            <h2 className="h-section mt-4">Everything we do</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {allServices.map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-navy-900 transition hover:-translate-y-0.5 hover:border-accent-500 hover:shadow-md"
                >
                  <Sparkle className="h-3.5 w-3.5 fill-accent-500 text-accent-500" aria-hidden /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <Process />
      <CtaBand />
    </>
  );
}
