import { AppProvider, Layout,Card } from "@shopify/polaris";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <Layout>
  <Layout.Section>
    <Card title="Order details" sectioned>
      <p>View a summary of your order.</p>
    </Card>
  </Layout.Section>
  <Layout.Section secondary>
    <Card title="Tags" sectioned>
      <p>Add tags to your order.</p>
    </Card>
  </Layout.Section>
</Layout>
      </div>
    </AppProvider>
  );
}

export default Example;
    