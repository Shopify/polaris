import React from 'react';
import {ContextualSaveBarProps, FrameContext} from '../Frame';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ContextualSaveBar extends React.Component<ContextualSaveBarProps>`
interface Props extends ContextualSaveBarProps {}

function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  alignContentFlush,
}: Props) {
  const frame = React.useContext(FrameContext);

  React.useEffect(
    () => {
      if (!frame) return;

      frame.setContextualSaveBar({
        message,
        saveAction,
        discardAction,
        alignContentFlush,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [message, saveAction, discardAction, alignContentFlush],
  );

  React.useEffect(
    () => {
      return () => {
        if (!frame) return;
        frame.removeContextualSaveBar();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return null;
}

export default React.memo(ContextualSaveBar);
