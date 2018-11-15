import * as PropTypes from 'prop-types';

import {Context as AppProviderContext} from './AppProvider';
import {ContextualSaveBarProps} from './ContextualSaveBar';
import {Props as ToastProps} from './Toast';
import {Context as ThemeProviderContext} from './ThemeProvider';

export interface PolarisContext
  extends AppProviderContext,
    ThemeProviderContext {}

export interface FrameManager {
  showToast(toast: {id: string} & ToastProps): void;
  hideToast(toast: {id: string}): void;
  setContextualSaveBar(props: ContextualSaveBarProps): void;
  removeContextualSaveBar(): void;
  startLoading(): void;
  stopLoading(): void;
}

export interface FrameContext {
  frame: FrameManager;
}

export const frameContextTypes = {
  frame: PropTypes.object,
};

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
