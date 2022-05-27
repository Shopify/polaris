import { AppProvider, Page, Card, PageActions } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 50px",
        }}
      >
        <Page
          narrowWidth
          breadcrumbs={[{ content: "Orders", url: "/orders" }]}
          title="Add payment method"
          primaryAction={{ content: "Save", disabled: true }}
        >
          <Card title="Credit card" sectioned>
            <p>Credit card information</p>
          </Card>
          <PageActions
            primaryAction={{ content: "Save", disabled: true }}
            secondaryActions={[{ content: "Delete" }]}
          />
        </Page>
      </div>
    </AppProvider>
  );
}

export default Example;
