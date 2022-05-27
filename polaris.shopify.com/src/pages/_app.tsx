import type { AppProps } from "next/app";
// import "@shopify/polaris/build/esm/styles.css";
import "../styles/globals.scss";
import Page from "../components/Page";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPolaris = router.asPath.startsWith("/generated-examples");
  return (
    <Page skipHeaderAndFooter={isPolaris}>
      <div style={{ background: isPolaris ? "#fafafa" : "unset" }}>
        <Component {...pageProps} />
      </div>
    </Page>
  );
}

export default MyApp;
