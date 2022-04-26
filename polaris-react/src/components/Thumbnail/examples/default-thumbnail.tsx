import { AppProvider, Thumbnail } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Thumbnail
  source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
  alt="Black choker necklace"
/>
    </AppProvider>
  );
}

export default Example;
    