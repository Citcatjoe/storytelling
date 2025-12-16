import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "." : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config, { dev }) => {
    if (!dev && process.env.UNMINIFIED === "true") {
      config.optimization.minimize = false;
    }
    return config;
  },
};

export default nextConfig;
