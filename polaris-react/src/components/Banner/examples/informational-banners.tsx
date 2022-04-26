import { AppProvider, Banner } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Banner
  title="USPS has updated their rates"
  action={{content: 'Update rates', url: ''}}
  secondaryAction={{content: 'Learn more'}}
  status="info"
  onDismiss={() => {}}
>
  <p>Make sure you know how these changes affect your store.</p>
</Banner>
    </AppProvider>
  );
}

export default Example;
    