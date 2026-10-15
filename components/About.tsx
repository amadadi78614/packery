"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle2, Briefcase, GraduationCap } from "lucide-react";
import { site, team, founderQuote, commitments, yearsInPractice } from "@/lib/site";
import { Reveal, CountUp, stagger, rise } from "./motion";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      <div className="container-site">
        {/* Intro */}
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">About the firm</span>
            <h2 className="h-section mt-4 text-4xl sm:text-5xl">Our work doesn&apos;t meet standards — it sets them.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-slate-600">
              {site.name} is a Nelspruit-based, multi-disciplined practice established in {site.established}. Led by Chartered
              Accountant Suhayl Packery and legal strategist Ishaq Packery, we are an ethically driven accounting and auditing
              firm that doesn&apos;t just deliver services — we redefine them. With technical mastery and unwavering ethics, we
              drive transparency and elevate compliance.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { n: site.establishedYear, s: "", l: "Established", count: false },
              { n: yearsInPractice, s: "+", l: "Years in practice", count: true },
              { n: 2005, s: "", l: "Founder qualified as CA(SA)", count: false },
              { n: site.affiliations.length, s: "", l: "Registrations & accreditations", count: true },
            ].map((x) => (
              <div key={x.l} className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
                <dd className="font-display text-3xl font-bold text-navy-900">{x.count ? <CountUp to={x.n} suffix={x.s} /> : x.n}</dd>
                <dt className="mt-1 text-xs text-slate-500">{x.l}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Leadership */}
        <div className="mt-20">
          <Reveal>
            <span className="eyebrow">Leadership</span>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900">Meet the people behind the numbers.</h3>
          </Reveal>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            className="mt-10 grid gap-6 lg:grid-cols-2"
          >
            {team.map((p, idx) => (
              <motion.article
                key={p.name}
                variants={rise}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm hover:shadow-2xl hover:shadow-navy-900/10"
              >
                <div className="relative flex items-center gap-5 overflow-hidden bg-navy-950 p-7 text-white">
                  <div className="grid-lines absolute inset-0" aria-hidden />
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />
                  {/* Replace initials with a headshot after the team photoshoot */}
                  <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-accent-400 bg-navy-800 ring-8 ring-white/5">
                    <span className="font-display text-2xl font-bold">{p.initials}</span>
                  </div>
                  <div className="relative">
                    <h4 className="font-display text-2xl font-bold">{p.name}</h4>
                    <p className="text-sm font-semibold text-accent-300">{p.role}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{p.subtitle}</p>
                  </div>
                  <span className="absolute right-6 top-5 font-display text-5xl font-bold text-white/5" aria-hidden>0{idx + 1}</span>
                </div>

                <div className="grid gap-6 p-7 sm:grid-cols-[1fr_1.3fr]">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <GraduationCap className="h-4 w-4 text-accent-600" /> Qualifications
                    </p>
                    <ul className="mt-3 space-y-2">
                      {p.qualifications.map((q) => (
                        <li key={q} className="flex items-start gap-2 text-sm font-medium text-navy-900">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <Briefcase className="h-4 w-4 text-accent-600" /> Experience
                    </p>
                    <ol className="relative mt-3 space-y-3 border-l border-slate-200 pl-4">
                      {p.experience.map((e) => (
                        <li key={e.org + e.years} className="relative">
                          <span className="absolute -left-[1.3rem] top-1.5 h-2 w-2 rounded-full bg-accent-500 ring-4 ring-white" aria-hidden />
                          <p className="text-sm font-semibold text-navy-900">{e.org}</p>
                          <p className="text-xs text-slate-500">{e.role} · {e.years}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Quote + commitments */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <blockquote className="relative h-full overflow-hidden rounded-[2rem] bg-navy-950 p-8 text-white sm:p-10">
              <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-accent-500/15 blur-3xl" aria-hidden />
              <Quote className="h-10 w-10 text-accent-400" aria-hidden />
              <p className="relative mt-5 font-display text-lg font-medium leading-relaxed sm:text-xl">{founderQuote}</p>
              <footer className="relative mt-6 text-sm font-semibold text-accent-300">— Suhayl Packery, CA(SA) · Founder &amp; Managing Director</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-8 sm:p-10">
              <h4 className="font-display text-xl font-bold text-navy-900">Our commitment to you</h4>
              <ul className="mt-5 space-y-3">
                {commitments.map((c, i) => (
                  <motion.li
                    key={c}
                    initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {c}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
