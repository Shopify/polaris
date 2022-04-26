import { AppProvider, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div>
  <Icon source={CirclePlusMinor} color="base" />
  <Icon source={CirclePlusMinor} color="subdued" />
  <Icon source={CirclePlusMinor} color="primary" />
  <Icon source={CirclePlusMinor} color="highlight" />
  <Icon source={CirclePlusMinor} color="success" />
  <Icon source={CirclePlusMinor} color="warning" />
  <Icon source={CirclePlusMinor} color="critical" />
</div>
    </AppProvider>
  );
}

export default Example;
    