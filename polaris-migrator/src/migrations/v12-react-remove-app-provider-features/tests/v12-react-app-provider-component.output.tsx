import React from 'react';
import {AppProvider} from '@shopify/polaris';

export function App() {
  const featureFlags = {
    polarisSummerEditions2023: true,
    polarisSummerEditions2023ShadowBevelOptOut: true,
  };

  const props = {
    i18n: {},
    features: {
      polarisSummerEditions2023: true,
      polarisSummerEditions2023ShadowBevelOptOut: true,
    },
  };

  return (
    <>
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider i18n={{}} />
      <AppProvider {...props} />
    </>
  );
}
