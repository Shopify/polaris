import React from 'react';
import type {AppProviderProps as PolarisAppProviderProps} from '@shopify/polaris';
import {AppProvider as PolarisAppProvider} from '@shopify/polaris';

export function AppProvider({children, ...rest}: PolarisAppProviderProps) {
  return <PolarisAppProvider {...rest}>{children}</PolarisAppProvider>;
}

export type AppProviderProps = PolarisAppProviderProps;
