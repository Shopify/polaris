import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ToastPropsWithID, ToastID, ContextualSaveBarProps} from './types';

export interface FrameContextType {
  showToast(toast: ToastPropsWithID): void;
  hideToast(toast: ToastID): void;
  setContextualSaveBar(props: ContextualSaveBarProps): void;
  removeContextualSaveBar(): void;
  startLoading(): void;
  stopLoading(): void;
}

const defaultContext: FrameContextType = {
  showToast: noop,
  hideToast: noop,
  setContextualSaveBar: noop,
  removeContextualSaveBar: noop,
  startLoading: noop,
  stopLoading: noop,
};

const FrameContext = React.createContext<FrameContextType>(defaultContext);

export default FrameContext;
