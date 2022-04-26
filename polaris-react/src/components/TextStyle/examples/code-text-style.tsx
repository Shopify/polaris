import { AppProvider, TextStyle } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <p>
  New URL that visitors should be forwarded to. If you want your store’s
  homepage, enter <TextStyle variation="code"> / </TextStyle> (a forward slash).
</p>
    </AppProvider>
  );
}

export default Example;
    