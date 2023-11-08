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
        <Cube display="flex" flexDirection="row" rowGap="space-300">
          <Cube
            blockSize={{xs: 'height-1600', sm: 'height-100'}}
            inlineSize="width-200"
            paddingBlockStart="space-400"
            paddingBlockEnd="space-400"
            paddingInlineStart="space-400"
            paddingInlineEnd="space-400"
            backgroundColor="color-bg-fill-critical"
          />
          <Cube
            inlineSize="width-100"
            paddingBlockStart="space-400"
            paddingBlockEnd="space-400"
            paddingInlineStart="space-400"
            paddingInlineEnd="space-400"
            backgroundColor="color-avatar-four-bg-fill"
          >
            <Cube display="flex" flexDirection="column">
              <Cube
                blockSize="height-1200"
                paddingBlockStart="space-400"
                paddingBlockEnd="space-400"
                paddingInlineStart="space-400"
                paddingInlineEnd="space-400"
                backgroundColor="color-backdrop-bg"
              />
              <Cube
                blockSize="height-800"
                paddingBlockStart="space-400"
                paddingBlockEnd="space-400"
                paddingInlineStart="space-400"
                paddingInlineEnd="space-400"
                backgroundColor="color-bg-fill-hover"
              />
            </Cube>
          </Cube>
        </Cube>
      </div>
    </AppProvider>
  );
}
