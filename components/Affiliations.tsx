"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { site } from "@/lib/site";
import { stagger, rise } from "./motion";

export default function Affiliations() {
  return (
    <section aria-label="Accreditations" className="border-b border-slate-200 bg-white py-12">
      <div className="container-site">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Members, registrations &amp; accreditations
        </p>
        <motion.ul
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="mt-7 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6"
        >
          {site.affiliations.map((a) => (
            <motion.li
              key={a.short} variants={rise}
              whileHover={{ y: -4 }}
              className="group flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-2 py-3 text-center sm:px-3 sm:py-4 transition-colors hover:border-accent-500/60 hover:bg-white"
            >
              <BadgeCheck className="h-6 w-6 text-accent-600 transition-transform group-hover:scale-110" aria-hidden />
              <span className="mt-2 font-display text-lg font-bold leading-none text-navy-900">{a.short}</span>
              <span className="mt-1.5 hidden text-[11px] leading-snug text-slate-500 sm:block">{a.name}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
