import createApp, {
  getShopOrigin,
  LifecycleHook,
  DispatchActionHook,
} from '@shopify/app-bridge';
import {AppProviderProps, Context} from '../../types';
import {StickyManager} from '../withSticky';
import ScrollLockManager from '../ScrollLockManager';
import Intl from '../Intl';
import Link from '../Link';
import {polarisVersion} from '../../../../configure';

export interface CreateAppProviderContext extends AppProviderProps {
  stickyManager?: StickyManager;
  scrollLockManager?: ScrollLockManager;
  subscribe?(callback: () => void): void;
  unsubscribe?(callback: () => void): void;
}

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
  const appBridge = apiKey
    ? createApp({
        apiKey,
        shopOrigin: shopOrigin || getShopOrigin(),
        forceRedirect,
      })
    : undefined;

  if (appBridge != null) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: Using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5.0. Use `Provider` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/provider',
    );
  }

  if (appBridge && appBridge.hooks) {
    appBridge.hooks.set(LifecycleHook.DispatchAction, setClientInterfaceHook);
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

export const setClientInterfaceHook: DispatchActionHook = function(next) {
  return function(action) {
    action.clientInterface = {
      name: '@shopify/polaris',
      version: polarisVersion,
    };
    return next(action);
  };
};

function noop() {}
