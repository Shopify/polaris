import React from 'react';
import {ClientApplication} from '@shopify/app-bridge';

export const AppBridgeContext = React.createContext<ClientApplication<{}> | null>(
  null,
);
