import { AppProvider, PageActions } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <PageActions
  primaryAction={{
    content: 'Save',
  }}
  secondaryActions={[
    {
      content: 'Delete',
      destructive: true,
    },
  ]}
/>
    </AppProvider>
  );
}

export default Example;
    