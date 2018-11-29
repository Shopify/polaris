import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {
  ContextualSaveBarProps,
  FrameContext,
  frameContextTypes,
} from '../Frame';

class ContextualSaveBar extends React.PureComponent<
  ContextualSaveBarProps,
  never
> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    this.context.frame.setContextualSaveBar(this.props);
  }

  componentWillUnmount() {
    this.context.frame.removeContextualSaveBar();
  }

  componentDidUpdate(oldProps: ContextualSaveBarProps) {
    if (contextualSaveBarHasChanged(this.props, oldProps)) {
      this.context.frame.setContextualSaveBar(this.props);
    }
  }

  render() {
    return null;
  }
}

function contextualSaveBarHasChanged(
  {message, saveAction, discardAction}: ContextualSaveBarProps,
  {
    message: oldMessage,
    saveAction: oldsaveAction,
    discardAction: oldDiscardAction,
  }: ContextualSaveBarProps,
) {
  return Boolean(
    message !== oldMessage ||
      !isEqual(saveAction, oldsaveAction) ||
      !isEqual(discardAction, oldDiscardAction),
  );
}

export default ContextualSaveBar;
