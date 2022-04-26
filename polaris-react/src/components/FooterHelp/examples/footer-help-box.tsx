import { AppProvider, FooterHelp, Link } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <FooterHelp>
  Learn more about{' '}
  <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
    fulfilling orders
  </Link>
</FooterHelp>
    </AppProvider>
  );
}

export default Example;
    