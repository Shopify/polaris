import { AppProvider, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div style={{color: '#bf0711'}}>
  <Button monochrome outline>
    Retry
  </Button>
</div>
    </AppProvider>
  );
}

export default Example;
    