import React, {createRef, memo, useReducer} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {classNames} from '../../../../utilities/css';
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

type ToastState = {[key in string]: ToastPropsWithID[]};
type ActionTypes = {
  type: 'Add toast' | 'Remove toast';
  toast: ToastPropsWithID;
};

function manageToasts(state: ToastState, action: ActionTypes) {
  const currentToast = action.toast;
  const currentContent = currentToast.content;

  switch (action.type) {
    // Assumes Error and Success toasts will never share the same content
    case 'Add toast':
      // add into an existing group
      if (currentContent in state) {
        let newState;
        newState = [...state[currentContent], currentToast];

        return {
          ...state,
          [currentContent]: newState,
        };
      }
      // add new group
      return {
        ...state,
        [currentContent]: [currentToast],
      };

    // Doesn't remove the empty keys but will be fine if we iterate correctly when rendering
    case 'Remove toast':
      if (state[currentContent].length === 1) {
        delete state[currentContent];

        return state;
      }

      let newState;
      newState = [...state[currentContent]];

      const findCurrentToastIndex = state[currentContent].findIndex(
        (toast) => toast.id === currentToast.id,
      );
      newState.splice(findCurrentToastIndex, 1);

      return {
        ...state,
        [currentContent]: newState,
      };

    default:
      return {};
  }
}

export const ToastManager = memo(function ToastManager({
  toastMessages,
}: ToastManagerProps) {
  const [state, dispatch] = useReducer(manageToasts, {});
  console.log('1', state);

  const toastNodes: React.RefObject<HTMLDivElement>[] = [];

  const updateToasts = useDeepCallback(() => {
    let targetInPos = 0;

    toastMessages.forEach((toast, index) => {
      const currentToast = toastNodes[index];

      const toastAlreadyExists = (currentToast: ToastPropsWithID) => {
        return Object.values(state).find((toastGroup) =>
          toastGroup.find((toast) => toast.id === currentToast.id),
        );
      };

      if (!toastAlreadyExists(toast)) {
        dispatch({type: 'Add toast', toast: toast});
      }

      if (!currentToast.current) return;

      targetInPos += currentToast.current.clientHeight;

      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-in',
        `-${targetInPos}px`,
      );

      currentToast.current.style.setProperty(
        '--pc-toast-manager-translate-y-out',
        `${-targetInPos + 150}px`,
      );
    });
  }, [toastMessages, toastNodes]);

  useDeepEffect(() => {
    updateToasts();
    // console.log('2', state);
  }, [toastMessages]);

  const toastsMarkup = toastMessages.map((toast, index) => {
    const toastNode = createRef<HTMLDivElement>();
    toastNodes[index] = toastNode;

    const dismissToast = () => {
      toast.onDismiss();
      dispatch({type: 'Remove toast', toast: toast});
    };

    return (
      <CSSTransition
        nodeRef={toastNodes[index]}
        key={toast.id}
        timeout={{enter: 0, exit: 400}}
        classNames={toastClasses}
      >
        <div ref={toastNode}>
          <Toast {...toast} duration={999999} onDismiss={dismissToast} />
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
