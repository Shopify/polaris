import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div>
  Could not retrieve data.{' '}
  <Button plain monochrome>
    Try again
  </Button>
</div>
    </AppProvider>
  );
}

export default Example;
    