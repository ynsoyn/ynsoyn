import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/ynsoyn",
  assetPrefix: "/ynsoyn",
};

export default nextConfig;
