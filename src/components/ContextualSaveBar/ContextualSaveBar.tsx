import React from 'react';
import {ContextualSaveBarProps, useFrame} from '../../utilities/frame';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ContextualSaveBar extends React.Component<ContextualSaveBarProps>`
export interface ContextualSaveBarProps extends ContextualSaveBarProps {}

// This does have a display name, but the linting has a bug in it
// https://github.com/yannickcr/eslint-plugin-react/issues/2324
// eslint-disable-next-line react/display-name
export const ContextualSaveBar = React.memo(function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  alignContentFlush,
}: ContextualSaveBarProps) {
  const {setContextualSaveBar, removeContextualSaveBar} = useFrame();

  React.useEffect(
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
});
