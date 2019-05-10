import {noop} from '@shopify/javascript-utilities/other';
import {ContextualSaveBarProps, ToastID, ToastPropsWithID} from '../../types';
import {FrameContextType} from '../../context';

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
}: CreateFrameContext = {}): FrameContextType {
  return {
    showToast,
    hideToast,
    setContextualSaveBar,
    removeContextualSaveBar,
    startLoading,
    stopLoading,
  };
}
