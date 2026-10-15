"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2, Plus, Users } from "lucide-react";
import { services, quoteHref, waLink, site } from "@/lib/site";
import { serviceDetails } from "@/lib/serviceDetails";
import { WhatsAppIcon } from "./icons/Brand";
import { Reveal, stagger, rise } from "./motion";

export default function ServiceDetailView({ id }: { id: string }) {
  const svc = services.find((s) => s.id === id)!;
  const d = serviceDetails[id];
  const Icon = svc.icon;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* Intro + sticky quote card */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-navy-900 text-accent-400"><Icon className="h-8 w-8" /></span>
              <h2 className="h-section mt-6 text-3xl sm:text-4xl">{d.headline}</h2>
            </Reveal>
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-7">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                  <Users className="h-4 w-4 text-accent-600" /> Who this is for
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {d.forWho.map((w) => (
                    <li key={w} className="flex items-start gap-2.5 text-sm font-medium text-navy-900">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="gradient-border relative overflow-hidden rounded-[2rem] p-8 text-white">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/25 blur-3xl" aria-hidden />
                <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">Free, no-obligation quote</p>
                <h3 className="relative mt-3 font-display text-2xl font-bold">Need help with {svc.short.toLowerCase()}?</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
                  Tell us what you need and we&apos;ll come back with a clear, fixed-scope proposal.
                </p>
                <div className="relative mt-7 grid gap-3">
                  <Link href={quoteHref(id)} className="btn-accent group py-3.5">
                    Get a quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={waLink(`Good day S Packery Inc, I'd like assistance with / a quote for ${svc.title.toLowerCase()}.`)}
                    target="_blank" rel="noopener noreferrer"
                    className="btn bg-[#25D366] py-3.5 text-white hover:bg-[#1ebe5b]"
                  >
                    <WhatsAppIcon className="h-5 w-5" /> WhatsApp us
                  </a>
                  <a href={site.phoneHref} className="btn-ghost-light py-3.5">Call {site.phoneDisplay}</a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* What's included */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
        <div className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <div className="container-site relative">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-accent-400">What&apos;s included</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">{svc.title} services</h2>
          </Reveal>
          <motion.ul
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {d.included.map((it, i) => (
              <motion.li
                key={it.title} variants={rise}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-accent-400/50 hover:bg-white/[0.07]"
              >
                <span className="font-display text-4xl font-bold text-white/10 transition-colors group-hover:text-accent-400/40">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{it.body}</p>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-accent-300 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* FAQ + related */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Questions</span>
              <h2 className="h-section mt-4">Frequently asked</h2>
            </Reveal>
            <div className="mt-8 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white">
              {d.faqs.map((f, i) => {
                const on = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(on ? null : i)}
                      aria-expanded={on}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-semibold text-navy-900">{f.q}</span>
                      <motion.span animate={{ rotate: on ? 45 : 0 }} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-navy-900">
                        <Plus className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-sm leading-relaxed text-slate-600">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow">Related services</span>
            </Reveal>
            <div className="mt-6 grid gap-4">
              {d.related.map((rid, i) => {
                const r = services.find((s) => s.id === rid)!;
                const RI = r.icon;
                return (
                  <Reveal key={rid} delay={0.08 * i}>
                    <Link
                      href={`/services/${serviceDetails[rid].slug}`}
                      className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-accent-500/60 hover:shadow-xl hover:shadow-navy-900/5"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-accent-400 transition-transform group-hover:scale-110"><RI className="h-5 w-5" /></span>
                      <span className="flex-1">
                        <span className="block font-display font-semibold text-navy-900">{r.title}</span>
                        <span className="block text-xs text-slate-500">{r.tagline}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-600" />
                    </Link>
                  </Reveal>
                );
              })}
              <Reveal delay={0.2}>
                <Link href="/services" className="btn-navy w-full">View all services</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
