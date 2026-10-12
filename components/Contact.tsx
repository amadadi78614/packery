import { Phone, MapPin, Clock3, Navigation } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "./motion";

export default function Contact() {
  const cards = [
    { icon: Phone, k: "Call us", v: site.phoneDisplay, href: site.phoneHref },
    { icon: MapPin, k: "Visit us", v: `${site.city}, Mpumalanga`, href: site.mapsUrl },
    { icon: Clock3, k: "Office hours", v: site.hours },
  ];
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Contact</span>
          <h2 className="h-section mt-4 text-4xl sm:text-5xl">Find us in Mbombela.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="grid gap-4">
            {cards.map(({ icon: I, k, v, href }, i) => {
              const inner = (
                <>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-900 text-gold-400 transition-transform group-hover:scale-110"><I className="h-6 w-6" aria-hidden /></span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">{k}</span>
                    <span className="mt-0.5 block font-display text-lg font-semibold text-navy-900">{v}</span>
                  </span>
                </>
              );
              const cls = "group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-gold-500/60 hover:shadow-xl hover:shadow-navy-900/5";
              return (
                <Reveal key={k} delay={i * 0.1}>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>{inner}</a> : <div className={cls}>{inner}</div>}
                </Reveal>
              );
            })}
            <Reveal delay={0.3}>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-navy w-full py-4">
                <Navigation className="h-4 w-4" /> Get directions on Google Maps
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="h-full min-h-[22rem] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-xl shadow-navy-900/5">
              <iframe
                title="S Packery Inc. on Google Maps"
                src={site.mapsEmbed}
                className="h-full min-h-[22rem] w-full grayscale-[35%] transition duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
