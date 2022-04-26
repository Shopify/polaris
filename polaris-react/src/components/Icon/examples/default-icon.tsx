import { AppProvider, Icon } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Icon source={CirclePlusMinor} />
    </AppProvider>
  );
}

export default Example;
    