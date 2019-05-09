import {noop} from '@shopify/javascript-utilities/other';
import {FrameContextType} from '../../context';

export default function createFrameContext({
  showToast = noop,
  hideToast = noop,
  setContextualSaveBar = noop,
  removeContextualSaveBar = noop,
  startLoading = noop,
  stopLoading = noop,
}: Partial<FrameContextType> = {}): FrameContextType {
  return {
    showToast,
    hideToast,
    setContextualSaveBar,
    removeContextualSaveBar,
    startLoading,
    stopLoading,
  };
}
