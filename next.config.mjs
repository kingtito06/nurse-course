// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '/nurse-course' : '');
const assetPrefix = basePath ? `${basePath}/` : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // static export to /out
  basePath,                  // '' in dev, '/nurse-course' in prod
  assetPrefix,               // ensures _next assets resolve on GH Pages
  trailingSlash: true,       // generates folder-style routes to avoid refresh 404s
  images: { unoptimized: true },
};

export default nextConfig;