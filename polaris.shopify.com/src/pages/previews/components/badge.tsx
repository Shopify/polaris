import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Avatar, Badge } from "@shopify/polaris";

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
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div>
            <Badge size="medium" status="success">
              Delivered
            </Badge>
          </div>
          <div>
            <Badge size="medium" status="critical">
              Cancelled
            </Badge>
          </div>
          <div>
            <Badge size="medium" status="info">
              Local delivery
            </Badge>
          </div>
          <div>
            <Badge size="medium" status="attention">
              4 issues
            </Badge>
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
