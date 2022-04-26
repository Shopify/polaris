import { AppProvider, FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <FormLayout>
  <TextField label="Store name" onChange={() => {}} autoComplete="off" />
  <TextField
    type="email"
    label="Account email"
    onChange={() => {}}
    autoComplete="email"
  />
</FormLayout>
    </AppProvider>
  );
}

export default Example;
    