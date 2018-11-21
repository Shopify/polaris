import * as React from 'react';
import {Transition, CSSTransition} from 'react-transition-group';
import {classNames} from '@shopify/react-utilities/styles';

import {AnimationProps, KeyValue} from '../../../../types';

import KeypressListener from '../../../KeypressListener';
import TrapFocus from '../../../TrapFocus';
import {Duration} from '../../../shared';

import * as styles from './Dialog.scss';

export interface DialogProps {
  labelledBy: string;
  instant?: boolean;
  children?: React.ReactNode;
  limitHeight?: boolean;
  large?: boolean;
  onClose(): void;
  onEntered?(): void;
  onExited?(): void;
}

export type Props = DialogProps & AnimationProps;

function DialogContainer(props: {children: React.ReactNode}) {
  return (
    <div className={styles.Container} data-polaris-layer data-polaris-overlay>
      {props.children}
    </div>
  );
}

export default function Dialog({
  instant,
  labelledBy,
  children,
  onClose,
  onExited,
  onEntered,
  large,
  limitHeight,
  ...props
}: Props) {
  const classes = classNames(
    styles.Modal,
    large && styles.sizeLarge,
    limitHeight && styles.limitHeight,
  );
  const TransitionChild = instant ? Transition : FadeUp;

  return (
    <TransitionChild
      {...props}
      mountOnEnter
      unmountOnExit
      timeout={Duration.Base}
      onEntered={onEntered}
      onExited={onExited}
    >
      <DialogContainer>
        <TrapFocus>
          <div
            className={classes}
            role="dialog"
            aria-labelledby={labelledBy}
            tabIndex={-1}
          >
            <KeypressListener
              keyValue={KeyValue.Escape}
              handler={onClose}
              testID="CloseKeypressListener"
            />
            {children}
          </div>
        </TrapFocus>
      </DialogContainer>
    </TransitionChild>
  );
}

const fadeUpClasses = {
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
