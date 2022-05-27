import { AppProvider, Page, Button } from "@shopify/polaris";
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
          title="General"
          secondaryActions={
            <Button
              connectedDisclosure={{
                accessibilityLabel: "Other save actions",
                actions: [{ content: "Save as new" }],
              }}
            >
              Save
            </Button>
          }
        >
          <p>Page content</p>
        </Page>
      </div>
    </AppProvider>
  );
}

export default Example;
