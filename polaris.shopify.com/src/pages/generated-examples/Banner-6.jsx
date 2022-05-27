import { AppProvider, Banner, List } from "@shopify/polaris";
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
        <Banner
          title="Before you can purchase a shipping label, this change needs to be made:"
          action={{ content: "Edit address" }}
          status="warning"
        >
          <List>
            <List.Item>
              The name of the city you’re shipping to has characters that aren’t
              allowed. City name can only include spaces and hyphens.
            </List.Item>
          </List>
        </Banner>
      </div>
    </AppProvider>
  );
}

export default Example;
