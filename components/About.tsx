"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, Quote } from "lucide-react";
import { site, yearsInPractice } from "@/lib/site";
import { Reveal, CountUp } from "./motion";

export default function About() {
  const p = site.partner;
  return (
    <section id="about" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2">
        {/* partner card */}
        <Reveal x={-40} y={0} className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-md">
            <motion.div
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-gold-400 via-gold-300/40 to-navy-600/40 blur-2xl"
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 5, repeat: Infinity }}
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 p-10 text-center text-white">
              <div className="grid-lines absolute inset-0" aria-hidden />
              {/* Swap for <Image src="/suhayl-packery.jpg" …/> when a professional headshot is supplied */}
              <div className="relative mx-auto grid h-40 w-40 place-items-center rounded-full border-2 border-gold-500 bg-navy-800 ring-[10px] ring-white/5">
                <span className="font-display text-5xl font-bold">{p.initials}</span>
              </div>
              <h3 className="relative mt-7 font-display text-3xl font-bold">{p.name}</h3>
              <p className="relative mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">{p.title}</p>
              <div className="relative mt-8 grid gap-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                  <GraduationCap className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  <span className="text-sm">Graduate, <strong className="text-white">{p.education}</strong></span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                  <Award className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
                  <span className="text-sm">Leading {site.legalName}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">About the firm</span>
            <h2 className="h-section mt-4 text-4xl sm:text-5xl">Built in Mbombela. Trusted across Mpumalanga.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              {site.legalName} was established in {site.established} in {site.city} as a firm of Chartered Accountants
              and Registered Auditors. For over a decade we&apos;ve combined the discipline of a registered audit practice
              with the accessibility of a local partner who picks up the phone.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="relative mt-8 rounded-3xl border-l-4 border-gold-500 bg-white p-7 shadow-sm">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-gold-300/50" aria-hidden />
              <p className="pr-10 font-display text-lg font-medium leading-relaxed text-navy-900">
                Our job is to understand your business properly, get the numbers right, and be there when it matters.
                Every client deals with the partner directly.
              </p>
              <footer className="mt-4 text-sm font-semibold text-gold-600">— {p.name}, {p.title}</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <dl className="mt-10 grid grid-cols-3 gap-4">
              {[
                { n: site.establishedYear, s: "", l: "Established" },
                { n: yearsInPractice, s: "+", l: "Years in practice" },
                { n: 4, s: "", l: "Core services" },
              ].map((x) => (
                <div key={x.l} className="rounded-2xl bg-white p-5 text-center shadow-sm">
                  <dd className="font-display text-3xl font-bold text-navy-900"><CountUp to={x.n} suffix={x.s} /></dd>
                  <dt className="mt-1 text-xs text-slate-500">{x.l}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
