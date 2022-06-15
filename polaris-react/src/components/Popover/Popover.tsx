import React, {
  Children,
  forwardRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import type {AriaAttributes} from 'react';

import {
  findFirstFocusableNodeIncludingDisabled,
  focusNextFocusableNode,
} from '../../utilities/focus';
import {Portal} from '../Portal';
import {portal} from '../shared';
import {useUniqueId} from '../../utilities/unique-id';

import {
  PopoverCloseSource,
  PopoverAutofocusTarget,
  Pane,
  PopoverOverlay,
  PopoverOverlayProps,
  Section,
} from './components';
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
  /** The element to activate the Popover */
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
  /** @deprecated Accepts a color scheme for the contents of the popover */
  colorScheme?: PopoverOverlayProps['colorScheme'];
  /**
   * The preferred auto focus target defaulting to the popover container
   * @default 'container'
   */
  autofocusTarget?: PopoverAutofocusTarget;
}

export interface PopoverPublicAPI {
  forceUpdatePosition(): void;
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
      colorScheme,
      zIndexOverride,
      ...rest
    },
    ref,
  ) {
    const [activatorNode, setActivatorNode] = useState<HTMLElement>();

    const overlayRef = useRef<PopoverOverlay>(null);
    const activatorContainer = useRef<HTMLElement>(null);

    const WrapperComponent: any = activatorWrapper;
    const id = useUniqueId('popover');

    function forceUpdatePosition() {
      overlayRef.current?.forceUpdatePosition();
    }

    useImperativeHandle(ref, () => {
      return {
        forceUpdatePosition,
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

    const handleClose = (source: PopoverCloseSource) => {
      onClose(source);
      if (activatorContainer.current == null || preventFocusOnClose) {
        return;
      }

      if (
        (source === PopoverCloseSource.FocusOut ||
          source === PopoverCloseSource.EscapeKeypress) &&
        activatorNode
      ) {
        const focusableActivator =
          findFirstFocusableNodeIncludingDisabled(activatorNode) ||
          findFirstFocusableNodeIncludingDisabled(activatorContainer.current) ||
          activatorContainer.current;
        if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
          focusableActivator.focus();
        }
      }
    };

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

    if (colorScheme && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: The `colorScheme` prop on the `Popover` component has been deprecated. See the v10 migration guide for replacing dark color scheme styles. https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md',
      );
    }

    const portal = activatorNode ? (
      <Portal idPrefix="popover">
        <PopoverOverlay
          ref={overlayRef}
          id={id}
          activator={activatorNode}
          preferInputActivator={preferInputActivator}
          onClose={handleClose}
          active={active}
          fixed={fixed}
          colorScheme={colorScheme}
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
