import React, {useEffect} from 'react';
import {AlertMinor, CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {Key} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {KeypressListener} from '../../../KeypressListener';
import type {ToastProps} from '../../../../utilities/frame';

import styles from './Toast.scss';

export type {ToastProps};

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;

export function Toast({
  content,
  onDismiss,
  duration,
  error,
  action,
}: ToastProps) {
  useEffect(() => {
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

    const timer = setTimeout(onDismiss, timeoutDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [action, duration, onDismiss]);

  const dismissMarkup = (
    <button type="button" className={styles.CloseButton} onClick={onDismiss}>
      <Icon source={CancelSmallMinor} />
    </button>
  );

  const actionMarkup = action ? (
    <div className={styles.Action}>
      <Button
        variant="monochromePlain"
        removeUnderline
        size="slim"
        onClick={action.onAction}
      >
        {action.content}
      </Button>
    </div>
  ) : null;

  const leadingIconMarkup = error ? (
    <div className={styles.LeadingIcon}>
      <Icon source={AlertMinor} tone="base" />
    </div>
  ) : null;

  const className = classNames(styles.Toast, error && styles.error);

  return (
    <div className={className} aria-live="assertive">
      <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
      {leadingIconMarkup}
      <InlineStack gap="400" blockAlign="center">
        <Text as="span" fontWeight="medium">
          {content}
        </Text>
      </InlineStack>
      {actionMarkup}
      {dismissMarkup}
    </div>
  );
}
