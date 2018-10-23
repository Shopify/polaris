import * as React from 'react';
import {classNames} from '@shopify/react-utilities';
import {
  KeypressListener,
  ToastProps,
  DEFAULT_TOAST_DURATION,
} from '../../../../components';
import Icon from '../../../Icon';
import {Key} from '../../../../types';

import * as styles from './Toast.scss';

export type Props = ToastProps;

export default class Toast extends React.Component<Props, never> {
  private timer?: number;

  componentDidUpdate() {
    this.triggerDismissalTimeout();
  }

  componentDidMount() {
    this.triggerDismissalTimeout();
  }

  componentWillUnmount() {
    this.clearDismissalTimeout();
  }

  render() {
    const {content, onDismiss, error} = this.props;

    const dismissMarkup = (
      <button type="button" className={styles.CloseButton} onClick={onDismiss}>
        <Icon source="cancel" />
      </button>
    );

    const className = classNames(styles.Toast, error && styles.error);

    return (
      <div className={className}>
        <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
        {content}
        {dismissMarkup}
      </div>
    );
  }

  private clearDismissalTimeout() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

  private triggerDismissalTimeout() {
    const {onDismiss, duration = DEFAULT_TOAST_DURATION} = this.props;

    this.clearDismissalTimeout();
    if (onDismiss != null && duration != null) {
      this.timer = window.setTimeout(onDismiss, duration);
    }
  }
}
