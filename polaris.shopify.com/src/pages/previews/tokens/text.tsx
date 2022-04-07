import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, TextStyle } from "@shopify/polaris";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = router.query;

  if (status && typeof status !== "string") {
    return null;
  }
  return (
    <div
      style={{
        padding: `0 30px`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AppProvider i18n={enTranslations}>
        <Page>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "2em",
              fontSize: "1.5em",
            }}
          >
            <p id="text">
              <TextStyle>Regular text</TextStyle>
            </p>
            <p id="subdued">
              <TextStyle variation="subdued">No supplier listed</TextStyle>
            </p>
            <p id="positive">
              <TextStyle variation="positive">Orders increased</TextStyle>
            </p>
            <p id="negative">
              <TextStyle variation="negative">Orders decreased</TextStyle>
            </p>
            <p id="warning">
              <TextStyle variation="warning">Scheduled maintenance</TextStyle>
            </p>
          </div>
        </Page>
      </AppProvider>
    </div>
  );
};

export default Home;
