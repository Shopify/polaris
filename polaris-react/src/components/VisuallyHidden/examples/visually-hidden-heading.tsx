import { AppProvider, Card, VisuallyHidden, Heading, FormLayout, TextField } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Card sectioned>
  <VisuallyHidden>
    <Heading>Title and description</Heading>
  </VisuallyHidden>
  <FormLayout>
    <TextField
      label="Title"
      value="Artisanal Wooden Spoon"
      onChange={() => {}}
      autoComplete="off"
    />
    <TextField
      label="Description"
      multiline
      onChange={() => {}}
      autoComplete="off"
    />
  </FormLayout>
</Card>
    </AppProvider>
  );
}

export default Example;
    