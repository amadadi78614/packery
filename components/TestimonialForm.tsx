"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, Send, Star } from "lucide-react";
import { services, college } from "@/lib/site";

const serviceOptions = [...services.map((s) => s.title), "Payroll", college.name, "Other"];
type Fields = { name: string; role: string; company: string; email: string; service: string; quote: string; website: string };
const empty: Fields = { name: "", role: "", company: "", email: "", service: "", quote: "", website: "" };
const publishOptions = [
  { v: "full", label: "My name, role and company" },
  { v: "company", label: "My role and company only (e.g. “Director, ABC Ltd”)" },
  { v: "anonymous", label: "Anonymously (e.g. “Client, Mbombela”)" },
];

export default function TestimonialForm() {
  const [f, setF] = useState<Fields>(empty);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [publish, setPublish] = useState("full");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    if (err[k]) setErr((x) => ({ ...x, [k]: "" }));
  };

  function validate() {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email (it won't be published).";
    if (!rating) e.rating = "Please choose a rating.";
    if (f.quote.trim().length < 20) e.quote = "Please write a little more (at least 20 characters).";
    if (!consent) e.consent = "Please confirm we may publish your testimonial.";
    setErr(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) { document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, rating, publish, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (e) {
      setServerMsg(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const label = "mb-1.5 block text-sm font-semibold text-navy-900";
  const msg = (k: string) => (err[k] ? <p id={`${k}-err`} className="mt-1.5 text-xs font-medium text-red-600">{err[k]}</p> : null);
  const aria = (k: string) => ({ "aria-invalid": !!err[k], "aria-describedby": err[k] ? `${k}-err` : undefined });
  const shown = hover || rating;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-navy-900/10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[26rem] flex-col items-center justify-center p-10 text-center" role="status">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 14 }} className="grid h-20 w-20 place-items-center rounded-full bg-accent-500 text-navy-950">
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-navy-900">Thank you, {f.name.split(" ")[0]}!</h3>
            <p className="mt-3 max-w-md text-slate-600">We truly appreciate your feedback. Our team will review your testimonial before it appears on the website.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="space-y-5 p-6 sm:p-10">
            <div>
              <p className={label} id="rating-label">Your rating *</p>
              <div role="radiogroup" aria-labelledby="rating-label" className="flex gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i} type="button" role="radio" aria-checked={rating === i} aria-label={`${i} star${i > 1 ? "s" : ""}`}
                    onClick={() => { setRating(i); setErr((x) => ({ ...x, rating: "" })); }} onMouseEnter={() => setHover(i)}
                    className="rounded-lg p-1 transition-transform hover:scale-110"
                    {...(i === 1 ? aria("rating") : {})}
                  >
                    <Star className={`h-8 w-8 ${i <= shown ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-300"}`} />
                  </button>
                ))}
              </div>
              {msg("rating")}
            </div>

            <div>
              <label htmlFor="t-quote" className={label}>Your testimonial *</label>
              <textarea id="t-quote" rows={5} maxLength={1200} className="field resize-y" placeholder="What was it like working with S Packery Inc.? What difference did it make to you or your business?" value={f.quote} onChange={set("quote")} {...aria("quote")} />
              {msg("quote")}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="t-name" className={label}>Your name *</label>
                <input id="t-name" autoComplete="name" className="field" value={f.name} onChange={set("name")} {...aria("name")} />
                {msg("name")}
              </div>
              <div>
                <label htmlFor="t-email" className={label}>Email * <span className="font-normal text-slate-400">(not published)</span></label>
                <input id="t-email" type="email" inputMode="email" autoComplete="email" className="field" value={f.email} onChange={set("email")} {...aria("email")} />
                {msg("email")}
              </div>
              <div>
                <label htmlFor="t-role" className={label}>Your role <span className="font-normal text-slate-400">(optional)</span></label>
                <input id="t-role" placeholder="e.g. Director" className="field" value={f.role} onChange={set("role")} />
              </div>
              <div>
                <label htmlFor="t-company" className={label}>Company <span className="font-normal text-slate-400">(optional)</span></label>
                <input id="t-company" autoComplete="organization" className="field" value={f.company} onChange={set("company")} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="t-service" className={label}>Service used <span className="font-normal text-slate-400">(optional)</span></label>
                <select id="t-service" className="field" value={f.service} onChange={set("service")}>
                  <option value="">Select…</option>
                  {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <fieldset>
              <legend className={label}>How should we show your name?</legend>
              <div className="space-y-2">
                {publishOptions.map((o) => (
                  <label key={o.v} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${publish === o.v ? "border-accent-500 bg-accent-300/15 text-navy-900" : "border-slate-200 text-slate-700 hover:border-accent-400"}`}>
                    <input type="radio" name="publish" value={o.v} checked={publish === o.v} onChange={() => setPublish(o.v)} className="h-4 w-4 accent-[#2F86C2]" />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="hidden" aria-hidden>
              <label htmlFor="t-web">Website</label>
              <input id="t-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErr((x) => ({ ...x, consent: "" })); }} className="mt-0.5 h-5 w-5 shrink-0 accent-[#1F2340]" {...aria("consent")} />
              <span className="text-sm text-slate-600">
                I agree that S Packery Inc. may publish this testimonial on its website and social media as I chose above, and may shorten it without changing its meaning.
                I can ask for it to be removed at any time. See our <Link href="/privacy" target="_blank" className="font-semibold text-accent-600 underline underline-offset-2">Privacy Notice</Link>. *
              </span>
            </label>
            {msg("consent")}

            {status === "error" && (
              <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {serverMsg} Please try again.
              </p>
            )}

            <button type="submit" disabled={status === "sending"} className="btn-navy group w-full py-3.5 disabled:opacity-70 sm:w-auto sm:px-10">
              {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Submit testimonial <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
