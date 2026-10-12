"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between">
        <a href="#top" aria-label="S Packery Inc. home" onClick={() => setOpen(false)}>
          <Logo light={!solid} />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${solid ? "text-slate-600 hover:text-navy-900" : "text-slate-200 hover:text-white"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.phoneHref} className={`hidden items-center gap-2 text-sm font-medium xl:flex ${solid ? "text-navy-900" : "text-white"}`}>
            <Phone className="h-4 w-4 text-gold-500" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a href="#quote" className="btn-gold group py-2.5">Get a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></a>
        </div>

        <button
          type="button"
          className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${solid ? "text-navy-900" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-gold-500 to-gold-300" aria-hidden />
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden border-t border-slate-200 bg-white transition-[max-height] duration-300 ${open ? "max-h-[28rem]" : "max-h-0 border-t-0"}`}
      >
        <nav className="container-site flex flex-col py-4" aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-slate-100 py-3.5 text-base font-medium text-navy-900">
              {n.label}
            </a>
          ))}
          <a href={site.phoneHref} className="flex items-center gap-2 py-4 text-sm font-medium text-navy-900">
            <Phone className="h-4 w-4 text-gold-500" aria-hidden /> {site.phoneDisplay}
          </a>
          <a href="#quote" onClick={() => setOpen(false)} className="btn-gold mb-2">Get a Free Quote</a>
        </nav>
      </div>
    </header>
  );
}
