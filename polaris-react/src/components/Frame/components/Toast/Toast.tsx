import React, {useEffect, useRef, useState} from 'react';
import {
  CancelSmallMinor,
  AlertMinor,
  CircleTickMinor,
  InfoMinor,
  RiskMinor,
} from '@shopify/polaris-icons';
import {CSSTransition} from 'react-transition-group';

import {classNames} from '../../../../utilities/css';
import {Key} from '../../../../types';
import {Button} from '../../../Button';
import {Icon} from '../../../Icon';
import {Text} from '../../../Text';
import {KeypressListener} from '../../../KeypressListener';
import type {ToastProps} from '../../../../utilities/frame';

import styles from './Toast.scss';

export type {ToastProps};

export const DEFAULT_TOAST_DURATION = 5000;

export const DEFAULT_TOAST_DURATION_WITH_ACTION = 10000;

export function Toast({
  title,
  content,
  onDismiss,
  duration,
  error,
  action,
  type,
}: ToastProps) {
  const nodeRef = useRef(null);
  const [inProp, setInProp] = useState(false);
  const [timeoutDuration, setTimeoutDuration] = useState(
    duration || DEFAULT_TOAST_DURATION,
  );
  useEffect(() => {
    if (action && !duration) {
      setTimeoutDuration(DEFAULT_TOAST_DURATION_WITH_ACTION);
    } else if (
      action &&
      duration &&
      duration < DEFAULT_TOAST_DURATION_WITH_ACTION
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'Toast with action should persist for at least 10,000 milliseconds to give the user enough time to act on it.',
      );
    }

    const timer = setTimeout(onDismiss, timeoutDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [action, duration, onDismiss, timeoutDuration]);

  useEffect(() => {
    setInProp(true);
  }, []);

  let toastType = 'info';
  if (error) {
    toastType = 'error';
  } else if (type) {
    toastType = type;
  }

  let toastIndicatorClass;
  let progressIndicatorClass;
  let iconSource;
  let iconClass;
  switch (toastType) {
    case 'success':
      toastIndicatorClass = styles.SuccessIndicator;
      iconClass = styles.LeadingIconSuccess;
      progressIndicatorClass = styles.SuccessIndicatorProgress;
      iconSource = CircleTickMinor;
      break;
    case 'error':
      toastIndicatorClass = styles.ErrorIndicator;
      iconClass = styles.LeadingIconError;
      progressIndicatorClass = styles.ErrorIndicatorProgress;
      iconSource = AlertMinor;
      break;
    case 'warning':
      toastIndicatorClass = styles.WarningIndicator;
      iconClass = styles.LeadingIconWarning;
      progressIndicatorClass = styles.WarningIndicatorProgress;
      iconSource = RiskMinor;

      break;
    default:
      toastIndicatorClass = styles.InfoIndicator;
      iconClass = styles.LeadingIconInfo;
      progressIndicatorClass = styles.InfoIndicatorProgress;
      iconSource = InfoMinor;
  }

  const dismissMarkup = (
    <button type="button" className={styles.CloseButton} onClick={onDismiss}>
      <Icon source={CancelSmallMinor} />
    </button>
  );

  const actionMarkup = action ? (
    <div className={styles.Action}>
      <Button plain monochrome size="slim" onClick={action.onAction}>
        {action.content}
      </Button>
    </div>
  ) : null;

  const leadingIconMarkup = (
    <div className={`${styles.LeadingIcon} ${iconClass}`}>
      <Icon source={iconSource} color="base" />
    </div>
  );
  const className = classNames(styles.Toast, error && styles.error);

  return (
    <div className={className}>
      <KeypressListener keyCode={Key.Escape} handler={onDismiss} />
      <div className={`${styles.ToastStatusIndicator} ${toastIndicatorClass}`}>
        <CSSTransition
          nodeRef={nodeRef}
          appear
          in={inProp}
          timeout={0}
          classNames={{
            enter: classNames(styles['ProgressIndicator-enter']),
            enterDone: classNames(styles['ProgressIndicator-enter-done']),
            appear: 'my-appear',
            appearActive: 'my-active-appear',
            appearDone: classNames(styles['ProgressIndicator-enter']),
            enterActive: 'my-active-enter',
            exit: 'my-exit',
            exitActive: 'my-active-exit',
            exitDone: 'my-done-exit',
          }}
        >
          <div
            ref={nodeRef}
            className={`${styles.ProgressIndicator} ${progressIndicatorClass}`}
            style={{
              transitionDuration: `${timeoutDuration}ms`,
              transitionProperty: 'width',
            }}
          />
        </CSSTransition>
      </div>
      <div className={styles.ToastContent}>
        {leadingIconMarkup}

        <div className={`${styles.ToastText}`}>
          {title && <div className={styles.ToastTitle}>{title}</div>}

          <div>
            <Text as="span" variant="bodyMd" fontWeight="medium">
              {content}
            </Text>
          </div>
        </div>

        {actionMarkup}
        {dismissMarkup}
      </div>
    </div>
  );
}
