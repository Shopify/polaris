import { AppProvider, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div>
  <Icon source={CirclePlusMinor} color="base" backdrop />
  <Icon source={CirclePlusMinor} color="highlight" backdrop />
  <Icon source={CirclePlusMinor} color="success" backdrop />
  <Icon source={CirclePlusMinor} color="warning" backdrop />
  <Icon source={CirclePlusMinor} color="critical" backdrop />
</div>
    </AppProvider>
  );
}

export default Example;
    