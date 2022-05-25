import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
// import "@shopify/polaris/build/esm/styles.css";
import Head from "next/head";
import "../styles/globals.scss";
import Page from "../components/Page";
import { useRouter } from "next/router";

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
    <Page skipHeaderAndFooter={isPolaris}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </Page>
  );
}

export default MyApp;
