import React, {createRef, memo} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {classNames} from '../../../../utilities/css';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';
import {Portal} from '../../../Portal';
import type {ToastPropsWithID} from '../../../../utilities/frame';
import {Toast} from '../Toast';
import {useDeepEffect} from '../../../../utilities/use-deep-effect';
import {useDeepCallback} from '../../../../utilities/use-deep-callback';

import styles from './ToastManager.scss';

export interface ToastManagerProps {
  toastMessages: ToastPropsWithID[];
}

export const ToastManager = memo(function ToastManager({
  toastMessages,
}: ToastManagerProps) {
  const toastNodes: React.RefObject<HTMLDivElement>[] = [];

  const updateToasts = useDeepCallback(() => {
    let yPosition = 25;
    toastMessages.forEach((_, index) => {
      const currentToast = toastNodes[index];
      if (!currentToast.current) return;
      if (index > 0) {
        yPosition += currentToast.current.clientHeight;
      }
      const targetInPos = currentToast.current.clientWidth;
      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-x-in',
        `-${targetInPos}px`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-x-out',
        `-${targetInPos}px`,
      );
      currentToast.current.style.setProperty('top', `${yPosition}px`);
    });
  }, [toastMessages, toastNodes]);

  useDeepEffect(() => {
    updateToasts();
  }, [toastMessages]);

  const toastsMarkup = toastMessages.map((toast, index) => {
    const toastNode = createRef<HTMLDivElement>();
    toastNodes[index] = toastNode;

    return (
      <CSSTransition
        nodeRef={toastNodes[index]}
        key={toast.id}
        timeout={{enter: 0, exit: 400}}
        classNames={toastClasses}
      >
        <div ref={toastNode}>
          <Toast {...toast} />
        </div>
      </CSSTransition>
    );
  });

  return (
    <Portal>
      <EventListener event="resize" handler={updateToasts} />
      <div className={styles.ToastManager} aria-live="assertive">
        <TransitionGroup component={null}>{toastsMarkup}</TransitionGroup>
      </div>
    </Portal>
  );
});

const toastClasses = {
  enter: classNames(styles.ToastWrapper, styles['ToastWrapper-enter']),
  enterDone: classNames(styles.ToastWrapper, styles['ToastWrapper-enter-done']),
  exit: classNames(styles.ToastWrapper, styles['ToastWrapper-exit']),
};
