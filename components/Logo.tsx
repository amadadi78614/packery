type Props = { light?: boolean; className?: string };

/** Monogram mark + wordmark. Swap for the firm's official logo file when supplied. */
export default function Logo({ light = false, className = "" }: Props) {
  const ink = light ? "text-white" : "text-navy-900";
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-500/70 bg-navy-900">
        <span className="font-display text-[15px] font-semibold tracking-tight text-white">
          S<span className="text-gold-400">|</span>P
        </span>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[15px] font-bold tracking-tight ${ink}`}>S Packery Inc.</span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.16em] ${light ? "text-slate-400" : "text-slate-500"}`}>
          Chartered Accountants · Est. 2013
        </span>
      </span>
    </span>
  );
}
