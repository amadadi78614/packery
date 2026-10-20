import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { serviceDetails } from "@/lib/serviceDetails";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/about", "/services", "/college", "/quote", "/contact", "/review", "/privacy", "/paia", "/terms", ...Object.values(serviceDetails).map((d) => `/services/${d.slug}`)];
  return paths.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly", priority: p === "" ? 1 : p.startsWith("/services/") ? 0.8 : 0.7 }));
}
