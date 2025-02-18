import React, {
  Children,
  forwardRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  useId,
  useState,
} from 'react';
import type {AriaAttributes} from 'react';

import {
  findFirstFocusableNodeIncludingDisabled,
  focusNextFocusableNode,
} from '../../utilities/focus';
import {Portal} from '../Portal';
import {portal} from '../shared';

import {PopoverCloseSource, Pane, PopoverOverlay, Section} from './components';
import type {PopoverAutofocusTarget, PopoverOverlayProps} from './components';
import {setActivatorAttributes} from './set-activator-attributes';

export {PopoverCloseSource};
export type {PopoverAutofocusTarget};

export interface PopoverProps {
  /** The content to display inside the popover */
  children?: React.ReactNode;
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PopoverOverlayProps['preferredAlignment'];
  /** Show or hide the Popover */
  active: boolean;
  /** The element to activate the Popover.
   * If using a button, use the default or tertiary variant
   * which will show an active state when popover is active
   */
  activator: React.ReactElement;
  /**
   * Use the activator's input element to calculate the Popover position
   * @default true
   */
  preferInputActivator?: PopoverOverlayProps['preferInputActivator'];
  /**
   * The element type to wrap the activator with
   * @default 'div'
   */
  activatorWrapper?: string;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Prevents focusing the activator or the next focusable element when the popover is deactivated */
  preventFocusOnClose?: boolean;
  /** Automatically add wrap content in a section */
  sectioned?: boolean;
  /** Allow popover to stretch to the full width of its activator */
  fullWidth?: boolean;
  /** Allow popover to stretch to fit content vertically */
  fullHeight?: boolean;
  /** Allow popover content to determine the overlay width and height */
  fluidContent?: boolean;
  /** Remains in a fixed position */
  fixed?: boolean;
  /** Used to illustrate the type of popover element */
  ariaHaspopup?: AriaAttributes['aria-haspopup'];
  /** Allow the popover overlay to be hidden when printing */
  hideOnPrint?: boolean;
  /** Callback when popover is closed */
  onClose(source: PopoverCloseSource): void;
  /**
   * The preferred auto focus target defaulting to the popover container
   * @default 'container'
   */
  autofocusTarget?: PopoverAutofocusTarget;
  /** Prevents closing the popover when other overlays are clicked */
  preventCloseOnChildOverlayClick?: boolean;
  /**
   * Prevents page scrolling when the end of the scrollable Popover overlay content is reached - applied to Pane subcomponent
   * @default false
   */
  captureOverscroll?: boolean;
}

type CloseTarget = 'activator' | 'next-node';
export interface PopoverPublicAPI {
  forceUpdatePosition(): void;
  close(target?: CloseTarget): void;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

const PopoverComponent = forwardRef<PopoverPublicAPI, PopoverProps>(
  function Popover(
    {
      activatorWrapper = 'div',
      children,
      onClose,
      activator,
      preventFocusOnClose,
      active,
      fixed,
      ariaHaspopup,
      preferInputActivator = true,
      zIndexOverride,
      ...rest
    },
    ref,
  ) {
    const [isDisplayed, setIsDisplay] = useState(false);
    const [activatorNode, setActivatorNode] = useState<HTMLElement>();
    const overlayRef = useRef<PopoverOverlay>(null);
    const activatorContainer = useRef<HTMLElement>(null);

    const WrapperComponent: any = activatorWrapper;
    const id = useId();

    function forceUpdatePosition() {
      overlayRef.current?.forceUpdatePosition();
    }

    const handleClose = (source: PopoverCloseSource) => {
      onClose(source);
      if (activatorContainer.current == null || preventFocusOnClose) {
        return;
      }
      if (source === PopoverCloseSource.FocusOut && activatorNode) {
        const focusableActivator =
          findFirstFocusableNodeIncludingDisabled(activatorNode) ||
          findFirstFocusableNodeIncludingDisabled(activatorContainer.current) ||
          activatorContainer.current;
        if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
          focusableActivator.focus();
        }
      } else if (
        source === PopoverCloseSource.EscapeKeypress &&
        activatorNode
      ) {
        const focusableActivator =
          findFirstFocusableNodeIncludingDisabled(activatorNode) ||
          findFirstFocusableNodeIncludingDisabled(activatorContainer.current) ||
          activatorContainer.current;

        if (focusableActivator) {
          focusableActivator.focus();
        } else {
          focusNextFocusableNode(focusableActivator, isInPortal);
        }
      }
    };

    useImperativeHandle(ref, () => {
      return {
        forceUpdatePosition,
        close: (target = 'activator') => {
          const source =
            target === 'activator'
              ? PopoverCloseSource.EscapeKeypress
              : PopoverCloseSource.FocusOut;

          handleClose(source);
        },
      };
    });

    const setAccessibilityAttributes = useCallback(() => {
      if (activatorContainer.current == null) {
        return;
      }

      const firstFocusable = findFirstFocusableNodeIncludingDisabled(
        activatorContainer.current,
      );
      const focusableActivator: HTMLElement & {
        disabled?: boolean;
      } = firstFocusable || activatorContainer.current;

      const activatorDisabled =
        'disabled' in focusableActivator &&
        Boolean(focusableActivator.disabled);

      setActivatorAttributes(focusableActivator, {
        id,
        active,
        ariaHaspopup,
        activatorDisabled,
      });
    }, [id, active, ariaHaspopup]);

    useEffect(() => {
      function setDisplayState() {
        /**
         * This is a workaround to prevent rendering the Popover when the content is moved into
         * a React portal that hasn't been rendered. We don't want to render the Popover in this
         * case because the auto-focus logic will break. We wait until the activatorContainer is
         * displayed, which is when it has an offsetParent, or if the activatorContainer is the
         * body, if it has a clientWidth bigger than 0.
         * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
         */

        setIsDisplay(
          Boolean(
            activatorContainer.current &&
              (activatorContainer.current.offsetParent !== null ||
                (activatorContainer.current ===
                  activatorContainer.current.ownerDocument.body &&
                  activatorContainer.current.clientWidth > 0)),
          ),
        );
      }

      if (!activatorContainer.current) {
        return;
      }

      const observer = new ResizeObserver(setDisplayState);
      observer.observe(activatorContainer.current);

      /**
       * We want to observe the parent element when possible because it is the one controlling the display state of the popover.
       * The parent element could be collapsed initially and then opened later on like in the case
       * of using a `<details>` component.
       */

      observer.observe(
        activatorContainer.current.parentElement || activatorContainer.current,
      );

      setDisplayState();

      return () => {
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      if (!activatorNode && activatorContainer.current) {
        setActivatorNode(
          activatorContainer.current.firstElementChild as HTMLElement,
        );
      } else if (
        activatorNode &&
        activatorContainer.current &&
        !activatorContainer.current.contains(activatorNode)
      ) {
        setActivatorNode(
          activatorContainer.current.firstElementChild as HTMLElement,
        );
      }
      setAccessibilityAttributes();
    }, [activatorNode, setAccessibilityAttributes]);

    useEffect(() => {
      if (activatorNode && activatorContainer.current) {
        setActivatorNode(
          activatorContainer.current.firstElementChild as HTMLElement,
        );
      }
      setAccessibilityAttributes();
    }, [activatorNode, setAccessibilityAttributes]);

    const portal =
      activatorNode && isDisplayed ? (
        <Portal idPrefix="popover">
          <PopoverOverlay
            ref={overlayRef}
            id={id}
            activator={activatorNode}
            preferInputActivator={preferInputActivator}
            onClose={handleClose}
            active={active}
            fixed={fixed}
            zIndexOverride={zIndexOverride}
            {...rest}
          >
            {children}
          </PopoverOverlay>
        </Portal>
      ) : null;

    return (
      <WrapperComponent ref={activatorContainer}>
        {Children.only(activator)}
        {portal}
      </WrapperComponent>
    );
  },
);

function isInPortal(element: Element) {
  let parentElement = element.parentElement;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) return false;
    parentElement = parentElement.parentElement;
  }

  return true;
}

export const Popover = Object.assign(PopoverComponent, {Pane, Section});
