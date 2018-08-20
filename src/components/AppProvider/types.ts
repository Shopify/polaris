import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';
import {Props as AppProviderProps} from '../AppProvider';

import Intl from './Intl';
import Link from './Link';
import EASDK from './EASDK';
import StickyManager from './StickyManager';
import ScrollLockManager from './ScrollLockManager';
import {
  THEME_CONTEXT_TYPES as polarisTheme,
  ThemeContext,
} from '../ThemeProvider';

export const polarisAppProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
  easdk: PropTypes.any,
  ...polarisTheme,
};

export interface WithAppProviderProps {
  polaris: {
    intl: Intl;
    link: Link;
    easdk: EASDK;
    stickyManager: StickyManager;
    scrollLockManager: ScrollLockManager;
    theme: ThemeContext;
    subscribe(callback: () => void): void;
    unsubscribe(callback: () => void): void;
  };
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface PrimitiveReplacementDictionary {
  [key: string]: string | number;
}

export interface ComplexReplacementDictionary {
  [key: string]: string | number | React.ReactNode;
}

export interface CreateAppProviderContext extends AppProviderProps {
  stickyManager?: StickyManager;
  scrollLockManager?: ScrollLockManager;
  subscribe?(callback: () => void): void;
  unsubscribe?(callback: () => void): void;
}
