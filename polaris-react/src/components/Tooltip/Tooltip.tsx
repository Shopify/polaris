import React, {useEffect, useState, useRef, useCallback} from 'react';

import {Portal} from '../Portal';
import {findFirstFocusableNode} from '../../utilities/focus';
import {useUniqueId} from '../../utilities/unique-id';

import {TooltipOverlay, TooltipOverlayProps} from './components';

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: React.ReactNode;
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /** Dismiss tooltip when not interacting with its children */
  dismissOnMouseOut?: TooltipOverlayProps['preventInteraction'];
  /**
   * The direction the tooltip tries to display
   * @default 'below'
   */
  preferredPosition?: TooltipOverlayProps['preferredPosition'];
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /* Callback fired when the tooltip is activated or dismissed */
  onVisibilityChange?(active: boolean): void;
}

export function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: forceActive,
  preferredPosition = 'below',
  activatorWrapper = 'span',
  accessibilityLabel,
  onVisibilityChange,
}: TooltipProps) {
  const WrapperComponent: any = activatorWrapper;

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const [active, setActive] = useState<boolean | undefined>(
    forceActive ? undefined : false,
  );

  const id = useUniqueId('TooltipContent');
  const activatorContainer = useRef<HTMLElement>(null);
  const mouseEntered = useRef(false);

  useEffect(() => {
    const firstFocusable = activatorContainer.current
      ? findFirstFocusableNode(activatorContainer.current)
      : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;

    if (!accessibilityNode) return;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
    accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');
  }, [id, children]);

  useEffect(() => {
    if (forceActive && onVisibilityChange) {
      if (active !== undefined) return;
      setActive(true);
    }
  }, [forceActive, active, setActive, onVisibilityChange]);

  useEffect(() => {
    if (onVisibilityChange && active !== undefined) {
      onVisibilityChange(active);
    }
  }, [active, onVisibilityChange]);

  const handleFocus = useCallback(() => {
    setActive(true);
  }, []);

  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      handleBlur();
    },
    [handleBlur],
  );

  const portal = activatorNode ? (
    <Portal idPrefix="tooltip">
      <TooltipOverlay
        id={id}
        preferredPosition={preferredPosition}
        activator={activatorNode}
        active={active === undefined ? false : active}
        accessibilityLabel={accessibilityLabel}
        onClose={noop}
        preventInteraction={dismissOnMouseOut}
      >
        {content}
      </TooltipOverlay>
    </Portal>
  ) : null;

  return (
    <WrapperComponent
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
      ref={setActivator}
      onKeyUp={handleKeyUp}
    >
      {children}
      {portal}
    </WrapperComponent>
  );

  function setActivator(node: HTMLElement | null) {
    const activatorContainerRef: any = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }

    node.firstElementChild instanceof HTMLElement &&
      setActivatorNode(node.firstElementChild);

    activatorContainerRef.current = node;
  }

  function handleMouseEnter() {
    mouseEntered.current = true;
    handleFocus();
  }

  function handleMouseLeave() {
    mouseEntered.current = false;
    handleBlur();
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}

function noop() {}
