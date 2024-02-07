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

import styles from './ToastManager.module.scss';

export interface ToastManagerProps {
  toastMessages: ToastPropsWithID[];
}

const ADDITIONAL_TOAST_BASE_MOVEMENT = 10;

/**
 * Will calculate the vertical movement of the toast based on the index of the sequence. As toasts get further back
 * in the view, we want them to not move as much, to give the perception of perspective. This sequence will match this:
 * v(0) = 0
 * v(1) = 0
 * v(2) = 1 (increase of 1)
 * v(3) = 3 (increase of 2)
 * v(4) = 6 (increase of 3)
 * v(5) = 10 (increase of 4)
 * and so on...
 *
 * @param index The index of the sequence
 * @returns How many pixels we want to move the toast
 */
function generateAdditionalVerticalMovement(index: number) {
  const getAmountToRemove = (idx: number): number => ((idx - 1) * idx) / 2;
  return index * ADDITIONAL_TOAST_BASE_MOVEMENT - getAmountToRemove(index);
}

export const ToastManager = memo(function ToastManager({
  toastMessages,
}: ToastManagerProps) {
  const toastNodes: React.RefObject<HTMLDivElement>[] = [];

  const updateToasts = useDeepCallback(() => {
    const zeroIndexTotalMessages = toastMessages.length - 1;
    toastMessages.forEach((_, index) => {
      const reversedOrder = zeroIndexTotalMessages - index;
      const currentToast = toastNodes[index];
      if (!currentToast.current) return;

      const toastHeight: number = currentToast.current.clientHeight;
      const scale = 0.9 ** reversedOrder;

      const additionalVerticalMovement: number =
        generateAdditionalVerticalMovement(reversedOrder);
      const targetInPos = toastHeight + additionalVerticalMovement;

      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-in',
        `-${targetInPos}px`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-scale-in',
        `${scale}`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-scale-out',
        `${reversedOrder === 0 ? 1 : scale ** 2}`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-blur-in',
        `${reversedOrder * 0.5}px`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-out',
        `${reversedOrder === 0 ? -targetInPos + 150 : -targetInPos}px`,
      );
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
    <Portal idPrefix="toast">
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
