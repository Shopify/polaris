import {createContext} from 'react';

import type {
  ToastPropsWithID,
  ToastID,
  ContextualSaveBarProps,
  Logo,
} from './types';

// This is internal, but TS throws a build-time error if we don't export it
export interface FrameContextType {
  logo?: Logo;
  showToast(toast: ToastPropsWithID): void;
  hideToast(toast: ToastID): void;
  setContextualSaveBar(props: ContextualSaveBarProps): void;
  removeContextualSaveBar(): void;
  startLoading(): void;
  stopLoading(): void;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined,
);
