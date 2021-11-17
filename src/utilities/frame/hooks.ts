import {useContext} from 'react';

import {LogoContext, FrameContext} from './context';

export function useFrame() {
  const frame = useContext(FrameContext);

  if (!frame) {
    throw new Error(
      'No Frame context was provided. Your component must be wrapped in a <Frame> component. See https://polaris.shopify.com/components/structure/frame for implementation instructions.',
    );
  }

  return frame;
}

export function useLogo() {
  return useContext(LogoContext);
}
