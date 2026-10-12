import {
  Calculator, FileCheck2, Landmark, Briefcase, ShieldCheck, LineChart, BadgeCheck,
  Banknote, UserRound, MapPinned, type LucideIcon,
} from "lucide-react";

export const site = {
  name: "S Packery Inc.",
  legalName: "S Packery & Associates Inc.",
  descriptor: "Chartered Accountants and Registered Auditors",
  established: "June 2013",
  establishedYear: 2013,
  city: "Nelspruit (Mbombela)",
  region: "Mpumalanga, South Africa",
  phoneDisplay: "+27 66 557 2559",
  phoneHref: "tel:+27665572559",
  hours: "Weekdays · closes 16:30",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=S+Packery+Inc+Mbombela",
  mapsEmbed: "https://www.google.com/maps?q=S+Packery+Inc,+Mbombela,+Mpumalanga&output=embed",
  partner: { name: "Suhayl Packery", title: "Main Partner", education: "University of Johannesburg", initials: "SP" },
};

export const yearsInPractice = new Date().getFullYear() - site.establishedYear;

export const nav = [
  { label: "Why Us", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string; title: string; short: string; icon: LucideIcon; tagline: string; summary: string; points: string[];
};

export const services: Service[] = [
  {
    id: "accounting", title: "Accounting", short: "Accounting", icon: Calculator,
    tagline: "Books you can trust. Decisions you can make.",
    summary: "Comprehensive financial record-keeping, ledger management and financial statement compilation — so you always know exactly where your business stands.",
    points: ["Bookkeeping & ledger management", "Annual financial statements", "Management accounts & reporting", "Month-end reconciliations"],
  },
  {
    id: "taxation", title: "Taxation", short: "Tax", icon: Landmark,
    tagline: "Pay what you owe. Not a rand more.",
    summary: "Strategic tax planning, corporate and individual tax returns, SARS compliance and dispute resolution — handled proactively, filed on time.",
    points: ["Corporate & individual returns", "Tax planning & structuring", "SARS compliance & correspondence", "Objections & dispute resolution"],
  },
  {
    id: "auditing", title: "Auditing", short: "Audit", icon: FileCheck2,
    tagline: "An opinion your stakeholders respect.",
    summary: "Independent statutory audits, internal audits and assurance services by registered auditors — rigorous, objective and delivered on schedule.",
    points: ["Statutory audits", "Internal audit reviews", "Independent reviews & assurance", "Audit-readiness support"],
  },
  {
    id: "business", title: "Business Services & Solutions", short: "Business", icon: Briefcase,
    tagline: "Start right. Structure smart. Grow faster.",
    summary: "Advisory, corporate structuring, company registrations and financial solutions that set your business up to scale with confidence.",
    points: ["Company registrations & secretarial", "Corporate structuring", "Business & financial advisory", "Funding-ready financial packs"],
  },
];

export const outcomes: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ShieldCheck, title: "Sleep well during SARS season", body: "Returns filed correctly and on time, correspondence handled, disputes managed by professionals." },
  { icon: LineChart, title: "See your business clearly", body: "Accurate, up-to-date numbers that show what's working, what isn't, and where the cash is going." },
  { icon: BadgeCheck, title: "Audit-ready, every year", body: "Clean books and documented controls mean audits run smoothly instead of disrupting your operations." },
  { icon: Banknote, title: "Unlock funding & growth", body: "Credible, professionally prepared financials that banks, investors and tender panels take seriously." },
  { icon: UserRound, title: "Talk to the partner, not a call centre", body: "A partner-led practice — the person advising you is the person accountable for the work." },
  { icon: MapPinned, title: "Local knowledge since 2013", body: "Based in Mbombela and serving Mpumalanga businesses and individuals for over a decade." },
];

export const process = [
  { title: "Discovery call", body: "A no-obligation conversation to understand your business, your deadlines and what's keeping you up at night." },
  { title: "Tailored quote", body: "A clear proposal and fee quote scoped to exactly what you need — no surprises." },
  { title: "Onboarding", body: "We collect what we need, set up a schedule, and take the admin off your plate." },
  { title: "Ongoing partnership", body: "Accurate delivery, proactive advice and a partner who knows your file year after year." },
];

export const clientTypes = ["Individual", "Sole proprietor", "Company (Pty) Ltd", "Close corporation", "Trust / NPO", "Other"];
export const turnoverBands = ["Under R1 million", "R1m – R5m", "R5m – R20m", "R20m – R50m", "Over R50m", "Not sure / N/A"];
export const timelines = ["As soon as possible", "Within the month", "Planning ahead"];
