'use client';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import React from 'react';
import {Cube} from '../../src/components/Cube';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <AppProvider i18n={translations}>
      <div>
        <h1>Hello, Cube test!</h1>
        {[...Array(1).keys()].map((id) => (
          <Cube key={id}>A cube</Cube>
        ))}
        <Cube display="flex" flexDirection="row" gap="space-300" align="center">
          <Cube
            display={{xs: 'block', md: 'flex'}}
            padding="space-400"
            paddingBlock="space-600"
            outlineStyle="solid"
            outlineWidth="3px"
            outlineColor={{xs: 'blue', md: 'green'}}
          />
          <Cube
            padding="space-400"
            size="width-150"
            paddingBlock="space-600"
            outlineStyle="solid"
            outlineWidth="3px"
            outlineColor={{xs: 'blue', md: 'green'}}
          />
        </Cube>
      </div>
    </AppProvider>
  );
}
