import { AppProvider, Card } from "@shopify/polaris";
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
        <Card title="Customer">
          <Card.Section>
            <p>John Smith</p>
          </Card.Section>
          <Card.Section
            title="Contact Information"
            actions={[{ content: "Edit" }]}
          >
            <p>john.smith@example.com</p>
          </Card.Section>
        </Card>
      </div>
    </AppProvider>
  );
}

export default Example;
