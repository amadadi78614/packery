import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { site, college, fullAddress, infoRegulator } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice (POPIA)",
  description: "How S Packery Inc. and EZ Accounting College collect, use and protect personal information in terms of the Protection of Personal Information Act (POPIA).",
  alternates: { canonical: "/privacy" },
};

const io = site.informationOfficer;
const ul = "list-disc space-y-1.5 pl-5";
const a = "font-semibold text-accent-600 underline underline-offset-2";

const sections: LegalSection[] = [
  {
    id: "who", title: "Who we are",
    body: (
      <>
        <p>
          This notice explains how <strong>{site.name}</strong> ({site.descriptor}{site.regNo ? `, registration number ${site.regNo}` : ""}) and its division{" "}
          <strong>{college.legalName}</strong> (registration number {college.regNo}) (&ldquo;we&rdquo;, &ldquo;us&rdquo;) process personal information
          collected through this website, in line with the Protection of Personal Information Act 4 of 2013 (&ldquo;POPIA&rdquo;).
        </p>
        <p>We are the &ldquo;responsible party&rdquo; for the personal information described here.</p>
        <ul className={ul}>
          <li><strong>Address:</strong> {fullAddress}</li>
          <li><strong>Phone / WhatsApp:</strong> {site.phoneDisplay}</li>
          <li><strong>Email:</strong> <a className={a} href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><strong>Information Officer:</strong> {io.name} ({io.role}) — <a className={a} href={`mailto:${io.email}`}>{io.email}</a></li>
        </ul>
      </>
    ),
  },
  {
    id: "scope", title: "What this notice covers",
    body: (
      <>
        <p>
          It covers personal information collected through this website: the quote request form, the EZ Accounting College application
          form, our WhatsApp, email and phone links, and the &ldquo;Ask us&rdquo; assistant (Ollie).
        </p>
        <p>
          Information we process while delivering professional services to clients (for example accounting, tax and audit work) is
          governed by our engagement letters, professional obligations and our <Link className={a} href="/paia">PAIA Manual</Link>.
        </p>
      </>
    ),
  },
  {
    id: "collect", title: "Personal information we collect",
    body: (
      <>
        <p><strong>Quote requests:</strong> name, email address, phone number, business name (optional), the services you need, the type of client you are, approximate turnover band, timeline and any message you add.</p>
        <p>
          <strong>EZ Accounting College applications:</strong> name, email, phone, town, qualification, institution, year completed, current status,
          motivation and, if you choose to upload it, your CV. Please don&apos;t include your ID number, health information or other special personal
          information in your CV or motivation — we don&apos;t need it at application stage.
        </p>
        <p>
          <strong>WhatsApp:</strong> WhatsApp buttons open WhatsApp (operated by Meta) with a pre-filled message. If you send it, we receive your
          WhatsApp number, name and messages. Meta&apos;s own privacy policy applies to its service.
        </p>
        <p>
          <strong>The &ldquo;Ask us&rdquo; assistant (Ollie):</strong> runs entirely in your browser. Your questions are <em>not</em> sent to or stored by us —
          unless you choose to forward a question to us on WhatsApp.
        </p>
        <p>
          <strong>Technical information:</strong> our hosting provider keeps standard server logs (such as IP address, browser type and time of
          visit) for security and reliability. The site uses temporary browser storage only to remember that Ollie has already greeted you.
          We do not use advertising or tracking cookies.
        </p>
        <p>
          <strong>Google Maps:</strong> the map on our Contact page only loads if you choose to show it. Google may then set its own cookies
          and collect information under Google&apos;s privacy policy.
        </p>
      </>
    ),
  },
  {
    id: "purpose", title: "Why we use it and our lawful basis",
    body: (
      <>
        <ul className={ul}>
          <li><strong>To respond to your enquiry and prepare a quote</strong> — taking steps at your request before a possible engagement (POPIA s11(1)(b)).</li>
          <li><strong>To assess applications to EZ Accounting College</strong> and contact applicants about next steps — with your consent (s11(1)(a)), which you give on the application form.</li>
          <li><strong>To communicate with you</strong> by email, phone or WhatsApp about your enquiry or application — legitimate interest (s11(1)(f)).</li>
          <li><strong>To keep the website secure</strong> and prevent abuse (for example spam protection and rate limiting) — legitimate interest (s11(1)(f)).</li>
          <li><strong>To comply with legal and professional obligations</strong> — s11(1)(c).</li>
        </ul>
        <p>We do not sell personal information, and we do not send direct marketing unless you have asked for it or are an existing client who has not opted out (POPIA s69).</p>
      </>
    ),
  },
  {
    id: "share", title: "Who we share it with",
    body: (
      <>
        <p>We only share personal information where needed for the purposes above, with:</p>
        <ul className={ul}>
          <li><strong>Our people:</strong> staff of {site.name} and {college.name} who need it to respond to you.</li>
          <li><strong>Operators (service providers) acting on our instructions:</strong> our website hosting provider and our email delivery provider, which deliver form submissions to our inbox.</li>
          <li><strong>Google</strong> — only if you load the map, or to display public Google reviews.</li>
          <li><strong>WhatsApp (Meta)</strong> — when you choose to contact us on WhatsApp.</li>
          <li><strong>Authorities</strong> where the law requires it (for example SARS, regulators or a court order).</li>
        </ul>
        <p>Our operators are required to keep the information confidential and secure, and to use it only to provide their service to us (POPIA s20–21).</p>
      </>
    ),
  },
  {
    id: "transfer", title: "Transfers outside South Africa",
    body: (
      <p>
        Our hosting and email delivery providers may store or process information on servers outside South Africa (for example in the
        United States or Europe). We only use providers bound by data-protection terms that offer protection substantially similar to POPIA,
        as required by section 72 of POPIA.
      </p>
    ),
  },
  {
    id: "retention", title: "How long we keep it",
    body: (
      <ul className={ul}>
        <li><strong>Quote enquiries</strong> that don&apos;t lead to an engagement: up to 12 months, then deleted.</li>
        <li><strong>Unsuccessful college applications</strong> (including CVs): up to 12 months, then deleted — unless you ask us to keep you on file for future intakes.</li>
        <li><strong>Clients and learners:</strong> for as long as the law and our professional obligations require.</li>
        <li><strong>Server logs:</strong> kept by our hosting provider for a limited period for security purposes.</li>
      </ul>
    ),
  },
  {
    id: "security", title: "How we protect it",
    body: (
      <p>
        The website uses encrypted connections (HTTPS). Form submissions are checked, protected against spam and delivered only to our
        office inbox. Access to personal information is limited to people who need it, and we review our safeguards regularly (POPIA s19).
        If we believe personal information has been accessed without authorisation, we will notify you and the Information Regulator as
        required by section 22 of POPIA.
      </p>
    ),
  },
  {
    id: "rights", title: "Your rights",
    body: (
      <>
        <p>Under POPIA you may:</p>
        <ul className={ul}>
          <li>ask whether we hold your personal information and request a copy (s23);</li>
          <li>ask us to correct or delete information that is inaccurate, out of date, excessive or unlawfully obtained (s24);</li>
          <li>object to processing based on legitimate interest, and object to direct marketing (s11(3));</li>
          <li>withdraw consent at any time — this does not affect processing that took place before you withdrew it (s11(2)(b));</li>
          <li>lodge a complaint with the Information Regulator (s74).</li>
        </ul>
        <p>
          To exercise these rights, contact our Information Officer at <a className={a} href={`mailto:${io.email}`}>{io.email}</a>. We may need to confirm
          your identity first. Requests for records may also be made under PAIA — see our <Link className={a} href="/paia">PAIA Manual</Link>.
        </p>
      </>
    ),
  },
  {
    id: "regulator", title: "Complaints to the Information Regulator",
    body: (
      <>
        <p>We&apos;d like the chance to resolve any concern first. You may also contact the Information Regulator:</p>
        <ul className={ul}>
          <li><strong>Address:</strong> {infoRegulator.address}</li>
          <li><strong>POPIA complaints:</strong> <a className={a} href={`mailto:${infoRegulator.popiaComplaints}`}>{infoRegulator.popiaComplaints}</a></li>
          <li><strong>General enquiries:</strong> <a className={a} href={`mailto:${infoRegulator.enquiries}`}>{infoRegulator.enquiries}</a></li>
          <li><strong>Phone:</strong> {infoRegulator.tollFree} (toll free) or {infoRegulator.phone}</li>
          <li><strong>Website:</strong> <a className={a} href={infoRegulator.website} target="_blank" rel="noopener noreferrer">inforegulator.org.za</a></li>
        </ul>
      </>
    ),
  },
  {
    id: "children", title: "Children",
    body: (
      <p>
        This website is not directed at children under 18, and we do not knowingly collect their personal information online. EZ Accounting
        College&apos;s programme is aimed at graduates.
      </p>
    ),
  },
  {
    id: "changes", title: "Changes to this notice",
    body: <p>We may update this notice from time to time. The latest version is always published on this page with its &ldquo;last updated&rdquo; date.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      current="/privacy"
      eyebrow="Legal"
      title="Privacy Notice"
      intro="How we collect, use and protect your personal information, in terms of the Protection of Personal Information Act (POPIA)."
      sections={sections}
    />
  );
}
