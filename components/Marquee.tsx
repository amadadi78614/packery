import { Sparkle } from "lucide-react";
import { allServices as items } from "@/lib/site";


export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-accent-600/30 bg-accent-500 py-4 text-navy-950">
      <div className="marquee">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 px-6 font-display text-sm font-bold uppercase tracking-[0.14em] sm:text-base">
            {t} <Sparkle className="h-4 w-4 fill-navy-950" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
