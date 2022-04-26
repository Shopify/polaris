import { AppProvider, Heading } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Heading>Online store dashboard</Heading>
    </AppProvider>
  );
}

export default Example;
    