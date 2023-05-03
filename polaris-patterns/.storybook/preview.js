import React, {useState, useEffect} from 'react';
import {breakpoints} from '@shopify/polaris-tokens';
import {AppProvider} from '@shopify/polaris';

import {PolarisPatternsProvider} from '../src/components/PolarisPatternsProvider';
import polarisEnTranslations from '../../polaris-react/locales/en.json';
import patternsEnTranslations from '../locales/en.json';
import {SUPPORTED_LOCALES} from '../src';

const defaultTranslations = {
  polaris: polarisEnTranslations,
  patterns: patternsEnTranslations,
};

function AppProviderDecorator(Story, context) {
  const {locale} = context.globals;
  const [translations, setTranslations] = useState(defaultTranslations);

  useEffect(() => {
    const importTranslations = async () => {
      try {
        const patternsTranslations = await import(
          /* webpackChunkName: "Polaris-Patterns-i18n", webpackMode: "lazy-once" */ `../locales/${locale}.json`
        );
        const polarisTranslations = await import(
          /* webpackChunkName: "Polaris-i18n", webpackMode: "lazy-once" */ `../../polaris-react/locales/${locale}.json`
        );
        setTranslations({
          patterns: patternsTranslations.default,
          polaris: polarisTranslations.default,
        });
      } catch {
        setTranslations(defaultTranslations);
      }
    };

    importTranslations();
  }, [locale]);

  return (
    <AppProvider i18n={translations.polaris}>
      <PolarisPatternsProvider
        i18nDetails={{locale}}
        translations={translations.patterns}
      >
        <Story {...context} />
      </PolarisPatternsProvider>
    </AppProvider>
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
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: SUPPORTED_LOCALES,
    },
  },
};
