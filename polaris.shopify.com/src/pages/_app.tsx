import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "@shopify/polaris-tokens/css/styles.css";
import Page from "../components/Page";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
