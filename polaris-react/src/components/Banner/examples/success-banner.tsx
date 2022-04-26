import { AppProvider, Banner } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Banner
  title="Your shipping label is ready to print."
  status="success"
  action={{content: 'Print label'}}
  onDismiss={() => {}}
/>
    </AppProvider>
  );
}

export default Example;
    