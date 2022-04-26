import { AppProvider, FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <FormLayout>
  <FormLayout.Group>
    <TextField
      type="number"
      label="Minimum order"
      onChange={() => {}}
      autoComplete="off"
    />
    <TextField
      type="number"
      label="Maximum order"
      onChange={() => {}}
      autoComplete="off"
    />
  </FormLayout.Group>
</FormLayout>
    </AppProvider>
  );
}

export default Example;
    