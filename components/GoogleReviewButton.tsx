import { Star } from "lucide-react";
import { googleReviewUrl } from "@/lib/reviews";

/** "Review us on Google" — renders nothing until NEXT_PUBLIC_GOOGLE_REVIEW_URL is set. */
export default function GoogleReviewButton({ variant = "light", className = "" }: { variant?: "light" | "dark"; className?: string }) {
  if (!googleReviewUrl) return null;
  const styles = variant === "dark"
    ? "border-white/15 text-slate-200 hover:border-amber-400 hover:text-white"
    : "border-slate-200 bg-white text-navy-900 hover:border-amber-400";
  return (
    <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${styles} ${className}`}>
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Review us on Google
    </a>
  );
}
