import { AppProvider, Card } from "@shopify/polaris";

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
        <Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
  <p>
    Add variants if this product comes in multiple versions, like different
    sizes or colors.
  </p>
</Card>
      </div>
    </AppProvider>
  );
}

export default Example;
