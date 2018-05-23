import * as PropTypes from 'prop-types';

export interface FrameManager {
  showFlash(flash: {id: string} & FlashDescriptor): void;
  hideFlash(flash: {id: string}): void;
  startLoading(): void;
  stopLoading(): void;
  resetLoading(): void;
}

export interface FrameContext {
  frame: FrameManager;
}

export const frameContextTypes = {
  frame: PropTypes.object.isRequired,
};

export interface FlashDescriptor {
  children?: React.ReactNode;
  error?: boolean;
  duration?: number;
  dismissible?: boolean;
  onDismiss(): void;
}
