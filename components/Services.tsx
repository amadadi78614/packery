"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/site";
import { Reveal, requestQuote } from "./motion";

export default function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];
  const Icon = s.icon;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="container-site relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-gold-400">Our services</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything your finances need. <span className="text-slate-400">Under one roof.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
          {/* selector */}
          <div role="tablist" aria-label="Services" className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {services.map((x, i) => {
              const XI = x.icon;
              const on = i === active;
              return (
                <button
                  key={x.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative flex min-w-[15rem] shrink-0 items-center gap-4 rounded-2xl p-5 text-left transition-colors lg:min-w-0 ${on ? "text-navy-950" : "bg-white/[0.04] text-white hover:bg-white/[0.08]"}`}
                >
                  {on && (
                    <motion.span layoutId="svc-pill" className="absolute inset-0 rounded-2xl bg-gold-500" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on ? "bg-navy-950 text-gold-400" : "bg-white/10 text-gold-400"}`}>
                    <XI className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="relative">
                    <span className="block font-display text-lg font-semibold">{x.title}</span>
                    <span className={`block text-xs ${on ? "text-navy-900/70" : "text-slate-400"}`}>{x.tagline}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div onMouseMove={onMove} className="gradient-border relative min-h-[26rem] overflow-hidden rounded-3xl p-8 sm:p-10" role="tabpanel">
            <div className="spotlight pointer-events-none absolute inset-0" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">0{active + 1} / 0{services.length}</p>
                    <h3 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{s.title}</h3>
                    <p className="mt-2 font-display text-lg text-gold-300">{s.tagline}</p>
                  </div>
                  <motion.span
                    initial={{ rotate: -30, scale: 0.6, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                    className="hidden h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gold-500/15 text-gold-400 sm:grid"
                  >
                    <Icon className="h-10 w-10" aria-hidden />
                  </motion.span>
                </div>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">{s.summary}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-950"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /></span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
                <button type="button" onClick={() => requestQuote(s.id)} className="btn-gold group mt-10">
                  Get a quote for {s.short.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
