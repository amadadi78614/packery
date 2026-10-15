/* Long-form content for each service page. Sourced from the S Packery Inc Business Profile,
   Auditing brochures and Postcard. FAQ answers are general and avoid fee or turnaround promises. */

export type ServiceDetail = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  headline: string;
  intro: string[];
  included: { title: string; body: string }[];
  forWho: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // service ids
};

export const serviceDetails: Record<string, ServiceDetail> = {
  accounting: {
    slug: "accounting",
    seoTitle: "Accounting Services in Nelspruit (Mbombela)",
    metaDescription:
      "Monthly management accounts, annual financial statements, personal and business accounting from S Packery Inc., Chartered Accountants in Nelspruit.",
    headline: "Clear, compliant numbers that tell you exactly where your business stands.",
    intro: [
      "Reliable financial reporting is the foundation of every good business decision. S Packery Inc. keeps your records accurate and up to date, and turns them into clear reports you can actually use.",
      "From monthly management accounts to the compilation of annual financial statements, our work reflects your business's true financial health — essential for decision-making, audits, lenders and growth.",
    ],
    included: [
      { title: "Monthly management accounts", body: "Timely monthly reporting so you can track performance, cash flow and costs as they happen — not a year later." },
      { title: "Annual Financial Statements", body: "Compilation of clear, compliant annual financial statements that satisfy SARS, CIPC, banks and stakeholders." },
      { title: "Personal & business accounting", body: "Accounting support for individuals, sole proprietors and companies of every size." },
      { title: "Business & annual operating plans", body: "Structured business plans and annual operating plans that set targets and keep your strategy on track." },
      { title: "Administrative costing", body: "Understand what your operations really cost so you can price correctly and protect your margins." },
      { title: "Pastel MBO advisors", body: "Registered Pastel MBO advisors — we help set up and get the most out of your accounting software." },
    ],
    forWho: ["Owner-managed businesses", "Growing SMEs needing monthly reporting", "Companies preparing for audit or finance", "Individuals with business or rental income"],
    faqs: [
      { q: "Can you take over my books from another accountant?", a: "Yes. We'll collect your existing records, review where things stand and set up a schedule going forward so nothing falls through the cracks." },
      { q: "Do I need monthly accounts or just annual statements?", a: "It depends on your size and goals. Monthly management accounts give you control during the year; at minimum every company needs annual financial statements. We'll recommend what fits." },
      { q: "Which accounting software do you work with?", a: "We are registered Pastel MBO advisors and can work with the system you already use." },
    ],
    related: ["taxation", "auditing"],
  },

  taxation: {
    slug: "taxation",
    seoTitle: "Tax Practitioners & SARS Facilitation in Nelspruit",
    metaDescription:
      "Registered SARS tax practitioners in Nelspruit: company and individual tax, capital gains tax, tax clearance certificates, SARS facilitation and negotiations.",
    headline: "Registered SARS tax practitioners who protect your interests.",
    intro: [
      "Tax is where small mistakes become expensive. As registered SARS tax practitioners, S Packery Inc. handles your business, personal and capital gains tax properly and on time.",
      "When SARS comes knocking, our expert facilitation streamlines submissions, resolves disputes and negotiates outcomes that protect your business.",
    ],
    included: [
      { title: "Company income tax", body: "Preparation and submission of company tax returns and provisional tax, aligned with your financial statements." },
      { title: "Individual income tax", body: "Personal tax returns for salaried individuals, business owners and those with investment or rental income." },
      { title: "Capital gains tax", body: "Accurate CGT computations and submissions when you dispose of property, shares or other assets." },
      { title: "SARS facilitation & negotiations", body: "We manage SARS interactions on your behalf — queries, audits, disputes and payment arrangements." },
      { title: "Tax clearance certificates", body: "Tax compliance status and clearance certificates for tenders, foreign investment and other requirements." },
      { title: "Statutory returns & online submissions", body: "Timely submission of all required returns to keep you fully compliant and avoid penalties." },
    ],
    forWho: ["Companies and close corporations", "Business owners and professionals", "Individuals with complex returns", "Anyone who has received a SARS letter or audit"],
    faqs: [
      { q: "I've received a letter from SARS. Can you help?", a: "Yes. SARS facilitation and negotiation is a core service — send us the correspondence and we'll advise on the next steps and deal with SARS on your behalf." },
      { q: "Can you get me a tax clearance certificate for a tender?", a: "We can assist with your tax compliance status and clearance requirements, including resolving any outstanding issues that block compliance." },
      { q: "Are you registered with SARS?", a: "Yes — we are registered tax practitioners with SARS." },
    ],
    related: ["accounting", "business"],
  },

  auditing: {
    slug: "auditing",
    seoTitle: "Registered Auditors & Forensic Audits in Nelspruit",
    metaDescription:
      "IRBA-registered auditing firm in Nelspruit. Statutory audits, forensic investigations and auditing, approved auditors for the Department of Education, Mpumalanga.",
    headline: "Independent audits and forensic investigations you — and your stakeholders — can rely on.",
    intro: [
      "S Packery Inc. is a specialised auditing firm registered with the Independent Regulatory Board for Auditors (IRBA). Our founder is the lead audit partner on assurance engagements.",
      "We are approved on the list of auditors for the Department of Education, Mpumalanga, and act as consulting auditors to government departments — bringing technical mastery and unwavering ethics to every engagement.",
    ],
    included: [
      { title: "Statutory audits", body: "Independent audits that give owners, lenders, regulators and boards confidence in your financial statements." },
      { title: "Forensic investigations & auditing", body: "Thorough, objective analysis to uncover financial irregularities, ensure accountability and support legal or regulatory action where needed." },
      { title: "Government & public sector", body: "Approved auditors for the Department of Education, Mpumalanga, and consulting auditors to government departments." },
      { title: "Tender submission assessment", body: "Experience across automotive, mining, higher education and retail, applied to assessing and analysing tender submissions." },
      { title: "Assurance engagements", body: "Assurance work led by a Chartered Accountant and registered IRBA auditor." },
      { title: "Accounting & auditing", body: "Reliable financial reporting and audits under one roof, to keep your business compliant and informed." },
    ],
    forWho: ["Companies requiring a statutory audit", "Schools and education bodies", "Government departments and public entities", "Boards and owners who suspect irregularities"],
    faqs: [
      { q: "Does my company need an audit?", a: "It depends on factors such as your public interest score and your Memorandum of Incorporation. Some companies need an audit, others an independent review. We'll assess your position and advise." },
      { q: "Are you registered auditors?", a: "Yes. S Packery Inc. is registered with IRBA, and our lead audit partner is a Chartered Accountant (SA) and registered IRBA auditor." },
      { q: "When should I consider a forensic investigation?", a: "When you suspect fraud, theft, unexplained losses or financial irregularities. A forensic audit establishes the facts objectively and can support legal or regulatory action." },
    ],
    related: ["accounting", "business"],
  },

  business: {
    slug: "business-services",
    seoTitle: "Company Registration, BEE & Business Advisory in Nelspruit",
    metaDescription:
      "Company and CC registrations, CIPC filings, BEE verification, business valuations, legal agreements and business advisory from S Packery Inc., Nelspruit.",
    headline: "Start right, stay compliant and grow with confidence.",
    intro: [
      "From registering your company to planning its next stage of growth, S Packery Inc. provides end-to-end business support under one roof.",
      "As accredited online agents for CIPC, we handle registrations and filings quickly and correctly — and our advisory team helps you navigate challenges, optimise operations and unlock growth.",
    ],
    included: [
      { title: "Company & CC registration", body: "Fast, compliant setup of companies — including shelf companies — handled end-to-end to get you trading smoothly." },
      { title: "CIPC services", body: "Accredited online agents for CIPC: annual returns, amendments and statutory registrations." },
      { title: "BEE verification & accreditation", body: "BEE verification certification so you can compete for contracts and tenders." },
      { title: "Business valuations", body: "Comprehensive business valuations for sales, buy-ins, funding, estate and restructuring purposes." },
      { title: "Legal agreements", body: "Drafting of legal documents and agreements, including lease and rental agreements." },
      { title: "Business analysis & advisory", body: "Insightful analysis and strategic guidance to drive smarter decisions, improve performance and support sustainable growth." },
    ],
    forWho: ["New businesses and start-ups", "Companies bidding for tenders", "Owners selling, buying or restructuring", "Businesses that need a strategic sounding board"],
    faqs: [
      { q: "Can you register my company for me?", a: "Yes. As accredited CIPC online agents we handle company and shelf company registrations end-to-end." },
      { q: "Do you help with BEE certificates?", a: "Yes — we provide BEE verification certification and can advise on what your business needs for tenders." },
      { q: "Do you only work with large companies?", a: "No. Our clients range from large corporates to small businesses and individuals, all with a personalised service." },
    ],
    related: ["taxation", "accounting"],
  },
};

export const serviceSlug = (id: string) => serviceDetails[id]?.slug ?? id;
export const serviceBySlug = (slug: string) => Object.entries(serviceDetails).find(([, d]) => d.slug === slug)?.[0];
