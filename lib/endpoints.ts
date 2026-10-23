/** Form endpoints. Vercel/Node build: Next.js route handlers. Afrihost static build: PHP handlers (see /afrihost). */
const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
export const formEndpoint = (name: "contact" | "college-apply" | "testimonial") => (isStatic ? `/api/${name}.php` : `/api/${name}`);
