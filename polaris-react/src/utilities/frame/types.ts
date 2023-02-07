import type {Action} from '../../types';

export interface Logo {
  /** Provides a path for a logo used on a dark background */
  topBarSource?: string;
  /** Provides a path for a logo used on a light background */
  contextualSaveBarSource?: string;
  /** Destination the merchant will navigate to when clicking the logo */
  url?: string;
  /** Accessible label the logo image */
  accessibilityLabel?: string;
  /** Number of pixels wide the logo image is */
  width?: number;
}

interface ContextualSaveBarAction {
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

interface ContextualSaveBarDiscardActionProps {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal?: boolean;
}

type ContextualSaveBarCombinedActionProps =
  ContextualSaveBarDiscardActionProps & ContextualSaveBarAction;

export interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: ContextualSaveBarAction;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: ContextualSaveBarCombinedActionProps;
  /** Remove the normal max-width on the contextual save bar */
  fullWidth?: boolean;
  /** Accepts a component that is used to help users switch between different contexts */
  contextControl?: React.ReactNode;
  /** Accepts a node that is rendered to the left of the discard and save actions */
  secondaryMenu?: React.ReactNode;
}

// Toast

export interface ToastProps {
  /** The content that should appear in the toast message */
  content: string;
  /**
   * The length of time in milliseconds the toast message should persist
   * @default 5000
   */
  duration?: number;
  /** Display an error toast. */
  error?: boolean;
  /** Callback when the dismiss icon is clicked */
  onDismiss(): void;
  /** Adds an action next to the message */
  action?: Action;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export interface ToastID {
  id: string;
}

export type ToastPropsWithID = ToastProps & ToastID;
