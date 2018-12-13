import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {
  ContextualSaveBarProps,
  FrameContext,
  frameContextTypes,
} from '../Frame';

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `ContextualSaveBar extends React.Component<ContextualSaveBarProps>`
interface Props extends ContextualSaveBarProps {}

class ContextualSaveBar extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    this.context.frame.setContextualSaveBar(this.props);
  }

  componentWillUnmount() {
    this.context.frame.removeContextualSaveBar();
  }

  componentDidUpdate(oldProps: Props) {
    if (contextualSaveBarHasChanged(this.props, oldProps)) {
      this.context.frame.setContextualSaveBar(this.props);
    }
  }

  render() {
    return null;
  }
}

function contextualSaveBarHasChanged(
  {message, saveAction, discardAction}: Props,
  {
    message: oldMessage,
    saveAction: oldsaveAction,
    discardAction: oldDiscardAction,
  }: Props,
) {
  return Boolean(
    message !== oldMessage ||
      !isEqual(saveAction, oldsaveAction) ||
      !isEqual(discardAction, oldDiscardAction),
  );
}

export default ContextualSaveBar;
