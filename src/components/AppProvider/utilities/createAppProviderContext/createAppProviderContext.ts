import {noop} from '@shopify/javascript-utilities/other';
import {
  getShopOrigin,
  createAppWrapper,
  LifecycleHook,
  HooksInterface,
  AppConfig,
  DispatchActionHook,
} from '@shopify/app-bridge';
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
  const appBridge =
    apiKey && !isServer
      ? createApp({
          apiKey,
          shopOrigin: shopOrigin || getShopOrigin(),
          forceRedirect,
        })
      : undefined;

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

export const setClientInterface: DispatchActionHook = function(next) {
  return function(action) {
    action.clientInterface = {
      name: '@shopify/polaris',
      version: window.Polaris.VERSION,
    };
    return next(action);
  };
};

export function hookMiddleware(hooks: HooksInterface) {
  hooks.set(LifecycleHook.DispatchAction, setClientInterface);
}

function createApp(appBridgeConfig: AppConfig) {
  return createAppWrapper(window.top, window.location.origin, [hookMiddleware])(
    appBridgeConfig,
  );
}
