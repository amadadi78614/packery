"use client";

import { useState } from "react";
import { BookOpen, Download, CheckCircle2 } from "lucide-react";
import type { MagazineIssue } from "@/lib/magazine";
import { Reveal } from "./motion";
import MagazineFlipbook from "./MagazineFlipbook";

/** One magazine issue: cover, contents, page thumbnails and a full-screen page reader. */
export default function MagazineViewer({ issue, featured = false }: { issue: MagazineIssue; featured?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

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

      {open !== null && <MagazineFlipbook issue={issue} startPage={open} onClose={() => setOpen(null)} />}
    </article>
  );
}
