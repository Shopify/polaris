import { AppProvider, List } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <List type="bullet">
  <List.Item>Yellow shirt</List.Item>
  <List.Item>Red shirt</List.Item>
  <List.Item>Green shirt</List.Item>
</List>
    </AppProvider>
  );
}

export default Example;
    