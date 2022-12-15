const path = require('path');

/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // See: https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
    // this includes files from the monorepo base one directory up
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  async rewrites() {
    return [
      // We want to rewrite the sandbox route in production
      // to point at the public directory that our playroom assets are built to
      // We leverage a rewrite here instead of a redirect in order to preserve
      // a "pretty" url for the main playroom editor.
      ...(process.env.NODE_ENV !== 'production'
        ? [
            {
              source: '/playroom/:path*',
              destination: 'http://localhost:9000/:path*',
            },
          ]
        : []),
    ];
  },

  async redirects() {
    return [
      // We run a redirect to port 9000 for non prod environments
      // as playroom files aren't built to the public directory in dev mode.
      // We redirect to /preview/index.html here because Playroom's webpack is configured
      // to generate an html file for the preview page that reaches for assets in the root directory via a relative path.
      // In this case we don't care about a pretty url, and want to make absolutely certain that the browser is pointing to preview/index.html
      // such that it resolves the relative asset requests correctly.
      {
        source: '/playroom',
        destination: '/playroom/index.html',
        permanent: true,
      },
      {
        source: '/playroom/preview',
        destination: '/playroom/preview/index.html',
        permanent: true,
      },
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
