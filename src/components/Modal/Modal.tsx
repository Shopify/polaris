import * as React from 'react';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';
import {wrapWithComponent} from '@shopify/react-utilities/components';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {TransitionGroup} from 'react-transition-group';
import {Scrollable, Icon, Spinner, Portal} from '../';

import memoizedBind from '../../utilities/memoized-bind';
import {Dialog, Footer, FooterProps, Header, Section} from './components';
import * as styles from './Modal.scss';

const IFRAME_LOADING_HEIGHT = 200;

export interface Props extends FooterProps {
  open?: boolean,
  src?: string,
  title?: React.ReactNode,
  children?: React.ReactNode,
  footer?: React.ReactNode,
  instant?: boolean,
  sectioned?: boolean,
  large?: boolean,
  limitHeight?: boolean,
  loading?: boolean,
  onClose(): void,
  onTransitionEnd?(): void,
}

export interface State {
  iframeHeight: number,
}

let idIndex = 1;
function uniqueId() {
  return `modal-header-${idIndex++}`;
}

export default class Modal extends React.Component<Props, State> {
  static Dialog = Dialog;
  static Section = Section;
  focusReturnPointNode: HTMLElement;

  state: State = {
    iframeHeight: IFRAME_LOADING_HEIGHT,
  };

  private headerId = uniqueId();

  componentWillReceiveProps({open: willBeOpen}: Props) {
    const {open} = this.props;

    if (willBeOpen && !open) {
      this.focusReturnPointNode = document.activeElement as HTMLElement;
    }
  }

  render() {
    const {
      children,
      onClose,
      title,
      src,
      open,
      footer,
      instant,
      sectioned,
      loading,
      large,
      limitHeight,
    } = this.props;

    const {iframeHeight} = this.state;

    const handleClose = memoizedBind(onClose);

    let dialog: React.ReactNode;
    let backdrop: React.ReactNode;
    if (open) {
      const footerMarkup = this.renderFooter();

      const content = sectioned
        ? wrapWithComponent(children, Section)
        : children;

      const body = loading ? (
        <div className={styles.Spinner}>
          <Spinner />
        </div>
      ) : (
        content
      );

      const bodyMarkup = src ? (
        <iframe
          src={src}
          className={styles.IFrame}
          onLoad={this.handleIFrameLoad}
          style={{height: `${iframeHeight}px`}}
        />
      ) : (
        <Scrollable
          shadow
          className={classNames(
            styles.Body,
            footer && styles['Body-hasFooter'],
          )}
        >
          {body}
        </Scrollable>
      );

      const headerMarkup = title ? (
        <Header id={this.headerId} onClose={handleClose} testID="ModalHeader">
          {title}
        </Header>
      ) : (
        <button
          onClick={handleClose}
          testID="ModalCloseButton"
          className={styles.CloseButton}
        >
          <Icon source="cancel" color="inkLighter" />
        </button>
      );

      dialog = (
        <Dialog
          instant={instant}
          labelledBy={this.headerId}
          onClose={handleClose}
          onEntered={this.handleEntered}
          onExited={this.handleExited}
          large={large}
          limitHeight={limitHeight}
        >
          {headerMarkup}
          <div className={styles.BodyWrapper}>{bodyMarkup}</div>
          {footerMarkup}
        </Dialog>
      );

      backdrop = <div className={styles.Backdrop} onClick={handleClose} />;
    }

    const animated = !instant;

    return (
      <Portal idPrefix="modal">
        <div className={title ? '' : styles.graphic}>
          <TransitionGroup appear={animated} enter={animated} exit={animated}>
            {dialog}
          </TransitionGroup>
          {backdrop}
        </div>
      </Portal>
    );
  }

  private renderFooter() {
    const {footer, primaryAction, secondaryActions} = this.props;
    if (!footer && !primaryAction && !secondaryActions) {
      return null;
    }

    return (
      <Footer primaryAction={primaryAction} secondaryActions={secondaryActions}>
        {footer}
      </Footer>
    );
  }

  @autobind
  private handleEntered() {
    const {onTransitionEnd} = this.props;
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }

  @autobind
  private handleExited() {
    this.setState({
      iframeHeight: IFRAME_LOADING_HEIGHT,
    });
    write(() => focusFirstFocusableNode(this.focusReturnPointNode, false));
  }

  @autobind
  private handleIFrameLoad(evt: React.SyntheticEvent<HTMLIFrameElement>) {
    const iframe = evt.target as HTMLIFrameElement;
    this.setState({
      iframeHeight: iframe.contentWindow.document.body.scrollHeight,
    });
  }
}
