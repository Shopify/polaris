import { AppProvider, ProgressBar } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <ProgressBar progress={40} size="small" />
    </AppProvider>
  );
}

export default Example;
    