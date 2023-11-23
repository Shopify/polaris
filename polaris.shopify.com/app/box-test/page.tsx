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
        <Cube>
          {/*
          <Cube display="flex" />
          <div style={`display: flex`} />

          <Cube display={{
            xs: 'grid',
            xl: 'flex'
          }} />
          <div style={`
            --pc-box-display-sm: var(--_p-media-sm) grid;
            --pc-box-display-xl: var(--_p-media-xl) flex;
            display: var(--pc-box-display-xl, var(--pc-box-display-sm, unset));
          `} />
          */}
          <Cube
            borderStyle={{
              xs: 'dashed',
              sm: 'double',
              md: 'groove',
              lg: 'inset',
              xl: 'outset',
            }}
            display={{xs: 'block', md: 'flex'}}
            padding="400"
            paddingBlock="600"
            // borderStyle={{sm: 'solid'}}
            outlineStyle={{xs: 'dashed', sm: 'solid', md: 'groove'}}
            zIndex={{sm: 2, md: 5}}
            outlineWidth="3px"
            outlineColor={{sm: 'blue', md: 'green'}}
          />
          <Cube
            padding="400"
            size="150"
            paddingBlock="600"
            outlineStyle="solid"
            outlineWidth="3px"
            outlineColor={{xs: 'blue', md: 'green'}}
          />
          <Cube borderWidth="050">
            Setting a borderWidth should also set the borderStyle to "solid" by
            default
          </Cube>
        </Cube>
      </div>
    </AppProvider>
  );
}
