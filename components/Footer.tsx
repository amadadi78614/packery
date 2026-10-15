import { Phone, MapPin, Mail } from "lucide-react";
import { InstagramIcon } from "./icons/Brand";
import Logo from "./Logo";
import Link from "next/link";
import FooterWhatsApp from "./FooterWhatsApp";
import GoogleReviewButton from "./GoogleReviewButton";
import { nav, services, site, fullAddress, college } from "@/lib/site";
import { serviceDetails } from "@/lib/serviceDetails";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-6 bg-navy-950 pb-20 text-slate-400 md:pb-0">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            <span className="italic text-slate-300">&ldquo;{site.slogan}&rdquo;</span><br />
            {site.descriptor}. Serving clients from Mbombela since {site.established}.
          </p>
          <div className="mt-6 flex gap-3">
            <FooterWhatsApp />
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-accent-400 hover:bg-accent-500 hover:text-navy-950"><InstagramIcon className="h-5 w-5" /></a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-accent-400 hover:bg-accent-500 hover:text-navy-950"><Mail className="h-5 w-5" /></a>
          </div>
          <p className="mt-6 text-xs text-slate-500">Affiliations: {site.affiliations.map((a) => a.short).join(" · ")}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-accent-400">{n.label}</Link></li>)}
            <li><Link href="/quote" className="hover:text-accent-400">Get a Quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => <li key={s.id}><Link href={`/services/${serviceDetails[s.id].slug}`} className="hover:text-accent-400">{s.title}</Link></li>)}
            <li><Link href="/college" className="hover:text-accent-400">EZ Accounting College</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.phoneHref} className="flex items-center gap-2 hover:text-accent-400"><Phone className="h-4 w-4 text-accent-500" aria-hidden />{site.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-accent-400"><Mail className="h-4 w-4 text-accent-500" aria-hidden />{site.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />{fullAddress}</li>
          </ul>
          <Link href="/quote" className="btn-accent mt-6 py-2.5">Get a Free Quote</Link>
          <GoogleReviewButton variant="dark" className="mt-3" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site space-y-3 py-8 text-xs leading-relaxed">
          <p>
            <strong className="font-semibold text-slate-300">Disclaimer:</strong> The information on this website is of a
            general nature and does not constitute professional accounting, tax, audit or legal advice. No client
            relationship is created by use of this site or submission of an enquiry. Please consult the firm regarding
            your specific circumstances. Personal information is processed in accordance with the Protection of Personal
            Information Act (POPIA) — see our{" "}
            <Link href="/privacy" className="text-slate-300 underline underline-offset-2 hover:text-white">Privacy Notice</Link>.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/privacy" className="font-medium text-slate-300 hover:text-accent-400">Privacy Notice</Link>
            <Link href="/paia" className="font-medium text-slate-300 hover:text-accent-400">PAIA Manual</Link>
            <Link href="/terms" className="font-medium text-slate-300 hover:text-accent-400">Terms of Use</Link>
          </nav>
          <p className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <span>
              © {year} {site.name}{site.regNo ? ` (Reg. ${site.regNo})` : ""} · {site.descriptor} · Director: {site.partner.name} CA(SA)
            </span>
            <span>{college.legalName} (Reg. {college.regNo}) is a division of {site.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
