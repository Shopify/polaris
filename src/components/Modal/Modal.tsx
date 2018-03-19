import * as React from 'react';
import * as PropTypes from 'prop-types';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';
import {wrapWithComponent} from '@shopify/react-utilities/components';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {TransitionGroup} from 'react-transition-group';
import {Scrollable, Spinner, Portal} from '../';
import {DisableableAction} from '../../types';
import memoizedBind from '../../utilities/memoized-bind';
import Dialog from './components/Dialog';
import Header, {CloseButton} from './components/Header';
import Section from './components/Section';
import Footer, {FooterProps} from './components/Footer';
import * as styles from './Modal.scss';

const IFRAME_LOADING_HEIGHT = 200;

export type Width = 'large' | 'fullwidth';

export interface ModalProps extends FooterProps {
  /** The url that will be loaded as the content of the modal */
  src?: string,
  /** Modal title, in large type */
  title?: React.ReactNode,
  /** The content to display inside modal */
  children?: React.ReactNode,
  /** Inner content of the footer */
  footer?: React.ReactNode,
  /** Disable animations and open modal instantly */
  instant?: boolean,
  /** Automatically adds sections to modal */
  sectioned?: boolean,
  /** Increases the modal width */
  large?: boolean,
  /** Limits modal height on large sceens with scrolling */
  limitHeight?: boolean,
  /** Replaces modal content with a spinner while a background action is being performed */
  loading?: boolean,
  /** Callback when iframe has loaded */
  onIFrameLoad?(evt: React.SyntheticEvent<HTMLIFrameElement>): void,
  /** Callback when the modal is closed */
  onClose(): void,
  /** Callback when modal transition animation has ended */
  onTransitionEnd?(): void,
}

export interface EASDKProps {
  /** The URL that will be loaded as the content of the modal */
  src: string,
  /** The content for the title of the modal */
  title?: string,
  /** Controls the width of the modal (in pixels) */
  width?: Width,
  /** Controls the height of the modal (in pixels) */
  height?: number,
  /** Primary action for the modal */
  primaryAction?: DisableableAction,
  /** Collection of secondary action for the modal */
  secondaryActions?: DisableableAction[],
  /** Callback when the modal is closed */
  onClose(): void,
}

export interface AlertProps {
  /** The content to display inside the alert */
  children?: string,
  /** The alert title */
  title?: string,
  /** For confirming a destructive or dangerous action */
  destructive?: boolean,
  /** The content of the confirmation button */
  confirmContent: string,
  /** The content of the cancel button */
  cancelContent?: string,
  /** Callback when the alert is closed, or when the cancel button is clicked */
  onClose?(): void,
  /** Callback when the confirmation button is clicked */
  onConfirm(): void,
}

export type Props = {
  /** Whether the modal is open or not */
  open: boolean,
} & ( ModalProps | AlertProps | EASDKProps);

export interface State {
  iframeHeight: number,
}

const getUniqueID = createUniqueIDFactory('modal-header');

export default class Modal extends React.Component<Props, State> {
  static contextTypes = {easdk: PropTypes.object};
  static Dialog = Dialog;
  static Section = Section;
  focusReturnPointNode: HTMLElement;

  state: State = {
    iframeHeight: IFRAME_LOADING_HEIGHT,
  };

  private headerId = getUniqueID();

  componentDidMount() {
    if (this.context.easdk == null) { return; }
    const {open} = this.props;
    if (open) {
      this.handleEASDKMessaging();
      this.focusReturnPointNode = document.activeElement as HTMLElement;
    }
  }

  componentDidUpdate({open: wasOpen}: Props) {
    if (this.context.easdk == null) { return; }

    const {open} = this.props;

    if (wasOpen !== open) {
      this.handleEASDKMessaging();
    }

    if (!wasOpen && open) {
      this.focusReturnPointNode = document.activeElement as HTMLElement;
    } else if (wasOpen && !open && this.focusReturnPointNode != null && document.contains(this.focusReturnPointNode)) {
      this.focusReturnPointNode.focus();
      this.focusReturnPointNode = null as any;
    }
  }

  render() {
    if (this.context.easdk != null) { return null; }

    const {
      children,
      onClose,
      title,
      src,
      open,
      instant,
      sectioned,
      loading,
      large,
      limitHeight,
      footer,
      primaryAction,
      secondaryActions,
    } = (this.props as Props & ModalProps & FooterProps);

    const {iframeHeight} = this.state;

    const handleClose = memoizedBind(onClose);

    let dialog: React.ReactNode;
    let backdrop: React.ReactNode;
    if (open) {
      const footerMarkup = (!footer && !primaryAction && !secondaryActions)
        ? null
        : (
          <Footer primaryAction={primaryAction} secondaryActions={secondaryActions}>
            {footer}
          </Footer>
        );

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
          className={styles.Body}
        >
          {body}
        </Scrollable>
      );

      const headerMarkup = title ? (
        <Header id={this.headerId} onClose={handleClose} testID="ModalHeader">
          {title}
        </Header>
      ) : (
        <CloseButton
          onClick={handleClose}
          title={false}
          testID="ModalCloseButton"
        />
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

    handleWarning('modal', this.props);
    return (
      <Portal idPrefix="modal">
          <TransitionGroup appear={animated} enter={animated} exit={animated}>
            {dialog}
          </TransitionGroup>
          {backdrop}
      </Portal>
    );
  }

  @autobind
  private handleEntered() {
    const {onTransitionEnd} = this.props as ModalProps;
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }

  @autobind
  private handleExited() {
    this.setState({
      iframeHeight: IFRAME_LOADING_HEIGHT,
    });

    if (this.focusReturnPointNode) {
      write(() => focusFirstFocusableNode(this.focusReturnPointNode, false));
    }
  }

  @autobind
  private handleIFrameLoad(evt: React.SyntheticEvent<HTMLIFrameElement>) {
    const iframe = evt.target as HTMLIFrameElement;
    this.setState({
      iframeHeight: iframe.contentWindow.document.body.scrollHeight,
    });

    const {onIFrameLoad} = this.props as ModalProps;

    if (onIFrameLoad != null) {
      onIFrameLoad(evt);
    }
  }

  private handleEASDKMessaging() {
    const {easdk} = this.context;
    const {open, children} = this.props;
    if (easdk == null) { return; }

    if (open) {
      if (typeof children === 'string') {
        handleWarning('alert', this.props);
        easdk.Modal.alert(this.props);
      } else {
        handleWarning('easdk', this.props);
        easdk.Modal.open(this.props);
      }
    } else {
      easdk.Modal.close();
    }
  }
}

export type Warn = 'alert' | 'easdk' | 'modal';

function handleWarning(type: Warn, props: AlertProps | EASDKProps | ModalProps) {
  const reqProps = {
    modal: {
      open: 'open',
      onClose: 'onClose',
    },
    alert: {
      open: 'open',
      confirmContent: 'confirmContent',
      onConfirm: 'onConfirm',
    },
    easdk: {
      open: 'open',
      src: 'src',
      onClose: 'onClose',
    },
  };

  const missingProps = Object.keys(reqProps[type]).reduce((acc: string[], key) => {
    if (!props.hasOwnProperty(key)) {
      acc.push(key);
    }
    return acc;
  }, []);

  if (missingProps.length > 0) {
    // tslint:disable-next-line no-console
    console.warn(`These required properties are missing from Modal: ${missingProps.join(', ')}`);
  }
  return;
}
