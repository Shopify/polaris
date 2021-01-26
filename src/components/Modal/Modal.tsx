import React, {useState, useCallback, useRef, useContext} from 'react';
import {TransitionGroup} from 'react-transition-group';

import {focusFirstFocusableNode} from '../../utilities/focus';
import {ActionRefsTrackerContext} from '../../utilities/action-refs-tracker';
import {useUniqueId} from '../../utilities/unique-id/hooks';
import {useI18n} from '../../utilities/i18n';
import {WithinContentContext} from '../../utilities/within-content-context';
import {wrapWithComponent} from '../../utilities/components';
import {Backdrop} from '../Backdrop';
import {Scrollable} from '../Scrollable';
import {Spinner} from '../Spinner';
import {Portal} from '../Portal';

import {Dialog, Footer, FooterProps, Header, Section} from './components';
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
  /** id matching Action object */
  actionId?: string;
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
  actionId,
}: ModalProps) {
  const [iframeHeight, setIframeHeight] = useState(IFRAME_LOADING_HEIGHT);

  const headerId = useUniqueId('modal-header');
  const activatorRef = useRef<HTMLDivElement>(null);

  const actionRefsTracker = useContext(ActionRefsTrackerContext);
  const i18n = useI18n();
  const iframeTitle = i18n.translate('Polaris.Modal.iFrameTitle');

  let dialog: React.ReactNode;
  let backdrop: React.ReactNode;

  const handleEntered = useCallback(() => {
    if (onTransitionEnd) {
      onTransitionEnd();
    }
  }, [onTransitionEnd]);

  const getActivatorElement = useCallback(() => {
    const filterItem = actionRefsTracker.filter(
      (item) => item.id === actionId && item.actionRef?.current,
    );

    if (filterItem.length > 0) {
      return filterItem[0].actionRef?.current;
    } else {
      const activatorElement =
        activator && isRef(activator)
          ? activator && activator.current
          : activatorRef.current;

      return activatorElement;
    }
  }, [actionRefsTracker, activator, actionId]);

  const handleExited = useCallback(() => {
    setIframeHeight(IFRAME_LOADING_HEIGHT);

    const activatorElement = getActivatorElement();

    if (activatorElement) {
      requestAnimationFrame(() => focusFirstFocusableNode(activatorElement));
    }
  }, [getActivatorElement]);

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

    const scrollContainerMarkup = noScroll ? (
      <div className={styles.Body}>{body}</div>
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
      >
        <Header titleHidden={titleHidden} id={headerId} onClose={onClose}>
          {title}
        </Header>
        <div className={styles.BodyWrapper}>{bodyMarkup}</div>
        {footerMarkup}
      </Dialog>
    );

    backdrop = <Backdrop />;
  }

  const animated = !instant;

  const activatorMarkup =
    activator && !isRef(activator) ? (
      <div ref={activatorRef}>{activator}</div>
    ) : null;

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
