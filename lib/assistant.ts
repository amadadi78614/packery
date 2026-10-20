/* "Ask us" assistant knowledge base.
   Answers come only from the firm's own published content (brochures, Business Profile, site copy).
   Deliberately NOT an AI model: no improvised tax/audit advice. Anything unmatched is handed to the team on WhatsApp. */

import { site, college, collegeRequirements, fullAddress, waLink, waMessages } from "./site";

export type Action = { label: string; href: string; external?: boolean; kind?: "primary" | "whatsapp" | "ghost" };
export type Answer = { text: string; actions?: Action[]; followUps?: string[] };
type Intent = { id: string; keywords: string[]; answer: (onCollege: boolean) => Answer };

const wa = (msg: string): Action => ({ label: "Ask on WhatsApp", href: waLink(msg), external: true, kind: "whatsapp" });
const quote = (service?: string): Action => ({ label: "Get a free quote", href: service ? `/quote?service=${service}` : "/quote", kind: "primary" });

const intents: Intent[] = [
  {
    id: "quote",
    keywords: ["quote", "price", "pricing", "cost", "fee", "fees", "how much", "charge", "rates", "budget", "estimate"],
    answer: () => ({
      text: "Our fees depend on the scope of work, so we give every client a tailored, fixed-scope quote — no surprises. The quote form takes under a minute, or send us a WhatsApp.",
      actions: [quote(), wa(waMessages.firm)],
      followUps: ["Tax & SARS help", "I need an audit", "Register a company"],
    }),
  },
  {
    id: "sars",
    keywords: ["sars letter", "letter from sars", "dispute", "objection", "penalty", "penalties", "verification", "sars audit", "debt", "negotiate", "payment arrangement", "notice"],
    answer: () => ({
      text: "Received something from SARS? SARS facilitation and negotiation is one of our core services — we deal with SARS on your behalf, from queries and verifications to disputes and payment arrangements. Send us the letter and we'll advise on next steps.",
      actions: [wa("Good day S Packery Inc, I've received a letter from SARS and need assistance."), { label: "Taxation services", href: "/services/taxation", kind: "ghost" }],
      followUps: ["Get a quote", "Talk to a person"],
    }),
  },
  {
    id: "tax",
    keywords: ["tax", "sars", "return", "returns", "efiling", "e-filing", "provisional", "income tax", "itr12", "capital gains", "cgt", "clearance", "tax clearance", "compliance status", "vat", "paye"],
    answer: () => ({
      text: "We're registered SARS tax practitioners. We handle company and individual income tax, capital gains tax, tax clearance certificates, statutory returns and online SARS submissions — plus SARS facilitation and negotiations when things get complicated.",
      actions: [quote("taxation"), { label: "Taxation services", href: "/services/taxation", kind: "ghost" }],
      followUps: ["I got a SARS letter", "Get a quote"],
    }),
  },
  {
    id: "forensic",
    keywords: ["forensic", "fraud", "theft", "irregular", "irregularities", "investigation", "investigate", "stolen", "missing money", "embezzle"],
    answer: () => ({
      text: "Our forensic investigations provide thorough, objective analysis to uncover financial irregularities, ensure accountability and support legal or regulatory action where needed. These matters are confidential — it's best to speak to us directly.",
      actions: [wa("Good day S Packery Inc, I'd like to discuss a confidential forensic matter."), { label: "Auditing & forensics", href: "/services/auditing", kind: "ghost" }],
      followUps: ["Talk to a person"],
    }),
  },
  {
    id: "audit",
    keywords: ["audit", "audits", "auditor", "auditors", "statutory", "independent review", "assurance", "irba", "audited", "school audit", "school", "schools", "department of education", "attorney", "attorneys", "trust account", "lawyer", "legal practice", "lpc"],
    answer: () => ({
      text: "S Packery Inc. is a specialised auditing firm registered with IRBA, and approved on the list of auditors for the Department of Education, Mpumalanga. We do statutory audits, attorney trust account audits, school audits, forensic audits and assurance work, and consult to government departments. Not sure whether you need an audit or an independent review? We'll assess that for you.",
      actions: [quote("auditing"), { label: "Auditing services", href: "/services/auditing", kind: "ghost" }],
      followUps: ["Forensic investigation", "Get a quote"],
    }),
  },
  {
    id: "accounting",
    keywords: ["accounting", "accountant", "books", "bookkeeping", "financial statements", "afs", "annual financial", "management accounts", "monthly accounts", "pastel", "sage", "ledger", "reconciliation", "payroll", "payslip", "payslips", "salaries", "wages", "uif", "sdl"],
    answer: () => ({
      text: "We provide monthly management accounts, compilation of annual financial statements, payroll services, personal and business accounting, business and annual operating plans, and administrative costing. We're also registered Pastel MBO advisors.",
      actions: [quote("accounting"), { label: "Accounting services", href: "/services/accounting", kind: "ghost" }],
      followUps: ["Tax & SARS help", "Get a quote"],
    }),
  },
  {
    id: "company",
    keywords: ["register", "registration", "company", "cipc", "shelf", "close corporation", "cc", "pty", "annual return", "director", "start a business", "new business", "startup"],
    answer: () => ({
      text: "As accredited CIPC online agents, we handle company and shelf company registrations end-to-end, plus CIPC annual returns, amendments and statutory registrations.",
      actions: [quote("business"), { label: "Business services", href: "/services/business-services", kind: "ghost" }],
      followUps: ["BEE certificate", "Get a quote"],
    }),
  },
  {
    id: "bee",
    keywords: ["bee", "b-bbee", "bbbee", "bee certificate", "affidavit", "tender", "tenders"],
    answer: () => ({
      text: "We provide BEE verification certification and can advise on what your business needs for tenders. We can also help with tax clearance and compliance status for tender submissions.",
      actions: [quote("business"), { label: "Business services", href: "/services/business-services", kind: "ghost" }],
      followUps: ["Tax clearance", "Get a quote"],
    }),
  },
  {
    id: "valuation",
    keywords: ["valuation", "value my business", "sell my business", "buy a business", "restructure", "legal agreement", "lease agreement", "contract", "advisory", "business plan"],
    answer: () => ({
      text: "Our business services include comprehensive business valuations, drafting of legal agreements (such as lease and rental agreements), business analysis and strategic advisory.",
      actions: [quote("business"), { label: "Business services", href: "/services/business-services", kind: "ghost" }],
    }),
  },
  {
    id: "college",
    keywords: ["college", "ez", "internship", "intern", "learnership", "graduate", "apply", "application", "requirements", "programme", "program", "training", "student", "seta", "job", "work experience", "vacancy"],
    answer: () => ({
      text: `${college.name} is our sister division. ${college.accreditation}, a 12 to 18 month programme with real workplace training and mentorship. You need ${collegeRequirements.minimum.replace(/^An/, "an")}, and all learners must be SETA-funded. Apply online or ask us on WhatsApp.`,
      actions: [{ label: "Apply online", href: "/college#apply", kind: "primary" }, wa(waMessages.college)],
      followUps: ["Requirements", "Is it funded?"],
    }),
  },
  {
    id: "job-shadowing",
    keywords: ["job shadow", "job shadowing", "shadowing", "shadow", "experience day", "school learner", "work exposure"],
    answer: (onCollege) => ({
      text: "Yes, we offer job shadowing. Students can spend time at S Packery Inc. to see the day-to-day work of a chartered accountancy and audit firm. WhatsApp us to arrange it.",
      actions: [wa("Good day S Packery Inc, I'd like to arrange job shadowing at your firm."), ...(onCollege ? [] : [{ label: "EZ Accounting College", href: "/college", kind: "ghost" as const }])],
    }),
  },
  {
    id: "college-length",
    keywords: ["how long", "duration", "months", "length"],
    answer: () => ({
      text: `${college.accreditation}. The programme runs for 12 to 18 months, with hands-on training inside a working chartered accountancy and audit practice.`,
      actions: [{ label: "Apply online", href: "/college#apply", kind: "primary" }],
    }),
  },
  {
    id: "college-funding",
    keywords: ["funded", "funding", "free", "pay", "paid", "cost", "costs", "fee", "fees", "how much", "price", "stipend", "salary", "cost of college"],
    answer: () => ({
      text: "All learners on the programme must be funded by a SETA. If your funding isn't confirmed yet, you can still apply and tell us on the form, and the college will advise you. If you have proof of funding, upload it with your application.",
      actions: [wa(waMessages.college), { label: "Apply online", href: "/college#apply", kind: "ghost" }],
    }),
  },
  {
    id: "college-intake",
    keywords: ["intake", "start date", "when does it start", "starting", "closing date", "deadline", "when can i start", "next intake", "open for applications"],
    answer: () => ({
      text: "Intake dates are set by the college for each programme cycle. Submit your application now so you're considered for the next intake, or ask us on WhatsApp for the current dates.",
      actions: [{ label: "Apply online", href: "/college#apply", kind: "primary" }, wa(waMessages.college)],
    }),
  },
  {
    id: "college-docs",
    keywords: ["documents", "document", "what do i need", "id copy", "transcript", "academic record", "certificate", "certified", "qualify", "eligible", "eligibility", "requirement", "requirements"],
    answer: () => ({
      text: `Requirements: ${collegeRequirements.minimum.replace(/^An/, "an")}, and SETA funding. Upload these with the online application: a certified copy of your highest qualification (certified within the last 3 months), a certified copy of your ID, proof of SETA funding if available, and your CV.`,
      actions: [{ label: "Apply online", href: "/college#apply", kind: "primary" }, wa(waMessages.college)],
      followUps: ["How long is it?", "Is it funded?", "When is the next intake?"],
    }),
  },
  {
    id: "location",
    keywords: ["where", "address", "location", "located", "directions", "office", "find you", "map", "hours", "open", "closing", "close", "time", "visit", "sonheuwel", "nelspruit", "mbombela"],
    answer: () => ({
      text: `We're at ${fullAddress}. Office hours: Monday to Thursday 08:00–16:30, Friday 08:00–12:00 and 14:00–16:00. We serve clients across South Africa — from Gauteng to Barberton.`,
      actions: [{ label: "Get directions", href: site.mapsUrl, external: true, kind: "primary" }, { label: "Contact page", href: "/contact", kind: "ghost" }],
    }),
  },
  {
    id: "team",
    keywords: ["who", "team", "suhayl", "ishaq", "partner", "director", "owner", "chartered accountant", "ca(sa)", "qualified", "experience", "about"],
    answer: () => ({
      text: "The firm is led by founder Suhayl Packery CA(SA), a registered IRBA auditor, University of Johannesburg alumnus and PwC-trained, and Ishaq Packery, Head of Risk & Legal with an actuarial background. Established in June 2013 in Nelspruit.",
      actions: [{ label: "Meet the team", href: "/about", kind: "primary" }],
    }),
  },
  {
    id: "accreditation",
    keywords: ["saica", "accredited", "accreditation", "registered", "member", "nafco", "legit", "trust", "registration number"],
    answer: () => ({
      text: `We're members of SAICA, registered with IRBA, registered SARS tax practitioners, accredited CIPC online agents, NAFCO preferred partners and approved auditors for the Department of Education, Mpumalanga. Company registration number: ${site.regNo}.`,
      actions: [{ label: "About the firm", href: "/about", kind: "ghost" }],
    }),
  },
  {
    id: "human",
    keywords: ["human", "person", "someone", "talk", "speak", "call", "phone", "contact", "whatsapp", "email", "reach", "agent"],
    answer: (onCollege) => ({
      text: onCollege
        ? `Happy to connect you with the ${college.name} team. WhatsApp or call ${site.phoneDisplay}, or email ${site.email}.`
        : `Happy to connect you with the team. Call or WhatsApp ${site.phoneDisplay}, or email ${site.email}.`,
      actions: [wa(onCollege ? waMessages.college : waMessages.firm), { label: `Call ${site.phoneDisplay}`, href: site.phoneHref, kind: "ghost" }],
    }),
  },
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "good day", "morning", "afternoon", "salaam", "salam", "howzit", "thanks", "thank you"],
    answer: () => ({
      text: "Hello! I can help with our services, quotes, SARS matters, audits, company registrations or EZ Accounting College. What do you need?",
      followUps: ["Get a quote", "Tax & SARS help", "I need an audit", "EZ College"],
    }),
  },
];

/** Quick-reply chips map straight to intents. */
const chipIntent: Record<string, string> = {
  "Get a quote": "quote", "Tax & SARS help": "tax", "I got a SARS letter": "sars", "I need an audit": "audit",
  "Forensic investigation": "forensic", "Register a company": "company", "BEE certificate": "bee", "Tax clearance": "tax",
  "EZ College": "college", "How do I apply?": "college", "Requirements": "college-docs", "How long is it?": "college-length",
  "Is it funded?": "college-funding", "Job shadowing": "job-shadowing", "When is the next intake?": "college-intake", "Where are you?": "location", "Talk to a person": "human", "Who's the team?": "team",
};

export const starterChips = {
  firm: ["Get a quote", "Tax & SARS help", "I need an audit", "Register a company", "EZ College", "Where are you?", "Talk to a person"],
  college: ["How do I apply?", "Requirements", "How long is it?", "Is it funded?", "Job shadowing", "Talk to a person"],
};

export const greeting = {
  firm: "Hi! I'm Ollie, S Packery's assistant. Ask me about our services, quotes, SARS matters or audits — or pick a topic below.",
  college: "Hi! I'm Ollie. Interested in EZ Accounting College? I can tell you how to apply and what the programme offers.",
};

const norm = (s: string) => ` ${s.toLowerCase().replace(/[^a-z0-9()\- ]+/g, " ").replace(/\s+/g, " ")} `;

export function answer(input: string, onCollege = false): Answer {
  const chip = chipIntent[input];
  if (chip) return intents.find((i) => i.id === chip)!.answer(onCollege);

  const q = norm(input);
  let best: { id: string; score: number } | null = null;
  for (const it of intents) {
    let score = 0;
    for (const k of it.keywords) if (q.includes(` ${k} `) || (k.length > 4 && q.includes(k))) score += k.split(" ").length + (k.length > 6 ? 1 : 0);
    // On the college page, ambiguous questions lean towards the college
    if (onCollege && it.id.startsWith("college")) score *= 2;
    if (!onCollege && it.id.startsWith("college-") && it.id !== "college") score *= 0.5;
    if (score > 0 && (!best || score > best.score)) best = { id: it.id, score };
  }
  if (best && !(best.id === "greeting" && q.trim().split(" ").length > 4)) {
    return intents.find((i) => i.id === best!.id)!.answer(onCollege);
  }

  return {
    text: "That's a great question for our team — I'd rather they answer it properly than guess. Tap below to send it to us on WhatsApp.",
    actions: [{
      label: "Send my question on WhatsApp",
      href: waLink(`${onCollege ? "Good day EZ Accounting College" : "Good day S Packery Inc"}, I have a question: ${input}`),
      external: true, kind: "whatsapp",
    }],
    followUps: onCollege ? starterChips.college.slice(0, 3) : ["Get a quote", "Talk to a person"],
  };
}
