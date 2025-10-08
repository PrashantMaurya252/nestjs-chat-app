import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true, // use false if it's temporary
      },
    ];
  },
};

export default nextConfig;
