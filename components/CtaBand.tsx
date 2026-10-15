"use client";

import { ArrowRight, Phone } from "lucide-react";
import { site, waLink, waMessages } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";
import Link from "next/link";
import { Reveal } from "./motion";

export default function CtaBand() {
  return (
    <section className="px-4 py-6 sm:px-8">
      <Reveal>
        <div className="relative isolate mx-auto max-w-site overflow-hidden rounded-[2.5rem] bg-navy-950 px-6 py-20 text-center text-white sm:px-16">
          <div className="aurora aurora-1 -z-10 opacity-70" aria-hidden />
          <div className="aurora aurora-2 -z-10 opacity-60" aria-hidden />
          <div className="grid-lines absolute inset-0 -z-10 opacity-60" aria-hidden />
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Ready to take <span className="shimmer-accent">control</span> of your finances?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Get a tailored quote today — on the site, on WhatsApp, or by calling the office.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-accent group px-8 py-4 text-base">
              Get a Free Quote <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={waLink(waMessages.firm)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] px-8 py-4 text-base text-white hover:bg-[#1ebe5b]"><WhatsAppIcon className="h-5 w-5" /> WhatsApp us</a>
            <a href={site.phoneHref} className="btn-ghost-light px-8 py-4 text-base"><Phone className="h-4 w-4" /> {site.phoneDisplay}</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
