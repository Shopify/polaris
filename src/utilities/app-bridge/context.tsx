import React from 'react';
import type {ClientApplication} from '@shopify/app-bridge';

export const AppBridgeContext = React.createContext<
  ClientApplication<{}> | undefined
>(undefined);
