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
  /** Control the rendering */
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
    const {visible, message, primaryAction, cancelAction} = this.props;

    if (!visible && oldProps.visible) {
      this.context.frame.removeContextBar();
      return;
    }

    if (
      (visible && !oldProps.visible) ||
      message !== oldProps.message ||
      !isEqual(primaryAction, oldProps.primaryAction) ||
      !isEqual(cancelAction, oldProps.cancelAction)
    ) {
      this.context.frame.setContextBar(this.props);
    }
  }

  render() {
    return null;
  }
}

export default ContextBar;
