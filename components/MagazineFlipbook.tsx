"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import type { MagazineIssue } from "@/lib/magazine";

type Flip = import("page-flip/dist/js/page-flip.module.js").PageFlip;

/** Full-screen page-turning reader. Desktop: two-page spreads with the cover on its own. Phone: one page at a time. */
export default function MagazineFlipbook({ issue, startPage = 0, onClose }: { issue: MagazineIssue; startPage?: number; onClose: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);
  const flip = useRef<Flip | null>(null);
  const [page, setPage] = useState(startPage);
  const [size, setSize] = useState<{ w: number; h: number; spread: boolean } | null>(null);
  const total = issue.pages.length;

  // Work out page size from the space available (pages are roughly 3:4).
  useEffect(() => {
    const measure = () => {
      const el = stage.current;
      if (!el) return;
      const maxH = el.clientHeight - 16;
      const maxW = el.clientWidth - 16;
      const spread = maxW >= 760; // two pages side by side on wide screens
      const ratio = 3 / 4;
      let h = maxH;
      let w = h * ratio;
      const needed = spread ? w * 2 : w;
      if (needed > maxW) { w = spread ? maxW / 2 : maxW; h = w / ratio; }
      setSize({ w: Math.floor(w), h: Math.floor(h), spread });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Build the flipbook once the size is known (rebuilt if the window size changes a lot).
  useEffect(() => {
    if (!size || !book.current) return;
    let cancelled = false;
    let instance: Flip | null = null;
    import("page-flip/dist/js/page-flip.module.js").then(({ PageFlip }) => {
      if (cancelled || !book.current) return;
      const holder = document.createElement("div");
      holder.style.width = "100%";
      holder.style.height = "100%";
      book.current.innerHTML = "";
      book.current.appendChild(holder);
      issue.pages.forEach((p, i) => {
        const div = document.createElement("div");
        div.className = "mag-page";
        div.dataset.density = i === 0 || i === total - 1 ? "hard" : "soft";
        const img = document.createElement("img");
        img.src = p.src;
        img.alt = p.title;
        img.draggable = false;
        div.appendChild(img);
        holder.appendChild(div);
      });
      instance = new PageFlip(holder, {
        width: size.w,
        height: size.h,
        size: "fixed",
        showCover: true,
        usePortrait: !size.spread,
        maxShadowOpacity: 0.45,
        mobileScrollSupport: false,
        flippingTime: 700,
        startPage,
      });
      instance.loadFromHTML(holder.querySelectorAll<HTMLElement>(".mag-page"));
      instance.on("flip", (e) => setPage(Number(e.data)));
      flip.current = instance;
      setPage(instance.getCurrentPageIndex());
    });
    return () => {
      cancelled = true;
      try { instance?.destroy(); } catch { /* already gone */ }
      flip.current = null;
    };
  }, [size, issue, startPage, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") flip.current?.flipNext();
      if (e.key === "ArrowLeft") flip.current?.flipPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const inSpread = !!size?.spread && page > 0 && page < total - 1;
  const label = inSpread ? `Pages ${page + 1}–${Math.min(page + 2, total)} of ${total}` : `Page ${Math.min(page + 1, total)} of ${total}`;

  return (
    <div role="dialog" aria-modal="true" aria-label={`Issue ${issue.number}, ${label.toLowerCase()}`} className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
        <p className="text-sm font-semibold">Issue {issue.number} · {label}</p>
        <div className="flex items-center gap-2">
          <a href={issue.pdf} download className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold hover:bg-white/10 sm:inline-flex">
            <Download className="h-4 w-4" /> PDF
          </a>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
      <div ref={stage} className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-16">
        <div ref={book} className="mag-book" style={size ? { width: size.spread ? size.w * 2 : size.w, height: size.h } : undefined} />
        <button type="button" onClick={() => flip.current?.flipPrev()} aria-label="Previous page" className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-900/80 text-white ring-1 ring-white/30 hover:bg-navy-800 sm:left-4">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button type="button" onClick={() => flip.current?.flipNext()} aria-label="Next page" className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-navy-900/80 text-white ring-1 ring-white/30 hover:bg-navy-800 sm:right-4">
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      <p className="pb-3 text-center text-xs text-white/60">Drag a page corner, swipe, or use the arrows to turn pages</p>
    </div>
  );
}
