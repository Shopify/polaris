import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import "../styles/globals.scss";
import Page from "../components/Page";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPolaris = router.asPath.startsWith("/examples");

  return (
    <Page skipHeaderAndFooter={isPolaris}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />

        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          href="/fonts/ShopifySans--light.woff2"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          href="/fonts/ShopifySans--regular.woff2"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          href="/fonts/ShopifySans--medium.woff2"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          href="fonts/ShopifySans--bold.woff2"
        />
        <link
          rel="preload"
          as="font"
          crossOrigin="anonymous"
          type="font/woff2"
          href="/fonts/ShopifySans--extrabold.woff2"
        />
      </Head>

      <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
        <Component {...pageProps} />
      </div>
    </Page>
  );
}

export default MyApp;
