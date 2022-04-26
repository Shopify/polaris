import { AppProvider, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card sectioned title="Variants" actions={[{content: 'Add variant'}]}>
  <p>
    Add variants if this product comes in multiple versions, like different
    sizes or colors.
  </p>
</Card>
    </AppProvider>
  );
}

export default Example;
    