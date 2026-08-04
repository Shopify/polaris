import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useEffect, StrictMode} from 'react';
import {useRouter} from 'next/router';
import '@shopify/polaris/build/esm/styles.css';
import pkg from '../package.json';

import {className} from '../src/utils/various';
import {withBasePath} from '../src/utils/basePath';
import Frame from '../src/components/Frame';
import '../src/styles/globals.scss';
import ViewTransition from '../src/components/ViewTransition';
import InterstitialModal from '../src/components/InterstitialModal';
import {useSafeDarkMode} from '../src/hooks/useSafeDarkMode';

// Remove dark mode flicker. Minified version of https://github.com/donavon/use-dark-mode/blob/develop/noflash.js.txt
const noflash = `!function(){var b="darkMode",g="dark-mode",j="light-mode";function d(a){document.body.classList.add(a?g:j),document.body.classList.remove(a?j:g)}var e="(prefers-color-scheme: dark)",c=window.matchMedia(e),h=c.media===e,a=null;try{a=localStorage.getItem(b)}catch(k){}var f=null!==a;if(f&&(a=JSON.parse(a)),f)d(a);else if(h)d(c.matches),localStorage.setItem(b,c.matches);else{var i=document.body.classList.contains(g);localStorage.setItem(b,JSON.stringify(i))}}()`;

function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  const darkMode = useSafeDarkMode(false);

  // We're using router.pathname here to check for a specific incoming route to render in a Fragment instead of
  // the Page component. This will work fine for statically generated assets / pages
  // Any SSR pages may break due to router sometimes being undefined on first render.
  // see https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render

  const ogImagePath = withBasePath(
    `/og-images${
      router.asPath === '/'
        ? '/home'
        : new URL(router.asPath, 'https://polaris.shopify.com').pathname
    }.png`,
  );

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
      <script dangerouslySetInnerHTML={{__html: noflash}}></script>

      <Head>
        {/*
          These docs are an archived snapshot that we don't want turning up in
          search results. `noindex` has to be a meta tag rather than the
          `X-Robots-Tag` header the site used to send, because a static export
          on GitHub Pages can't set response headers. Deliberately paired with a
          `robots.txt` that allows crawling, so crawlers can actually reach the
          page and read this tag.
        */}
        <meta name="robots" content="noindex, noai, noimageai" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href={withBasePath('/images/favicon.png')} />
        <meta property="og:image" content={ogImagePath} />
      </Head>

      <div
        style={
          {
            background: isPolarisExample ? '#fafafa' : 'unset',
            '--polaris-shopify-com-version': pkg.version,
          } as React.CSSProperties
        }
        className={className(
          !isPolarisExample && 'styles-for-site-but-not-polaris-examples',
        )}
      >
        {isPolarisExample || isPolarisSandbox ? (
          <Component {...pageProps} />
        ) : (
          <Frame darkMode={darkMode}>
            <ViewTransition>
              <StrictMode>
                <Component {...pageProps} />
              </StrictMode>
            </ViewTransition>
          </Frame>
        )}
      </div>
      <InterstitialModal />
    </>
  );
}

export default MyApp;
