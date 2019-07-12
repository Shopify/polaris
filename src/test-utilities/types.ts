import {ClientApplication} from '@shopify/app-bridge';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContextType} from '../components/Frame';
import {ThemeProviderContextType} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {StickyManager} from '../utilities/sticky-manager';
import {AppBridgeOptions} from '../utilities/app-bridge';
import {I18n, TranslationDictionary} from '../utilities/i18n';
import {Link, LinkLikeComponent} from '../utilities/link';

export interface ComplexProviders {
  themeProvider: ThemeProviderContextType;
  frame: FrameContextType;
}

export interface SimpleProvidersWithSameReturn {
  scrollLockManager: ScrollLockManager;
  stickyManager: StickyManager;
}
export interface SimpleProvidersWithAltReturn {
  intl: TranslationDictionary | TranslationDictionary[];
  appBridge: AppBridgeOptions;
  link: LinkLikeComponent;
}
export type SimpleProviders = SimpleProvidersWithSameReturn &
  SimpleProvidersWithAltReturn;

export type ReturnedContext = ComplexProviders &
  SimpleProvidersWithSameReturn & {
    intl: I18n;
    appBridge: ClientApplication<{}> | undefined;
    link: Link;
  };
