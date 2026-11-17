"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Download, X, CheckCircle2 } from "lucide-react";
import type { MagazineIssue } from "@/lib/magazine";
import { Reveal } from "./motion";

/** One magazine issue: cover, contents, page thumbnails and a full-screen page reader. */
export default function MagazineViewer({ issue, featured = false }: { issue: MagazineIssue; featured?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const total = issue.pages.length;
  const [touchX, setTouchX] = useState<number | null>(null);
  const go = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, go]);

  return (
    <article id={issue.slug} className="scroll-mt-28">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <button
            type="button"
            onClick={() => setOpen(0)}
            className="group relative mx-auto block w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl shadow-navy-900/25 ring-1 ring-slate-200"
            aria-label={`Read issue ${issue.number} online`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={issue.pages[0].src} alt={`S Packery Inc. magazine, issue ${issue.number}, ${issue.date}: cover`} width={1086} height={1448} className="h-auto w-full transition duration-500 group-hover:scale-[1.03]" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-navy-950/85 py-3 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
              <BookOpen className="h-4 w-4" /> Read online
            </span>
          </button>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">
            {featured ? "Latest issue · " : ""}Issue {issue.number} · {issue.date}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{issue.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{issue.summary}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Inside this issue</p>
          <ul className="mt-3 space-y-2">
            {issue.topics.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm font-medium text-navy-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setOpen(0)} className="btn-navy">
              <BookOpen className="h-4 w-4" /> Read online
            </button>
            <a href={issue.pdf} download className="btn border border-slate-300 text-navy-900 hover:border-navy-900">
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {issue.pages.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.thumb} alt="" loading="lazy" width={480} height={640} className="aspect-[3/4] h-auto w-full object-cover object-top" />
            <span className="block px-3 py-2.5">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">Page {i + 1}</span>
              <span className="block truncate text-sm font-semibold text-navy-900">{p.title}</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog" aria-modal="true" aria-label={`Issue ${issue.number}, page ${open + 1} of ${total}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX === null) return;
              const dx = e.changedTouches[0].clientX - touchX;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              setTouchX(null);
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm font-semibold">Issue {issue.number} · Page {open + 1} of {total}</p>
              <div className="flex items-center gap-2">
                <a href={issue.pdf} download className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:inline-flex">
                  <Download className="h-4 w-4" /> PDF
                </a>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
              <AnimatePresence mode="wait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={open}
                  src={issue.pages[open].src}
                  alt={issue.pages[open].title}
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous page" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-900/80 text-white ring-1 ring-white/30 hover:bg-navy-800 sm:left-4">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next page" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-900/80 text-white ring-1 ring-white/30 hover:bg-navy-800 sm:right-4">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
