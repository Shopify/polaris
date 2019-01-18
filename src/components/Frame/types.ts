export interface FrameManager {
  showToast(toast: ToastPropsWithID): void;
  hideToast(toast: ToastID): void;
  setContextualSaveBar(props: ContextualSaveBarProps): void;
  removeContextualSaveBar(): void;
  startLoading(): void;
  stopLoading(): void;
}

export interface FrameContext {
  frame: FrameManager;
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

type ContextualSaveBarCombinedActionProps = ContextualSaveBarDiscardActionProps &
  ContextualSaveBarAction;

export interface ContextualSaveBarProps {
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: ContextualSaveBarAction;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: ContextualSaveBarCombinedActionProps;
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
}

export interface ToastID {
  id: string;
}

export type ToastPropsWithID = ToastProps & ToastID;
