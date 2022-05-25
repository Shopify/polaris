import type { AppProps } from "next/app";
import "../styles/globals.scss";
import Page from "../components/Page";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPolaris = router.asPath.startsWith("/generated-examples");
  return (
    <Page skipHeaderAndFooter={isPolaris}>
      <Component {...pageProps} />
      {isPolaris && (
        <link
          rel="stylesheet"
          href="https://unpkg.com/@shopify/polaris@9.8.0/build/esm/styles.css"
        />
      )}
    </Page>
  );
}

export default MyApp;
