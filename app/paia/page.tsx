import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { site, college, fullAddress, infoRegulator } from "@/lib/site";

export const metadata: Metadata = {
  title: "PAIA Manual",
  description: "PAIA Manual of S Packery Inc. and EZ Accounting College (Pty) Ltd, prepared in terms of section 51 of the Promotion of Access to Information Act 2 of 2000.",
  alternates: { canonical: "/paia" },
};

const io = site.informationOfficer;
const ul = "list-disc space-y-1.5 pl-5";
const a = "font-semibold text-accent-600 underline underline-offset-2";
const th = "border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500";
const td = "border-b border-slate-100 px-4 py-3 align-top text-sm";

const records: [string, string][] = [
  ["Company / statutory", "Memorandum of Incorporation, CIPC records, registers of directors, minutes and resolutions"],
  ["Financial", "Annual financial statements, accounting records, management accounts, banking records, asset registers"],
  ["Tax", "Income tax, VAT, PAYE and other SARS records and correspondence"],
  ["Human resources", "Employment contracts, payroll records, leave records, disciplinary records, skills development and employment equity records"],
  ["Clients", "Engagement letters, correspondence, client records and working papers — subject to professional confidentiality and the protection of third-party and commercial information"],
  ["Suppliers and operators", "Contracts, invoices and service-level agreements"],
  ["Regulatory and professional", "SAICA, IRBA and SARS registrations, CIPC accreditation, professional indemnity and quality-control records"],
  ["EZ Accounting College", "Applications, learner records, programme agreements, SETA and funding records, partnership agreements"],
  ["Information technology", "Systems documentation, licences, security and access records"],
  ["Marketing and public", "Brochures, website content and published materials (freely available — see section 4)"],
];

const popia: [string, string, string][] = [
  ["Clients and prospective clients", "Names, contact details, ID/registration numbers, financial and tax information, correspondence", "Providing accounting, tax, audit and advisory services; compliance with law and professional standards"],
  ["College applicants and learners", "Names, contact details, ID copies, qualifications, CVs, SETA funding records, programme records", "Assessing applications; running the AT(SA) programme; SETA funding and reporting"],
  ["Employees and job applicants", "Personal and contact details, ID numbers, qualifications, banking and payroll information, tax numbers", "Employment, payroll, tax and labour-law compliance"],
  ["Suppliers and operators", "Contact details, company and banking information, contracts", "Procurement and contract management"],
  ["Website visitors", "Enquiry form details; technical server logs", "Responding to enquiries; website security"],
];

const sections: LegalSection[] = [
  {
    id: "intro", title: "Introduction",
    body: (
      <>
        <p>
          This manual is published in terms of section 51 of the Promotion of Access to Information Act 2 of 2000 (&ldquo;PAIA&rdquo;) and
          regulation 4 of the POPIA Regulations. It explains how to request access to records held by:
        </p>
        <ul className={ul}>
          <li><strong>{site.legalName}</strong> — {site.legalStatus}{site.regNo ? `, registration number ${site.regNo}` : ""}; {site.descriptor}; and</li>
          <li><strong>{college.legalName}</strong> — registration number {college.regNo}, a division of {site.name}.</li>
        </ul>
        <p>Both are private bodies as defined in PAIA.</p>
      </>
    ),
  },
  {
    id: "contact", title: "Contact details of the head and Information Officer",
    body: (
      <ul className={ul}>
        <li><strong>Head of the private body / Information Officer:</strong> {io.name} ({io.role})</li>
        <li><strong>Information Regulator registration number:</strong> {io.registrationNo} (registered {io.registeredOn})</li>
        <li><strong>Physical address:</strong> {fullAddress}</li>
        <li><strong>Telephone:</strong> {site.phoneDisplay}</li>
        <li><strong>Email:</strong> <a className={a} href={`mailto:${io.email}`}>{io.email}</a></li>
        <li><strong>Website:</strong> www.packery.co.za</li>
      </ul>
    ),
  },
  {
    id: "guide", title: "The Information Regulator's PAIA Guide",
    body: (
      <>
        <p>
          The Information Regulator has published a Guide on how to use PAIA, available in all official languages. It explains your rights
          under PAIA and POPIA and how to exercise them. You can get it from the{" "}
          <a className={a} href={infoRegulator.paiaPage} target="_blank" rel="noopener noreferrer">Information Regulator&apos;s website</a>, or inspect a copy at our office during office hours.
        </p>
        <ul className={ul}>
          <li><strong>Information Regulator:</strong> {infoRegulator.address}</li>
          <li><strong>Email:</strong> <a className={a} href={`mailto:${infoRegulator.enquiries}`}>{infoRegulator.enquiries}</a> · <strong>Phone:</strong> {infoRegulator.phone} or {infoRegulator.tollFree}</li>
        </ul>
      </>
    ),
  },
  {
    id: "automatic", title: "Records available without a request",
    body: (
      <p>
        Brochures, our company profile and the information published on this website are freely available without a formal PAIA request.
        Contact us at <a className={a} href={`mailto:${site.email}`}>{site.email}</a> for copies.
      </p>
    ),
  },
  {
    id: "legislation", title: "Records kept in terms of other legislation",
    body: (
      <>
        <p>We keep records as required by legislation that applies to us, including (where applicable):</p>
        <ul className={`${ul} sm:columns-2`}>
          <li>Companies Act 71 of 2008</li>
          <li>Auditing Profession Act 26 of 2005</li>
          <li>Income Tax Act 58 of 1962</li>
          <li>Value-Added Tax Act 89 of 1991</li>
          <li>Tax Administration Act 28 of 2011</li>
          <li>Basic Conditions of Employment Act 75 of 1997</li>
          <li>Labour Relations Act 66 of 1995</li>
          <li>Employment Equity Act 55 of 1998</li>
          <li>Skills Development Act 97 of 1998</li>
          <li>Unemployment Insurance Act 63 of 2001</li>
          <li>Compensation for Occupational Injuries and Diseases Act 130 of 1993</li>
          <li>Broad-Based Black Economic Empowerment Act 53 of 2003</li>
          <li>Protection of Personal Information Act 4 of 2013</li>
          <li>Promotion of Access to Information Act 2 of 2000</li>
        </ul>
      </>
    ),
  },
  {
    id: "categories", title: "Categories of records held",
    body: (
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[32rem] border-collapse">
          <thead><tr><th className={th}>Category</th><th className={th}>Examples</th></tr></thead>
          <tbody>
            {records.map(([c, e]) => (
              <tr key={c}><td className={`${td} font-semibold text-navy-900`}>{c}</td><td className={`${td} text-slate-600`}>{e}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "request", title: "How to request access to a record",
    body: (
      <>
        <ol className="list-decimal space-y-2 pl-5">
          <li>
            Complete <strong>Form 2 — Request for Access to Record</strong> (regulation 7 of the PAIA Regulations), available on the{" "}
            <a className={a} href={infoRegulator.paiaPage} target="_blank" rel="noopener noreferrer">Information Regulator&apos;s website</a> or from our office.
          </li>
          <li>
            Describe the record you want, the form of access (e.g. a copy or inspection) and — because we are a private body — the right you
            want to exercise or protect, and why the record is needed for it (section 53 of PAIA).
          </li>
          <li>Attach proof of identity and, if you act for someone else, proof of your authority.</li>
          <li>
            Send it to the Information Officer at <a className={a} href={`mailto:${io.email}`}>{io.email}</a> (subject &ldquo;PAIA Request&rdquo;) or deliver
            it to {fullAddress}.
          </li>
          <li>
            We will decide within <strong>30 days</strong> and tell you the outcome in writing. This period may be extended once by up to 30 days
            in the circumstances allowed by section 57 of PAIA; we will tell you if it is.
          </li>
        </ol>
        <p>
          Access may be refused on the grounds set out in Chapter 4 of Part 3 of PAIA — for example to protect the privacy of third parties,
          confidential commercial information of a third party, client confidentiality, or legally privileged records. If we refuse, we will give
          reasons. There is no internal appeal for private bodies: you may complain to the Information Regulator
          (<a className={a} href={`mailto:${infoRegulator.paiaComplaints}`}>{infoRegulator.paiaComplaints}</a>) or apply to court.
        </p>
      </>
    ),
  },
  {
    id: "fees", title: "Fees",
    body: (
      <ul className={ul}>
        <li>A <strong>request fee</strong> and <strong>access fees</strong> apply as prescribed in Annexure B of the PAIA Regulations, 2021. The request fee is payable before we process the request (personal requesters asking for their own records are exempt from it).</li>
        <li>If searching for and preparing the record will take more than six hours, we may ask for a deposit of up to one third of the access fee.</li>
        <li>We may withhold a record until the fees have been paid. You may apply to court against the payment of a request fee or deposit.</li>
      </ul>
    ),
  },
  {
    id: "popia", title: "Processing of personal information (POPIA)",
    body: (
      <>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[40rem] border-collapse">
            <thead><tr><th className={th}>Data subjects</th><th className={th}>Information processed</th><th className={th}>Purpose</th></tr></thead>
            <tbody>
              {popia.map(([d, i, p]) => (
                <tr key={d}><td className={`${td} font-semibold text-navy-900`}>{d}</td><td className={`${td} text-slate-600`}>{i}</td><td className={`${td} text-slate-600`}>{p}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className={ul}>
          <li><strong>Recipients:</strong> our staff; SARS, CIPC, SETAs, regulators and professional bodies where required; banks; and operators such as IT, hosting and email providers.</li>
          <li><strong>Transborder flows:</strong> some operators (such as website hosting and email delivery) may store information outside South Africa, subject to the safeguards in section 72 of POPIA.</li>
          <li><strong>Security measures:</strong> access controls, encrypted connections, password-protected systems, backups and confidentiality obligations on staff and operators.</li>
        </ul>
        <p>See our <Link className={a} href="/privacy">Privacy Notice</Link> for how we handle information collected through this website.</p>
      </>
    ),
  },
  {
    id: "availability", title: "Availability of this manual",
    body: (
      <p>
        This manual is available on this website and at our office at {fullAddress} for inspection during office hours, free of charge.
        A copy can also be provided to the Information Regulator on request.
      </p>
    ),
  },
];

export default function PaiaPage() {
  return (
    <LegalLayout
      current="/paia"
      eyebrow="Legal"
      title="PAIA Manual"
      intro="Prepared in terms of section 51 of the Promotion of Access to Information Act 2 of 2000, for S Packery Inc. and EZ Accounting College (Pty) Ltd."
      sections={sections}
    />
  );
}
