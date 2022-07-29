import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';

import translations from '../../locales/en.json';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {
  PolarisTestProvider,
  WithPolarisTestProviderOptions,
} from '../../src/components/PolarisTestProvider';

export {createMount, mount, ReactTestingElement, CustomRoot};

export const mountWithApp = createMount<
  WithPolarisTestProviderOptions,
  WithPolarisTestProviderOptions
>({
  context(options) {
    return options;
  },
  render(element, context) {
    return (
      <PolarisTestProvider i18n={translations} {...context}>
        {element}
      </PolarisTestProvider>
    );
  },
});
