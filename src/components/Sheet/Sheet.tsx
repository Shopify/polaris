import React, {useRef} from 'react';
import {durationSlow} from '@shopify/polaris-tokens';
import {CSSTransition} from 'react-transition-group';
import type {CSSTransitionClassNames} from 'react-transition-group/CSSTransition';

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
  /** Whether or not the sheet is minimized (must be type 'bottomSheet') */
  minimized?: boolean;
  /** The child elements to render in the sheet */
  children: React.ReactNode;
  /** Callback when the backdrop is clicked or `ESC` is pressed */
  onClose(): void;
  /** Callback when the sheet has started to enter */
  onEnter?(): void;
  /** Callback when the sheet has completed entering */
  onEntered?(): void;
  /** Callback when the sheet has started to exit */
  onExit?(): void;
  /** Callback when the sheet has completed exiting */
  onExited?(): void;
  /** Show a different sized sheet */
  size?: 'small' | 'medium' | 'large';
  /** Show a transparent backdrop */
  transparentBackdrop?: boolean;
  /** Renders as a full sheet or a bottom sheet */
  type?: 'fullSheet' | 'bottomSheet';
  /** ARIA label for sheet */
  accessibilityLabel: string;
}

export function Sheet({
  children,
  open,
  minimized = false,
  onClose,
  onEnter,
  onEntered,
  onExit,
  onExited,
  transparentBackdrop = true,
  type = 'fullSheet',
  size = 'small',
  accessibilityLabel,
}: SheetProps) {
  const {isNavigationCollapsed} = useMediaQuery();
  const container = useRef<HTMLDivElement>(null);

  let transitionClasses: CSSTransitionClassNames;
  if (type === 'bottomSheet') {
    transitionClasses = BOTTOM_CLASS_NAMES;
  } else {
    transitionClasses = isNavigationCollapsed
      ? BOTTOM_CLASS_NAMES
      : RIGHT_CLASS_NAMES;
  }

  return (
    <Portal idPrefix="sheet">
      <CSSTransition
        nodeRef={container}
        classNames={transitionClasses}
        timeout={durationSlow}
        in={open}
        mountOnEnter
        unmountOnExit
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        <div
          className={classNames(
            styles.Container,
            size === 'large' && styles.sizeLarge,
            size === 'medium' && styles.sizeMedium,
            type === 'bottomSheet' && styles.bottomSheet,
            type === 'bottomSheet' && minimized && styles.minimized,
          )}
          {...layer.props}
          {...overlay.props}
          ref={container}
        >
          <TrapFocus trapping={open && !minimized}>
            <div
              role="dialog"
              aria-modal
              tabIndex={-1}
              className={classNames(
                styles.Sheet,
                size === 'large' && styles.sizeLarge,
                size === 'medium' && styles.sizeMedium,
                type === 'bottomSheet' && styles.bottomSheet,
                type === 'bottomSheet' && minimized && styles.minimized,
              )}
              aria-label={accessibilityLabel}
            >
              {children}
            </div>
          </TrapFocus>
        </div>
      </CSSTransition>
      <KeypressListener keyCode={Key.Escape} handler={onClose} />
      {open && type !== 'bottomSheet' && (
        <Backdrop transparent={transparentBackdrop} onClick={onClose} />
      )}
    </Portal>
  );
}
