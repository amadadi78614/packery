"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, TrendingUp, FileCheck2 } from "lucide-react";
import { site, yearsInPractice } from "@/lib/site";
import { CountUp, requestQuote } from "./motion";

const words = ["Accounting", "Tax Planning", "Auditing", "SARS Compliance", "Business Growth"];

function WordCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap font-semibold text-gold-300"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Badge() {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fill="#D7B672" fontSize="12.5" fontWeight="600">
          <textPath href="#ring" textLength="486" lengthAdjust="spacing">CHARTERED ACCOUNTANTS • REGISTERED AUDITORS • EST 2013 •</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-gold-500/60 bg-navy-900 shadow-[0_0_40px_rgba(194,154,78,0.35)]">
        <span className="font-display text-xl font-bold text-white sm:text-2xl">S<span className="text-gold-400">|</span>P</span>
      </div>
    </div>
  );
}

function DashboardCard() {
  const reduce = useReducedMotion();
  const bars = [38, 52, 46, 64, 58, 76, 70, 88];
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.12] to-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl"
        style={{ transformPerspective: 1000 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Financial health</p>
            <p className="mt-1 font-display text-2xl font-semibold text-white">Growing ↑</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            On track
          </span>
        </div>

        <div className="relative mt-6 h-36">
          <div className="absolute inset-0 flex items-end gap-2.5">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-navy-600 to-gold-400/90"
                initial={{ height: reduce ? `${h}%` : 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.9, delay: 0.9 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <svg viewBox="0 0 300 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
            <motion.path
              d="M0,110 C40,100 60,80 90,84 S150,60 180,52 S240,30 300,12"
              fill="none" stroke="#E6CF9A" strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 1.3, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <p className="mt-2 text-[10px] text-slate-500">Illustrative</p>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[["Books", "Reconciled"], ["Tax", "Compliant"], ["Audit", "Signed off"]].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 + i * 0.15 }}
              className="rounded-xl bg-white/5 px-2 py-2.5"
            >
              <p className="text-[10px] uppercase tracking-wider text-slate-400">{k}</p>
              <p className="mt-0.5 text-xs font-semibold text-white">{v}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* floating chips */}
      <motion.div
        className="absolute -top-6 left-6 hidden items-center gap-2 rounded-2xl border border-white/15 bg-navy-900/90 px-3.5 py-2.5 shadow-xl backdrop-blur sm:flex"
        initial={{ opacity: 0, x: -30 }}
        animate={reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, -10, 0] }}
        transition={{ opacity: { delay: 1.6 }, x: { delay: 1.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <ShieldCheck className="h-5 w-5 text-gold-400" />
        <span className="text-xs font-semibold text-white">SARS return filed</span>
      </motion.div>
      <motion.div
        className="absolute -right-6 top-[46%] hidden items-center gap-2 rounded-2xl border border-white/15 bg-navy-900/90 px-3.5 py-2.5 shadow-xl backdrop-blur sm:flex"
        initial={{ opacity: 0, x: 30 }}
        animate={reduce ? { opacity: 1, x: 0 } : { opacity: 1, x: 0, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.9 }, x: { delay: 1.9 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <FileCheck2 className="h-5 w-5 text-emerald-300" />
        <span className="text-xs font-semibold text-white">Audit opinion issued</span>
      </motion.div>
      <motion.div
        className="absolute -bottom-5 left-8 flex items-center gap-2 rounded-2xl bg-gold-500 px-3.5 py-2.5 text-navy-950 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <TrendingUp className="h-5 w-5" />
        <span className="text-xs font-bold">Clarity. Compliance. Growth.</span>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);

  const line = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
  };

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pt-[4.5rem] text-white">
      {/* animated background */}
      <motion.div style={reduce ? undefined : { y: yBg }} className="absolute inset-0 -z-10" aria-hidden>
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
      </motion.div>
      <div className="noise absolute inset-0 -z-10 opacity-[0.06]" aria-hidden />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="container-site grid items-center gap-16 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
        <div>
          <motion.div initial="hidden" animate="show" custom={0} variants={line} className="flex items-center gap-5">
            <Badge />
            <div className="text-sm leading-snug text-slate-300">
              <p className="font-semibold text-white">Partner-led practice</p>
              <p>Mbombela, Mpumalanga · since {site.established}</p>
            </div>
          </motion.div>

          <h1 className="mt-8 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <motion.span className="block" initial="hidden" animate="show" custom={1} variants={line}>Numbers that</motion.span>
            <motion.span className="block" initial="hidden" animate="show" custom={2} variants={line}>
              <span className="shimmer-gold">change your world.</span>
            </motion.span>
          </h1>

          <motion.p initial="hidden" animate="show" custom={3} variants={line} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Expert <WordCycle /> <br className="sm:hidden" />for businesses and individuals across Mpumalanga.
          </motion.p>

          <motion.div initial="hidden" animate="show" custom={4} variants={line} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => requestQuote()} className="btn-gold group px-8 py-4 text-base">
              Get a Free Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
            <a href={site.phoneHref} className="btn-ghost-light px-8 py-4 text-base">
              <Phone className="h-4 w-4" aria-hidden /> {site.phoneDisplay}
            </a>
          </motion.div>

          <motion.dl initial="hidden" animate="show" custom={5} variants={line} className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
            <div className="pr-4">
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl"><CountUp to={yearsInPractice} suffix="+" /></dd>
              <dt className="mt-1 text-xs text-slate-400">Years serving Mpumalanga</dt>
            </div>
            <div className="px-4">
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl"><CountUp to={4} /></dd>
              <dt className="mt-1 text-xs text-slate-400">Core disciplines</dt>
            </div>
            <div className="pl-4">
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl"><CountUp to={1} suffix=":1" /></dd>
              <dt className="mt-1 text-xs text-slate-400">Direct partner access</dt>
            </div>
          </motion.dl>
        </div>

        <DashboardCard />
      </motion.div>

      <motion.a
        href="#why"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-400 lg:flex"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-gold-400 to-transparent" />
      </motion.a>
    </section>
  );
}
