import { AppProvider, Pagination } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div style={{height: '100px'}}>
  <Pagination
    hasPrevious
    previousKeys={[74]}
    previousTooltip="j"
    onPrevious={() => {
      console.log('Previous');
    }}
    hasNext
    nextKeys={[75]}
    nextTooltip="k"
    onNext={() => {
      console.log('Next');
    }}
  />
</div>
    </AppProvider>
  );
}

export default Example;
    