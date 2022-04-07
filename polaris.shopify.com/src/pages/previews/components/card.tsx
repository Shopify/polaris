import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card, Badge } from "@shopify/polaris";

const Home: NextPage = () => {
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
          <Card
            sectioned
            title="Title"
            primaryFooterAction={{ content: "Primary action" }}
          ></Card>
        </Page>
      </AppProvider>
    </div>
  );
};

export default Home;
