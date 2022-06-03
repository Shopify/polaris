import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import "../styles/globals.scss";
import Page from "../components/Page";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const isPolaris = router.asPath.startsWith("/generated-examples");
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <Page skipHeaderAndFooter={isPolaris}>
        <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
          {getLayout(<Component {...pageProps} />)}
        </div>
      </Page>
    </>
  );
}

export default MyApp;
