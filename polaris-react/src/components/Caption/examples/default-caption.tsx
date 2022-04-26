import { AppProvider, List, Caption } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <List>
  <List.Item>
    Order #1001 <Caption>Received April 21, 2017</Caption>
  </List.Item>
  <List.Item>
    Order #1002 <Caption>Received April 22, 2017</Caption>
  </List.Item>
</List>
    </AppProvider>
  );
}

export default Example;
    