import { AppProvider, FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <FormLayout>
  <FormLayout.Group condensed>
    <TextField label="Length" onChange={() => {}} autoComplete="off" />
    <TextField label="Width" onChange={() => {}} autoComplete="off" />
    <TextField label="Height" onChange={() => {}} autoComplete="off" />
    <TextField label="Unit" onChange={() => {}} autoComplete="off" />
  </FormLayout.Group>
</FormLayout>
    </AppProvider>
  );
}

export default Example;
    