import Image from "next/image";

type Props = { light?: boolean; className?: string };

/** Official S Packery Inc. seal + wordmark. */
export default function Logo({ light = false, className = "" }: Props) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image
        src={light ? "/brand/spackery-logo-white.png" : "/brand/spackery-logo.png"}
        alt="S Packery Inc. — Chartered Accountants & Registered Auditors, Est 2013"
        width={681} height={671}
        priority
        className="h-14 w-auto shrink-0"
      />
      <span className="leading-tight">
        <span className={`block font-display text-[15px] font-bold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>S Packery Inc.</span>
        <span className={`block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] ${light ? "text-slate-300" : "text-slate-500"}`}>
          Chartered Accountants · Est. 2013
        </span>
      </span>
    </span>
  );
}
