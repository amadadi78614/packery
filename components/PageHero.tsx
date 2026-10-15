"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow, title, highlight, subtitle, crumbs = [], variant = "navy", children,
}: {
  eyebrow: string; title: string; highlight?: string; subtitle?: string;
  crumbs?: Crumb[]; variant?: "navy" | "ez"; children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ez = variant === "ez";
  const ease = [0.22, 1, 0.36, 1] as const;
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.08 + i * 0.1, duration: 0.7, ease },
  });

  return (
    <section className={`relative isolate overflow-hidden pt-[4.5rem] text-white ${ez ? "bg-ez-deep" : "bg-navy-950"}`}>
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" aria-hidden />
      {ez ? (
        <>
          <div className="absolute -right-32 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-ez-emerald blur-3xl" aria-hidden />
          <div className="absolute -bottom-40 left-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-ez-gold/20 blur-3xl" aria-hidden />
        </>
      ) : (
        <>
          <div className="aurora aurora-1 -z-10" aria-hidden />
          <div className="aurora aurora-2 -z-10 opacity-40" aria-hidden />
        </>
      )}

      <div className="container-site py-16 sm:py-24">
        {crumbs.length > 0 && (
          <motion.nav {...item(0)} aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" aria-hidden />
                  {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-slate-200" aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
        <motion.p {...item(1)} className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${ez ? "text-ez-gold" : "text-accent-400"}`}>
          <span className={`h-px w-6 ${ez ? "bg-ez-gold" : "bg-accent-400"}`} /> {eyebrow}
        </motion.p>
        <motion.h1 {...item(2)} className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}{" "}
          {highlight && <span className={ez ? "text-ez-gold" : "shimmer-accent"}>{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p {...item(3)} className={`mt-6 max-w-2xl text-lg leading-relaxed ${ez ? "text-emerald-50/80" : "text-slate-300"}`}>
            {subtitle}
          </motion.p>
        )}
        {children && <motion.div {...item(4)} className="mt-9">{children}</motion.div>}
      </div>
      <div className={`h-px w-full bg-gradient-to-r from-transparent ${ez ? "via-ez-gold/50" : "via-accent-400/50"} to-transparent`} aria-hidden />
    </section>
  );
}
