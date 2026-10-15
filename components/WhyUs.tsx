"use client";

import { motion } from "framer-motion";
import { outcomes } from "@/lib/site";
import { Reveal, stagger, rise } from "./motion";

export default function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-site">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Why visit us</span>
            <h2 className="h-section mt-4 text-4xl sm:text-5xl">
              What changes when <span className="text-accent-600">S Packery</span> is on your side.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-lg leading-relaxed text-slate-600">
              Good accounting isn&apos;t paperwork — it&apos;s control. Control over your cash, your tax, your risk and your
              growth. Here&apos;s what our clients get.
            </p>
          </Reveal>
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {outcomes.map(({ icon: Icon, title, body }, i) => (
            <motion.li
              key={title}
              variants={rise}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-2xl hover:shadow-navy-900/10 sm:w-auto sm:p-8"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-bold text-slate-100 transition-colors group-hover:text-accent-300/40">
                0{i + 1}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-accent-400 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="relative mt-6 font-display text-xl font-semibold text-navy-900">{title}</h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-slate-600">{body}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-accent-300 transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </motion.ul>
        <p className="mt-2 text-center text-xs font-medium text-slate-400 sm:hidden" aria-hidden>Swipe for more →</p>
      </div>
    </section>
  );
}
