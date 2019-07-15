import {ClientApplication} from '@shopify/app-bridge';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContextType} from '../components/Frame';
import {ThemeContext} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {StickyManager} from '../utilities/sticky-manager';
import {AppBridgeOptions} from '../utilities/app-bridge';
import {I18n, TranslationDictionary} from '../utilities/i18n';
import {Link, LinkLikeComponent} from '../utilities/link';
import {DeepPartial} from '../types';

/**
 * Options a user will pass into a mountWithX() function
 */
export type WithProvidersOptions = Partial<{
  // Values for contexts provided by AppProvider
  intl: TranslationDictionary | TranslationDictionary[];
  scrollLockManager: ScrollLockManager;
  stickyManager: StickyManager;
  themeProvider: DeepPartial<React.ContextType<typeof ThemeContext>>;
  appBridge: AppBridgeOptions;
  link: LinkLikeComponent;
  // Values for contexts provided by Frame
  frame: DeepPartial<FrameContextType>;
}>;

/**
 * The mountWithX() function willl take the above values and return them into these
 */
export type WithProvidersContext = {
  // Contexts provided by AppProvider
  intl: I18n;
  scrollLockManager: ScrollLockManager;
  stickyManager: StickyManager;
  appBridge: ClientApplication<{}> | undefined;
  themeProvider: React.ContextType<typeof ThemeContext>;
  link: Link;
  // Contets provided by Frame
  frame: FrameContextType;
};
