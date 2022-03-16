/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => [
    {
      source: '/services/ping',
      destination: '/api/services/ping',
    },
  ],
};

module.exports = nextConfig;
