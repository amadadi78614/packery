import { NextResponse } from "next/server";
import { services, clientTypes, turnoverBands, timelines } from "@/lib/site";

export const runtime = "nodejs";

const SERVICE_IDS = new Set(services.map((s) => s.id));
const hits = new Map<string, number[]>(); // simple in-memory rate limit (per instance)

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const oneOf = (v: string, list: string[]) => (list.includes(v) ? v : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "Too many submissions." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  const reference = `SP-${now.toString(36).slice(-6).toUpperCase()}`;

  // Honeypot filled → pretend success
  if (clean(body.website, 200)) return NextResponse.json({ ok: true, reference });

  const picked = Array.isArray(body.services) ? body.services.filter((s): s is string => typeof s === "string" && SERVICE_IDS.has(s)) : [];
  const d = {
    services: picked.map((id) => services.find((s) => s.id === id)!.title),
    clientType: oneOf(clean(body.clientType, 60), clientTypes),
    turnover: oneOf(clean(body.turnover, 60), turnoverBands),
    timeline: oneOf(clean(body.timeline, 60), timelines),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 30),
    company: clean(body.company, 160),
    message: clean(body.message, 5000),
  };

  if (!d.services.length || !d.clientType || !d.timeline || d.name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || !/^[+\d][\d\s()-]{8,18}$/.test(d.phone)) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (RESEND_API_KEY && CONTACT_TO_EMAIL) {
    const row = (k: string, v: string) => `<tr><td style="padding:6px 12px;color:#64748b">${k}</td><td style="padding:6px 12px;font-weight:600">${esc(v || "—")}</td></tr>`;
    const html = `<h2 style="font-family:sans-serif;color:#0A1A33">New quote request · ${reference}</h2>
<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
${row("Services", d.services.join(", "))}${row("Client type", d.clientType)}${row("Turnover", d.turnover)}${row("Timeline", d.timeline)}
${row("Name", d.name)}${row("Business", d.company)}${row("Email", d.email)}${row("Phone", d.phone)}
</table><p style="font-family:sans-serif;font-size:14px">${esc(d.message || "").replace(/\n/g, "<br/>")}</p>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL || "S Packery Website <onboarding@resend.dev>",
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: d.email,
        subject: `Quote request ${reference}: ${d.services.join(", ")} — ${d.name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[quote] email delivery failed", res.status, await res.text());
      return NextResponse.json({ error: "We couldn't send your request right now." }, { status: 502 });
    }
  } else {
    console.info(`[quote] ${reference} received (email delivery not configured):`, d);
  }

  return NextResponse.json({ ok: true, reference });
}
