import React from 'react';
import {TransitionGroup} from '@material-ui/react-transition-group';
import {write} from '@shopify/javascript-utilities/fastdom';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Modal as AppBridgeModal} from '@shopify/app-bridge/actions';
import isEqual from 'lodash/isEqual';
import {WithinContentContext} from '../../utilities/within-content-context';
import {wrapWithComponent} from '../../utilities/components';

import {transformActions} from '../../utilities/app-bridge-transformers';
import {pick} from '../../utilities/pick';

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

type Size = 'Small' | 'Medium' | 'Large' | 'Full';

export interface ModalProps extends FooterProps {
  /** Whether the modal is open or not */
  open: boolean;
  /** The url that will be loaded as the content of the modal */
  src?: string;
  /** The name of the modal content iframe */
  iFrameName?: string;
  /** The content for the title of the modal (embedded app use accepts string only) */
  title?: string | React.ReactNode;
  /** The content to display inside modal (stand-alone app use only) */
  children?: React.ReactNode;
  /** Inner content of the footer (stand-alone app use only) */
  footer?: React.ReactNode;
  /** Disable animations and open modal instantly (stand-alone app use only) */
  instant?: boolean;
  /** Automatically adds sections to modal (stand-alone app use only) */
  sectioned?: boolean;
  /** Increases the modal width (stand-alone app use only) */
  large?: boolean;
  /** Limits modal height on large sceens with scrolling (stand-alone app use only) */
  limitHeight?: boolean;
  /** Replaces modal content with a spinner while a background action is being performed (stand-alone app use only) */
  loading?: boolean;
  /**
   * Controls the size of the modal
   * @default 'Small'
   * @embeddedAppOnly
   */
  size?: Size;
  /**
   * Message to display inside modal
   * @embeddedAppOnly
   */
  message?: string;
  /** Callback when the modal is closed */
  onClose(): void;
  /** Callback when iframe has loaded (stand-alone app use only) */
  onIFrameLoad?(evt: React.SyntheticEvent<HTMLIFrameElement>): void;
  /** Callback when modal transition animation has ended (stand-alone app use only) */
  onTransitionEnd?(): void;
  /** Callback when the bottom of the modal content is reached */
  onScrolledToBottom?(): void;
}
type CombinedProps = ModalProps & WithAppProviderProps;

interface State {
  iframeHeight: number;
}

const getUniqueID = createUniqueIDFactory('modal-header');

const APP_BRIDGE_PROPS: (keyof ModalProps)[] = [
  'title',
  'size',
  'message',
  'src',
  'primaryAction',
  'secondaryActions',
];

class Modal extends React.Component<CombinedProps, State> {
  static Section = Section;
  focusReturnPointNode: HTMLElement | null = null;

  state: State = {
    iframeHeight: IFRAME_LOADING_HEIGHT,
  };

  private headerId = getUniqueID();
  private appBridgeModal:
    | AppBridgeModal.ModalMessage
    | AppBridgeModal.ModalIframe
    | undefined;

  componentDidMount() {
    if (this.props.polaris.appBridge == null) {
      return;
    }

    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: Using `Modal` in an embedded app is deprecated and will be removed in v5.0. Use `Modal` from `@shopify/app-bridge-react` instead: https://help.shopify.com/en/api/embedded-apps/app-bridge/react-components/modal',
    );

    const transformProps = this.transformProps();
    if (transformProps) {
      this.appBridgeModal = AppBridgeModal.create(
        this.props.polaris.appBridge,
        transformProps,
      );
    }

    if (this.appBridgeModal) {
      this.appBridgeModal.subscribe(
        AppBridgeModal.Action.CLOSE,
        this.props.onClose,
      );
    }

    const {open} = this.props;

    if (open) {
      this.focusReturnPointNode = document.activeElement as HTMLElement;
      this.appBridgeModal &&
        this.appBridgeModal.dispatch(AppBridgeModal.Action.OPEN);
    }
  }

  componentDidUpdate(prevProps: CombinedProps) {
    if (this.props.polaris.appBridge == null || this.appBridgeModal == null) {
      return;
    }

    const {open} = this.props;
    const wasOpen = prevProps.open;
    const transformedProps = this.transformProps();

    const prevAppBridgeProps = pick(prevProps, APP_BRIDGE_PROPS);
    const currentAppBridgeProps = pick(this.props, APP_BRIDGE_PROPS);

    if (
      !isEqual(prevAppBridgeProps, currentAppBridgeProps) &&
      transformedProps
    ) {
      if (isIframeModal(transformedProps)) {
        (this.appBridgeModal as AppBridgeModal.ModalIframe).set(
          transformedProps,
        );
      } else {
        (this.appBridgeModal as AppBridgeModal.ModalMessage).set(
          transformedProps,
        );
      }
    }

    if (wasOpen !== open) {
      if (open) {
        this.appBridgeModal.dispatch(AppBridgeModal.Action.OPEN);
      } else {
        this.appBridgeModal.dispatch(AppBridgeModal.Action.CLOSE);
      }
    }

    if (!wasOpen && open) {
      this.focusReturnPointNode = document.activeElement as HTMLElement;
    } else if (
      wasOpen &&
      !open &&
      this.focusReturnPointNode != null &&
      document.contains(this.focusReturnPointNode)
    ) {
      this.focusReturnPointNode.focus();
      this.focusReturnPointNode = null as any;
    }
  }

  componentWillUnmount() {
    if (this.props.polaris.appBridge == null || this.appBridgeModal == null) {
      return;
    }

    this.appBridgeModal.unsubscribe();
  }

  render() {
    if (this.props.polaris.appBridge != null) {
      return null;
    }

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
      write(
        () =>
          this.focusReturnPointNode &&
          focusFirstFocusableNode(this.focusReturnPointNode, false),
      );
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

  private transformProps() {
    const {
      title,
      size,
      message,
      src,
      primaryAction,
      secondaryActions,
      polaris,
    } = this.props;
    const {appBridge} = polaris;

    if (!appBridge) return;

    const safeTitle = typeof title === 'string' ? title : undefined;
    const safeSize = size != null ? AppBridgeModal.Size[size] : undefined;
    const srcPayload: {url?: string; path?: string} = {};

    if (src != null) {
      if (/^https?:\/\//.test(src)) {
        srcPayload.url = src;
      } else {
        srcPayload.path = src;
      }
    }

    return {
      title: safeTitle,
      message,
      size: safeSize,
      ...srcPayload,
      footer: {
        buttons: transformActions(appBridge, {
          primaryAction,
          secondaryActions,
        }),
      },
    };
  }
}

function isIframeModal(
  options:
    | AppBridgeModal.MessagePayload
    | AppBridgeModal.IframePayload
    | object,
): options is AppBridgeModal.IframePayload {
  return (
    typeof (options as AppBridgeModal.IframePayload).url === 'string' ||
    typeof (options as AppBridgeModal.IframePayload).path === 'string'
  );
}

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
export default withAppProvider<ModalProps>()(Modal);
