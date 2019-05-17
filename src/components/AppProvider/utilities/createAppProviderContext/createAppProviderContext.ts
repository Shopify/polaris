import createApp, {
  getShopOrigin,
  LifecycleHook,
  DispatchActionHook,
} from '@shopify/app-bridge';
import {AppProviderContextType} from '../../context';
import {AppProviderProps} from '../../types';
import StickyManager from '../StickyManager';
import ScrollLockManager from '../ScrollLockManager';
import Intl from '../Intl';
import Link from '../Link';
import {polarisVersion} from '../../../../configure';

export interface CreateAppProviderContext extends AppProviderProps {
  stickyManager?: StickyManager;
  scrollLockManager?: ScrollLockManager;
}

export default function createAppProviderContext(
  {
    i18n,
    linkComponent,
    apiKey,
    shopOrigin,
    forceRedirect,
    stickyManager,
    scrollLockManager,
  }: CreateAppProviderContext = {i18n: {}},
): AppProviderContextType {
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
      "Deprecation: Using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5.0. Use `Provider` from `@shopify/app-bridge-react` instead. For example, `import {Provider} from '@shopify/app-bridge-react';`",
    );
  }

  if (appBridge && appBridge.hooks) {
    appBridge.hooks.set(LifecycleHook.DispatchAction, setClientInterfaceHook);
  }

  return {
    intl,
    link,
    stickyManager: stickyManager || new StickyManager(),
    scrollLockManager: scrollLockManager || new ScrollLockManager(),
    appBridge,
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
