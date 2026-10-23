"use client";

import { useEffect, useState } from "react";
import { formEndpoint } from "@/lib/endpoints";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, AlertCircle, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { services, clientTypes, turnoverBands, timelines, site, waLink, waMessages } from "@/lib/site";
import Link from "next/link";
import { Reveal } from "./motion";
import { WhatsAppIcon } from "./icons/Brand";

type Form = {
  services: string[]; clientType: string; turnover: string; timeline: string;
  name: string; email: string; phone: string; company: string; message: string; website: string;
};
const initial: Form = { services: [], clientType: "", turnover: "", timeline: "", name: "", email: "", phone: "", company: "", message: "", website: "" };
const steps = ["Services", "About you", "Your details"];

function Chip({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${on ? "border-navy-900 bg-navy-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-navy-900/40"}`}
    >
      {children}
    </button>
  );
}

export default function QuoteWizard() {
  const [f, setF] = useState<Form>(initial);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [err, setErr] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [ref, setRef] = useState("");
  const [serverMsg, setServerMsg] = useState("");

  // Preselect a service from /quote?service=<id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    if (id && services.some((s) => s.id === id)) setF((v) => ({ ...v, services: [id] }));
  }, []);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    setErr((e) => ({ ...e, [k]: "" }));
  };
  const toggle = (id: string) =>
    set("services", f.services.includes(id) ? f.services.filter((x) => x !== id) : [...f.services, id]);

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0 && !f.services.length) e.services = "Choose at least one service.";
    if (s === 1) {
      if (!f.clientType) e.clientType = "Select what best describes you.";
      if (!f.timeline) e.timeline = "Select a timeline.";
    }
    if (s === 2) {
      if (f.name.trim().length < 2) e.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email.";
      if (!/^[+\d][\d\s()-]{8,18}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
    }
    setErr(e);
    return !Object.keys(e).length;
  }

  const next = () => { if (validate(step)) { setDir(1); setStep((s) => s + 1); } };
  const back = () => { setDir(-1); setStep((s) => s - 1); };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (step < 2) return next();
    if (!validate(2)) return;
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint("contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "quote", ...f }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setRef(data.reference || "");
      setStatus("sent");
    } catch (e) {
      setServerMsg(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const reset = () => { setF(initial); setStep(0); setStatus("idle"); };

  const waSummary = (reference?: string) => {
    const titles = f.services.map((id) => services.find((s) => s.id === id)?.title).filter(Boolean).join(", ");
    return [
      `Good day S Packery Inc, I'd like a quote${reference ? ` (Ref ${reference})` : ""}.`,
      titles && `Services: ${titles}`,
      f.clientType && `I am: ${f.clientType}`,
      f.turnover && `Turnover: ${f.turnover}`,
      f.timeline && `Timeline: ${f.timeline}`,
      f.name && `Name: ${f.name}${f.company ? ` (${f.company})` : ""}`,
      f.message && `Notes: ${f.message}`,
    ].filter(Boolean).join("\n");
  };
  const errMsg = (k: string) => (err[k] ? <p className="mt-2 text-xs font-medium text-red-600" role="alert">{err[k]}</p> : null);
  const label = "mb-1.5 block text-sm font-semibold text-navy-900";

  return (
    <section id="quote" className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-300/20 blur-3xl" aria-hidden />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-navy-600/10 blur-3xl" aria-hidden />
      <div className="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow">How it works</span>
          <h2 className="h-section mt-4 text-4xl sm:text-5xl">Quick, free and confidential.</h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Choose your services, tell us a little about yourself, and we&apos;ll reply within one business day — by email, phone or WhatsApp, whichever suits you.
          </p>
          <ul className="mt-10 space-y-5">
            {[
              { icon: Clock, t: "Takes under 60 seconds", d: "Three short steps — that's it." },
              { icon: Sparkles, t: "Scoped to your business", d: "Fees based on what you actually need." },
              { icon: ShieldCheck, t: "Confidential", d: "Your details are handled in line with POPIA — see our Privacy Notice." },
            ].map(({ icon: I, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-600"><I className="h-5 w-5" aria-hidden /></span>
                <span><span className="block font-semibold text-navy-900">{t}</span><span className="text-sm text-slate-600">{d}</span></span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-slate-500">
            Prefer to talk? Call <a href={site.phoneHref} className="font-semibold text-navy-900 underline decoration-accent-500 underline-offset-4">{site.phoneDisplay}</a>
            {" "}or{" "}
            <a href={waLink(waMessages.firm)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-[#128C7E] underline decoration-[#25D366] underline-offset-4">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-navy-900/10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex min-h-[34rem] flex-col items-center justify-center p-10 text-center"
                  role="status"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="grid h-24 w-24 place-items-center rounded-full bg-accent-500 text-navy-950 shadow-[0_0_60px_rgba(90,169,224,0.5)]"
                  >
                    <CheckCircle2 className="h-12 w-12" />
                  </motion.div>
                  <h3 className="mt-8 font-display text-3xl font-bold text-navy-900">Quote request received.</h3>
                  {ref && <p className="mt-3 rounded-full bg-slate-100 px-4 py-1.5 font-mono text-sm text-navy-900">Ref: {ref}</p>}
                  <p className="mt-4 max-w-sm text-slate-600">Thank you, {f.name.split(" ")[0]}. We&apos;ll be in touch within one business day with your tailored proposal.</p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a href={waLink(waSummary(ref))} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                      <WhatsAppIcon className="h-5 w-5" /> Also send on WhatsApp
                    </a>
                    <button type="button" onClick={reset} className="btn-navy">Start a new request</button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate className="p-6 sm:p-10">
                  {/* progress */}
                  <div className="flex items-center gap-3">
                    {steps.map((s, i) => (
                      <div key={s} className="flex flex-1 items-center gap-3">
                        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors ${i < step ? "bg-accent-500 text-navy-950" : i === step ? "bg-navy-900 text-white" : "bg-slate-100 text-slate-400"}`}>
                          {i < step ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                        </span>
                        <span className={`hidden text-sm font-medium sm:block ${i === step ? "text-navy-900" : "text-slate-400"}`}>{s}</span>
                        {i < steps.length - 1 && (
                          <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-slate-100">
                            <motion.span className="absolute inset-0 origin-left bg-accent-500" animate={{ scaleX: i < step ? 1 : 0 }} transition={{ duration: 0.5 }} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="relative mt-8 min-h-[22rem]">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -40 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {step === 0 && (
                          <fieldset>
                            <legend className="font-display text-2xl font-bold text-navy-900">What can we help you with?</legend>
                            <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                              {services.map((s) => {
                                const on = f.services.includes(s.id);
                                const I = s.icon;
                                return (
                                  <motion.button
                                    type="button"
                                    key={s.id}
                                    onClick={() => toggle(s.id)}
                                    aria-pressed={on}
                                    whileTap={{ scale: 0.97 }}
                                    className={`relative flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${on ? "border-accent-500 bg-accent-500/10" : "border-slate-200 hover:border-slate-300"}`}
                                  >
                                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${on ? "bg-accent-500 text-navy-950" : "bg-slate-100 text-navy-900"}`}><I className="h-5 w-5" aria-hidden /></span>
                                    <span className="font-semibold text-navy-900">{s.title}</span>
                                    <AnimatePresence>
                                      {on && (
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-navy-900 text-white">
                                          <Check className="h-3 w-3" strokeWidth={3} />
                                        </motion.span>
                                      )}
                                    </AnimatePresence>
                                  </motion.button>
                                );
                              })}
                            </div>
                            {errMsg("services")}
                          </fieldset>
                        )}

                        {step === 1 && (
                          <div className="space-y-7">
                            <fieldset>
                              <legend className="font-display text-2xl font-bold text-navy-900">Tell us about you</legend>
                              <p className={`${label} mt-5`}>You are a… *</p>
                              <div className="flex flex-wrap gap-2">
                                {clientTypes.map((c) => <Chip key={c} on={f.clientType === c} onClick={() => set("clientType", c)}>{c}</Chip>)}
                              </div>
                              {errMsg("clientType")}
                            </fieldset>
                            <fieldset>
                              <p className={label}>Approximate annual turnover</p>
                              <div className="flex flex-wrap gap-2">
                                {turnoverBands.map((c) => <Chip key={c} on={f.turnover === c} onClick={() => set("turnover", c)}>{c}</Chip>)}
                              </div>
                            </fieldset>
                            <fieldset>
                              <p className={label}>When do you need us? *</p>
                              <div className="flex flex-wrap gap-2">
                                {timelines.map((c) => <Chip key={c} on={f.timeline === c} onClick={() => set("timeline", c)}>{c}</Chip>)}
                              </div>
                              {errMsg("timeline")}
                            </fieldset>
                          </div>
                        )}

                        {step === 2 && (
                          <div>
                            <h3 className="font-display text-2xl font-bold text-navy-900">Where should we send your quote?</h3>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                              <div>
                                <label htmlFor="q-name" className={label}>Full name *</label>
                                <input id="q-name" autoComplete="name" className="field" value={f.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!err.name} />
                                {errMsg("name")}
                              </div>
                              <div>
                                <label htmlFor="q-company" className={label}>Business name</label>
                                <input id="q-company" autoComplete="organization" className="field" value={f.company} onChange={(e) => set("company", e.target.value)} />
                              </div>
                              <div>
                                <label htmlFor="q-email" className={label}>Email *</label>
                                <input id="q-email" type="email" inputMode="email" autoComplete="email" className="field" value={f.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!err.email} />
                                {errMsg("email")}
                              </div>
                              <div>
                                <label htmlFor="q-phone" className={label}>Phone *</label>
                                <input id="q-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+27 …" className="field" value={f.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!err.phone} />
                                {errMsg("phone")}
                              </div>
                              <div className="sm:col-span-2">
                                <label htmlFor="q-msg" className={label}>Anything else we should know?</label>
                                <textarea id="q-msg" rows={3} className="field resize-y" placeholder="e.g. year-end, number of employees, a SARS letter you received…" value={f.message} onChange={(e) => set("message", e.target.value)} />
                              </div>
                              <div className="hidden" aria-hidden>
                                <label htmlFor="q-web">Website</label>
                                <input id="q-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {status === "error" && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700" role="alert">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {serverMsg} Please try again or call us.
                    </p>
                  )}

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
                    {step > 0 ? (
                      <button type="button" onClick={back} className="btn px-4 text-slate-600 hover:text-navy-900"><ArrowLeft className="h-4 w-4" /> Back</button>
                    ) : <span className="text-xs text-slate-400">Step 1 of 3</span>}
                    <div className="flex items-center gap-2">
                      {step === 2 && (
                        <a
                          href={waLink(waSummary())}
                          target="_blank" rel="noopener noreferrer"
                          aria-label="Send quote request on WhatsApp"
                          title="Send on WhatsApp instead"
                          className="btn bg-[#25D366] px-4 text-white hover:bg-[#1ebe5b]"
                        >
                          <WhatsAppIcon className="h-5 w-5" /><span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      )}
                      <button type="submit" disabled={status === "sending"} className="btn-accent group px-7 disabled:opacity-70">
                        {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> :
                          step < 2 ? <>Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></> :
                          <>Get my quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-xs text-slate-500" id="privacy-note-quote">
                    We use your details only to respond to your request. See our{" "}
                    <Link href="/privacy" className="font-semibold text-navy-900 underline underline-offset-2">Privacy Notice</Link>.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
