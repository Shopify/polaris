import React from 'react';
import {render} from '@testing-library/react';
import {
  createMount,
  mount,
  Element as ReactTestingElement,
  CustomRoot,
} from '@shopify/react-testing';
import {PolarisTestProvider} from '@shopify/polaris';
import type {WithPolarisTestProviderOptions} from '@shopify/polaris';
import polarisEnTranslations from '@shopify/polaris/locales/en.json';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

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
      <I18nContext.Provider value={i18nManager}>
        <PolarisTestProvider i18n={{...polarisEnTranslations}} {...context}>
          {element}
        </PolarisTestProvider>
      </I18nContext.Provider>
    );
  },
});

export const renderWithApp = (element: React.ReactElement) =>
  render(<PolarisTestProvider i18n={{}}>{element}</PolarisTestProvider>);
