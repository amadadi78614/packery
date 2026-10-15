import {
  Calculator, FileCheck2, Landmark, Briefcase, ShieldCheck, Scale, Building2,
  Cpu, UserRound, MapPinned, type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  All firm content lives here. Sources: S Packery Inc Business       */
/*  Profile, Auditing brochures, Postcard, finals flyer, and the       */
/*  "Website information" email (13 Oct 2026).                          */
/* ------------------------------------------------------------------ */

export const site = {
  name: "S Packery Inc.",
  legalName: "S Packery Inc.",
  descriptor: "Chartered Accountants & Registered Auditors",
  slogan: "Where Integrity Balances Every Ledger",
  established: "June 2013",
  establishedYear: 2013,
  city: "Nelspruit (Mbombela)",
  region: "Mpumalanga, South Africa",
  address: { street: "12 de Kock Street", suburb: "Sonheuwel", city: "Nelspruit", code: "1200" },
  phoneDisplay: "066 557 2559",
  phoneHref: "tel:+27665572559",
  hours: "Weekdays · closes 16:30",
  email: "admin@packery.co.za",
  whatsapp: "27665572559",
  whatsappDisplay: "066 557 2559",
  instagram: "spackery_inc",
  instagramUrl: "https://www.instagram.com/spackery_inc/",
  affiliations: [
    { short: "SAICA", name: "South African Institute of Chartered Accountants" },
    { short: "IRBA", name: "Registered with the Independent Regulatory Board for Auditors" },
    { short: "SARS", name: "Registered Tax Practitioners" },
    { short: "DoE", name: "Approved auditors · Department of Education, Mpumalanga" },
    { short: "CIPC", name: "Accredited online agents" },
    { short: "NAFCO", name: "Preferred partners" },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=12+de+Kock+Street,+Sonheuwel,+Nelspruit,+1200",
  mapsEmbed: "https://www.google.com/maps?q=12+de+Kock+Street,+Sonheuwel,+Nelspruit,+1200&output=embed",
  /** CIPC registration number of S Packery Inc. — TO CONFIRM with the firm (shown in legal notices once set). */
  regNo: "",
  legalStatus: "Personal liability company (Inc.) registered in South Africa",
  /** POPIA Information Officer (defaults to the head of the private body) — must be registered with the Information Regulator. */
  informationOfficer: { name: "Suhayl Packery", role: "Managing Director", email: "admin@packery.co.za" },
  partner: {
    name: "Suhayl Packery",
    title: "Founder & Managing Director",
    education: "University of Johannesburg",
    initials: "SP",
  },
};

export const fullAddress = `${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.code}`;

/** WhatsApp click-to-chat link (free — no Business API needed). */
export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

/** Pre-filled WhatsApp messages: firm enquiries vs EZ Accounting College applicants. */
export const waMessages = {
  firm: "Good day S Packery Inc, I'd like assistance with / a quote for your services.",
  college: "Good day, I'm interested in joining EZ Accounting College. How can I apply, and what are the requirements?",
};

export const yearsInPractice = new Date().getFullYear() - site.establishedYear;

/* ---------------------------- Leadership ---------------------------- */

export type Leader = {
  name: string; initials: string; role: string; subtitle: string;
  qualifications: string[]; experience: { org: string; role: string; years: string }[];
};

export const team: Leader[] = [
  {
    name: "Suhayl Packery",
    initials: "SP",
    role: "Founder & Managing Director",
    subtitle: "Head of Assurance · Lead audit partner",
    qualifications: ["CA(SA) — qualified 2005", "Registered IRBA Auditor", "B Com Accounting (Cum Laude)", "Hons (Accounting)", "University of Johannesburg alumnus"],
    experience: [
      { org: "Nkomati Mine", role: "Manager, Financial Statements", years: "2011 – 2013" },
      { org: "Ramaphoka Attorneys", role: "Head of Accounting", years: "2010 – 2011" },
      { org: "BMW SA", role: "Manager, New Cars", years: "2006 – 2010" },
      { org: "PwC", role: "IFRS Manager · articles at PwC Sunninghill", years: "2003 – 2006" },
    ],
  },
  {
    name: "Ishaq Packery",
    initials: "IP",
    role: "Head of Risk & Legal",
    subtitle: "Legal strategist · Actuarial specialist",
    qualifications: ["BSc Hons Actuarial Science"],
    experience: [
      { org: "S Packery Inc.", role: "Manager, Risk", years: "2018 – present" },
      { org: "MMI Holdings", role: "Actuarial Specialist", years: "2014 – 2018" },
      { org: "Metropolitan Life", role: "Actuarial Specialist", years: "2012 – 2014" },
      { org: "Momentum Life", role: "Actuarial Consultant", years: "2009 – 2012" },
    ],
  },
];

/** Suhayl's own words, from the Business Profile. */
export const founderQuote =
  "My initial years at PricewaterhouseCoopers were spent auditing at a government level. As such, I have had experience with government protocol and its processes. My experience in Automotive, Mining, Higher Education and Retail is beneficial when assessing and analysing tender submissions.";

/* ------------------------------ Services ----------------------------- */

export type Service = {
  id: string; title: string; short: string; icon: LucideIcon; tagline: string; summary: string; points: string[];
};

export const services: Service[] = [
  {
    id: "accounting", title: "Accounting", short: "Accounting", icon: Calculator,
    tagline: "Books you can trust. Decisions you can make.",
    summary: "Reliable financial reporting for businesses of all sizes — from monthly management accounts to clear, compliant annual financial statements that reflect your business's true financial health.",
    points: ["Monthly management accounts", "Compilation of Annual Financial Statements", "Personal & business accounting", "Business & annual operating plans", "Administrative costing", "Registered Pastel MBO advisors"],
  },
  {
    id: "taxation", title: "Taxation", short: "Tax", icon: Landmark,
    tagline: "Pay what you owe. Not a rand more.",
    summary: "Registered SARS tax practitioners handling business, personal and capital gains tax — plus expert SARS facilitation, dispute resolution and negotiation that protects your interests.",
    points: ["Company & individual income tax", "Capital gains tax computation & submission", "SARS facilitation & negotiations", "Tax clearance certificates", "Online submissions to SARS", "Statutory returns"],
  },
  {
    id: "auditing", title: "Auditing", short: "Audit", icon: FileCheck2,
    tagline: "An opinion your stakeholders respect.",
    summary: "A specialised auditing firm registered with IRBA. Statutory and forensic audits delivered with technical mastery and unwavering ethics — trusted by business and government alike.",
    points: ["Statutory audits & assurance", "Forensic investigations & auditing", "Approved auditors · Dept of Education, Mpumalanga", "Consulting auditor to government departments", "Tender submission assessment", "Accounting & auditing for all entity sizes"],
  },
  {
    id: "business", title: "Business Services & Solutions", short: "Business", icon: Briefcase,
    tagline: "Start right. Structure smart. Grow faster.",
    summary: "End-to-end business support — from registering your company to BEE certification, valuations, legal agreements and strategic advisory that unlocks growth.",
    points: ["Company, CC & shelf company registrations", "CIPC filings (accredited online agents)", "BEE verification & accreditation", "Comprehensive business valuations", "Drafting of legal agreements", "Business analysis & advisory"],
  },
];

/** Full service list for the ticker (Postcard + Business Profile). */
export const allServices = [
  "Auditing", "Forensic Investigations", "Annual Financial Statements", "Taxation", "SARS Facilitation & Negotiations",
  "BEE Accreditation", "Company Registration", "CIPC Services", "Business Advisory", "Business Analysis",
  "Statutory Returns", "Business Valuations", "Tax Clearance Certificates", "Capital Gains Tax", "Legal Agreements",
  "Personal Accounting", "Government Consulting",
];

/* ---------------------------- Why S Packery --------------------------- */

export const outcomes: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: ShieldCheck, title: "Sleep well during SARS season", body: "Registered SARS tax practitioners handle your returns, correspondence, disputes and negotiations — properly and on time." },
  { icon: Scale, title: "Ethics you can audit", body: "IRBA-registered and SAICA members. Our strict code of conduct means you're treated with the highest professionalism." },
  { icon: Building2, title: "Trusted by government", body: "Approved auditors for the Department of Education, Mpumalanga, and consulting auditors to government departments." },
  { icon: Cpu, title: "Ahead of the legislation", body: "Strong involvement with professional bodies and a high level of technology keep us ahead of constantly changing rules." },
  { icon: UserRound, title: "Corporate expertise, personal service", body: "From large corporates to individuals — every client gets a personalised service and work followed through to completion." },
  { icon: MapPinned, title: "Mbombela-based, nationally trusted", body: "Clients from Gauteng, Port Elizabeth and Mafikeng to Badplaas, Belfast, Barberton and Machadodorp." },
];

/** Client commitments, from the Business Profile. */
export const commitments = [
  "All clients are treated with respect",
  "All client information is treated confidentially",
  "Work is carried out promptly, within the agreed time frame",
  "Work is followed through until completion",
  "Regular feedback on your business",
  "We identify strengths, weaknesses, opportunities & threats — and offer a solution",
];

export const processSteps = [
  { title: "Discovery call", body: "A no-obligation conversation to understand your business, your deadlines and what's keeping you up at night." },
  { title: "Tailored quote", body: "A clear proposal and fee quote scoped to exactly what you need — no surprises." },
  { title: "Onboarding", body: "We collect what we need, agree the time frame, and take the admin off your plate." },
  { title: "Ongoing partnership", body: "Prompt delivery, regular feedback and a firm that knows your file year after year." },
];

/* ------------------------- EZ Accounting College ---------------------- */

export const college = {
  name: "EZ Accounting College",
  legalName: "EZ Accounting College (Pty) Ltd",
  regNo: "2013/202496/07",
  tagline: "A division of S Packery Inc.",
  motto: "Empower. Grow. Achieve.",
  programme: "18-month graduate internship programme",
  summary:
    "Many graduates struggle to move from study into the workplace because they lack practical experience. EZ Accounting College bridges that gap — giving finance graduates hands-on exposure to real-world work so they enter the industry skilled, confident and employable.",
  highlights: [
    "Internship & workplace readiness",
    "Student mentorship and coaching",
    "Pathways to professional accreditation",
    "SETA-funded programme",
  ],
  partnerPitch:
    "Organisations in the education and finance sectors can partner with us to build a stronger pipeline of qualified professionals.",
};

export const qualifications = [
  "BCom Accounting",
  "BCom Honours / PGDA",
  "National Diploma — Accounting / Financial Management",
  "Other finance or accounting qualification",
  "Currently studying (final year)",
];
export const applicantStatuses = ["Unemployed graduate", "Currently employed", "Final-year student"];

/* ---------------------------- Testimonials --------------------------- */
/** Client testimonials (option 3). Add entries ONLY with the client's written permission.
 *  The section appears automatically once at least one entry exists.
 *  Example: { quote: "…", name: "Thabo M.", role: "Director, XYZ Logistics", service: "Auditing" } */
export type Testimonial = { quote: string; name: string; role?: string; service?: string };
export const testimonials: Testimonial[] = [];

/* ------------------------------ Navigation --------------------------- */

export type NavItem = { label: string; href: string; dropdown?: boolean };
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "EZ College", href: "/college" },
  { label: "Contact", href: "/contact" },
];

/** Link to the quote page, optionally with a service preselected. */
export const quoteHref = (serviceId?: string) => (serviceId ? `/quote?service=${serviceId}` : "/quote");

export const clientTypes = ["Individual", "Sole proprietor", "Company (Pty) Ltd", "Close corporation", "Trust / NPO", "Government / public entity", "Other"];
export const turnoverBands = ["Under R1 million", "R1m – R5m", "R5m – R20m", "R20m – R50m", "Over R50m", "Not sure / N/A"];
export const timelines = ["As soon as possible", "Within the month", "Planning ahead"];

export const legalUpdated = "16 October 2026";

export const infoRegulator = {
  name: "Information Regulator (South Africa)",
  address: "Woodmead North Office Park, 54 Maxwell Drive, Woodmead, Johannesburg, 2191",
  enquiries: "enquiries@inforegulator.org.za",
  popiaComplaints: "POPIAComplaints@inforegulator.org.za",
  paiaComplaints: "PAIAComplaints@inforegulator.org.za",
  tollFree: "0800 017 160",
  phone: "010 023 5200",
  website: "https://inforegulator.org.za",
  paiaPage: "https://inforegulator.org.za/paia/",
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.packery.co.za";
