import {noop} from '@shopify/javascript-utilities/other';
import {
  FrameContext,
  ContextualSaveBarProps,
  ToastID,
  ToastPropsWithID,
} from '../../types';

export interface CreateFrameContext {
  showToast?(toast: ToastPropsWithID): void;
  hideToast?(toast: ToastID): void;
  setContextualSaveBar?(props: ContextualSaveBarProps): void;
  removeContextualSaveBar?(): void;
  startLoading?(): void;
  stopLoading?(): void;
}

export default function createFrameContext({
  showToast = noop,
  hideToast = noop,
  setContextualSaveBar = noop,
  removeContextualSaveBar = noop,
  startLoading = noop,
  stopLoading = noop,
}: CreateFrameContext = {}): FrameContext {
  return {
    frame: {
      showToast,
      hideToast,
      setContextualSaveBar,
      removeContextualSaveBar,
      startLoading,
      stopLoading,
    },
  };
}
