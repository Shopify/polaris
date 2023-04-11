import React from 'react';
import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';
import {PolarisTestProvider} from '@shopify/polaris';
import type {WithPolarisTestProviderOptions} from '@shopify/polaris';
import {I18nManager, I18nContext} from '@shopify/react-i18n';
import translations from '@shopify/polaris/locales/en.json';

export {createMount, mount, ReactTestingElement, CustomRoot};

export const mountWithApp = createMount<
  WithPolarisTestProviderOptions,
  WithPolarisTestProviderOptions
>({
  context(options) {
    return options;
  },
  render(element, context) {
    const i18nManager = new I18nManager({
      locale: 'en',
      currency: 'usd',
      country: 'CA',
    });

    return (
      <PolarisTestProvider i18n={translations} {...context}>
        <I18nContext.Provider value={i18nManager}>
          {element}
        </I18nContext.Provider>
      </PolarisTestProvider>
    );
  },
});
