import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import MagazineViewer from "@/components/MagazineViewer";
import { issues } from "@/lib/magazine";

export const metadata: Metadata = {
  title: "Magazine",
  description:
    "Read the S Packery Inc. magazine online: practical accounting, tax and business insights from Nelspruit chartered accountants and registered auditors.",
};

export default function MagazinePage() {
  const [latest, ...earlier] = issues;
  return (
    <>
      <PageHero
        eyebrow="Magazine"
        title="S Packery"
        highlight="Magazine."
        subtitle="Practical accounting and business insights from our team. Read each issue online or download it as a PDF."
        crumbs={[{ label: "Magazine" }]}
      />
      <section className="py-16 sm:py-24">
        <div className="container-site">
          <MagazineViewer issue={latest} featured />
        </div>
      </section>
      {earlier.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24">
          <div className="container-site space-y-20">
            <h2 className="h-section">Earlier issues</h2>
            {earlier.map((issue) => <MagazineViewer key={issue.slug} issue={issue} />)}
          </div>
        </section>
      )}
    </>
  );
}
