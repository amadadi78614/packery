"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { site, fullAddress } from "@/lib/site";

/** Google Map that only loads after the visitor opts in (no Google cookies before consent). */
export default function ConsentMap() {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <iframe
        title={`${site.name} — ${fullAddress}`}
        src={site.mapsEmbed}
        className="h-full min-h-[22rem] w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="relative flex h-full min-h-[22rem] flex-col items-center justify-center overflow-hidden bg-navy-950 p-8 text-center text-white">
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />
      <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-accent-500 text-navy-950 shadow-lg">
        <MapPin className="h-8 w-8" />
      </span>
      <p className="relative mt-5 font-display text-xl font-bold">{site.address.street}</p>
      <p className="relative text-sm text-slate-300">{site.address.suburb}, {site.address.city}, {site.address.code}</p>
      <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={() => setShow(true)} className="btn-accent py-2.5">
          <MapPin className="h-4 w-4" /> Show map
        </button>
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost-light py-2.5">
          <Navigation className="h-4 w-4" /> Open in Google Maps
        </a>
      </div>
      <p className="relative mt-5 max-w-xs text-[11px] leading-relaxed text-slate-400">
        Showing the map loads content from Google, which may set cookies. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Notice</Link>.
      </p>
    </div>
  );
}
