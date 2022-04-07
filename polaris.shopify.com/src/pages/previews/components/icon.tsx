import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";

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
            <Icon source={CirclePlusMinor} color="base" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="subdued" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="primary" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="highlight" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="success" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="warning" />
          </div>
          <div>
            <Icon source={CirclePlusMinor} color="critical" />
          </div>
        </div>
      </AppProvider>
    </div>
  );
};

export default Home;
