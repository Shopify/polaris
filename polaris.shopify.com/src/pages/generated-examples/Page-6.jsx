import { AppProvider, Page,Card } from "@shopify/polaris";
import { ArrowDownMinor } from "@shopify/polaris-icons";
import translations from '@shopify/polaris/locales/en.json';

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
  breadcrumbs={[{content: 'Products', url: '/products'}]}
  title="Invoice"
  subtitle="Statement period: May 3, 2019 to June 2, 2019"
  secondaryActions={[{content: 'Download', icon: ArrowDownMinor}]}
>
  <Card title="Credit card" sectioned>
    <p>Credit card information</p>
  </Card>
</Page>
      </div>
    </AppProvider>
  );
}

export default Example;
    