/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // enables static HTML export
  images: {
    unoptimized: true,    // allows images without server optimization
  },
}

export default nextConfig;