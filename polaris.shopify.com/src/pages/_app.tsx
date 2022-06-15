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
      </Head>

      <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
        <Component {...pageProps} />
      </div>
    </Page>
  );
}

export default MyApp;
