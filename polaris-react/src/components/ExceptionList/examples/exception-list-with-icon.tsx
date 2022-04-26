import { AppProvider, ExceptionList } from "@shopify/polaris";
import { NoteMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <ExceptionList
  items={[
    {
      icon: NoteMinor,
      description: 'This customer is awesome. Make sure to treat them right!',
    },
  ]}
/>
    </AppProvider>
  );
}

export default Example;
    