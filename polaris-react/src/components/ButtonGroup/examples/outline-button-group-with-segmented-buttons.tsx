import { AppProvider, ButtonGroup, Button } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <ButtonGroup segmented>
  <Button outline>Bold</Button>
  <Button outline>Italic</Button>
  <Button outline>Underline</Button>
</ButtonGroup>
    </AppProvider>
  );
}

export default Example;
    