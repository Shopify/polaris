import {ClientApplication} from '@shopify/app-bridge';
import {ValidationMap} from 'react';
import * as PropTypes from 'prop-types';
import {THEME_CONTEXT_TYPES as polarisTheme} from '../ThemeProvider';
import {Intl, Link, StickyManager, ScrollLockManager} from './utilities';

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
