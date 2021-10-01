import {memo, useEffect} from 'react';

import {
  ContextualSaveBarProps as ContextualSaveBarProps1,
  useFrame,
} from '../../utilities/frame';

// The script in the styleguide that generates the Props Explorer data expects
// that the interface defining the props is defined in this file, not imported
// from elsewhere. This silly workaround ensures that the Props Explorer table
// is generated correctly.
export interface ContextualSaveBarProps extends ContextualSaveBarProps1 {}

export const ContextualSaveBar = memo(function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  alignContentFlush,
  fullWidth,
  contextControl,
}: ContextualSaveBarProps) {
  const {setContextualSaveBar, removeContextualSaveBar} = useFrame();

  useEffect(() => {
    setContextualSaveBar({
      message,
      saveAction,
      discardAction,
      alignContentFlush,
      fullWidth,
      contextControl,
    });
  }, [
    message,
    saveAction,
    discardAction,
    alignContentFlush,
    setContextualSaveBar,
    fullWidth,
    contextControl,
  ]);

  useEffect(() => {
    return removeContextualSaveBar;
  }, [removeContextualSaveBar]);

  return null;
});
