import React, {useCallback, useRef} from 'react';

import {CSSTransition} from '@material-ui/react-transition-group';
import {useMediaQuery} from '../../utilities/media-query';
import {classNames} from '../../utilities/css';

import {Key} from '../../types';
import {layer, overlay, Duration} from '../shared';

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
}

export function Sheet({
  children,
  open,
  onClose,
  onEntered,
  onExit,
}: SheetProps) {
  const {isNavigationCollapsed} = useMediaQuery();
  const container = useRef<HTMLDivElement>(null);

  const findDOMNode = useCallback(() => {
    return container.current;
  }, []);

  return (
    <Portal idPrefix="sheet">
      <CSSTransition
        findDOMNode={findDOMNode}
        classNames={
          isNavigationCollapsed ? BOTTOM_CLASS_NAMES : RIGHT_CLASS_NAMES
        }
        timeout={Duration.Slow}
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
            <div role="dialog" tabIndex={-1} className={styles.Sheet}>
              {children}
            </div>
          </TrapFocus>
        </div>
      </CSSTransition>
      <KeypressListener keyCode={Key.Escape} handler={onClose} />
      {open && <Backdrop transparent onClick={onClose} />}
    </Portal>
  );
}
