import { AppProvider, ProgressBar } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div>
  <ProgressBar progress={70} color="primary" />
  <br />
  <ProgressBar progress={30} color="success" />
</div>
    </AppProvider>
  );
}

export default Example;
    