import {noop} from '@shopify/javascript-utilities/other';
import createApp, {getShopOrigin} from '@shopify/app-bridge';
import {Props as AppProviderProps} from '../../AppProvider';
import {StickyManager} from '../withSticky';
import ScrollLockManager from '../ScrollLockManager';
import Intl from '../Intl';
import Link from '../Link';
import {Context} from '../../AppProvider';

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
