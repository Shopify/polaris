import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Banner, Badge } from "@shopify/polaris";

const Home: NextPage = () => {
  return (
    <div>
      <AppProvider i18n={enTranslations}>
        <Page>
          <Banner
            title="Some of your product variants are missing weights"
            status="info"
            action={{ content: "Edit variant weights", url: "" }}
            secondaryAction={{ content: "Learn more", url: "" }}
            onDismiss={() => {}}
          >
            <p>
              Add weights to show accurate rates at checkout and when buying
              shipping labels in Shopify.
            </p>
          </Banner>
        </Page>
      </AppProvider>
    </div>
  );
};

export default Home;
