import {noop} from '@shopify/javascript-utilities/other';
import createApp, {getShopOrigin} from '@shopify/app-bridge';
import {isServer} from '@shopify/react-utilities/target';
import {AppProviderProps, Context} from '../../types';
import {StickyManager} from '../withSticky';
import ScrollLockManager from '../ScrollLockManager';
import Intl from '../Intl';
import Link from '../Link';

export interface CreateAppProviderContext extends AppProviderProps {
  stickyManager?: StickyManager;
  scrollLockManager?: ScrollLockManager;
  subscribe?(callback: () => void): void;
  unsubscribe?(callback: () => void): void;
}

const serverAppBridge = {
  dispatch<A>() {
    return {} as A;
  },
  error() {
    return noop;
  },
  featuresAvailable() {
    return new Promise(noop);
  },
  getState() {
    return new Promise(noop);
  },
  localOrigin: '',
  subscribe() {
    return noop;
  },
};

export default function createAppProviderContext({
  i18n,
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  stickyManager,
  scrollLockManager,
  subscribe = noop,
  unsubscribe = noop,
}: CreateAppProviderContext = {}): Context {
  const intl = new Intl(i18n);
  const link = new Link(linkComponent);

  let appBridge;

  if (apiKey) {
    appBridge = isServer
      ? serverAppBridge
      : createApp({
          apiKey,
          shopOrigin: shopOrigin || getShopOrigin(),
          forceRedirect,
        });
  }

  return {
    polaris: {
      intl,
      link,
      stickyManager: stickyManager || new StickyManager(),
      scrollLockManager: scrollLockManager || new ScrollLockManager(),
      subscribe,
      unsubscribe,
      appBridge,
    },
  };
}
