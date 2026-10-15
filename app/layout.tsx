import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import AskUs from "@/components/assistant/AskUs";
import "./globals.css";


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.packery.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Chartered Accountants & Registered Auditors, Nelspruit`,
    template: `%s | ${site.name}`,
  },
  description:
    "S Packery Inc. — Where Integrity Balances Every Ledger. IRBA-registered Chartered Accountants & Registered Auditors in Nelspruit (Mbombela): auditing, forensic investigations, taxation, SARS facilitation, BEE, CIPC and business advisory since June 2013.",
  keywords: ["chartered accountants Nelspruit", "auditors Mbombela", "tax practitioner Mpumalanga", "S Packery Inc"],
  openGraph: {
    title: `${site.name} — Chartered Accountants & Registered Auditors`,
    description: "Trusted accounting, tax, audit and advisory in Mpumalanga since 2013.",
    type: "website",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = { themeColor: "#1F2340", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: site.name,
  alternateName: site.legalName,
  foundingDate: "2013-06",
  telephone: site.phoneDisplay,
  email: site.email,
  sameAs: [site.instagramUrl],
  memberOf: site.affiliations.map((a) => ({ "@type": "Organization", name: a.name })),
  address: { "@type": "PostalAddress", streetAddress: "12 de Kock Street, Sonheuwel", addressLocality: "Nelspruit", postalCode: "1200", addressRegion: "Mpumalanga", addressCountry: "ZA" },
  slogan: site.slogan,
  logo: "/brand/spackery-logo.png",
  founder: { "@type": "Person", name: site.partner.name, jobTitle: site.partner.title, hasCredential: "CA(SA)" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBar />
        <AskUs />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
