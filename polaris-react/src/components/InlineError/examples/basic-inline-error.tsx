import { AppProvider, InlineError } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <InlineError message="Store name is required" fieldID="myFieldID" />
    </AppProvider>
  );
}

export default Example;
    