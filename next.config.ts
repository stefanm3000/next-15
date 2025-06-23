import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      { "socket.io-client": "socket.io-client" },
    ];
    return config;
  },
};

export default nextConfig;
