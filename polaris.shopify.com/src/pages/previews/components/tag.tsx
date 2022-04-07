import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Tag } from "@shopify/polaris";

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
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <div>
            <Tag>Sweden</Tag>
          </div>
          <div>
            <Tag>Germany</Tag>
          </div>
          <div>
            <Tag>Canada</Tag>
          </div>
          <div>
            <Tag>Australia</Tag>
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
