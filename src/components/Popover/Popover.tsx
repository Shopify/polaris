import React, {useRef, useEffect, useCallback, useState} from 'react';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';
import {focusNextFocusableNode} from '../../utilities/focus';

import {PreferredPosition, PreferredAlignment} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {portal} from '../shared';
import {useUniqueId} from '../../utilities/unique-id';
import {CloseSource, Pane, PopoverOverlay, Section} from './components';

export {CloseSource};

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
  /** Remains in a fixed position */
  fixed?: boolean;
  /** Callback when popover is closed */
  onClose(source: CloseSource): void;
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
    focusableActivator.tabIndex = focusableActivator.tabIndex || 0;
    focusableActivator.setAttribute('aria-controls', id);
    focusableActivator.setAttribute('aria-owns', id);
    focusableActivator.setAttribute('aria-haspopup', 'true');
    focusableActivator.setAttribute('aria-expanded', String(active));
  }, [active, id]);

  const handleClose = (source: CloseSource) => {
    onClose(source);

    if (activatorContainer.current == null) {
      return;
    }

    if (
      (source === CloseSource.FocusOut ||
        source === CloseSource.EscapeKeypress) &&
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
