import Link from "next/link";
import { FileText, ShieldCheck, Scale } from "lucide-react";
import PageHero from "../PageHero";
import PrintButton from "./PrintButton";
import { legalUpdated } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const docs = [
  { href: "/privacy", label: "Privacy Notice", icon: ShieldCheck },
  { href: "/paia", label: "PAIA Manual", icon: FileText },
  { href: "/terms", label: "Website Terms", icon: Scale },
];

export default function LegalLayout({
  eyebrow, title, intro, sections, current,
}: { eyebrow: string; title: string; intro: string; sections: LegalSection[]; current: string }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={intro} crumbs={[{ label: title }]} />
      <section className="py-14 sm:py-20">
        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
          {/* sidebar */}
          <aside className="print:hidden lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Legal documents</p>
            <ul className="mt-3 space-y-1">
              {docs.map(({ href, label, icon: I }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={current === href ? "page" : undefined}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${current === href ? "bg-navy-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    <I className="h-4 w-4" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 hidden text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:block">On this page</p>
            <ol className="mt-3 hidden space-y-1.5 border-l border-slate-200 lg:block">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-0.5 pl-3 text-sm text-slate-600 hover:border-accent-500 hover:text-navy-900">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-6"><PrintButton /></div>
          </aside>

          {/* document */}
          <article className="legal max-w-3xl">
            <p className="text-sm text-slate-500">Last updated: {legalUpdated}</p>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-slate-100 py-8 last:border-0">
                <h2 className="font-display text-2xl font-bold text-navy-900">{i + 1}. {s.title}</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-slate-700">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
