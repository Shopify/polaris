import React from 'react';
import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';

import translations from '../../locales/en.json';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {PolarisTestProvider} from '../../src/components/PolarisTestProvider';
// eslint-disable-next-line @shopify/strict-component-boundaries
import type {WithPolarisTestProviderOptions} from '../../src/components/PolarisTestProvider';

export {createMount, mount, ReactTestingElement, CustomRoot};

export const mountWithApp = createMount<
  WithPolarisTestProviderOptions,
  WithPolarisTestProviderOptions
>({
  context(options) {
    return options;
  },
  render(element, context) {
    const {...rest} = context;
    return (
      <PolarisTestProvider i18n={translations} {...rest}>
        {element}
      </PolarisTestProvider>
    );
  },
});
