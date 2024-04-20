import React, {useEffect, useRef} from 'react';
import {AlertCircleIcon, XSmallIcon} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../../../utilities/css';
import {Key} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {KeypressListener} from '../../../KeypressListener';
import type {ToastProps} from '../../../../utilities/frame';

import styles from './Toast.module.css';

export type {ToastProps};

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;

export function Toast({
  content,
  onDismiss,
  duration,
  error,
  action,
  tone,
  onClick,
  icon,
  isHovered,
}: ToastProps) {
  const defaultDurationWithoutAction = duration || DEFAULT_TOAST_DURATION;
  const defaultDuration =
    action && !duration
      ? DEFAULT_TOAST_DURATION_WITH_ACTION
      : defaultDurationWithoutAction;
  const durationRemaining = useRef<number>(defaultDuration);
  const timeoutStart = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function resume() {
      timeoutStart.current = Date.now();
      timer.current = setTimeout(() => {
        onDismiss();
      }, durationRemaining.current);
    }

    function pause() {
      if (timeoutStart.current) {
        durationRemaining.current -= Date.now() - timeoutStart.current;
      }
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = null;
    }
    if (isHovered) {
      pause();
    } else {
      resume();
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [isHovered, onDismiss]);

  useEffect(() => {
    if (action && duration && duration < DEFAULT_TOAST_DURATION_WITH_ACTION) {
      // eslint-disable-next-line no-console
      console.log(
        'Toast with action should persist for at least 10,000 milliseconds to give the merchant enough time to act on it.',
      );
    }
  }, [action, duration]);

  const dismissMarkup = (
    <button type="button" className={styles.CloseButton} onClick={onDismiss}>
      <Icon source={XSmallIcon} tone="inherit" />
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

  let leadingIconMarkup = null;

  if (error) {
    leadingIconMarkup = (
      <div className={styles.LeadingIcon}>
        <Icon source={AlertCircleIcon} tone="inherit" />
      </div>
    );
  } else if (icon) {
    leadingIconMarkup = (
      <div className={styles.LeadingIcon}>
        <Icon source={icon} tone="inherit" />
      </div>
    );
  }

  const className = classNames(
    styles.Toast,
    error && styles.error,
    tone && styles[variationName('tone', tone)],
  );

  if (!action && onClick) {
    return (
      <button
        aria-live="assertive"
        className={classNames(className, styles.WithActionOnComponent)}
        type="button"
        onClick={onClick}
      >
        <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
        {leadingIconMarkup}
        <InlineStack gap="400" blockAlign="center">
          <Text
            as="span"
            variant="bodyMd"
            fontWeight="medium"
            {...(tone === 'magic' && {tone: 'magic'})}
          >
            {content}
          </Text>
        </InlineStack>
      </button>
    );
  }

  return (
    <div className={className} aria-live="assertive">
      <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
      {leadingIconMarkup}
      <InlineStack gap="400" blockAlign="center">
        <Text
          as="span"
          variant="bodyMd"
          fontWeight="medium"
          {...(tone === 'magic' && {tone: 'magic'})}
        >
          {content}
        </Text>
      </InlineStack>
      {actionMarkup}
      {dismissMarkup}
    </div>
  );
}
