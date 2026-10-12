import { Phone, MapPin } from "lucide-react";
import Logo from "./Logo";
import { nav, services, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-6 bg-navy-950 pb-20 text-slate-400 md:pb-0">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            {site.legalName} — {site.descriptor}. Serving {site.region} since {site.established}.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-gold-400">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => <li key={s.id}><a href="#services" className="hover:text-gold-400">{s.title}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold-400"><Phone className="h-4 w-4 text-gold-500" aria-hidden />{site.phoneDisplay}</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-500" aria-hidden />{site.city}, Mpumalanga</li>
          </ul>
          <a href="#quote" className="btn-gold mt-6 py-2.5">Get a Free Quote</a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site space-y-3 py-8 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-slate-300">Disclaimer:</strong> The information on this website is of a
            general nature and does not constitute professional accounting, tax, audit or legal advice. No client
            relationship is created by use of this site or submission of an enquiry. Please consult the firm regarding
            your specific circumstances. Personal information submitted is processed in accordance with the Protection of
            Personal Information Act (POPIA).
          </p>
          <p className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <span>© {year} {site.name} (Est. {site.establishedYear}). All rights reserved.</span>
            <span>{site.descriptor} · {site.city}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
