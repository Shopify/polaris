import { AppProvider, Page, Layout, Card } from "@shopify/polaris";
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
        <Page fullWidth>
          <Layout>
            <Layout.Section>
              <Card title="Online store dashboard" sectioned>
                <p>View a summary of your online store’s performance.</p>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </AppProvider>
  );
}

export default Example;
