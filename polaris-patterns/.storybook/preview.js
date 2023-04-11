import React from 'react';

import {AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {breakpoints} from '@shopify/polaris-tokens';
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import translations from '../../polaris-react/locales/en.json';

function AppProviderDecorator(Story, context) {
  const i18nManager = new I18nManager({
    locale: 'en',
    currency: 'usd',
    country: 'CA',
  });

  return (
    <PolarisAppProvider i18n={translations}>
      <I18nContext.Provider value={i18nManager}>
        <Story {...context} />
      </I18nContext.Provider>
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
