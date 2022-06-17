import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.scss";
import Page from "../components/Page";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
