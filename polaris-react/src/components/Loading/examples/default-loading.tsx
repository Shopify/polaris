import { AppProvider, Frame, Loading } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div style={{height: '100px'}}>
  <Frame>
    <Loading />
  </Frame>
</div>
    </AppProvider>
  );
}

export default Example;
    