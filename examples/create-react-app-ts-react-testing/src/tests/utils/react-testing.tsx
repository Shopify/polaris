import React from 'react';
import {PolarisTestProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import {createMount} from '@shopify/react-testing';

export const mount = createMount<{}, {}>({
  context(options) {
    return options;
  },
  render(element, context) {
    return (
      <PolarisTestProvider i18n={en} {...context}>
        {element}
      </PolarisTestProvider>
    );
  },
});
