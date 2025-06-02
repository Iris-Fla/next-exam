import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tmezjwdsqcmftybegfio.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/problem-img/**",
      },
      {
        protocol: "https",
        hostname: "gdbhnbdkrzepuvpwtexf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/problem-img/**",
      },
    ],
  },
};

export default nextConfig;
