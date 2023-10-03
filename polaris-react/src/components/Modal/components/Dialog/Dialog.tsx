import React, {useContext, useRef, useEffect} from 'react';
import type {SetStateAction, Dispatch} from 'react';
import {Transition, CSSTransition} from 'react-transition-group';

import {classNames, variationName} from '../../../../utilities/css';
import {focusFirstFocusableNode} from '../../../../utilities/focus';
import {Key} from '../../../../types';
import {KeypressListener} from '../../../KeypressListener';
import {TrapFocus} from '../../../TrapFocus';
import type {ModalSize} from '../../Modal';
import {Text} from '../../../Text';
import {FrameContext} from '../../../../utilities/frame';
import {useTheme} from '../../../../utilities/use-theme';

import styles from './Dialog.scss';

type CSSTransitionProps = React.ComponentProps<typeof CSSTransition>;

export interface DialogProps {
  labelledBy?: string;
  instant?: boolean;
  children?: React.ReactNode;
  limitHeight?: boolean;
  size?: ModalSize;
  onClose(): void;
  onEntered?(): void;
  onExited?(): void;
  in?: boolean;
  setClosing?: Dispatch<SetStateAction<boolean>>;
  hasToasts?: boolean;
}

export function Dialog({
  instant,
  labelledBy,
  children,
  limitHeight,
  size,
  onClose,
  onExited,
  onEntered,
  setClosing,
  hasToasts,
  ...props
}: DialogProps) {
  const theme = useTheme();
  const containerNode = useRef<HTMLDivElement>(null);
  const frameContext = useContext(FrameContext);
  let toastMessages;

  if (frameContext) {
    toastMessages = frameContext.toastMessages;
  }

  const classes = classNames(
    styles.Modal,
    size && styles[variationName('size', size)],
    limitHeight && styles.limitHeight,
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

  const ariaLiveAnnouncements = (
    <div aria-live="assertive">
      {toastMessages
        ? toastMessages.map((toastMessage) => (
            <Text visuallyHidden as="p" key={toastMessage.id}>
              {toastMessage.content}
            </Text>
          ))
        : null}
    </div>
  );

  return (
    <TransitionChild
      {...props}
      nodeRef={containerNode}
      mountOnEnter
      unmountOnExit
      timeout={parseInt(theme.motion['motion-duration-200'], 10)}
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
            {ariaLiveAnnouncements}
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
