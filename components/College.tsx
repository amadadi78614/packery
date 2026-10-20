"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Handshake, Briefcase, Users, Award } from "lucide-react";
import { college, site, waLink, waMessages } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";
import { Reveal } from "./motion";

const offerIcons = [Briefcase, Users, Award, Handshake];

export default function College() {
  return (
    <section id="college" className="relative isolate overflow-hidden bg-ez-deep py-20 text-white sm:py-28">
      <div className="absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-ez-emerald blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 left-10 -z-10 h-[24rem] w-[24rem] rounded-full bg-ez-gold/20 blur-3xl" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden />

      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ez-gold">
                <span className="h-px w-6 bg-ez-gold" /> About the programme
              </span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                The bridge between <span className="text-ez-gold">qualification</span> and employment.
              </h2>
              
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-50/80">{college.summary}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {college.highlights.map((h, i) => {
                  const I = offerIcons[i % offerIcons.length];
                  return (
                    <li key={h} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ez-gold text-ez-deep"><I className="h-4 w-4" /></span>
                      {h}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#apply" className="btn group bg-ez-gold px-7 py-3.5 text-ez-deep hover:bg-ez-light">
                  Apply now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={waLink(waMessages.college)}
                  target="_blank" rel="noopener noreferrer"
                  className="btn bg-[#25D366] px-7 py-3.5 text-white hover:bg-[#1ebe5b]"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Partnership enquiry — ${college.name}`)}`}
                  className="btn border border-white/25 px-7 py-3.5 text-white hover:border-white/60 hover:bg-white/5"
                >
                  <Handshake className="h-5 w-5" /> Partner with us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal x={40} y={0}>
            <div className="relative mx-auto max-w-md">
              <motion.div
                className="absolute -inset-3 rounded-[2.5rem] border border-ez-gold/40"
                animate={{ rotate: [0, 2.5, 0, -2.5, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 140, damping: 16 }}
                >
                  <Image
                    src="/brand/ez-logo.png"
                    alt={`${college.legalName} logo`}
                    width={481} height={228}
                    className="mx-auto h-auto w-full max-w-[18rem]"
                  />
                </motion.div>
                <div className="mt-8 grid grid-cols-2 gap-3 text-left">
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ez-emerald/70">Programme</p>
                    <p className="mt-1 font-display text-2xl font-bold text-ez-emerald">{college.programmeShort}</p>
                    <p className="text-xs text-slate-500">AT(SA) · SAICA-accredited</p>
                  </div>
                  <div className="rounded-2xl bg-amber-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-800/70">Funding</p>
                    <p className="mt-1 font-display text-2xl font-bold text-amber-800">SETA</p>
                    <p className="text-xs text-slate-500">All learners SETA-funded</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-slate-600">{college.partnerPitch}</p>
                <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] text-slate-400">
                  {college.legalName} · Reg. {college.regNo}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
