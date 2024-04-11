/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'sdbooth2-production.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
