import { AppProvider, Thumbnail } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <Thumbnail source={NoteMinor} size="large" alt="Small document" />
    </AppProvider>
  );
}

export default Example;
    