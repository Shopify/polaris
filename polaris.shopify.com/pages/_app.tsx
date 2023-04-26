import type {AppProps} from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import {useEffect} from 'react';
import {useRouter} from 'next/router';
import useDarkMode from 'use-dark-mode';
import '@shopify/polaris/build/esm/styles.css';

import {className} from '../src/utils/various';
import Frame from '../src/components/Frame';
import '../src/styles/globals.scss';
import '../src/styles/colors.scss';

const PUBLIC_GA_ID = 'UA-49178120-32';

const gaPageView = (url: string) => {
  window.gtag('config', PUBLIC_GA_ID, {page_path: url});
};

// Remove dark mode flicker. Minified version of https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const noflash = `!function(){var b="darkMode",g="dark-mode",j="light-mode";function d(a){document.body.classList.add(a?g:j),document.body.classList.remove(a?j:g)}var e="(prefers-color-scheme: dark)",c=window.matchMedia(e),h=c.media===e,a=null;try{a=localStorage.getItem(b)}catch(k){}var f=null!==a;if(f&&(a=JSON.parse(a)),f)d(a);else if(h)d(c.matches),localStorage.setItem(b,c.matches);else{var i=document.body.classList.contains(g);localStorage.setItem(b,JSON.stringify(i))}}()`;

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const isProd = process.env.NODE_ENV === 'production';
  const darkMode = useDarkMode(false);

  // We're using router.pathname here to check for a specific incoming route to render in a Fragment instead of
  // the Page component. This will work fine for statically generated assets / pages
  // Any SSR pages may break due to router sometimes being undefined on first render.
  // see https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render

  useEffect(() => {
    if (!isProd) return;

    const handleRouteChange = (url: string) => {
      gaPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, isProd]);

  const ogImagePath = `/og-images${
    router.asPath === '/' ? '/home' : router.asPath
  }.png`;

  const isPolarisExample = router.asPath.startsWith('/examples');
  const isPolarisSandbox = router.asPath.startsWith('/sandbox');

  useEffect(() => {
    document.documentElement.style.setProperty(
      'color-scheme',
      darkMode.value ? 'dark' : 'light',
    );
  }, [darkMode.value]);

  return (
    <>
      {isProd ? (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      ) : null}

      <>
        <script dangerouslySetInnerHTML={{__html: noflash}}></script>

        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="shortcut icon" href="/images/favicon.png" />
          <meta property="og:image" content={ogImagePath} />
        </Head>

        <div
          style={{background: isPolarisExample ? '#fafafa' : 'unset'}}
          className={className(
            !isPolarisExample && 'styles-for-site-but-not-polaris-examples',
          )}
        >
          {isPolarisExample || isPolarisSandbox ? (
            <Component {...pageProps} />
          ) : (
            <Frame darkMode={darkMode}>
              <Component {...pageProps} />
            </Frame>
          )}
        </div>
      </>
    </>
  );
}

export default MyApp;
