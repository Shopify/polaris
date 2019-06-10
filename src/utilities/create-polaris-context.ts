import {ClientApplication} from '@shopify/app-bridge';
import {PolarisContext} from '../components/types';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Props as AppProviderProps} from '../components/AppProvider';
import {
  createThemeContext,
  ThemeProviderContextType as CreateThemeContext,
} from './theme';
import {StickyManager} from './sticky-manager';
import {I18n, TranslationDictionary} from './i18n';
import {ScrollLockManager} from './scroll-lock-manager';
import {createAppBridge, AppBridgeOptions} from './app-bridge';
import {Link, LinkLikeComponent} from './link';

export interface CreatePolarisContext extends AppProviderProps {
  stickyManager?: StickyManager;
}

interface Context {
  themeProvider?: CreateThemeContext;
  i18n?: TranslationDictionary | TranslationDictionary[];
  appBridge?: AppBridgeOptions;
  link?: LinkLikeComponent;
}

export function createPolarisContext(context: Context = {}): PolarisContext {
  const {
    themeProvider: themeProviderContext,
    i18n: translations = {},
    appBridge: appBridgeOptions,
    link: linkComponent,
  } = context;
  const theme = themeProviderContext
    ? createThemeContext(themeProviderContext)
    : createThemeContext();
  const intl = new I18n(translations);
  const scrollLockManager = new ScrollLockManager();
  const stickyManager = new StickyManager();
  const link = new Link(linkComponent);

  let appBridge: ClientApplication<{}> | null = null;
  if (appBridgeOptions) {
    const {apiKey, shopOrigin, forceRedirect} = appBridgeOptions;
    appBridge = createAppBridge({apiKey, shopOrigin, forceRedirect});
  }

  return {
    intl,
    scrollLockManager,
    stickyManager,
    theme,
    appBridge,
    link,
  };
}
