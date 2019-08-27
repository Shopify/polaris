import React, {createRef, memo} from 'react';
import {
  TransitionGroup,
  CSSTransition,
} from '@material-ui/react-transition-group';
import {classNames} from '../../../../utilities/css';
import {EventListener} from '../../../EventListener';
import {Portal} from '../../../Portal';
import {ToastPropsWithID} from '../../../../utilities/frame';
import {Toast} from '../Toast';
import {useDeepEffect} from '../../../../utilities/use-deep-effect';
import {useDeepCallback} from '../../../../utilities/use-deep-callback';

import styles from './ToastManager.scss';

export interface ToastManagerProps {
  toastMessages: (ToastPropsWithID)[];
}

// This does have a display name, but the linting has a bug in it
// https://github.com/yannickcr/eslint-plugin-react/issues/2324
// eslint-disable-next-line react/display-name
export const ToastManager = memo(function ToastManager({
  toastMessages,
}: ToastManagerProps) {
  const toastNodes: React.RefObject<HTMLDivElement>[] = [];

  const updateToasts = useDeepCallback(
    () => {
      let targetInPos = 0;
      toastMessages.forEach((_, index) => {
        const currentToast = toastNodes[index];
        if (!currentToast.current) return;
        targetInPos += currentToast.current.clientHeight;
        currentToast.current.style.setProperty(
          '--toast-translate-y-in',
          `-${targetInPos}px`,
        );
        currentToast.current.style.setProperty(
          '--toast-translate-y-out',
          `${-targetInPos + 150}px`,
        );
      });
    },
    [toastMessages, toastNodes],
  );

  useDeepEffect(
    () => {
      updateToasts();
    },
    [toastMessages],
  );

  const toastsMarkup = toastMessages.map((toast, index) => {
    const toastNode = createRef<HTMLDivElement>();
    toastNodes[index] = toastNode;

    return (
      <CSSTransition
        findDOMNode={findDOMNode(index)}
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
    <Portal idPrefix="toast-manager">
      <EventListener event="resize" handler={updateToasts} />
      <div className={styles.ToastManager} aria-live="polite">
        <TransitionGroup component={null}>{toastsMarkup}</TransitionGroup>
      </div>
    </Portal>
  );

  function findDOMNode(index: number) {
    return () => toastNodes[index].current;
  }
});

const toastClasses = {
  enter: classNames(styles.ToastWrapper, styles['ToastWrapper-enter']),
  enterDone: classNames(styles.ToastWrapper, styles['ToastWrapper-enter-done']),
  exit: classNames(styles.ToastWrapper, styles['ToastWrapper-exit']),
};
