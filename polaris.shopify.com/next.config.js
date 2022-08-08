/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: '/api/v0/tokens/:path*',
        headers: [
          {key: 'Access-Control-Allow-Credentials', value: 'true'},
          {key: 'Access-Control-Allow-Origin', value: '*'},
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/components/get-started',
        destination: '/components',
        permanent: false,
      },
      {
        source: '/components/:category/:slug',
        destination: '/components/:slug',
        permanent: false,
      },
      {
        source: '/content/:slug',
        destination: '/foundations/content/:slug',
        permanent: false,
      },
      {
        source: '/design/:slug',
        destination: '/foundations/design/:slug',
        permanent: false,
      },
      {
        source: '/foundations/:slug',
        destination: '/foundations/foundations/:slug',
        permanent: false,
      },
      {
        source: '/patterns/:slug',
        destination: '/foundations/patterns/:slug',
        permanent: false,
      },
      {
        source: '/foundations/patterns/layout',
        destination: '/foundations/patterns/page-layouts',
        permanent: false,
      },
      {
        source: '/foundations/foundations/designing-apps',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: false,
      },
      {
        source: '/foundations/content/app-release-notes',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: false,
      },
      {
        source: '/tokens/all-tokens',
        destination: '/tokens/colors',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
