import { NextResponse } from "next/server";
import { qualifications, applicantStatuses, college } from "@/lib/site";

export const runtime = "nodejs";

const MAX_CV = 4 * 1024 * 1024;
const CV_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
const hits = new Map<string, number[]>();
const str = (v: FormDataEntryValue | null, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 4) return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let fd: FormData;
  try { fd = await req.formData(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const reference = `EZ-${now.toString(36).slice(-6).toUpperCase()}`;
  if (str(fd.get("website"), 200)) return NextResponse.json({ ok: true, reference }); // honeypot

  const year = str(fd.get("year"), 4);
  const d = {
    name: str(fd.get("name"), 120),
    email: str(fd.get("email"), 200),
    phone: str(fd.get("phone"), 30),
    town: str(fd.get("town"), 120),
    qualification: str(fd.get("qualification"), 120),
    institution: str(fd.get("institution"), 160),
    year,
    status: str(fd.get("status"), 60),
    motivation: str(fd.get("motivation"), 3000),
    consent: fd.get("consent") === "yes",
  };

  const thisYear = new Date().getFullYear();
  const valid =
    d.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) &&
    /^[+\d][\d\s()-]{8,18}$/.test(d.phone) &&
    d.town.length >= 2 &&
    qualifications.includes(d.qualification) &&
    d.institution.length >= 2 &&
    /^\d{4}$/.test(year) && +year >= 1980 && +year <= thisYear + 2 &&
    applicantStatuses.includes(d.status) &&
    d.motivation.length >= 20 &&
    d.consent;
  if (!valid) return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });

  // Optional CV
  let attachment: { filename: string; content: string } | undefined;
  const cv = fd.get("cv");
  if (cv && typeof cv !== "string" && cv.size > 0) {
    const ext = CV_TYPES[cv.type];
    if (!ext) return NextResponse.json({ error: "CV must be a PDF or Word document." }, { status: 422 });
    if (cv.size > MAX_CV) return NextResponse.json({ error: "CV must be 4 MB or smaller." }, { status: 422 });
    const safe = d.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 40) || "applicant";
    attachment = { filename: `CV-${safe}-${reference}.${ext}`, content: Buffer.from(await cv.arrayBuffer()).toString("base64") };
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL } = process.env;
  const to = process.env.COLLEGE_TO_EMAIL || process.env.CONTACT_TO_EMAIL;

  if (RESEND_API_KEY && to) {
    const row = (k: string, v: string) => `<tr><td style="padding:6px 12px;color:#64748b">${k}</td><td style="padding:6px 12px;font-weight:600">${esc(v || "—")}</td></tr>`;
    const html = `<h2 style="font-family:sans-serif;color:#16542A">New ${esc(college.name)} application · ${reference}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${row("Name", d.name)}${row("Email", d.email)}${row("Phone", d.phone)}${row("Town / area", d.town)}
${row("Qualification", d.qualification)}${row("Institution", d.institution)}${row("Year completed", d.year)}${row("Status", d.status)}
${row("CV attached", attachment ? "Yes" : "No")}
</table><h3 style="font-family:sans-serif">Motivation</h3><p style="font-family:sans-serif;font-size:14px">${esc(d.motivation).replace(/\n/g, "<br/>")}</p>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "S Packery Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: d.email,
        subject: `${college.name} application ${reference} — ${d.name}`,
        html,
        attachments: attachment ? [attachment] : undefined,
      }),
    });
    if (!res.ok) {
      console.error("[college-apply] email delivery failed", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't submit your application right now." }, { status: 502 });
    }
  } else {
    // Email not configured: avoid writing personal information to production logs (POPIA s19).
    if (process.env.NODE_ENV === "production") console.warn(`[college-apply] ${reference} received but email delivery is NOT configured — set RESEND_API_KEY and COLLEGE_TO_EMAIL/CONTACT_TO_EMAIL.`);
    else console.info(`[college-apply] ${reference} received (email delivery not configured):`, { ...d, cv: attachment?.filename ?? "none" });
  }

  return NextResponse.json({ ok: true, reference });
}
