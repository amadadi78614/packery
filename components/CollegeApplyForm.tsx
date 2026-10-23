"use client";

import { useRef, useState } from "react";
import { formEndpoint } from "@/lib/endpoints";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle, Upload, FileText, X, Send, ShieldCheck } from "lucide-react";
import { college, qualifications, applicantStatuses, fundingStatuses, waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";

/** Combined upload limit (Vercel functions accept request bodies up to 4.5 MB). */
const MAX_TOTAL = 4 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png";
const DOCS = [
  { key: "idDoc", label: "Certified copy of your ID", need: "a certified copy of your ID", required: true },
  { key: "qualDoc", label: "Certified highest qualification", need: "a certified copy of your highest qualification", hint: "certified within the last 3 months", required: true },
  { key: "fundingDoc", label: "Proof of SETA funding", hint: "if available", required: false },
  { key: "cv", label: "Your CV", hint: "recommended", required: false },
] as const;
type DocKey = (typeof DOCS)[number]["key"];
const mb = (n: number) => (n / 1024 / 1024).toFixed(1);

type Fields = {
  name: string; email: string; phone: string; town: string;
  qualification: string; institution: string; year: string; status: string; funding: string;
  motivation: string; website: string;
};
const empty: Fields = { name: "", email: "", phone: "", town: "", qualification: "", institution: "", year: "", status: "", funding: "", motivation: "", website: "" };

export default function CollegeApplyForm() {
  const [f, setF] = useState<Fields>(empty);
  const [files, setFiles] = useState<Partial<Record<DocKey, File>>>({});
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [ref, setRef] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const inputs = useRef<Partial<Record<DocKey, HTMLInputElement | null>>>({});
  const totalSize = Object.values(files).reduce((n, file) => n + (file?.size ?? 0), 0);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((v) => ({ ...v, [k]: e.target.value }));
    if (err[k]) setErr((x) => ({ ...x, [k]: "" }));
  };

  const pickFile = (key: DocKey, file?: File | null) => {
    if (!file) return;
    if (!/\.(pdf|docx?|jpe?g|png)$/i.test(file.name)) return setErr((x) => ({ ...x, [key]: "Please upload a PDF, Word document, JPG or PNG." }));
    const others = totalSize - (files[key]?.size ?? 0);
    if (others + file.size > MAX_TOTAL)
      return setErr((x) => ({ ...x, [key]: `All documents together must be 4 MB or smaller (this file is ${mb(file.size)} MB). Try a PDF scan or a smaller photo.` }));
    setErr((x) => ({ ...x, [key]: "" }));
    setFiles((v) => ({ ...v, [key]: file }));
  };
  const removeFile = (key: DocKey) => {
    setFiles((v) => { const n = { ...v }; delete n[key]; return n; });
    const el = inputs.current[key]; if (el) el.value = "";
  };

  function validate() {
    const e: Record<string, string> = {};
    const y = Number(f.year), now = new Date().getFullYear();
    if (f.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email.";
    if (!/^[+\d][\d\s()-]{8,18}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
    if (f.town.trim().length < 2) e.town = "Where are you based?";
    if (!f.qualification) e.qualification = "Select your qualification.";
    if (f.institution.trim().length < 2) e.institution = "Enter your university or college.";
    if (!/^\d{4}$/.test(f.year) || y < 1980 || y > now + 2) e.year = "Enter a valid year (e.g. 2025).";
    if (!f.status) e.status = "Select your current status.";
    if (!f.funding) e.funding = "Select your SETA funding status.";
    DOCS.forEach((d) => { if (d.required && !files[d.key]) e[d.key] = `Please upload ${"need" in d ? d.need : "this document"}.`; });
    if (f.motivation.trim().length < 20) e.motivation = "Tell us a little more (at least 20 characters).";
    if (!consent) e.consent = "Please give consent so we can process your application.";
    setErr(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    const fd = new FormData();
    Object.entries(f).forEach(([k, v]) => fd.append(k, v));
    fd.append("consent", consent ? "yes" : "no");
    DOCS.forEach((d) => { const file = files[d.key]; if (file) fd.append(d.key, file); });
    try {
      const res = await fetch(formEndpoint("college-apply"), { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setRef(data.reference || "");
      setStatus("sent");
    } catch (e) {
      setServerMsg(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const reset = () => { setF(empty); setFiles({}); setConsent(false); setStatus("idle"); setErr({}); };
  const label = "mb-1.5 block text-sm font-semibold text-ez-deep";
  const field = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-ez-emerald focus:outline-none focus:ring-4 focus:ring-ez-emerald/15";
  const msg = (k: string) => (err[k] ? <p id={`${k}-err`} className="mt-1.5 text-xs font-medium text-red-600">{err[k]}</p> : null);
  const aria = (k: string) => ({ "aria-invalid": !!err[k], "aria-describedby": err[k] ? `${k}-err` : undefined });

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white shadow-2xl shadow-ez-deep/10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[32rem] flex-col items-center justify-center p-10 text-center"
            role="status"
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className="grid h-24 w-24 place-items-center rounded-full bg-ez-gold text-ez-deep shadow-[0_0_60px_rgba(201,164,76,0.5)]"
            >
              <CheckCircle2 className="h-12 w-12" />
            </motion.div>
            <h3 className="mt-8 font-display text-3xl font-bold text-ez-deep">Application received.</h3>
            {ref && <p className="mt-3 rounded-full bg-emerald-50 px-4 py-1.5 font-mono text-sm text-ez-deep">Ref: {ref}</p>}
            <p className="mt-4 max-w-md text-slate-600">
              Thank you, {f.name.split(" ")[0]}. The {college.name} team will review your application and contact you about the next steps.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink(`Good day, I've just applied to ${college.name} (Ref ${ref}). Please let me know what the next steps and requirements are.`)}
                target="_blank" rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white hover:bg-[#1ebe5b]"
              >
                <WhatsAppIcon className="h-5 w-5" /> Follow up on WhatsApp
              </a>
              <button type="button" onClick={reset} className="btn border border-slate-200 text-ez-deep hover:bg-slate-50">Submit another application</button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="p-6 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-ez-deep">Application form</h3>
                <p className="mt-1 text-sm text-slate-500">Fields marked * are required. Takes about 5 minutes. Have your certified ID and qualification ready.</p>
              </div>
              <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-ez-emerald sm:block">{college.motto}</span>
            </div>

            {/* Personal */}
            <fieldset className="mt-8">
              <legend className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ez-gold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ez-deep text-[11px] text-white">1</span> About you
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="a-name" className={label}>Full name *</label>
                  <input id="a-name" autoComplete="name" className={field} value={f.name} onChange={set("name")} {...aria("name")} />
                  {msg("name")}
                </div>
                <div>
                  <label htmlFor="a-email" className={label}>Email *</label>
                  <input id="a-email" type="email" inputMode="email" autoComplete="email" className={field} value={f.email} onChange={set("email")} {...aria("email")} />
                  {msg("email")}
                </div>
                <div>
                  <label htmlFor="a-phone" className={label}>Phone / WhatsApp *</label>
                  <input id="a-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 072 123 4567" className={field} value={f.phone} onChange={set("phone")} {...aria("phone")} />
                  {msg("phone")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="a-town" className={label}>Town / area *</label>
                  <input id="a-town" autoComplete="address-level2" placeholder="e.g. Mbombela, White River, KaNyamazane" className={field} value={f.town} onChange={set("town")} {...aria("town")} />
                  {msg("town")}
                </div>
              </div>
            </fieldset>

            {/* Education */}
            <fieldset className="mt-8">
              <legend className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ez-gold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ez-deep text-[11px] text-white">2</span> Your qualification
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="a-qual" className={label}>Highest qualification *</label>
                  <select id="a-qual" className={field} value={f.qualification} onChange={set("qualification")} {...aria("qualification")}>
                    <option value="">Select…</option>
                    {qualifications.map((q) => <option key={q}>{q}</option>)}
                  </select>
                  {msg("qualification")}
                </div>
                <div>
                  <label htmlFor="a-inst" className={label}>University / college *</label>
                  <input id="a-inst" placeholder="e.g. University of Mpumalanga" className={field} value={f.institution} onChange={set("institution")} {...aria("institution")} />
                  {msg("institution")}
                </div>
                <div>
                  <label htmlFor="a-year" className={label}>Year completed (or expected) *</label>
                  <input id="a-year" inputMode="numeric" maxLength={4} placeholder="e.g. 2025" className={field} value={f.year} onChange={set("year")} {...aria("year")} />
                  {msg("year")}
                </div>
                <div className="sm:col-span-2">
                  <p className={label} id="status-label">Current status *</p>
                  <div role="radiogroup" aria-labelledby="status-label" className="flex flex-wrap gap-2">
                    {applicantStatuses.map((s) => {
                      const on = f.status === s;
                      return (
                        <button
                          key={s} type="button" role="radio" aria-checked={on}
                          onClick={() => { setF((v) => ({ ...v, status: s })); setErr((x) => ({ ...x, status: "" })); }}
                          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${on ? "border-ez-emerald bg-ez-emerald text-white" : "border-slate-200 bg-white text-slate-700 hover:border-ez-emerald/50"}`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  {msg("status")}
                </div>
                <div className="sm:col-span-2">
                  <p className={label} id="funding-label">SETA funding *</p>
                  <p className="-mt-0.5 mb-2 text-xs text-slate-500">All learners on the programme must be funded by a SETA.</p>
                  <div role="radiogroup" aria-labelledby="funding-label" className="flex flex-wrap gap-2">
                    {fundingStatuses.map((s) => {
                      const on = f.funding === s;
                      return (
                        <button
                          key={s} type="button" role="radio" aria-checked={on}
                          onClick={() => { setF((v) => ({ ...v, funding: s })); setErr((x) => ({ ...x, funding: "" })); }}
                          className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${on ? "border-ez-emerald bg-ez-emerald text-white" : "border-slate-200 bg-white text-slate-700 hover:border-ez-emerald/50"}`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  {msg("funding")}
                </div>
              </div>
            </fieldset>

            {/* Motivation + CV */}
            <fieldset className="mt-8">
              <legend className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ez-gold">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ez-deep text-[11px] text-white">3</span> Motivation &amp; documents
              </legend>
              <div>
                <label htmlFor="a-mot" className={label}>Why do you want to join the programme? *</label>
                <textarea id="a-mot" rows={4} className={`${field} resize-y`} placeholder="Tell us about your goals and what you hope to gain from workplace experience…" value={f.motivation} onChange={set("motivation")} {...aria("motivation")} />
                {msg("motivation")}
              </div>
              <div className="mt-6">
                <p className={label}>Supporting documents</p>
                <p className="-mt-0.5 mb-3 text-xs text-slate-500">PDF, Word, JPG or PNG · all files together max 4 MB · {mb(totalSize)} MB used</p>
                <div className="space-y-3">
                  {DOCS.map((d) => {
                    const file = files[d.key];
                    return (
                      <div key={d.key}>
                        {file ? (
                          <div className="flex items-center gap-3 rounded-xl border border-ez-emerald/30 bg-emerald-50 px-4 py-3">
                            <FileText className="h-5 w-5 shrink-0 text-ez-emerald" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-xs font-semibold text-ez-emerald">{d.label}</span>
                              <span className="block truncate text-sm font-medium text-ez-deep">{file.name}</span>
                            </span>
                            <span className="shrink-0 text-xs text-slate-500">{mb(file.size)} MB</span>
                            <button type="button" onClick={() => removeFile(d.key)} aria-label={`Remove ${d.label}`} className="grid h-7 w-7 shrink-0 place-items-center rounded-full hover:bg-white">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => { e.preventDefault(); pickFile(d.key, e.dataTransfer.files?.[0]); }}
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3.5 transition hover:border-ez-emerald/50 hover:bg-emerald-50/50 ${err[d.key] ? "border-red-300" : "border-slate-200"}`}
                          >
                            <Upload className="h-5 w-5 shrink-0 text-ez-emerald" />
                            <span className="min-w-0 flex-1 text-sm">
                              <span className="font-semibold text-ez-deep">{d.label}{d.required ? " *" : ""}</span>
                              {"hint" in d && d.hint && <span className="text-slate-500"> · {d.hint}</span>}
                            </span>
                            <span className="shrink-0 text-xs font-semibold text-ez-emerald">Upload</span>
                            <input
                              ref={(el) => { inputs.current[d.key] = el; }}
                              type="file" accept={ACCEPT} className="sr-only"
                              aria-invalid={!!err[d.key]} aria-describedby={err[d.key] ? `${d.key}-err` : undefined}
                              onChange={(e) => pickFile(d.key, e.target.files?.[0])}
                            />
                          </label>
                        )}
                        {msg(d.key)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </fieldset>

            <div className="hidden" aria-hidden>
              <label htmlFor="a-web">Website</label>
              <input id="a-web" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} />
            </div>

            <label className="mt-8 flex cursor-pointer items-start gap-3 rounded-xl bg-slate-50 p-4">
              <input
                type="checkbox" checked={consent}
                onChange={(e) => { setConsent(e.target.checked); setErr((x) => ({ ...x, consent: "" })); }}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#16542A]"
                {...aria("consent")}
              />
              <span className="text-sm text-slate-600">
                I consent to {college.legalName} and S Packery Inc. processing my personal information (including my ID, qualification and other documents) to assess my application and, if I am accepted, to apply for SETA funding, as described in the{" "}
                <Link href="/privacy" target="_blank" className="font-semibold text-ez-emerald underline underline-offset-2">Privacy Notice</Link>. I can withdraw consent at any time. *
              </span>
            </label>
            {msg("consent")}

            {status === "error" && (
              <p className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {serverMsg} Please try again or WhatsApp us.
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-ez-emerald" /> Your information is kept confidential.</p>
              <button type="submit" disabled={status === "sending"} className="btn group bg-ez-deep px-8 py-3.5 text-white hover:bg-ez-emerald disabled:opacity-70">
                {status === "sending"
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
                  : <>Submit application <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
