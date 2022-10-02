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
        source: '/foundations/foundations/:slug',
        destination: '/foundations/:slug',
        permanent: false,
      },
      {
        source: '/foundations/content/:slug',
        destination: '/content/:slug',
        permanent: false,
      },
      {
        source: '/foundations/design/:slug',
        destination: '/design/:slug',
        permanent: false,
      },
      {
        source: '/foundations/patterns/:slug',
        destination: '/patterns/:slug',
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
      {
        source: '/tokens',
        destination: '/tokens/colors',
        permanent: false,
      },
      {
        source: '/legal/license',
        destination: 'https://github.com/Shopify/polaris/blob/main/LICENSE.md',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
