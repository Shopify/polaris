import React, {useRef, useEffect} from 'react';
import {durationBase} from '@shopify/polaris-tokens';
import {Transition, CSSTransition} from 'react-transition-group';

import {classNames} from '../../../../utilities/css';
import {focusFirstFocusableNode} from '../../../../utilities/focus';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {TrapFocus} from '../../../TrapFocus';

import styles from './Dialog.scss';

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
  ...props
}: DialogProps) {
  const containerNode = useRef<HTMLDivElement>(null);
  const classes = classNames(
    styles.Modal,
    small && styles.sizeSmall,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
  );
  const TransitionChild = instant ? Transition : FadeUp;

  useEffect(() => {
    containerNode.current &&
      !containerNode.current.contains(document.activeElement) &&
      focusFirstFocusableNode(containerNode.current);
  }, []);

  return (
    <TransitionChild
      {...props}
      nodeRef={containerNode}
      mountOnEnter
      unmountOnExit
      timeout={durationBase}
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
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={styles.Dialog}
          >
            <div className={classes}>
              <KeypressListener keyCode={Key.Escape} handler={onClose} />
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

function FadeUp({children, ...props}: any) {
  return (
    <CSSTransition {...props} classNames={fadeUpClasses}>
      {children}
    </CSSTransition>
  );
}
