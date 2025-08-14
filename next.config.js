/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Needed for static export
  basePath: '/nurse-course',  // GitHub repo name
  images: {
    unoptimized: true,       // For static export
  },
}

module.exports = nextConfig;