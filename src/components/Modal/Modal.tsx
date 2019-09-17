import React from 'react';
import {TransitionGroup} from '@material-ui/react-transition-group';
import {write} from '@shopify/javascript-utilities/fastdom';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {WithinContentContext} from '../../utilities/within-content-context';
import {wrapWithComponent} from '../../utilities/components';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../utilities/with-app-provider';
import {Backdrop} from '../Backdrop';
import {Scrollable} from '../Scrollable';
import {Spinner} from '../Spinner';
import {Portal} from '../Portal';

import {
  CloseButton,
  Dialog,
  Footer,
  FooterProps,
  Header,
  Section,
} from './components';
import styles from './Modal.scss';

const IFRAME_LOADING_HEIGHT = 200;
const DEFAULT_IFRAME_CONTENT_HEIGHT = 400;

export interface ModalProps extends FooterProps {
  /** Whether the modal is open or not */
  open: boolean;
  /** The url that will be loaded as the content of the modal */
  src?: string;
  /** The name of the modal content iframe */
  iFrameName?: string;
  /** The content for the title of the modal */
  title?: string | React.ReactNode;
  /** The content to display inside modal */
  children?: React.ReactNode;
  /** Inner content of the footer */
  footer?: React.ReactNode;
  /** Disable animations and open modal instantly */
  instant?: boolean;
  /** Automatically adds sections to modal */
  sectioned?: boolean;
  /** Increases the modal width */
  large?: boolean;
  /** Limits modal height on large sceens with scrolling */
  limitHeight?: boolean;
  /** Replaces modal content with a spinner while a background action is being performed */
  loading?: boolean;
  /** Callback when the modal is closed */
  onClose(): void;
  /** Callback when iframe has loaded */
  onIFrameLoad?(evt: React.SyntheticEvent<HTMLIFrameElement>): void;
  /** Callback when modal transition animation has ended */
  onTransitionEnd?(): void;
  /** Callback when the bottom of the modal content is reached */
  onScrolledToBottom?(): void;
}
type CombinedProps = ModalProps & WithAppProviderProps;

interface State {
  iframeHeight: number;
}

const getUniqueID = createUniqueIDFactory('modal-header');

class Modal extends React.Component<CombinedProps, State> {
  static Section = Section;
  focusReturnPointNode: HTMLElement;

  state: State = {
    iframeHeight: IFRAME_LOADING_HEIGHT,
  };

  private headerId = getUniqueID();

  render() {
    const {
      children,
      title,
      src,
      iFrameName,
      open,
      instant,
      sectioned,
      loading,
      large,
      limitHeight,
      onClose,
      footer,
      primaryAction,
      secondaryActions,
      polaris: {intl},
      onScrolledToBottom,
    } = this.props;

    const {iframeHeight} = this.state;

    const iframeTitle = intl.translate('Polaris.Modal.iFrameTitle');

    let dialog: React.ReactNode;
    let backdrop: React.ReactNode;
    if (open) {
      const footerMarkup =
        !footer && !primaryAction && !secondaryActions ? null : (
          <Footer
            primaryAction={primaryAction}
            secondaryActions={secondaryActions}
          >
            {footer}
          </Footer>
        );

      const content = sectioned
        ? wrapWithComponent(children, Section, {})
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
          name={iFrameName}
          title={iframeTitle}
          src={src}
          className={styles.IFrame}
          onLoad={this.handleIFrameLoad}
          style={{height: `${iframeHeight}px`}}
        />
      ) : (
        <Scrollable
          shadow
          className={styles.Body}
          onScrolledToBottom={onScrolledToBottom}
        >
          {body}
        </Scrollable>
      );

      const headerMarkup = title ? (
        <Header id={this.headerId} onClose={onClose} testID="ModalHeader">
          {title}
        </Header>
      ) : (
        <CloseButton
          onClick={onClose}
          title={false}
          testID="ModalCloseButton"
        />
      );

      const labelledBy = title ? this.headerId : undefined;

      dialog = (
        <Dialog
          instant={instant}
          labelledBy={labelledBy}
          onClose={onClose}
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

      backdrop = <Backdrop />;
    }

    const animated = !instant;

    return (
      <WithinContentContext.Provider value>
        <Portal idPrefix="modal">
          <TransitionGroup appear={animated} enter={animated} exit={animated}>
            {dialog}
          </TransitionGroup>
          {backdrop}
        </Portal>
      </WithinContentContext.Provider>
    );
  }

  private handleEntered = () => {
    const {onTransitionEnd} = this.props;
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  };

  private handleExited = () => {
    this.setState({
      iframeHeight: IFRAME_LOADING_HEIGHT,
    });

    if (this.focusReturnPointNode) {
      write(() => focusFirstFocusableNode(this.focusReturnPointNode, false));
    }
  };

  private handleIFrameLoad = (evt: React.SyntheticEvent<HTMLIFrameElement>) => {
    const iframe = evt.target as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        this.setState({
          iframeHeight: iframe.contentWindow.document.body.scrollHeight,
        });
      } catch {
        this.setState({
          iframeHeight: DEFAULT_IFRAME_CONTENT_HEIGHT,
        });
      }
    }

    const {onIFrameLoad} = this.props;

    if (onIFrameLoad != null) {
      onIFrameLoad(evt);
    }
  };
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<ModalProps>()(Modal);
