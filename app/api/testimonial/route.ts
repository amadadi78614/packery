import { NextResponse } from "next/server";

const hits = new Map<string, number[]>();
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const publishLabels: Record<string, string> = {
  full: "Name, role and company",
  company: "Role and company only",
  anonymous: "Anonymously",
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 4) return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const reference = `TS-${now.toString(36).slice(-6).toUpperCase()}`;
  if (str(body.website, 200)) return NextResponse.json({ ok: true, reference }); // honeypot

  const d = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    role: str(body.role, 120),
    company: str(body.company, 160),
    service: str(body.service, 120),
    quote: str(body.quote, 1200),
    rating: Number(body.rating),
    publish: str(body.publish, 20),
    consent: body.consent === true,
  };
  const valid =
    d.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) &&
    Number.isInteger(d.rating) && d.rating >= 1 && d.rating <= 5 &&
    d.quote.length >= 20 &&
    d.publish in publishLabels &&
    d.consent;
  if (!valid) return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const row = (k: string, v: string) => `<tr><td style="padding:6px 12px;color:#64748b">${k}</td><td style="padding:6px 12px;font-weight:600">${esc(v || "—")}</td></tr>`;
    const html = `<h2 style="font-family:sans-serif;color:#1F2340">New website testimonial · ${reference}</h2>
<p style="font-family:sans-serif;font-size:18px;color:#f59e0b">${"★".repeat(d.rating)}${"☆".repeat(5 - d.rating)}</p>
<blockquote style="font-family:sans-serif;font-size:15px;border-left:4px solid #5AA9E0;margin:0;padding:8px 16px">${esc(d.quote).replace(/\n/g, "<br/>")}</blockquote>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;margin-top:16px">
${row("Name", d.name)}${row("Role", d.role)}${row("Company", d.company)}${row("Email", d.email)}${row("Service", d.service)}
${row("Publish as", publishLabels[d.publish])}${row("Consent to publish", "Yes")}
</table>
<p style="font-family:sans-serif;font-size:13px;color:#64748b">To publish it, send this email to your web developer. Keep it as the client's record of consent.</p>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "S Packery Website <onboarding@resend.dev>",
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: d.email,
        subject: `New testimonial ${reference} — ${d.rating}★ from ${d.name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[testimonial] email delivery failed", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't send your testimonial right now." }, { status: 502 });
    }
  } else {
    if (process.env.NODE_ENV === "production") console.warn(`[testimonial] ${reference} received but email delivery is NOT configured — set RESEND_API_KEY and CONTACT_TO_EMAIL.`);
    else console.info(`[testimonial] ${reference} received (email delivery not configured):`, d);
  }
  return NextResponse.json({ ok: true, reference });
}
