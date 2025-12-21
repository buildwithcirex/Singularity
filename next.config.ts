import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  // Ensure images are optimized if using external domains
  images: {
    domains: [], // Add domains if needed
  },
};

export default nextConfig;
