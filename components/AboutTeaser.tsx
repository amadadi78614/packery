"use client";

import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { team, site } from "@/lib/site";
import { Reveal } from "./motion";

export default function AboutTeaser() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Who we are</span>
          <h2 className="h-section mt-4 text-4xl sm:text-5xl">Our work doesn&apos;t meet standards — it sets them.</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Established in {site.established}, {site.name} is an ethically driven accounting and auditing firm led by
            Chartered Accountant Suhayl Packery and legal strategist Ishaq Packery. Our clients range from large corporates
            to small businesses and individuals — from Gauteng to Barberton.
          </p>
          <Link href="/about" className="btn-navy group mt-8">
            Meet the team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent-300/40 to-navy-600/20 blur-2xl" aria-hidden />
            <div className="relative grid gap-4">
              {team.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${i === 1 ? "sm:ml-12" : "sm:mr-12"}`}
                >
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-accent-400 bg-navy-900 font-display text-xl font-bold text-white">
                    {p.initials}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-navy-900">{p.name}</span>
                    <span className="block text-sm font-medium text-accent-600">{p.role}</span>
                    <span className="block text-xs text-slate-500">{p.qualifications[0]}</span>
                  </span>
                </div>
              ))}
              <div className="rounded-3xl bg-navy-950 p-6 text-white">
                <Quote className="h-6 w-6 text-accent-400" />
                <p className="mt-3 font-display text-lg italic">&ldquo;{site.slogan}&rdquo;</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
