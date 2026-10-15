"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import type { GoogleReviews } from "@/lib/reviews";
import type { Testimonial } from "@/lib/site";
import { Reveal, stagger, rise } from "./motion";

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} aria-hidden />
      ))}
    </span>
  );
}

const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/>
  </svg>
);

export default function SocialProofView({ google, testimonials }: { google: GoogleReviews | null; testimonials: Testimonial[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28" aria-label="Client reviews">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Client voices</span>
            <h2 className="h-section mt-4 text-4xl sm:text-5xl">What our clients say.</h2>
          </Reveal>
          {google && (
            <Reveal delay={0.1}>
              <a
                href={google.mapsUrl} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-lg"
              >
                <GoogleG />
                <span>
                  <span className="flex items-center gap-2">
                    <span className="font-display text-2xl font-bold text-navy-900">{google.rating.toFixed(1)}</span>
                    <Stars value={google.rating} />
                  </span>
                  <span className="text-xs text-slate-500">{google.count} Google reviews</span>
                </span>
                <ExternalLink className="h-4 w-4 text-slate-300 transition group-hover:text-accent-600" />
              </a>
            </Reveal>
          )}
        </div>

        <motion.ul
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {google
            ? google.reviews.slice(0, 6).map((r) => (
                <motion.li key={r.author + r.when} variants={rise} className="flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-navy-900/5">
                  <div className="flex items-center justify-between"><Stars value={r.rating} /><GoogleG /></div>
                  <p className="mt-4 line-clamp-6 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    {r.photo
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={r.photo} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                      : <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white">{r.author[0]}</span>}
                    <span>
                      {r.authorUrl
                        ? <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="block text-sm font-semibold text-navy-900 hover:underline">{r.author}</a>
                        : <span className="block text-sm font-semibold text-navy-900">{r.author}</span>}
                      <span className="text-xs text-slate-500">{r.when} · Google</span>
                    </span>
                  </div>
                </motion.li>
              ))
            : testimonials.map((t) => (
                <motion.li key={t.name + t.quote.slice(0, 12)} variants={rise} className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-navy-900/5">
                  <Quote className="h-8 w-8 text-accent-400" aria-hidden />
                  <p className="mt-4 flex-1 font-display text-base leading-relaxed text-navy-900">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-slate-200 pt-4">
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    {(t.role || t.service) && <p className="text-xs text-slate-500">{[t.role, t.service].filter(Boolean).join(" · ")}</p>}
                  </div>
                </motion.li>
              ))}
        </motion.ul>
      </div>
    </section>
  );
}
