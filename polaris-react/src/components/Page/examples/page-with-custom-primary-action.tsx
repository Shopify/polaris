import { AppProvider, Page, Button, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
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
    </AppProvider>
  );
}

export default Example;
    