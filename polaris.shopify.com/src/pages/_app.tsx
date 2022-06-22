import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.scss";
import Page from "../components/Page";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!isProd) return;

    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, isProd]);

  const ogImageHash =
    `${router.asPath.replace("/", "").replace(/\//g, "--")}` || "home";
  const ogImagePath = `${
    typeof window !== "undefined" ? `https://${window.location.hostname}` : ""
  }/open-graph/${ogImageHash}.jpg`;

  return (
    <>
      {isProd ? (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga.PUBLIC_GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga.PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      ) : null}

      <Page>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="shortcut icon" href="/favicon.png" />
          <meta property="og:image" content={ogImagePath} />
        </Head>

        <Component {...pageProps} />
      </Page>
    </>
  );
}

export default MyApp;
