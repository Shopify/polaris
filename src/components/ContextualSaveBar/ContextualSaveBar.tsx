import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {FrameContext, frameContextTypes} from '../types';

export interface Action {
  /** A destination to link to */
  url?: string;
  /** Content the action displays */
  content?: string;
  /** Should a spinner be displayed */
  loading?: boolean;
  /** Should the action be disabled */
  disabled?: boolean;
  /** Callback when an action takes place */
  onAction?(): void;
}

interface DiscardActionProps {
  /** Whether to show a modal confirming the discard action */
  discardConfirmationModal?: boolean;
}

type CombinedActionProps = DiscardActionProps & Action;

export interface Props {
  /** A boolean property indicating  whether the contextual save bar is currently visible */
  visible: boolean;
  /** Accepts a string of content that will be rendered to the left of the actions */
  message?: string;
  /** Save or commit contextual save bar action with text defaulting to 'Save' */
  saveAction?: Action;
  /** Discard or cancel contextual save bar action with text defaulting to 'Discard' */
  discardAction?: CombinedActionProps;
}

class ContextualSaveBar extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    if (this.props.visible) {
      this.context.frame.setContextualSaveBar(this.props);
    } else {
      this.context.frame.removeContextualSaveBar();
    }
  }

  componentWillUnmount() {
    this.context.frame.removeContextualSaveBar();
  }

  componentDidUpdate(oldProps: Props) {
    const {visible} = this.props;

    if (!visible && oldProps.visible) {
      this.context.frame.removeContextualSaveBar();
      return;
    }

    if (contextualSaveBarHasChanged(this.props, oldProps)) {
      this.context.frame.setContextualSaveBar(this.props);
    }
  }

  render() {
    return null;
  }
}

function contextualSaveBarHasChanged(
  {visible, message, saveAction, discardAction}: Props,
  {
    visible: oldVisible,
    message: oldMessage,
    saveAction: oldsaveAction,
    discardAction: oldDiscardAction,
  }: Props,
) {
  return Boolean(
    (visible && !oldVisible) ||
      message !== oldMessage ||
      !isEqual(saveAction, oldsaveAction) ||
      !isEqual(discardAction, oldDiscardAction),
  );
}

export default ContextualSaveBar;
