import React, {useState, useCallback} from 'react';
import {TransitionGroup} from '@material-ui/react-transition-group';
import {write} from '@shopify/javascript-utilities/fastdom';
import {focusFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {useUniqueId} from '../../utilities/unique-id/hooks';
import {useI18n} from '../../utilities/i18n';
import {WithinContentContext} from '../../utilities/within-content-context';
import {wrapWithComponent} from '../../utilities/components';

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
  /** The element to activate the Modal */
  activator?: React.ReactElement;
}

export const Modal: React.FunctionComponent<ModalProps> & {
  Section: typeof Section;
} = function Modal({
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
  footer,
  primaryAction,
  secondaryActions,
  onScrolledToBottom,
  activator,
  onClose,
  onIFrameLoad,
  onTransitionEnd,
}: ModalProps) {
  const [iframeHeight, setIframeHeight] = useState(IFRAME_LOADING_HEIGHT);

  const headerId = useUniqueId('modal-header');
  const activatorRef = React.useRef<HTMLDivElement>(null);

  const i18n = useI18n();
  const iframeTitle = i18n.translate('Polaris.Modal.iFrameTitle');

  let dialog: React.ReactNode;
  let backdrop: React.ReactNode;

  const handleEntered = useCallback(() => {
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }, [onTransitionEnd]);

  const handleExited = useCallback(() => {
    setIframeHeight(IFRAME_LOADING_HEIGHT);

    const activator = activatorRef.current;
    if (activator) {
      write(() => focusFirstFocusableNode(activator));
    }
  }, []);

  const handleIFrameLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLIFrameElement>) => {
      const iframe = evt.target as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        try {
          setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
        } catch {
          setIframeHeight(DEFAULT_IFRAME_CONTENT_HEIGHT);
        }
      }

      if (onIFrameLoad != null) {
        onIFrameLoad(evt);
      }
    },
    [onIFrameLoad],
  );

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
        onLoad={handleIFrameLoad}
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
      <Header id={headerId} onClose={onClose} testID="ModalHeader">
        {title}
      </Header>
    ) : (
      <CloseButton onClick={onClose} title={false} testID="ModalCloseButton" />
    );

    const labelledBy = title ? headerId : undefined;

    dialog = (
      <Dialog
        instant={instant}
        labelledBy={labelledBy}
        onClose={onClose}
        onEntered={handleEntered}
        onExited={handleExited}
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
      <div ref={activatorRef}>{activator}</div>
      <Portal idPrefix="modal">
        <TransitionGroup appear={animated} enter={animated} exit={animated}>
          {dialog}
        </TransitionGroup>
        {backdrop}
      </Portal>
    </WithinContentContext.Provider>
  );
};

Modal.Section = Section;

// Use named export once withAppProvider is refactored away
// eslint-disable-next-line import/no-default-export
// export default Modal;
