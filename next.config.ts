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
  async redirects() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap-0.xml", // Redirect main sitemap to generated one
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
