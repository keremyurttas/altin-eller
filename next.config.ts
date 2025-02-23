import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ik.imagekit.io"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "ik.imagekit.io",
      pathname: "/your_account/**",
    },
  ],
};

export default nextConfig;
