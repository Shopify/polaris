import {ClientApplication} from '@shopify/app-bridge';
import {ValidationMap} from 'react';
import PropTypes from 'prop-types';
import {LinkLikeComponent} from '../UnstyledLink';
import {Theme, THEME_CONTEXT_TYPES as polarisTheme} from '../ThemeProvider';
import {
  Intl,
  Link,
  StickyManager,
  ScrollLockManager,
  TranslationDictionary,
} from './utilities';

export interface AppProviderProps {
  /** A locale object or array of locale objects that overrides default translations */
  i18n?: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
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
  /** Custom logos and colors provided to select components */
  theme?: Theme;
}

export interface Context {
  polaris: {
    intl: Intl;
    link: Link;
    stickyManager: StickyManager;
    scrollLockManager: ScrollLockManager;
    subscribe?(callback: () => void): void;
    unsubscribe?(callback: () => void): void;
    appBridge?: ClientApplication<{}>;
  };
}

export const polarisAppProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
  ...polarisTheme,
};
