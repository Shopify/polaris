import { AppProvider, Page,Button,Card } from "@shopify/polaris";
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
  breadcrumbs={[{content: 'Settings', url: '/settings'}]}
  title="General"
  primaryAction={
    <Button
      primary
      connectedDisclosure={{
        accessibilityLabel: 'Other save actions',
        actions: [{content: 'Save as new'}],
      }}
    >
      Save
    </Button>
  }
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
    