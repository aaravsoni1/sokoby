import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.unsplash.com',
      'unsplash.com',
      'plus.unsplash.com',
    ], // Add this for your image domain
  },
  // Add other necessary config options
};

export default nextConfig;