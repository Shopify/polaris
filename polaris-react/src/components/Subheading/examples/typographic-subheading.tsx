import { AppProvider, Subheading } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Subheading>Accounts</Subheading>
    </AppProvider>
  );
}

export default Example;
    