import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Thumbnail } from "@shopify/polaris";

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: 30,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <AppProvider i18n={enTranslations}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Thumbnail
            source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
            size="large"
            alt="Black choker necklace"
          />
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
