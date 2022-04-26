import { AppProvider, Link } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Link monochrome url="https://help.shopify.com/manual">
  fulfilling orders
</Link>
    </AppProvider>
  );
}

export default Example;
    