import * as React from 'react';
import {KeypressListener} from '../../../../components';
import Icon from '../../../Icon';
import {Keys} from '../../../../types';
import {ToastDescriptor} from '../../../types';
import * as styles from './Toast.scss';

export type Props = ToastDescriptor;

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
    const {children, onDismiss} = this.props;

    const dismissMarkup = (
      <button type="button" className={styles.CloseButton} onClick={onDismiss}>
        <Icon source="cancel" />
      </button>
    );

    return (
      <div className={styles.Toast}>
        <KeypressListener keyCode={Keys.ESCAPE} handler={onDismiss} />
        {children}
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
    const {onDismiss, duration = 5000} = this.props;

    this.clearDismissalTimeout();
    if (onDismiss != null && duration != null) {
      this.timer = window.setTimeout(onDismiss, duration);
    }
  }
}
