import React from 'react';
import {ContextualSaveBarProps, useFrame} from '../../utilities/frame';
import {useDeepEffect} from '../../utilities/use-deep-effect';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ContextualSaveBar extends React.Component<ContextualSaveBarProps>`
export interface Props extends ContextualSaveBarProps {}

function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  alignContentFlush,
}: Props) {
  const {setContextualSaveBar, removeContextualSaveBar} = useFrame();

  useDeepEffect(
    () => {
      setContextualSaveBar({
        message,
        saveAction,
        discardAction,
        alignContentFlush,
      });
    },
    [
      message,
      saveAction,
      discardAction,
      alignContentFlush,
      setContextualSaveBar,
    ],
  );

  React.useEffect(
    () => {
      return removeContextualSaveBar;
    },
    [removeContextualSaveBar],
  );

  return null;
}

export default React.memo(ContextualSaveBar);
