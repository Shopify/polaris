import { AppProvider, TextContainer } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <TextContainer spacing="loose">
  <p>
    Manage your Shopify store on-the-go with real-time notifications, access to
    your dashboard, and order management, all from your smartphone.
  </p>
  <p>
    Shopify POS is the fastest and easiest way to start accepting Visa,
    Mastercard, American Express, and Discover right from your smartphone or
    tablet.
  </p>
</TextContainer>
    </AppProvider>
  );
}

export default Example;
    