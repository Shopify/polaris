import * as React from 'react';

import {CSSTransition} from 'react-transition-group';
import debounce from 'lodash/debounce';
import {classNames} from '@shopify/css-utilities';

import {navigationBarCollapsed} from '../../utilities/breakpoints';
import {Key} from '../../types';
import {layer, overlay, Duration} from '../shared';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';

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
  /** Show a larger sheet */
  large?: boolean;
  /** Show a transparent backdrop */
  transparentBackdrop?: boolean;
}

type ComposedProps = Props & WithAppProviderProps;

export interface State {
  mobile: boolean;
}

class Sheet extends React.Component<ComposedProps, State> {
  state: State = {
    mobile: false,
  };

  private handleResize = debounce(
    () => {
      const {
        state: {mobile},
        handleToggleMobile,
      } = this;

      if (mobile !== isMobile()) {
        handleToggleMobile();
      }
    },
    40,
    {leading: true, trailing: true, maxWait: 40},
  );

  componentDidMount() {
    this.handleResize();
  }

  render() {
    const {
      props: {
        children,
        open,
        onClose,
        onEntered,
        onExit,
        transparentBackdrop = true,
        large = true,
      },
      state: {mobile},
      handleResize,
    } = this;

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
          <Container open={open} large={large}>
            {children}
          </Container>
        </CSSTransition>
        <KeypressListener keyCode={Key.Escape} handler={onClose} />
        <EventListener event="resize" handler={handleResize} />
        {open && (
          <Backdrop transparent={transparentBackdrop} onClick={onClose} />
        )}
      </Portal>
    );
  }

  private handleToggleMobile = () => {
    const {mobile} = this.state;
    this.setState({mobile: !mobile});
  };
}

function isMobile(): boolean {
  return navigationBarCollapsed().matches;
}

function Container(props: {
  children: React.ReactNode;
  large: boolean | undefined;
  open: boolean;
}) {
  const containerClasses = classNames(
    styles.Container,
    props.large && styles.sizeLarge,
  );
  const dialogClasses = classNames(
    styles.Sheet,
    props.large && styles.sizeLarge,
  );

  return (
    <div className={containerClasses} {...layer.props} {...overlay.props}>
      <TrapFocus trapping={props.open}>
        <div role="dialog" tabIndex={-1} className={dialogClasses}>
          {props.children}
        </div>
      </TrapFocus>
    </div>
  );
}

export default withAppProvider<Props>()(Sheet);
