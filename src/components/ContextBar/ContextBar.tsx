import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {FrameContext, frameContextTypes} from '../types';

export interface Brand {
  /** A unique identifier */
  id: string;
  /** The source of the content to be displayed */
  src: string;
}

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

export interface Props {
  /**  Logo information */
  branding: Brand;
  /** Toggle whether the context bar is visible */
  visible: boolean;
  /** Content the context bar displays */
  message?: string;
  /** Primary context bar action */
  primaryAction?: Action;
  /**  Cancel action */
  cancelAction?: Action;
}

class ContextBar extends React.PureComponent<Props, never> {
  static contextTypes = frameContextTypes;
  context: FrameContext;

  componentDidMount() {
    if (this.props.visible) {
      this.context.frame.setContextBar(this.props);
    } else {
      this.context.frame.removeContextBar();
    }
  }

  componentWillUnmount() {
    this.context.frame.removeContextBar();
  }

  componentDidUpdate(oldProps: Props) {
    const {visible} = this.props;

    if (!visible && oldProps.visible) {
      this.context.frame.removeContextBar();
      return;
    }

    if (contextBarHasChanged(this.props, oldProps)) {
      this.context.frame.setContextBar(this.props);
    }
  }

  render() {
    return null;
  }
}

function contextBarHasChanged(
  {visible, message, primaryAction, cancelAction}: Props,
  {
    visible: oldVisible,
    message: oldMessage,
    primaryAction: oldPrimaryAction,
    cancelAction: oldCancelAction,
  }: Props,
) {
  return Boolean(
    (visible && !oldVisible) ||
      message !== oldMessage ||
      !isEqual(primaryAction, oldPrimaryAction) ||
      !isEqual(cancelAction, oldCancelAction),
  );
}

export default ContextBar;
