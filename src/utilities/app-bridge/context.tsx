import {createContext} from 'react';
import {ClientApplication} from '@shopify/app-bridge';

export const AppBridgeContext = createContext<ClientApplication<{}> | null>(
  null,
);
