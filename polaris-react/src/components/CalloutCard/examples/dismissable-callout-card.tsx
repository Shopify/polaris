import { AppProvider, CalloutCard } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <CalloutCard
  title="Customize the style of your checkout"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  primaryAction={{content: 'Customize checkout'}}
  onDismiss={() => {}}
>
  <p>Upload your store’s logo, change colors and fonts, and more.</p>
</CalloutCard>
    </AppProvider>
  );
}

export default Example;
    