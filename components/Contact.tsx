import { Phone, MapPin, Clock3, Navigation, Mail } from "lucide-react";
import { site, waLink, waMessages, fullAddress } from "@/lib/site";
import { WhatsAppIcon, InstagramIcon } from "./icons/Brand";
import { Reveal } from "./motion";
import ConsentMap from "./ConsentMap";

export default function Contact() {
  const cards = [
    { icon: Phone, k: "Call us", v: site.phoneDisplay, href: site.phoneHref },
    { icon: WhatsAppIcon, k: "WhatsApp", v: site.whatsappDisplay, href: waLink(waMessages.firm) },
    { icon: Mail, k: "Email requests", v: site.email, href: `mailto:${site.email}` },
    { icon: InstagramIcon, k: "Instagram", v: `@${site.instagram}`, href: site.instagramUrl },
    { icon: MapPin, k: "Visit us", v: fullAddress, href: site.mapsUrl },
    { icon: Clock3, k: "Office hours", v: site.hoursLines.slice(0, 2).join("\n") },
  ];
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h2 className="h-section mt-4 text-4xl sm:text-5xl">Find us in Mbombela.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {cards.map(({ icon: I, k, v, href }, i) => {
              const inner = (
                <>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-accent-400 transition-transform group-hover:scale-110"><I className="h-6 w-6" aria-hidden /></span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{k}</span>
                    <span className={`mt-0.5 block whitespace-pre-line font-display font-semibold text-navy-900 ${k === "Office hours" ? "text-base" : "break-all text-lg"}`}>{v}</span>
                  </span>
                </>
              );
              const cls = "group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-accent-500/60 hover:shadow-xl hover:shadow-navy-900/5";
              return (
                <Reveal key={k} delay={i * 0.06}>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
                </Reveal>
              );
            })}
            <Reveal delay={0.3} className="sm:col-span-2 lg:col-span-1">
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-navy w-full py-4">
                <Navigation className="h-4 w-4" /> Get directions on Google Maps
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="h-full min-h-[22rem] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-navy-900/5">
              <ConsentMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
