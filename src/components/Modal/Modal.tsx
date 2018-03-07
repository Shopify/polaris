import * as React from 'react';
import * as PropTypes from 'prop-types';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {write} from '@shopify/javascript-utilities/fastdom';
import {wrapWithComponent} from '@shopify/react-utilities/components';
import {classNames} from '@shopify/react-utilities/styles';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {TransitionGroup} from 'react-transition-group';
import {Scrollable, Icon, Spinner, Portal} from '../';
import {DisableableAction} from '../../types';
import memoizedBind from '../../utilities/memoized-bind';
import {Dialog, Footer, FooterProps, Header, Section} from './components';
import * as styles from './Modal.scss';

const IFRAME_LOADING_HEIGHT = 200;

export type Width = 'large' | 'fullwidth';

export interface ModalProps extends FooterProps {
  src?: string,
  title?: React.ReactNode,
  children?: React.ReactNode,
  footer?: React.ReactNode,
  instant?: boolean,
  sectioned?: boolean,
  large?: boolean,
  limitHeight?: boolean,
  loading?: boolean,
  onIFrameLoad?(evt: React.SyntheticEvent<HTMLIFrameElement>): void,
  onClose(): void,
  onTransitionEnd?(): void,
}

export interface EASDKProps {
  src: string,
  title?: string,
  width?: Width,
  height?: number,
  primaryAction?: DisableableAction,
  secondaryActions?: DisableableAction[],
  onClose(): void,
}

export interface AlertProps {
  children?: string,
  title?: string,
  destructive?: boolean,
  confirmContent: string,
  cancelContent?: string,
  onClose?(): void,
  onConfirm(): void,
}

export type Props = {
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
      footer,
      instant,
      sectioned,
      loading,
      large,
      limitHeight,
    } = (this.props as Props & ModalProps);

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

    handleWarning('modal', this.props);
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
    const {footer, primaryAction, secondaryActions} = this.props as ModalProps;
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
