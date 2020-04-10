import createApp, {
  getShopOrigin,
  LifecycleHook,
  DispatchActionHook,
} from '@shopify/app-bridge';

import {polarisVersion} from '../../configure';

export interface AppBridgeOptions {
  /** The API key for your application from the Partner dashboard */
  apiKey?: string;
  /**
   * The current shop’s origin, provided in the session from the Shopify API (to be provided without the https://)
   * @default getShopOrigin()
   * @see {@link https://help.shopify.com/en/api/embedded-apps/app-bridge#set-up-your-app|Shopify App Bridge docs}
   **/
  shopOrigin?: string;
  /** Forces a redirect to the relative admin path when not rendered in an iframe */
  forceRedirect?: boolean;
}

export function createAppBridge({
  apiKey,
  shopOrigin,
  forceRedirect,
}: AppBridgeOptions) {
  const appBridge = apiKey
    ? createApp<{}>({
        apiKey,
        shopOrigin: shopOrigin || getShopOrigin(),
        forceRedirect,
      })
    : undefined;

  if (appBridge !== undefined) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: Using `apiKey` and `shopOrigin` on `AppProvider` to initialize the Shopify App Bridge is deprecated. Support for this will be removed in v5.0. Use `Provider` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/provider',
    );
  }

  if (appBridge && appBridge.hooks) {
    appBridge.hooks.set(LifecycleHook.DispatchAction, setClientInterfaceHook);
  }

  return appBridge;
}

export const setClientInterfaceHook: DispatchActionHook = function (next) {
  return function (action) {
    action.clientInterface = {
      name: '@shopify/polaris',
      version: polarisVersion,
    };
    return next(action);
  };
};
