import * as PropTypes from 'prop-types';

import {Context as AppProviderContext} from './AppProvider';
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

// FROM ContextualSaveBar

export interface Action {
  /** A destination to link to */
  url?: string;
  /** Content the action displays */
  content?: string;
  /** Should a spinner be displayed */
  loading?: boolean;
  /** Should the action be disabled */
  disabled?: boolean;
  /** Callback when an action takes place */
  onAction?(): void;
}

interface DiscardActionProps {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal?: boolean;
}

type CombinedActionProps = DiscardActionProps & Action;

export interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: Action;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: CombinedActionProps;
}
