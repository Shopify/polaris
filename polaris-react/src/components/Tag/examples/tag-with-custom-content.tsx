import { AppProvider, Tag, Stack, Icon } from "@shopify/polaris";
import { WandMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Tag url="/collections/wholesale">
  <Stack spacing="extraTight">
    <Icon source={WandMinor} />
    <span>Wholesale</span>
  </Stack>
</Tag>
    </AppProvider>
  );
}

export default Example;
    