"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn w-full border border-slate-200 py-2.5 text-navy-900 hover:bg-slate-50">
      <Printer className="h-4 w-4" /> Print / save as PDF
    </button>
  );
}
