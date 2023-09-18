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
      <AppProvider
        i18n={{}}
        features={{
          polarisSummerEditions2023: true,
          polarisSummerEditions2023ShadowBevelOptOut: true,
        }}
      />
      <AppProvider
        i18n={{}}
        features={{
          polarisSummerEditions2023: true,
        }}
      />
      <AppProvider
        features={{
          polarisSummerEditions2023: true,
          someOtherFlag: true,
        }}
        i18n={{}}
      />
      <AppProvider i18n={{}} />
      <AppProvider features={featureFlags} i18n={{}} />
      <AppProvider i18n={{}} features={featureFlags} />
      <AppProvider
        i18n={{}}
        features={{...featureFlags, someOtherFlag: true}}
      />
      <AppProvider
        i18n={{}}
        features={{someOtherFlag: true, ...featureFlags}}
      />
      <AppProvider
        i18n={{}}
        features={{...featureFlags, polarisSummerEditions2023: false}}
      />
      <AppProvider {...props} />
    </>
  );
}
