import React, {useCallback, useRef, useEffect} from 'react';
import {CSSTransition} from 'react-transition-group';
import {motion} from '@shopify/polaris-tokens';

import {focusFirstFocusableNode} from '../../utilities/focus';
import {useMediaQuery} from '../../utilities/media-query';
import {classNames} from '../../utilities/css';
import {Key} from '../../types';
import {layer, overlay} from '../shared';
import {Backdrop} from '../Backdrop';
import {TrapFocus} from '../TrapFocus';
import {Portal} from '../Portal';
import {KeypressListener} from '../KeypressListener';

import styles from './Sheet.scss';

const BOTTOM_CLASS_NAMES = {
  enter: classNames(styles.Bottom, styles.enterBottom),
  enterActive: classNames(styles.Bottom, styles.enterBottomActive),
  exit: classNames(styles.Bottom, styles.exitBottom),
  exitActive: classNames(styles.Bottom, styles.exitBottomActive),
};

const RIGHT_CLASS_NAMES = {
  enter: classNames(styles.Right, styles.enterRight),
  enterActive: classNames(styles.Right, styles.enterRightActive),
  exit: classNames(styles.Right, styles.exitRight),
  exitActive: classNames(styles.Right, styles.exitRightActive),
};

export interface SheetProps {
  /** Whether or not the sheet is open */
  open: boolean;
  /** The child elements to render in the sheet */
  children: React.ReactNode;
  /** Callback when the backdrop is clicked or `ESC` is pressed */
  onClose(): void;
  /** Callback when the sheet has completed entering */
  onEntered?(): void;
  /** Callback when the sheet has started to exit */
  onExit?(): void;
  /** ARIA label for sheet */
  accessibilityLabel: string;
  /** The element or the RefObject that activates the Sheet */
  activator?: React.RefObject<HTMLElement> | React.ReactElement;
}

/** @deprecated Use Modal instead or avoid modal patterns all together. */
export function Sheet({
  children,
  open,
  onClose,
  onEntered,
  onExit,
  accessibilityLabel,
  activator,
}: SheetProps) {
  const {isNavigationCollapsed} = useMediaQuery();
  const container = useRef<HTMLDivElement>(null);
  const activatorRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    onClose();

    const activatorElement =
      activator && isRef(activator)
        ? activator && activator.current
        : activatorRef.current;
    if (activatorElement) {
      requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
    }
  }, [activator, onClose]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: <Sheet /> is deprecated. This component might be removed in a future major version of Polaris. Use <Modal /> instead or avoid modal patterns all together.',
      );
    }
  }, []);

  const activatorMarkup =
    activator && !isRef(activator) ? (
      <div ref={activatorRef}>{activator}</div>
    ) : null;

  return (
    <>
      {activatorMarkup}
      <Portal idPrefix="sheet">
        <CSSTransition
          nodeRef={container}
          classNames={
            isNavigationCollapsed ? BOTTOM_CLASS_NAMES : RIGHT_CLASS_NAMES
          }
          timeout={parseInt(motion['motion-duration-300'], 10)}
          in={open}
          mountOnEnter
          unmountOnExit
          onEntered={onEntered}
          onExit={onExit}
        >
          <div
            className={styles.Container}
            {...layer.props}
            {...overlay.props}
            ref={container}
          >
            <TrapFocus trapping={open}>
              <div
                role="dialog"
                aria-modal
                tabIndex={-1}
                className={styles.Sheet}
                aria-label={accessibilityLabel}
              >
                {children}
              </div>
            </TrapFocus>
          </div>
        </CSSTransition>
        <KeypressListener keyCode={Key.Escape} handler={handleClose} />
        {open && <Backdrop transparent onClick={handleClose} />}
      </Portal>
    </>
  );
}

function isRef(
  ref: React.RefObject<HTMLElement> | React.ReactElement,
): ref is React.RefObject<HTMLElement> {
  return Object.prototype.hasOwnProperty.call(ref, 'current');
}
