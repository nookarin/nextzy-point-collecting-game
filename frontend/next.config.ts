import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL ?? "http://localhost:4000";
    return [{ source: "/api/:path*", destination: `${backendUrl}/api/:path*` }];
  },
  cacheComponents: true,
  partialPrefetching: true,

  // The frontend is its own project inside the monorepo.
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;