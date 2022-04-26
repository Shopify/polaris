import { AppProvider, Tag } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function URLTagExample() {
  return <Tag url="/collections/wholesale">Wholesale</Tag>;
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <URLTagExample />
    </AppProvider>
  );
}

export default Example;
    