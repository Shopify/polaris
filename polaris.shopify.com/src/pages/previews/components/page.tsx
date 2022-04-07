import type { NextPage } from "next";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card, Badge } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

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
        <Page
          breadcrumbs={[{ content: "Products", url: "/products" }]}
          title="3/4 inch Leather pet collar"
          titleMetadata={<Badge status="success">Paid</Badge>}
          subtitle="Perfect for any pet"
          compactTitle
          primaryAction={{ content: "Save", disabled: true }}
          secondaryActions={[
            {
              content: "Duplicate",
              accessibilityLabel: "Secondary action label",
              onAction: () => alert("Duplicate action"),
            },
            {
              content: "View on your store",
              onAction: () => alert("View on your store action"),
            },
          ]}
          actionGroups={[
            {
              title: "Promote",
              actions: [
                {
                  content: "Share on Facebook",
                  accessibilityLabel: "Individual action label",
                  onAction: () => alert("Share on Facebook action"),
                },
              ],
            },
          ]}
          pagination={{
            hasPrevious: true,
            hasNext: true,
          }}
        >
          <Card title="Credit card" sectioned>
            <p>Credit card information</p>
          </Card>
        </Page>
      </AppProvider>
    </div>
  );
};

export default Home;
