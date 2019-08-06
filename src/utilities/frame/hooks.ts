import {useContext} from 'react';
import {useAppBridge} from '../app-bridge';
import {FrameContext} from './context';

// TODO: Delete this when removing appBridge
const defaultFrame: NonNullable<React.ContextType<typeof FrameContext>> = {
  showToast: noop,
  hideToast: noop,
  setContextualSaveBar: noop,
  removeContextualSaveBar: noop,
  startLoading: noop,
  stopLoading: noop,
};

export function useFrame() {
  const frame = useContext(FrameContext);
  const appBridge = useAppBridge();

  if (!frame && !appBridge) {
    throw new Error(
      'No Frame context was provided. Your component must be wrapped in a <Frame> component, or be used within an embedded application by setting the apiKey and shopOrigin properties on <AppProvider>. See https://polaris.shopify.com/components/structure/frame for implementation instructions.',
    );
  }

  // This makes sure the useFrame hook always returns a FrameContext object, never undefined
  if (appBridge || !frame) {
    return defaultFrame;
  }

  return frame;
}

function noop() {}
