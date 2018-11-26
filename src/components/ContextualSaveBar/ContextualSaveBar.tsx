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
  /** Extend the contents section to be flush with the left edge  */
  alignContentFlush?: boolean;
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
