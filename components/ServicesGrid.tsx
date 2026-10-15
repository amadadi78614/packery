"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { serviceDetails } from "@/lib/serviceDetails";
import { Reveal, stagger, rise } from "./motion";

export default function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="aurora aurora-1 opacity-40" aria-hidden />
      <div className="container-site relative">
        {heading && (
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal className="max-w-2xl">
              <span className="eyebrow text-accent-400">Our services</span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Everything your finances need. <span className="text-slate-400">Under one roof.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/services" className="btn-ghost-light group">
                View all services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        )}

        <motion.ul
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
          className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => {
            const I = s.icon;
            return (
              <motion.li key={s.id} variants={rise} className="w-[82%] shrink-0 snap-center sm:w-auto">
                <Link
                  href={`/services/${serviceDetails[s.id].slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-2 hover:border-accent-400/60 hover:bg-white/[0.08]"
                >
                  <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-500/0 blur-2xl transition duration-500 group-hover:bg-accent-500/30" aria-hidden />
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-500/15 text-accent-400 transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-navy-950">
                      <I className="h-6 w-6" />
                    </span>
                    <span className="font-display text-sm font-bold text-white/20">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-accent-300">{s.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">{s.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Explore {s.short.toLowerCase()}
                    <ArrowUpRight className="h-4 w-4 text-accent-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
        <p className="mt-2 text-center text-xs font-medium text-slate-500 sm:hidden" aria-hidden>Swipe for more →</p>
      </div>
    </section>
  );
}
