const {basePath} = require('./constants');
const redirects = require('./redirects');

const isDev = process.env.NODE_ENV !== 'production';

/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is archived and published as a plain static bundle to GitHub
  // Pages, so there is no Node server to run `headers()`, `rewrites()`,
  // `redirects()` or the image optimizer. Legacy URLs are handled by the HTML
  // stubs that `scripts/post-export.ts` writes into `out/` after the
  // build, and `noindex` is set with a meta tag in `pages/_app.tsx` because the
  // `X-Robots-Tag` header can't survive a static export.
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // Keep the existing extensionless URLs (`/components/actions/button`) rather
  // than switching to directory indexes. GitHub Pages resolves a request for
  // `/foo` against `foo.html`, and keeping the URLs byte-identical to the old
  // site means every `asPath` comparison in the app keeps working.
  trailingSlash: false,
  env: {
    // Exposed so `src/utils/basePath.ts` can prefix asset URLs in the browser.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Required by `output: 'export'`; there is no image optimization endpoint.
    // Note this also means `next/image` no longer prefixes `src` with the base
    // path, so anything that isn't a `next/link` href goes through
    // `withBasePath()` from `src/utils/basePath.ts`.
    unoptimized: true,
  },
  sassOptions: {
    // Lets stylesheets write `url('#{$basePath}/images/…')`.
    additionalData: `$basePath: '${basePath}';`,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
  },

  // `output: 'export'` ignores rewrites and redirects (and warns if they're
  // even declared), so they're only attached for `next dev`, where they keep
  // local behaviour close to the deployed site. The exported site gets
  // equivalent meta-refresh stubs from `scripts/post-export.ts` instead.
  ...(isDev
    ? {
        async rewrites() {
          return [
            // We want to rewrite the sandbox route in production
            // to point at the public directory that our playroom assets are built to
            // We leverage a rewrite here instead of a redirect in order to preserve
            // a "pretty" url for the main playroom editor.
            {
              source: '/playroom/:path*',
              destination: 'http://localhost:9000/:path*',
            },
          ];
        },
        async redirects() {
          return redirects;
        },
      }
    : {}),
};

module.exports = nextConfig;
