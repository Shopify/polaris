import React, {useState, useCallback, useRef, useId, cloneElement} from 'react';
import {TransitionGroup} from 'react-transition-group';

import {focusFirstFocusableNode} from '../../utilities/focus';
import {useI18n} from '../../utilities/i18n';
import {WithinContentContext} from '../../utilities/within-content-context';
import {wrapWithComponent} from '../../utilities/components';
import {Backdrop} from '../Backdrop';
import {Box} from '../Box';
import {HorizontalStack} from '../HorizontalStack';
import {Scrollable} from '../Scrollable';
import {Spinner} from '../Spinner';
import {Portal} from '../Portal';

import {Dialog, Footer, Header, Section} from './components';
import type {FooterProps} from './components';
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
  title: string | React.ReactNode;
  /**
   * Hide the title in the modal
   * @default false
   */
  titleHidden?: boolean;
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
  /** Decreases the modal width */
  small?: boolean;
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
  /** The element or the RefObject that activates the Modal */
  activator?: React.RefObject<HTMLElement> | React.ReactElement;
  /** Removes Scrollable container from the modal content */
  noScroll?: boolean;
  /** Sets modal to the height of the viewport on small screens */
  fullScreen?: boolean;
}

export const Modal: React.FunctionComponent<ModalProps> & {
  Section: typeof Section;
} = function Modal({
  children,
  title,
  titleHidden = false,
  src,
  iFrameName,
  open,
  instant,
  sectioned,
  loading,
  large,
  small,
  limitHeight,
  footer,
  primaryAction,
  secondaryActions,
  onScrolledToBottom,
  activator,
  onClose,
  onIFrameLoad,
  onTransitionEnd,
  noScroll,
  fullScreen,
}: ModalProps) {
  const [iframeHeight, setIframeHeight] = useState(IFRAME_LOADING_HEIGHT);
  const [closing, setClosing] = useState(false);

  const headerId = useId();
  const activatorRef = useRef<HTMLElement>(null);

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

    const activatorElement =
      activator && isRef(activator)
        ? activator && activator.current
        : activatorRef.current;
    if (activatorElement) {
      requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
    }
  }, [activator]);

  const handleIFrameLoad = useCallback(
    (evt: React.SyntheticEvent<HTMLIFrameElement>) => {
      const iframe = evt.target as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        try {
          setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
        } catch (_error) {
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
      ? wrapWithComponent(children, Section, {titleHidden})
      : children;

    const body = loading ? (
      <Box padding="4">
        <HorizontalStack gap="4" align="center" blockAlign="center">
          <Spinner />
        </HorizontalStack>
      </Box>
    ) : (
      content
    );

    const scrollContainerMarkup = noScroll ? (
      <Box width="100%" overflowX="hidden">
        {body}
      </Box>
    ) : (
      <Scrollable
        shadow
        className={styles.Body}
        onScrolledToBottom={onScrolledToBottom}
      >
        {body}
      </Scrollable>
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
      scrollContainerMarkup
    );

    dialog = (
      <Dialog
        instant={instant}
        labelledBy={headerId}
        onClose={onClose}
        onEntered={handleEntered}
        onExited={handleExited}
        large={large}
        small={small}
        limitHeight={limitHeight}
        fullScreen={fullScreen}
        setClosing={setClosing}
      >
        <Header
          titleHidden={titleHidden}
          id={headerId}
          closing={closing}
          onClose={onClose}
        >
          {title}
        </Header>
        {bodyMarkup}
        {footerMarkup}
      </Dialog>
    );

    backdrop = <Backdrop setClosing={setClosing} onClick={onClose} />;
  }

  const animated = !instant;

  const activatorMarkup =
    activator && !isRef(activator)
      ? cloneElement(activator, {ref: activatorRef})
      : null;

  return (
    <WithinContentContext.Provider value>
      {activatorMarkup}
      <Portal idPrefix="modal">
        <TransitionGroup appear={animated} enter={animated} exit={animated}>
          {dialog}
        </TransitionGroup>
        {backdrop}
      </Portal>
    </WithinContentContext.Provider>
  );
};

function isRef(
  ref: React.RefObject<HTMLElement> | React.ReactElement,
): ref is React.RefObject<HTMLElement> {
  return Object.prototype.hasOwnProperty.call(ref, 'current');
}

Modal.Section = Section;
