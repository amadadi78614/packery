import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { site, college, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms of Use",
  description: "Terms of use for the S Packery Inc. website, including our legal disclosures in terms of the Electronic Communications and Transactions Act.",
  alternates: { canonical: "/terms" },
};

const ul = "list-disc space-y-1.5 pl-5";
const a = "font-semibold text-accent-600 underline underline-offset-2";

const sections: LegalSection[] = [
  {
    id: "disclosures", title: "Who we are (ECT Act disclosures)",
    body: (
      <>
        <p>The following information is provided in terms of section 43 of the Electronic Communications and Transactions Act 25 of 2002:</p>
        <ul className={ul}>
          <li><strong>Full name:</strong> {site.name}</li>
          <li><strong>Registered name:</strong> {site.legalName}</li>
          <li><strong>Legal status:</strong> {site.legalStatus}</li>
          {site.regNo && <li><strong>Registration number:</strong> {site.regNo}</li>}
          <li><strong>Director:</strong> {site.partner.name}, CA(SA)</li>
          <li><strong>Physical and service address:</strong> {fullAddress}</li>
          <li><strong>Telephone / WhatsApp:</strong> {site.phoneDisplay}</li>
          <li><strong>Email:</strong> <a className={a} href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><strong>Website:</strong> www.packery.co.za</li>
          <li><strong>Professional bodies:</strong> member of the South African Institute of Chartered Accountants (SAICA); registered with the Independent Regulatory Board for Auditors (IRBA); registered tax practitioners with SARS. We subscribe to the SAICA Code of Professional Conduct and the IRBA Code of Professional Conduct for Registered Auditors.</li>
          <li><strong>Division:</strong> {college.legalName}, registration number {college.regNo}</li>
        </ul>
      </>
    ),
  },
  {
    id: "use", title: "Using this website",
    body: (
      <p>
        By using this website you agree to these terms. Please don&apos;t use the site in a way that is unlawful, that could damage it, or that
        interferes with other people&apos;s use of it — including sending spam or automated submissions through our forms.
      </p>
    ),
  },
  {
    id: "advice", title: "Information is not professional advice",
    body: (
      <>
        <p>
          Content on this website — including service descriptions, FAQs and answers from our &ldquo;Ask us&rdquo; assistant — is general information only.
          It is not accounting, tax, audit, legal or financial advice, and should not be relied on as such. Tax law and regulations change often;
          always consult us about your specific circumstances.
        </p>
        <p>
          Using the website, submitting a quote request or sending us a WhatsApp message does not create a client relationship. A
          professional engagement starts only once we have accepted it in a signed engagement letter.
        </p>
      </>
    ),
  },
  {
    id: "quotes", title: "Quotes and applications",
    body: (
      <p>
        Quote requests are invitations for us to propose a scope and fee; any quote we send is subject to our engagement terms and the
        professional acceptance procedures we are required to follow. Submitting an application to {college.name} does not guarantee
        acceptance into the programme.
      </p>
    ),
  },
  {
    id: "ip", title: "Intellectual property",
    body: (
      <p>
        The {site.name} and {college.name} names, logos, text and design on this website belong to us or our licensors. You may view and
        print pages for personal reference, but may not copy, republish or use them commercially without our written permission.
      </p>
    ),
  },
  {
    id: "links", title: "Links to other websites",
    body: (
      <p>
        We link to third-party services such as WhatsApp, Google Maps, the Information Regulator and SARS for your convenience. We are not
        responsible for their content, availability or privacy practices.
      </p>
    ),
  },
  {
    id: "liability", title: "Limitation of liability",
    body: (
      <p>
        We take care to keep this website accurate and available, but we do not guarantee that it will be error-free or uninterrupted. To the
        extent permitted by law — including the Consumer Protection Act 68 of 2008 where it applies — we are not liable for loss arising from
        reliance on general information on this website or from its unavailability.
      </p>
    ),
  },
  {
    id: "privacy", title: "Privacy",
    body: (
      <p>
        Our <Link className={a} href="/privacy">Privacy Notice</Link> explains how we handle personal information, and our{" "}
        <Link className={a} href="/paia">PAIA Manual</Link> explains how to request access to records.
      </p>
    ),
  },
  {
    id: "law", title: "Governing law and changes",
    body: (
      <p>
        These terms are governed by the laws of the Republic of South Africa. We may update them from time to time; the version published
        on this page applies.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      current="/terms"
      eyebrow="Legal"
      title="Website Terms of Use"
      intro="The terms that apply when you use this website, and the legal information we are required to publish about ourselves."
      sections={sections}
    />
  );
}
