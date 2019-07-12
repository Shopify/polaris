import {I18nContext} from '../utilities/i18n';
import {ThemeProviderContext} from '../utilities/theme';
import {ScrollLockManagerContext} from '../utilities/scroll-lock-manager';
import {StickyManagerContext} from '../utilities/sticky-manager';
import {AppBridgeContext} from '../utilities/app-bridge';
import {LinkContext} from '../utilities/link';

export interface PolarisContext {
  intl: React.ContextType<typeof I18nContext>;
  scrollLockManager: React.ContextType<typeof ScrollLockManagerContext>;
  stickyManager: React.ContextType<typeof StickyManagerContext>;
  theme: React.ContextType<typeof ThemeProviderContext>;
  appBridge: React.ContextType<typeof AppBridgeContext>;
  link: React.ContextType<typeof LinkContext>;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
