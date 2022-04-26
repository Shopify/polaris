import { AppProvider, Card, EmptyState } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card sectioned>
  <EmptyState
    heading="Manage your inventory transfers"
    action={{content: 'Add transfer'}}
    secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
  >
    <p>Track and receive your incoming inventory from suppliers.</p>
  </EmptyState>
</Card>
    </AppProvider>
  );
}

export default Example;
    