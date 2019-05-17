import React from 'react';
/* eslint-disable shopify/strict-component-boundaries */
import {AppProviderContext} from '../../components/AppProvider';
import {ThemeProviderContext} from '../../components/ThemeProvider';
import {PolarisContext} from '../../components/types';
/* eslint-enable shopify/strict-component-boundaries */

function usePolaris() {
  const polaris = React.useContext(AppProviderContext);

  if (Object.keys(polaris).length < 1) {
    throw new Error(
      `The <AppProvider> component is required as of v2.0 of Polaris React. See
                  https://polaris.shopify.com/components/structure/app-provider for implementation
                  instructions.`,
    );
  }

  const polarisTheme = React.useContext(ThemeProviderContext);

  const polarisContext: PolarisContext = {
    ...polaris,
    theme: polarisTheme,
  };

  return polarisContext;
}

export default usePolaris;
