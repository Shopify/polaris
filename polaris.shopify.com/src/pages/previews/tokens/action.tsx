import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Button, Page, TextStyle } from "@shopify/polaris";
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            transform: "scale(1.5)",
          }}
        >
          <Button primary>Save theme</Button>
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
