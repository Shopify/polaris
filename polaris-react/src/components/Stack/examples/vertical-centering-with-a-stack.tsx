import { AppProvider, Stack, Heading, Badge } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Stack alignment="center">
  <Heading>
    Order
    <br />
    #1136
    <br />
    was paid
  </Heading>
  <Badge>Paid</Badge>
  <Badge>Fulfilled</Badge>
</Stack>
    </AppProvider>
  );
}

export default Example;
    