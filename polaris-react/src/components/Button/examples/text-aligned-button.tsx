import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Button plain textAlign="left">
  This is a really long string of text that overflows onto the next line we need
  to put in a lot of words now you can see the alignment. It is very long but a
  customer could potentially name something this long.
</Button>
    </AppProvider>
  );
}

export default Example;
    