/** @type {import('next').NextConfig} */
const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

// Afrihost (Windows/IIS + PHP): plain static export; forms are handled by PHP in /afrihost/api.
// Vercel: normal Next.js build with Node route handlers in /app/api.
const nextConfig = isStatic
  ? { reactStrictMode: true, poweredByHeader: false, output: "export", trailingSlash: true, images: { unoptimized: true } }
  : { reactStrictMode: true, poweredByHeader: false };

export default nextConfig;
