import React, {useCallback, useContext, useEffect, useState} from 'react';

import {CSSTransition} from 'react-transition-group';
import debounce from 'lodash/debounce';
import {classNames} from '../../utilities/css';

import {navigationBarCollapsed} from '../../utilities/breakpoints';
import {Key} from '../../types';
import {layer, overlay, Duration} from '../shared';
import {FrameContext} from '../Frame';
import {withAppProvider} from '../../utilities/with-app-provider';
import {useI18n} from '../../utilities/i18n';

import Backdrop from '../Backdrop';
import TrapFocus from '../TrapFocus';
import Portal from '../Portal';
import KeypressListener from '../KeypressListener';
import EventListener from '../EventListener';

import styles from './Sheet.scss';

export const BOTTOM_CLASS_NAMES = {
  enter: classNames(styles.Bottom, styles.enterBottom),
  enterActive: classNames(styles.Bottom, styles.enterBottomActive),
  exit: classNames(styles.Bottom, styles.exitBottom),
  exitActive: classNames(styles.Bottom, styles.exitBottomActive),
};

export const RIGHT_CLASS_NAMES = {
  enter: classNames(styles.Right, styles.enterRight),
  enterActive: classNames(styles.Right, styles.enterRightActive),
  exit: classNames(styles.Right, styles.exitRight),
  exitActive: classNames(styles.Right, styles.exitRightActive),
};

export interface Props {
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

export interface State {
  mobile: boolean;
}

function Sheet({children, open, onClose, onEntered, onExit}: Props) {
  const [mobile, setMobile] = useState(false);

  const handleResize = useCallback(
    debounce(
      () => {
        if (mobile !== isMobile()) {
          handleToggleMobile();
        }
      },
      40,
      {leading: true, trailing: true, maxWait: 40},
    ),
    [mobile],
  );

  useEffect(() => {
      handleResize()
    }, []);

  return (
    <Portal idPrefix="sheet">
      <CSSTransition
        classNames={mobile ? BOTTOM_CLASS_NAMES : RIGHT_CLASS_NAMES}
        timeout={Duration.Slow}
        in={open}
        mountOnEnter
        unmountOnExit
        onEntered={onEntered}
        onExit={onExit}
      >
        <Container open={open}>{children}</Container>
      </CSSTransition>
      <KeypressListener keyCode={Key.Escape} handler={onClose} />
      <EventListener event="resize" handler={handleResize} />
      {open && <Backdrop transparent onClick={onClose} />}
    </Portal>
  );

  function handleToggleMobile() {
    setMobile((mobile) => !mobile);
  }
}

function isMobile(): boolean {
  return navigationBarCollapsed().matches;
}

function Container(props: {children: React.ReactNode; open: boolean}) {
  return (
    <div className={styles.Container} {...layer.props} {...overlay.props}>
      <TrapFocus trapping={props.open}>
        <div role="dialog" tabIndex={-1} className={styles.Sheet}>
          {props.children}
        </div>
      </TrapFocus>
    </div>
  );
}

export default withAppProvider<Props>()(Sheet);
