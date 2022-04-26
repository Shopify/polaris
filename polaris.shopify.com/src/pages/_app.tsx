import type { AppProps } from "next/app";
import "../styles/globals.scss";
import '@shopify/polaris-tokens/css/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
