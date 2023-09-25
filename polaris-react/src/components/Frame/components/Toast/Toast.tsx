import React, {useEffect} from 'react';
import {
  AlertMinor,
  CancelSmallMinor,
  DiamondAlertMinor,
} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {Key} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {HorizontalStack} from '../../../HorizontalStack';
import {Text} from '../../../Text';
import {KeypressListener} from '../../../KeypressListener';
import type {ToastProps} from '../../../../utilities/frame';
import {useFeatures} from '../../../../utilities/features';

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

  const {polarisSummerEditions2023} = useFeatures();

  const actionMarkup = action ? (
    <div className={styles.Action}>
      <Button
        plain
        monochrome
        removeUnderline={polarisSummerEditions2023}
        size="slim"
        onClick={action.onAction}
      >
        {action.content}
      </Button>
    </div>
  ) : null;

  const leadingIconMarkup = error ? (
    <div className={styles.LeadingIcon}>
      <Icon
        source={polarisSummerEditions2023 ? AlertMinor : DiamondAlertMinor}
        color="base"
      />
    </div>
  ) : null;

  const className = classNames(styles.Toast, error && styles.error);

  return (
    <div className={className}>
      <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
      {leadingIconMarkup}
      <HorizontalStack gap="4" blockAlign="center">
        <Text as="span" fontWeight="medium">
          {content}
        </Text>
      </HorizontalStack>
      {actionMarkup}
      {dismissMarkup}
    </div>
  );
}
