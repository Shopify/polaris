import type { NextPage } from "next";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Page,
  Banner,
  Badge,
  BannerStatus,
} from "@shopify/polaris";
import { useHash } from "../../../utils/useHash";

const Home: NextPage = () => {
  const [hash, setHash] = useHash();

  let status = hash as BannerStatus | undefined;
  const validStatuses: BannerStatus[] = [
    "critical",
    "info",
    "success",
    "warning",
  ];
  if (status && !validStatuses.includes(status)) {
    status = undefined;
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
              alignItems: "center",
              gap: "3rem",
            }}
          >
            <div style={{ transform: `scale(1.25)`, transformOrigin: "0 0" }}>
              <Badge status={status || "success"}>Delivered</Badge>
            </div>
            <Banner
              title="Some of your product variants are missing weights"
              status={status || "success"}
              action={{ content: "Edit variant weights", url: "" }}
              secondaryAction={{ content: "Learn more", url: "" }}
              onDismiss={() => {}}
            >
              <p>
                Add weights to show accurate rates at checkout and when buying
                shipping labels in Shopify.
              </p>
            </Banner>
          </div>
        </Page>
      </AppProvider>
    </div>
  );
};

export default Home;
