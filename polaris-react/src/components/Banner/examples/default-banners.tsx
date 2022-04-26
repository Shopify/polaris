import { AppProvider, Banner } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Banner title="Order archived" onDismiss={() => {}}>
  <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
</Banner>
    </AppProvider>
  );
}

export default Example;
    