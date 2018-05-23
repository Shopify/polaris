import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Icon, Portal} from '../../../';

import {FlashDescriptor} from '../../../types';
import * as styles from './Flash.scss';

export type Props = FlashDescriptor;

export default class Flash extends React.Component<Props, never> {
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
    const {children, dismissible, onDismiss, error, duration} = this.props;
    const className = classNames(styles.Flash, error && styles.error);
    const finalDismissible = dismissible || duration == null;

    const dismissMarkup = finalDismissible ? (
      <button type="button" className={styles.CloseButton} onClick={onDismiss}>
        <Icon source="cancel" />
      </button>
    ) : null;

    return (
      <Portal idPrefix="FlashMessage">
        <div className={className}>
          <span className={styles.Content}>
            {children}
            {dismissMarkup}
          </span>
        </div>
      </Portal>
    );
  }

  private clearDismissalTimeout() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  }

  private triggerDismissalTimeout() {
    const {onDismiss, duration} = this.props;

    this.clearDismissalTimeout();

    if (onDismiss != null && duration != null) {
      this.timer = window.setTimeout(onDismiss, duration);
    }
  }
}
