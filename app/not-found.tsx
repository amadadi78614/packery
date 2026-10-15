import Link from "next/link";
import PageHero from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page didn't" highlight="balance." subtitle="The page you're looking for doesn't exist or has moved.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-accent px-8 py-4">Back to home</Link>
        <Link href="/services" className="btn-ghost-light px-8 py-4">Our services</Link>
      </div>
    </PageHero>
  );
}
