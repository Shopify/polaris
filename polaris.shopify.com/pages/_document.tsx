import {Html, Head, Main, NextScript} from 'next/document';

import {withBasePath} from '../src/utils/basePath';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/*
          Inter used to be loaded from cdn.shopify.com. The archived site must
          not make any automatic requests to Shopify (or anyone else), so the
          font is copied out of the `inter-ui` package at build time by
          `scripts/gen-fonts.ts` and served from our own origin. The `url()`s
          inside that stylesheet are relative to it, so they don't need the base
          path applied.
        */}
        <link
          rel="stylesheet"
          href={withBasePath('/fonts/inter/inter.css')}
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
