"use client";

import { usePathname } from "next/navigation";
import { waLink, waMessages } from "@/lib/site";
import { WhatsAppIcon } from "./icons/Brand";

export default function FooterWhatsApp() {
  const isCollege = usePathname().startsWith("/college");
  return (
    <a
      href={waLink(isCollege ? waMessages.college : waMessages.firm)}
      target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-slate-300 transition hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
    >
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}
