import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.scss";
import Page from "../components/Page";
import * as ga from "../lib/ga";

// Remove dark mode flicker. Minified version of https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const noflash = `!function(){var b="darkMode",g="dark-mode",j="light-mode";function d(a){document.body.classList.add(a?g:j),document.body.classList.remove(a?j:g)}var e="(prefers-color-scheme: dark)",c=window.matchMedia(e),h=c.media===e,a=null;try{a=localStorage.getItem(b)}catch(k){}var f=null!==a;if(f&&(a=JSON.parse(a)),f)d(a);else if(h)d(c.matches),localStorage.setItem(b,c.matches);else{var i=document.body.classList.contains(g);localStorage.setItem(b,JSON.stringify(i))}}()`;

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

  const ogImagePath = `/api/og-image/${
    router.asPath === "/" ? "home" : router.asPath
  }`;

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
        <script dangerouslySetInnerHTML={{ __html: noflash }}></script>

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
