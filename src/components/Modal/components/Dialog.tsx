import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {Transition, CSSTransition} from 'react-transition-group';
import {KeypressListener} from '../../';
import {Keys} from '../../../types';
import memoizedBind from '../../../utilities/memoized-bind';
import {TrapFocus} from '../../Focus';
import {Duration} from '../../shared';
import {AnimationProps} from '../../../types';
import * as styles from '../Modal.scss';

export interface DialogProps {
  labelledBy: string,
  instant?: boolean,
  children?: React.ReactNode,
  limitHeight?: boolean,
  large?: boolean,
  onClose(): void,
  onEntered?(): void,
  onExited?(): void,
}

export type Props = DialogProps & AnimationProps;

function DialogContainer(props: {children: React.ReactNode}) {
  return <div className={styles.Container}>{props.children}</div>;
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
  ...props,
}: Props) {
  const classes = classNames(
    styles.Modal,
    large && styles['Modal-large'],
    limitHeight && styles['Modal-limitHeight'],
  );
  const handleClose = memoizedBind(onClose);
  const animation = large ? ScaleIn : FadeUp;
  const TransitionChild = instant ? Transition : animation;

  return (
    <TransitionChild
      {...props}
      data-polaris-layer
      data-polaris-overlay
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
              keyCode={Keys.ESCAPE}
              handler={handleClose}
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
  enter: classNames(styles.FadeUp, styles.entering),
  enterActive: classNames(styles.FadeUp, styles.entered),
  exit: classNames(styles.FadeUp, styles.exiting),
  exitActive: classNames(styles.FadeUp, styles.exited),
};

function FadeUp({children, ...props}: any) {
  return (
    <CSSTransition {...props} classNames={fadeUpClasses}>
      {children}
    </CSSTransition>
  );
}

const scaleInClasses = {
  enter: classNames(styles.ScaleIn, styles.entering),
  enterActive: classNames(styles.ScaleIn, styles.entered),
  exit: classNames(styles.ScaleIn, styles.exiting),
  exitActive: classNames(styles.ScaleIn, styles.exited),
};

function ScaleIn({children, ...props}: any) {
  return (
    <CSSTransition {...props} classNames={scaleInClasses}>
      {children}
    </CSSTransition>
  );
}
