"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { college } from "@/lib/site";
import { Reveal } from "./motion";

export default function CollegeTeaser() {
  return (
    <section className="px-4 py-6 sm:px-8">
      <Reveal>
        <div className="relative isolate mx-auto grid max-w-site items-center gap-10 overflow-hidden rounded-[2.5rem] bg-ez-deep px-6 py-14 text-white sm:px-14 lg:grid-cols-[1fr_auto]">
          <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-ez-emerald blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 left-10 -z-10 h-72 w-72 rounded-full bg-ez-gold/20 blur-3xl" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ez-gold">{college.tagline}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {college.name}: <span className="text-ez-gold">{college.motto}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-emerald-50/80">
              An {college.programme} that bridges the gap between academic qualification and meaningful employment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/college#apply" className="btn group bg-ez-gold text-ez-deep hover:bg-ez-light">
                Apply now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/college" className="btn border border-white/25 text-white hover:border-white/60 hover:bg-white/5">
                Discover the college
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-black/30 transition duration-500 hover:rotate-[-2deg] hover:scale-105">
            <Image src="/brand/ez-logo.png" alt={`${college.legalName} logo`} width={481} height={228} className="h-auto w-56" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
