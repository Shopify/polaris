import { AppProvider, Badge } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Badge
  status="success"
  progress="complete"
  statusAndProgressLabelOverride="Status: Published. Your online store is visible."
>
  Published
</Badge>
    </AppProvider>
  );
}

export default Example;
    