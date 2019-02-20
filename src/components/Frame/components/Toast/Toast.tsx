import * as React from 'react';
import {classNames} from '@shopify/react-utilities';

import {Key} from '../../../../types';
import Button from '../../../Button';

import Icon from '../../../Icon';
import KeypressListener from '../../../KeypressListener';
import {ToastProps as Props, ToastDuration} from '../../types';

import styles from './Toast.scss';

export const DEFAULT_TOAST_DURATION = ToastDuration.Base;
export const DEFAULT_TOAST_DURATION_WITH_ACTION = ToastDuration.Slow;

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
    const {content, onDismiss, error, action} = this.props;

    const dismissMarkup = (
      <button
        type="button"
        className={styles.CloseButton}
        onClick={onDismiss}
        testID="closeButton"
      >
        <Icon source="cancel" />
      </button>
    );

    const actionMarkup = action ? (
      <div className={styles.Action}>
        <Button plain monochrome onClick={action.onAction}>
          {action.content}
        </Button>
      </div>
    ) : null;

    const className = classNames(styles.Toast, error && styles.error);

    return (
      <div className={className}>
        <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
        {content}
        {actionMarkup}
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
    const {onDismiss, duration, action} = this.props;

    let timeoutDuration = duration || DEFAULT_TOAST_DURATION;

    if (action && !duration) {
      timeoutDuration = DEFAULT_TOAST_DURATION_WITH_ACTION;
    } else if (
      action &&
      duration &&
      duration < DEFAULT_TOAST_DURATION_WITH_ACTION
    ) {
      // eslint-disable-next-line no-console
      console.log(
        'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      );
    }

    this.clearDismissalTimeout();
    if (onDismiss != null) {
      this.timer = window.setTimeout(onDismiss, timeoutDuration);
    }
  }
}
