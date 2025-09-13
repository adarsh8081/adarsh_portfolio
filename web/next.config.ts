import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove 'standalone' output for Vercel deployment
  serverExternalPackages: ['@auth0/nextjs-auth0'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    unoptimized: false, // Enable optimization for production
  },
  // Add asset prefix for subdirectory deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
};

export default nextConfig;
