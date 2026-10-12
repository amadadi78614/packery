"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, FileText } from "lucide-react";
import { site } from "@/lib/site";
import { requestQuote } from "./motion";

export default function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-navy-950/95 p-2 shadow-2xl backdrop-blur md:hidden"
        >
          <a href={site.phoneHref} className="btn py-3 text-white"><Phone className="h-4 w-4 text-gold-400" /> Call</a>
          <button type="button" onClick={() => requestQuote()} className="btn-gold py-3"><FileText className="h-4 w-4" /> Get a Quote</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
