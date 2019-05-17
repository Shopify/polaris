import React from 'react';
import {ClientApplication} from '@shopify/app-bridge';
import createPolarisContext from './utilities/createPolarisContext';
import {Intl, Link, StickyManager, ScrollLockManager} from './utilities';

export interface AppProviderContextType {
  intl: Intl;
  link: Link;
  stickyManager: StickyManager;
  scrollLockManager: ScrollLockManager;
  appBridge?: ClientApplication<{}>;
}

const AppProviderContext = React.createContext<AppProviderContextType>(
  createPolarisContext(),
);

export default AppProviderContext;
