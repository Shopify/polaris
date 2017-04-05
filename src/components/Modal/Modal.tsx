import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {layeredComponent, elementChildren, wrapWithComponent} from '@shopify/react-utilities/components';
import {classNames} from '@shopify/react-utilities/styles';
import {TransitionGroup, TransitionStatus} from '@shopify/react-utilities/animation';

import KeypressListener, {Keys} from '../KeypressListener';
import Scrollable from '../Scrollable';
import {TrapFocus, FOCUSABLE_SELECTOR} from '../Focus';

import Footer, {Props as FooterProps} from './Footer';
import Header from './Header';
import Section, {Props as SectionProps} from './Section';
import * as styles from './Modal.scss';

export interface Props extends FooterProps {
  open: boolean,
  title?: React.ReactNode,
  children?: React.ReactNode,
  footer?: React.ReactNode,
  focusReturnPoint?: React.ReactNode,
  instant?: boolean,
  onCloseRequest(): void,
}

let idIndex = 1;
function uniqueId() {
  return `modal-header-${idIndex++}`;
}

function isFocusable(node: HTMLElement) {
  const container = node.parentElement || document;
  const focusableElements = container && container.querySelectorAll(FOCUSABLE_SELECTOR);
  return focusableElements && Array.from(focusableElements).indexOf(node) >= 0;
}

@layeredComponent({idPrefix: 'Modal'})
class Modal extends React.Component<Props, {}> {
  static Section = Section;

  componentDidUpdate(prevProps: Props) {
    const {open, focusReturnPoint} = this.props;
    if (!focusReturnPoint) {
      return;
    }

    const focusReturnPointNode = ReactDOM.findDOMNode(this) as HTMLElement;

    if (prevProps.open && !open && focusReturnPointNode) {
      const firstFocusable = isFocusable(focusReturnPointNode)
        ? focusReturnPointNode
        : focusReturnPointNode.querySelector(FOCUSABLE_SELECTOR);

      if (!focusReturnPointNode) {
        return;
      }

      /*
      <Hack>
        This setTimeout defers the focus call until the TrapScroll is unmounted.
        Otherwise it would pr`event` our focus call.
      </Hack>
      */
      setTimeout(() => {
        (firstFocusable as HTMLElement).focus();
      });
    }
  }

  renderLayer() {
    const {
      children,
      onCloseRequest,
      title,
      open,
      instant,
    } = this.props;

    let dialog: React.ReactNode;
    let backdrop: React.ReactNode;
    if (open) {
      const footer = this.renderFooter();
      const headerId = uniqueId();
      const sections = elementChildren(children)
        .map((child, index) => wrapWithComponent(child, Section, {key: index} as SectionProps));

      dialog = (
          <Dialog instant={instant} labelledBy={headerId}>
            <Header id={headerId} onCloseRequest={onCloseRequest}>
              {title}
            </Header>
            <div>
              <Scrollable shadow className={styles.Body}>
                {sections}
              </Scrollable>
            </div>
            {footer}
          </Dialog>
      );

      backdrop = (
        <div
          className={styles.Backdrop}
          onClick={onCloseRequest}
        />
      );
    }

    const selector = `.${styles.Modal}`;

    return (
      <div>
        <KeypressListener keyCode={Keys.ESCAPE} callback={onCloseRequest} />
          <TransitionGroup
            skipAppearing={instant}
            skipEntering={instant}
            skipLeaving={instant}
            selector={selector}
          >
            {dialog}
          </TransitionGroup>
        {backdrop}
      </div>
    );
  }

  render() {
    const {focusReturnPoint} = this.props;

    return focusReturnPoint
      ? React.Children.only(focusReturnPoint)
      : null;
  }

  private renderFooter() {
    return (
      <Footer
        primaryActions={this.props.primaryActions}
        secondaryActions={this.props.secondaryActions}
      >
        {this.props.footer}
      </Footer>
    );
  };
}

interface DialogProps {
  instant?: boolean,
  labelledBy: string,
  children?: React.ReactNode,
  transitionStatus?: TransitionStatus,
}

function Dialog({instant, labelledBy, children, transitionStatus}: DialogProps) {
  const animated = !instant;

  const classes = classNames(
    styles.Modal,
    transitionStatus && animated && animationVariations(transitionStatus),
  );

  return (
    <div className={styles.Container}>
      <TrapFocus>
        <div
          className={classes}
          role="dialog"
          aria-labelledby={labelledBy}
        >
          {children}
        </div>
      </TrapFocus>
    </div>
  );
}

function animationVariations(status: TransitionStatus) {
  switch (status) {
    case TransitionStatus.Shown:
    case TransitionStatus.Appearing:
    case TransitionStatus.LeavingStart:
    case TransitionStatus.Entering:
      return null;
    default:
      return styles.hidden;
  }
}

export default Modal;
