import { AppProvider, Frame, ContextualSaveBar } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <div style={{height: '250px'}}>
  <Frame
    logo={{
      width: 124,
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    }}
  >
    <ContextualSaveBar
      alignContentFlush
      message="Unsaved changes"
      saveAction={{
        onAction: () => console.log('add form submit logic'),
      }}
      discardAction={{
        onAction: () => console.log('add clear form logic'),
      }}
    />
  </Frame>
</div>
    </AppProvider>
  );
}

export default Example;
    