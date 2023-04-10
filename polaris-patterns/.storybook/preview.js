import React from 'react';

import {AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {breakpoints} from '@shopify/polaris-tokens';

function AppProviderDecorator(Story, context) {
  return (
    <PolarisAppProvider>
      <Story {...context} />
    </PolarisAppProvider>
  );
}

const viewPorts = Object.entries({
  ...breakpoints,
  'breakpoints-xs': '20rem', // Replace the 0px xs breakpoint with 320px (20rem) for testing small screens
}).map(([key, value]) => {
  return {
    name: key,
    styles: {width: value, height: '100%'},
  };
});

export const parameters = {viewport: {viewports: {...viewPorts}}};

export const decorators = [AppProviderDecorator];
