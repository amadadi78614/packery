import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ServiceDetailView from "@/components/ServiceDetailView";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/site";
import { serviceDetails, serviceBySlug } from "@/lib/serviceDetails";

export function generateStaticParams() {
  return Object.values(serviceDetails).map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const id = serviceBySlug(params.slug);
  if (!id) return {};
  const d = serviceDetails[id];
  return { title: d.seoTitle, description: d.metaDescription, alternates: { canonical: `/services/${d.slug}` } };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const id = serviceBySlug(params.slug);
  if (!id) notFound();
  const svc = services.find((s) => s.id === id)!;
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={svc.title}
        subtitle={svc.summary}
        crumbs={[{ label: "Services", href: "/services" }, { label: svc.title }]}
      />
      <ServiceDetailView id={id} />
      <CtaBand />
    </>
  );
}
