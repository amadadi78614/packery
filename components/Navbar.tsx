"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone, ArrowRight, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { nav, site, services } from "@/lib/site";
import { serviceDetails } from "@/lib/serviceDetails";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mobileSvc, setMobileSvc] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menus on navigation
  useEffect(() => { setOpen(false); setMenu(false); setMobileSvc(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const solid = scrolled || open;
  const isCollege = pathname.startsWith("/college");
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const openMenu = () => { clearTimeout(closeTimer.current); setMenu(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setMenu(false), 140); };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between">
        <Link href="/" aria-label="S Packery Inc. home">
          <Logo light={!solid} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((n) => {
            const active = isActive(n.href);
            const color = solid
              ? active ? "text-navy-900" : "text-slate-600 hover:text-navy-900"
              : active ? "text-white" : "text-slate-300 hover:text-white";
            if (n.dropdown) {
              return (
                <div key={n.href} className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                  <Link
                    href={n.href}
                    aria-haspopup="true"
                    aria-expanded={menu}
                    onFocus={openMenu}
                    className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${color}`}
                  >
                    {n.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menu ? "rotate-180" : ""}`} />
                    {active && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent-500" />}
                  </Link>
                  <AnimatePresence>
                    {menu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-navy-900/15">
                          {services.map((s) => {
                            const I = s.icon;
                            return (
                              <Link
                                key={s.id}
                                href={`/services/${serviceDetails[s.id].slug}`}
                                onBlur={closeMenu}
                                onFocus={openMenu}
                                className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                              >
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-navy-900 text-accent-400 transition-transform group-hover:scale-110">
                                  <I className="h-5 w-5" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-navy-900">{s.title}</span>
                                  <span className="block text-xs leading-snug text-slate-500">{s.tagline}</span>
                                </span>
                              </Link>
                            );
                          })}
                          <Link
                            href="/services"
                            className="col-span-2 mt-1 flex items-center justify-between rounded-xl bg-navy-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
                          >
                            View all services <ArrowRight className="h-4 w-4 text-accent-400" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link key={n.href} href={n.href} className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${color}`}>
                {n.label}
                {active && <motion.span layoutId="nav-dot" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-accent-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={site.phoneHref} className={`hidden items-center gap-2 text-sm font-medium xl:flex ${solid ? "text-navy-900" : "text-white"}`}>
            <Phone className="h-4 w-4 text-accent-500" aria-hidden />
            {site.phoneDisplay}
          </a>
          {isCollege ? (
            <a href="#apply" className="btn group bg-ez-gold py-2.5 text-ez-deep hover:bg-ez-light">
              Apply now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          ) : (
            <Link href="/quote" className="btn-accent group py-2.5">
              Get a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          )}
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

      <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden" aria-hidden><motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-gradient-to-r from-accent-500 to-accent-300" /></div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden"
          >
            <nav className="container-site flex flex-col py-4" aria-label="Mobile">
              {nav.map((n) =>
                n.dropdown ? (
                  <div key={n.href} className="border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setMobileSvc((v) => !v)}
                      aria-expanded={mobileSvc}
                      className={`flex w-full items-center justify-between py-3.5 text-base font-medium ${isActive(n.href) ? "text-accent-600" : "text-navy-900"}`}
                    >
                      {n.label} <ChevronDown className={`h-4 w-4 transition-transform ${mobileSvc ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSvc && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="mb-3 space-y-1 rounded-xl bg-slate-50 p-2">
                            <Link href="/services" className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-navy-900">All services</Link>
                            {services.map((s) => (
                              <Link key={s.id} href={`/services/${serviceDetails[s.id].slug}`} className="block rounded-lg px-3 py-2.5 text-sm text-slate-700">
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`border-b border-slate-100 py-3.5 text-base font-medium ${isActive(n.href) ? "text-accent-600" : "text-navy-900"}`}
                  >
                    {n.label}
                  </Link>
                )
              )}
              <a href={site.phoneHref} className="flex items-center gap-2 py-4 text-sm font-medium text-navy-900">
                <Phone className="h-4 w-4 text-accent-500" aria-hidden /> {site.phoneDisplay}
              </a>
              {isCollege ? (
                <a href="#apply" onClick={() => setOpen(false)} className="btn mb-2 bg-ez-gold text-ez-deep">Apply to EZ College</a>
              ) : (
                <Link href="/quote" className="btn-accent mb-2">Get a Free Quote</Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
