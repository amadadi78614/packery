import { services, clientTypes, turnoverBands, timelines, qualifications, applicantStatuses, fundingStatuses, college } from "@/lib/site";

/** Form option lists, published as a static JSON file so the PHP form handlers (Afrihost hosting) validate against the same values. */
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    services: services.map((s) => ({ id: s.id, title: s.title })),
    clientTypes, turnoverBands, timelines, qualifications, applicantStatuses, fundingStatuses,
    testimonialServices: [...services.map((s) => s.title), "Payroll", college.name, "Other"],
    collegeName: college.name,
  });
}
