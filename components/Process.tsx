"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { process } from "@/lib/site";
import { Reveal } from "./motion";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="bg-slate-50 py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">How it works</span>
          <h2 className="h-section mt-4 text-4xl sm:text-5xl">From first call to full control in four steps.</h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* track */}
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-0.5 bg-slate-200 lg:left-6 lg:right-6 lg:top-6 lg:h-0.5 lg:w-auto" aria-hidden>
            <motion.div style={{ scaleY: scale }} className="h-full w-full origin-top bg-gradient-to-b from-gold-500 to-gold-300 lg:hidden" />
            <motion.div style={{ scaleX: scale }} className="hidden h-full w-full origin-left bg-gradient-to-r from-gold-500 to-gold-300 lg:block" />
          </div>
          {process.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="relative pl-20 lg:pl-0">
              <div>
                <motion.span
                  whileInView={{ scale: [0.6, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full bg-navy-900 font-display text-lg font-bold text-gold-400 ring-8 ring-slate-50 lg:relative"
                >
                  {i + 1}
                </motion.span>
                <h3 className="font-display text-xl font-semibold text-navy-900 lg:mt-6">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
