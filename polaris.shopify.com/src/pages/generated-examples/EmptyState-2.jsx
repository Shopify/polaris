import { AppProvider, Card, EmptyState } from "@shopify/polaris";
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
        <Card sectioned>
          <EmptyState
            heading="Upload a file to get started"
            action={{ content: "Upload files" }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            fullWidth
          >
            <p>
              You can use the Files section to upload images, videos, and other
              documents. This example shows the content with a centered layout
              and full width.
            </p>
          </EmptyState>
        </Card>
      </div>
    </AppProvider>
  );
}

export default Example;
