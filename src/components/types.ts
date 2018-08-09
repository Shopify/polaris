import * as PropTypes from 'prop-types';
import {ContextualSaveBarProps} from '../components/ContextualSaveBar';

export interface FrameManager {
  showToast(toast: {id: string} & ToastDescriptor): void;
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
  frame: PropTypes.object.isRequired,
};

export interface ToastDescriptor {
  /** The content that should appear in the toast message */
  content: string;
  /** The length of time in milliseconds the toast message should persist (defaults to 5000) */
  duration?: number;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
}

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
