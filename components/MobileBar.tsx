"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Phone, FileText, GraduationCap } from "lucide-react";
import { site, waLink, waMessages } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";
import Owl from "./assistant/Owl";

/** Phone-only action bar with Ollie docked in the middle. Switches to college actions on /college. */
export default function MobileBar() {
  const isCollege = usePathname().startsWith("/college");
  const reduce = useReducedMotion();
  const [nudge, setNudge] = useState(false);

  // a gentle "tap me" pulse on Ollie a few seconds after load
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 5000);
    const u = setTimeout(() => setNudge(false), 11000);
    return () => { clearTimeout(t); clearTimeout(u); };
  }, []);

  const item = "flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-semibold";
  return (
    <motion.nav
      aria-label="Quick actions"
      initial={reduce ? false : { y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.8 }}
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_1fr_4.5rem_1fr_1fr] items-end rounded-2xl border border-white/10 px-1.5 pb-1.5 pt-1 shadow-2xl backdrop-blur md:hidden ${isCollege ? "bg-ez-deep/95" : "bg-navy-950/95"}`}
    >
      <a href={site.phoneHref} className={`${item} text-white`}>
        <Phone className={`h-5 w-5 ${isCollege ? "text-ez-gold" : "text-accent-400"}`} /> Call
      </a>
      <a href={waLink(isCollege ? waMessages.college : waMessages.firm)} target="_blank" rel="noopener noreferrer" className={`${item} text-white`}>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#25D366]"><WhatsAppIcon className="h-3.5 w-3.5 text-white" /></span> WhatsApp
      </a>

      {/* Ollie, raised in the centre */}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("ollie:open"))}
        aria-label="Ask Ollie, our assistant"
        className="relative -mt-9 flex flex-col items-center"
      >
        {nudge && !reduce && <span className="absolute top-2 h-14 w-14 animate-ping rounded-full bg-accent-400/40" aria-hidden />}
        <span className={`relative grid h-16 w-16 place-items-center rounded-full border-4 shadow-lg ${isCollege ? "border-ez-deep bg-emerald-50" : "border-navy-950 bg-slate-50"}`}>
          <Owl size={38} cap={isCollege} wave={nudge} />
        </span>
        <span className="mt-0.5 text-[11px] font-bold text-white">Ask us</span>
      </button>

      {isCollege ? (
        <a href="#apply" className={`${item} col-span-2 mx-1 bg-ez-gold text-ez-deep`}>
          <GraduationCap className="h-5 w-5" /> Apply now
        </a>
      ) : (
        <Link href="/quote" className={`${item} col-span-2 mx-1 bg-accent-500 text-navy-950`}>
          <FileText className="h-5 w-5" /> Get a Quote
        </Link>
      )}
    </motion.nav>
  );
}
