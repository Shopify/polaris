import React, {useRef, useEffect} from 'react';
import type {SetStateAction, Dispatch} from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {motion} from '@shopify/polaris-tokens';

import {classNames} from '../../utilities/css';
import {focusFirstFocusableNode} from '../../utilities/focus';
import {Key} from '../../types';
import {KeypressListener} from '../KeypressListener';
import {TrapFocus} from '../TrapFocus';

import styles from './Dialog.scss';

type CSSTransitionProps = React.ComponentProps<typeof CSSTransition>;

export interface DialogProps {
  labelledBy?: string;
  instant?: boolean;
  children?: React.ReactNode;
  limitHeight?: boolean;
  large?: boolean;
  small?: boolean;
  onClose(): void;
  onEntered?(): void;
  onExited?(): void;
  in?: boolean;
  fullScreen?: boolean;
  setClosing?: Dispatch<SetStateAction<boolean>>;
}

export function Dialog({
  instant,
  labelledBy,
  children,
  onClose,
  onExited,
  onEntered,
  large,
  small,
  limitHeight,
  fullScreen,
  setClosing,
  ...props
}: DialogProps) {
  const containerNode = useRef<HTMLDivElement>(null);
  const classes = classNames(
    styles.Modal,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
    fullScreen && styles.fullScreen,
  );
  const TransitionChild = instant ? Transition : FadeUp;

  useEffect(() => {
    containerNode.current &&
      !containerNode.current.contains(document.activeElement) &&
      focusFirstFocusableNode(containerNode.current);
  }, []);

  const handleKeyDown = () => {
    if (setClosing) {
      setClosing(true);
    }
  };

  const handleKeyUp = () => {
    if (setClosing) {
      setClosing(false);
    }
    onClose();
  };

  return (
    <TransitionChild
      {...props}
      nodeRef={containerNode}
      mountOnEnter
      unmountOnExit
      timeout={parseInt(motion['duration-200'], 10)}
      onEntered={onEntered}
      onExited={onExited}
    >
      <div
        className={styles.Container}
        data-polaris-layer
        data-polaris-overlay
        ref={containerNode}
      >
        <TrapFocus>
          <div
            role="dialog"
            aria-modal
            aria-label={labelledBy}
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={styles.Dialog}
          >
            <div className={classes}>
              <KeypressListener
                keyCode={Key.Escape}
                keyEvent="keydown"
                handler={handleKeyDown}
              />
              <KeypressListener keyCode={Key.Escape} handler={handleKeyUp} />
              {children}
            </div>
          </div>
        </TrapFocus>
      </div>
    </TransitionChild>
  );
}

const fadeUpClasses = {
  appear: classNames(styles.animateFadeUp, styles.entering),
  appearActive: classNames(styles.animateFadeUp, styles.entered),
  enter: classNames(styles.animateFadeUp, styles.entering),
  enterActive: classNames(styles.animateFadeUp, styles.entered),
  exit: classNames(styles.animateFadeUp, styles.exiting),
  exitActive: classNames(styles.animateFadeUp, styles.exited),
};

function FadeUp({children, ...props}: CSSTransitionProps) {
  return (
    <CSSTransition {...props} classNames={fadeUpClasses}>
      {children}
    </CSSTransition>
  );
}
