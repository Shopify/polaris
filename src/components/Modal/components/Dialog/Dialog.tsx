import React, {useRef, useCallback} from 'react';
import {durationBase} from '@shopify/polaris-tokens';
import {Transition, CSSTransition} from '@material-ui/react-transition-group';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {classNames} from '../../../../utilities/css';

import {AnimationProps, Key} from '../../../../types';

import {KeypressListener} from '../../../KeypressListener';
import {TrapFocus} from '../../../TrapFocus';

import {useComponentDidMount} from '../../../../utilities/use-component-did-mount';
import styles from './Dialog.scss';

interface BaseDialogProps {
  labelledBy?: string;
  instant?: boolean;
  children?: React.ReactNode;
  limitHeight?: boolean;
  large?: boolean;
  onClose(): void;
  onEntered?(): void;
  onExited?(): void;
}

export type DialogProps = BaseDialogProps & AnimationProps;

export function Dialog({
  instant,
  labelledBy,
  children,
  onClose,
  onExited,
  onEntered,
  large,
  limitHeight,
  ...props
}: DialogProps) {
  const containerNode = useRef<HTMLDivElement>(null);
  const findDOMNode = useCallback(() => containerNode.current, []);
  const classes = classNames(
    styles.Modal,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
  );
  const TransitionChild = instant ? Transition : FadeUp;

  useComponentDidMount(() => {
    containerNode.current && focusFirstFocusableNode(containerNode.current);
  });

  return (
    <TransitionChild
      {...props}
      findDOMNode={findDOMNode}
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
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={styles.Dialog}
          >
            <div className={classes}>
              <KeypressListener
                keyCode={Key.Escape}
                handler={onClose}
                testID="CloseKeypressListener"
              />
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
