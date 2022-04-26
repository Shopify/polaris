import { AppProvider, Card, EmptyState } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card sectioned>
  <EmptyState
    heading="Upload a file to get started"
    action={{content: 'Upload files'}}
    image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    fullWidth
  >
    <p>
      You can use the Files section to upload images, videos, and other
      documents. This example shows the content with a centered layout and full
      width.
    </p>
  </EmptyState>
</Card>
    </AppProvider>
  );
}

export default Example;
    