import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import { site } from "@/lib/site";
import "./globals.css";


export const metadata: Metadata = {
  title: `${site.name} | Chartered Accountants & Registered Auditors, Mbombela`,
  description:
    "S Packery Inc. — Chartered Accountants and Registered Auditors in Nelspruit (Mbombela), Mpumalanga. Accounting, taxation, auditing and business services since June 2013.",
  keywords: ["chartered accountants Nelspruit", "auditors Mbombela", "tax practitioner Mpumalanga", "S Packery Inc"],
  openGraph: {
    title: `${site.name} — Chartered Accountants & Registered Auditors`,
    description: "Trusted accounting, tax, audit and advisory in Mpumalanga since 2013.",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = { themeColor: "#0A1A33", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  alternateName: site.legalName,
  foundingDate: "2013-06",
  telephone: site.phoneDisplay,
  address: { "@type": "PostalAddress", addressLocality: "Mbombela", addressRegion: "Mpumalanga", addressCountry: "ZA" },
  founder: { "@type": "Person", name: site.partner.name, jobTitle: site.partner.title, alumniOf: site.partner.education },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
