"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, FileEdit, SearchCheck, PhoneCall, CheckCircle2, FileCheck2 } from "lucide-react";
import { college, collegeRequirements, waLink, waMessages } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";
import CollegeApplyForm from "./CollegeApplyForm";
import { Reveal } from "./motion";

const steps = [
  { icon: FileEdit, title: "Apply online", body: "Complete the form and upload your certified ID and certified highest qualification. Add your CV and proof of SETA funding if you have them." },
  { icon: SearchCheck, title: "We review", body: "The college team reviews your application against the intake requirements." },
  { icon: PhoneCall, title: "We contact you", body: "Shortlisted applicants are contacted with the next steps and the documents needed." },
];

const faqs = [
  { q: "What programme do you offer?", a: `${college.accreditation}. It runs for 12 to 18 months, with hands-on training inside a working chartered accountancy and audit practice.` },
  { q: "What are the requirements?", a: `${collegeRequirements.minimum}. ${collegeRequirements.funding}.` },
  { q: "Which documents must I upload?", a: "A certified copy of your highest qualification (certified within the last 3 months) and a certified copy of your ID. Upload proof of SETA funding if you have it, and your CV." },
  { q: "How is the programme funded?", a: "All learners must be funded by a SETA. If you don't have funding confirmed yet, apply anyway and tell us on the form. The college will advise you on the next steps." },
  { q: "Do you offer job shadowing?", a: "Yes. Students can job-shadow at S Packery Inc. to see the day-to-day work of a chartered accountancy and audit firm. WhatsApp us to arrange it." },
];

export default function CollegeApply() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <section id="apply" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 to-white py-20 sm:py-28">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-ez-gold/10 blur-3xl" aria-hidden />
      <div className="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ez-emerald">
              <span className="h-px w-6 bg-ez-emerald" /> Apply now
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ez-deep sm:text-5xl">
              Start your journey into <span className="text-ez-emerald">finance.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Three simple steps from application to your first day of real-world experience.
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-8 rounded-2xl border border-ez-gold/30 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ez-deep">
                <FileCheck2 className="h-5 w-5 text-ez-gold" /> Entry requirements
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
                {[collegeRequirements.minimum, collegeRequirements.funding, ...collegeRequirements.documents].map((r) => (
                  <li key={r} className="flex gap-2.5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ez-emerald" />{r}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <ol className="relative mt-10 space-y-6 border-l-2 border-ez-gold/40 pl-8">
            {steps.map(({ icon: I, title, body }, i) => (
              <Reveal key={title} delay={0.1 * i}>
                <li className="relative">
                  <motion.span
                    initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 + i * 0.12 }}
                    className="absolute -left-[3.05rem] top-0 grid h-10 w-10 place-items-center rounded-full bg-ez-deep text-ez-gold ring-4 ring-emerald-50"
                  >
                    <I className="h-5 w-5" />
                  </motion.span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ez-gold">Step {i + 1}</p>
                  <h3 className="font-display text-lg font-bold text-ez-deep">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h3 className="font-display text-xl font-bold text-ez-deep">Questions about applying</h3>
              <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
                {faqs.map((f, i) => {
                  const on = open === i;
                  return (
                    <div key={f.q}>
                      <button type="button" onClick={() => setOpen(on ? null : i)} aria-expanded={on} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                        <span className="text-sm font-semibold text-ez-deep">{f.q}</span>
                        <motion.span animate={{ rotate: on ? 45 : 0 }} className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-50 text-ez-emerald">
                          <Plus className="h-4 w-4" />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <a
                href={waLink(waMessages.college)}
                target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#128C7E] underline decoration-[#25D366] underline-offset-4"
              >
                <WhatsAppIcon className="h-4 w-4" /> Ask about requirements on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="lg:sticky lg:top-28">
            <CollegeApplyForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
