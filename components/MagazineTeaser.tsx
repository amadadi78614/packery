import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { latestIssue } from "@/lib/magazine";
import { Reveal } from "./motion";

/** Home page: latest magazine issue. */
export default function MagazineTeaser() {
  const issue = latestIssue;
  return (
    <section className="py-20 sm:py-24" aria-label="Latest magazine issue">
      <div className="container-site">
        <div className="grid items-center gap-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-10 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr]">
          <Reveal>
            <Link href="/magazine" className="group mx-auto block w-48 overflow-hidden rounded-xl shadow-xl shadow-navy-900/20 ring-1 ring-slate-200 md:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={issue.pages[0].thumb} alt={`Magazine issue ${issue.number} cover`} width={480} height={640} loading="lazy" className="h-auto w-full transition duration-500 group-hover:scale-[1.04]" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Our magazine</span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Issue {issue.number} · {issue.date}</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{issue.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{issue.summary}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/magazine" className="btn-navy group">
                <BookOpen className="h-4 w-4" /> Read the latest issue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={issue.pdf} download className="btn border border-slate-300 text-navy-900 hover:border-navy-900">Download PDF</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
