import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import Icon from '../Icon';
import Portal from '../Portal';

import * as styles from './FlashMessage.scss';

export interface Props {
  children?: React.ReactNode,
  dismissible?: boolean,
  error?: boolean,
  duration: number,
  onDismiss?(): void,
}

export default class FlashMessage extends React.Component<Props, never> {
  componentDidUpdate() {
    this.triggerDismissalTimeout();
  }

  componentDidMount() {
    this.triggerDismissalTimeout();
  }

  render() {
    const {
      children,
      dismissible,
      onDismiss,
      error,
    } = this.props;

    const className = classNames(
      styles.Content,
      error && styles.error,
    );

    const dismissMarkup = dismissible
      ? (
        <button
          testID="button"
          className={styles.CloseButton}
          onClick={onDismiss}
        >
          <Icon source="cancel" />
        </button>
      )
      : null;

    return (
      <Portal idPrefix="flashMessage">
        <div className={styles.FlashMessage}>
          <span className={className}>
            {children}
            {dismissMarkup}
          </span>
        </div>
      </Portal>
    );
  }

  private triggerDismissalTimeout() {
    const {onDismiss, duration} = this.props;

    if (onDismiss != null) {
      setTimeout(onDismiss, duration);
    }
  }
}
