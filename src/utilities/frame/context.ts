import React from 'react';
import {ToastPropsWithID, ToastID, ContextualSaveBarProps} from './types';

// This is internal, but TS throws a build-time error if we don't export it
export interface FrameContextType {
  showToast(toast: ToastPropsWithID): void;
  hideToast(toast: ToastID): void;
  setContextualSaveBar(props: ContextualSaveBarProps): void;
  removeContextualSaveBar(): void;
  startLoading(): void;
  stopLoading(): void;
}

export const FrameContext = React.createContext<FrameContextType | undefined>(
  undefined,
);
