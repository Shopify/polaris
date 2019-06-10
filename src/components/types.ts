import {ClientApplication} from '@shopify/app-bridge';
import {I18n} from '../utilities/i18n';
import {ThemeProviderContextType} from '../utilities/theme';
import {ScrollLockManager} from '../utilities/scroll-lock-manager';
import {StickyManager} from '../utilities/sticky-manager';
import {Link} from '../utilities/link';

export interface PolarisContext {
  intl: I18n;
  scrollLockManager: ScrollLockManager | null;
  stickyManager: StickyManager | null;
  theme: ThemeProviderContextType;
  appBridge: ClientApplication<{}> | null;
  link: Link;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
