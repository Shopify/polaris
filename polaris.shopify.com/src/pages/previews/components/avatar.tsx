import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Avatar } from "@shopify/polaris";

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <div>
            <Avatar customer name="Farrah" />
          </div>
          <div>
            <Avatar customer size="large" name="Farrah" />
          </div>
          <div>
            <Avatar size="large" initials="MB" />
          </div>
          <div>
            <Avatar size="large" initials="JS" />
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
