import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theolee.net',
        port: '',
        pathname: '/static/uploads/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
