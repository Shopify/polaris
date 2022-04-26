import { AppProvider, Card } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card title="Customer">
  <Card.Section>
    <p>John Smith</p>
  </Card.Section>
  <Card.Section
    title="Contact Information"
    actions={[{content: 'Delete', destructive: true}, {content: 'Edit'}]}
  >
    <p>john.smith@example.com</p>
  </Card.Section>
</Card>
    </AppProvider>
  );
}

export default Example;
    