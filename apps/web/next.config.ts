import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deployed as assets-only Cloudflare Worker (see wrangler.jsonc).
  // cacheComponents/partialPrefetching are server-only features; they conflict
  // with the `force-static` segment config that static export requires.
  output: "export",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
