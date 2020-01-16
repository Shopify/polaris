import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  AriaAttributes,
} from 'react';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {focusNextFocusableNode} from '../../utilities/focus';

import {PreferredPosition, PreferredAlignment} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {portal} from '../shared';
import {useUniqueId} from '../../utilities/unique-id';
import {PopoverCloseSource, Pane, PopoverOverlay, Section} from './components';
import {setActivatorAttributes} from './set-activator-attributes';

export {PopoverCloseSource};

export interface PopoverProps {
  /** The content to display inside the popover */
  children?: React.ReactNode;
  /** The preferred direction to open the popover */
  preferredPosition?: PreferredPosition;
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PreferredAlignment;
  /** Show or hide the Popover */
  active: boolean;
  /** The element to activate the Popover */
  activator: React.ReactElement;
  /**
   * The element type to wrap the activator with
   * @default 'div'
   */
  activatorWrapper?: string;
  /** Prevent automatic focus of the first field on activation */
  preventAutofocus?: boolean;
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
  /** Callback when popover is closed */
  onClose(source: PopoverCloseSource): void;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const Popover: React.FunctionComponent<PopoverProps> & {
  Pane: typeof Pane;
  Section: typeof Section;
} = function Popover({
  activatorWrapper = 'div',
  children,
  onClose,
  activator,
  active,
  fixed,
  ariaHaspopup,
  ...rest
}: PopoverProps) {
  const [activatorNode, setActivatorNode] = useState();
  const activatorContainer = useRef<HTMLElement>(null);
  const WrapperComponent: any = activatorWrapper;
  const id = useUniqueId('popover');

  const setAccessibilityAttributes = useCallback(() => {
    if (activatorContainer.current == null) {
      return;
    }

    const firstFocusable = findFirstFocusableNode(activatorContainer.current);
    const focusableActivator = firstFocusable || activatorContainer.current;
    setActivatorAttributes(focusableActivator, {id, active, ariaHaspopup});
  }, [active, ariaHaspopup, id]);

  const handleClose = (source: PopoverCloseSource) => {
    onClose(source);

    if (activatorContainer.current == null) {
      return;
    }

    if (
      (source === PopoverCloseSource.FocusOut ||
        source === PopoverCloseSource.EscapeKeypress) &&
      activatorNode
    ) {
      const focusableActivator =
        findFirstFocusableNode(activatorNode) ||
        findFirstFocusableNode(activatorContainer.current) ||
        activatorContainer.current;
      if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
        focusableActivator.focus();
      }
    }
  };

  useEffect(() => {
    if (!activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    } else if (
      activatorNode &&
      activatorContainer.current &&
      !activatorContainer.current.contains(activatorNode)
    ) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);

  useEffect(() => {
    if (activatorNode && activatorContainer.current) {
      setActivatorNode(activatorContainer.current.firstElementChild);
    }
    setAccessibilityAttributes();
  }, [activatorNode, setAccessibilityAttributes]);

  const portal = activatorNode ? (
    <Portal idPrefix="popover" testID="portal">
      <PopoverOverlay
        testID="popoverOverlay"
        id={id}
        activator={activatorNode}
        onClose={handleClose}
        active={active}
        fixed={fixed}
        {...rest}
      >
        {children}
      </PopoverOverlay>
    </Portal>
  ) : null;

  return (
    <WrapperComponent ref={activatorContainer}>
      {React.Children.only(activator)}
      {portal}
    </WrapperComponent>
  );
};

function isInPortal(element: Element) {
  let parentElement = element.parentElement;

  while (parentElement) {
    if (parentElement.matches(portal.selector)) return false;
    parentElement = parentElement.parentElement;
  }

  return true;
}

Popover.Pane = Pane;
Popover.Section = Section;
