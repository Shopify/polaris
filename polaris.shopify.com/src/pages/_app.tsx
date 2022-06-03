import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";
// import "@shopify/polaris/build/esm/styles.css";
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
    <>
      <Head>
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
