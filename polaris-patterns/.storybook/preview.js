import React from 'react';
import {breakpoints} from '@shopify/polaris-tokens';
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import {AppProvider} from '@shopify/polaris';

import polarisEnTranslations from '../../polaris-react/locales/en.json';

const i18nManager = new I18nManager({
  locale: 'en',
  currency: 'usd',
  country: 'CA',
});

function AppProviderDecorator(Story, context) {
  const {locale} = context.globals;
  i18nManager.update({locale, currency: 'usd', country: 'CA'});

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

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'flag',
      items: [
        'en',
        'cs',
        'da',
        'de',
        'es',
        'fi',
        'fr',
        'it',
        'ja',
        'ko',
        'nb',
        'nl',
        'pl',
        'pt-BR',
        'pt-PT',
        'sv',
        'th',
        'tr',
        'vi',
        'zh-CN',
        'zh-TW',
      ],
    },
  },
};
