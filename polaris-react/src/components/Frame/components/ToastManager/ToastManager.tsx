import React, {createRef, memo, useState, useRef} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {classNames} from '../../../../utilities/css';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';
import {Portal} from '../../../Portal';
import type {ToastPropsWithID} from '../../../../utilities/frame';
import {Toast} from '../Toast';
import {useDeepEffect} from '../../../../utilities/use-deep-effect';
import {useDeepCallback} from '../../../../utilities/use-deep-callback';

import styles from './ToastManager.module.css';

export interface ToastManagerProps {
  toastMessages: ToastPropsWithID[];
}

const ADDITIONAL_TOAST_BASE_MOVEMENT = 10;

const TOAST_TRANSITION_DELAY = 30;

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
  const [shouldExpand, setShouldExpand] = useState(false);
  const isFullyExpanded = useRef(false);
  const fullyExpandedTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const firstToast = useRef<HTMLDivElement | null>(null);

  const updateToasts = useDeepCallback(() => {
    const zeroIndexTotalMessages = toastMessages.length - 1;
    toastMessages.forEach((_, index) => {
      const reversedOrder = zeroIndexTotalMessages - index;
      const currentToast = toastNodes[index];
      if (!currentToast.current) return;

      const toastHeight: number = currentToast.current.clientHeight;
      const scale = shouldExpand ? 1 : 0.9 ** reversedOrder;

      const additionalVerticalMovement: number =
        generateAdditionalVerticalMovement(reversedOrder);
      const targetInPos = shouldExpand
        ? toastHeight + (toastHeight - 8) * reversedOrder
        : toastHeight + additionalVerticalMovement;

      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-in',
        `-${targetInPos}px`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-scale-in',
        `${scale}`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-blur-in',
        shouldExpand ? '0' : `${reversedOrder * 0.5}px`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-transition-delay-in',
        `${shouldExpand ? reversedOrder * TOAST_TRANSITION_DELAY : 0}ms`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-scale-out',
        `${reversedOrder === 0 ? 0.85 : scale ** 2}`,
      );
      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-out',
        `${-targetInPos}px`,
      );
    });
  }, [toastMessages, toastNodes, shouldExpand]);

  useDeepEffect(() => {
    updateToasts();
    if (toastMessages.length === 0) {
      setShouldExpand(false);
    }
    if (shouldExpand) {
      fullyExpandedTimeout.current = setTimeout(() => {
        isFullyExpanded.current = true;
      }, toastMessages.length * TOAST_TRANSITION_DELAY + 400);
    } else if (fullyExpandedTimeout.current) {
      clearTimeout(fullyExpandedTimeout.current);
      isFullyExpanded.current = false;
    }
  }, [toastMessages, shouldExpand]);

  const toastsMarkup = toastMessages.map((toast, index) => {
    const reverseOrderIndex = toastMessages.length - index - 1;
    const toastNode = createRef<HTMLDivElement>();
    toastNodes[index] = toastNode;

    function handleMouseEnter() {
      setShouldExpand(true);
    }
    function handleMouseEnterFirstToast() {
      if (isFullyExpanded.current) {
        setShouldExpand(false);
      }
    }

    return (
      <CSSTransition
        nodeRef={toastNodes[index]}
        key={toast.id}
        timeout={{enter: 0, exit: 200}}
        classNames={toastClasses}
      >
        <div
          ref={toastNode}
          onMouseEnter={
            reverseOrderIndex > 0
              ? handleMouseEnter
              : handleMouseEnterFirstToast
          }
        >
          <div
            ref={(node) =>
              reverseOrderIndex === 0 ? (firstToast.current = node) : null
            }
          >
            <Toast {...toast} isHovered={shouldExpand} />
          </div>
        </div>
      </CSSTransition>
    );
  });

  return (
    <Portal idPrefix="toast">
      <EventListener event="resize" handler={updateToasts} />
      <div
        className={styles.ToastManager}
        aria-live="assertive"
        onMouseEnter={function (event: React.MouseEvent<HTMLDivElement>) {
          const target = event.target as HTMLElement;
          const isInFirstToast = firstToast.current?.contains(target);
          setShouldExpand(!isInFirstToast);
        }}
        onMouseLeave={function () {
          setShouldExpand(false);
        }}
      >
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
