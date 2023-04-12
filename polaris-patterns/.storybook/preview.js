import React from 'react';
import {breakpoints} from '@shopify/polaris-tokens';
import {I18nContext, I18nManager} from '@shopify/react-i18n';

import {AppProvider} from '../src';
import polarisEnTranslations from '../../polaris-react/locales/en.json';

function AppProviderDecorator(Story, context) {
  const i18nManager = new I18nManager({
    locale: 'en',
    currency: 'usd',
    country: 'CA',
  });

  return (
    <I18nContext.Provider value={i18nManager}>
      <AppProvider i18n={{...polarisEnTranslations}}>
        <Story {...context} />
      </AppProvider>
    </I18nContext.Provider>
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
