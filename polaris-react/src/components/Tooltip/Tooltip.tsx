import React, {useEffect, useState, useRef, useCallback} from 'react';

import {Portal} from '../Portal';
import {findFirstFocusableNode} from '../../utilities/focus';
import {useUniqueId} from '../../utilities/unique-id';
import {useToggle} from '../../utilities/use-toggle';
import {Key} from '../../types';

import {TooltipOverlay, TooltipOverlayProps} from './components';

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: React.ReactNode;
  /** Toggle whether the tooltip is visible */
  active?: boolean;
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
}

export function Tooltip({
  children,
  content,
  active: originalActive,
  preferredPosition = 'above',
  activatorWrapper = 'span',
  accessibilityLabel,
}: TooltipProps) {
  const WrapperComponent: any = activatorWrapper;
  const ChildWrapperComponent: any = activatorWrapper;
  const {
    value: active,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useToggle(Boolean(originalActive));
  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const [tooltipTransform, setTooltipTransform] = useState<string>('');

  const id = useUniqueId('TooltipContent');
  const activatorContainer = useRef<HTMLElement>(null);
  const childWrapperContainer = useRef<HTMLDivElement>(null);
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

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.keyCode !== Key.Escape) return;
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
        active={active}
        accessibilityLabel={accessibilityLabel}
        onClose={noop}
        transform={tooltipTransform}
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
      <ChildWrapperComponent
        onMouseMove={handleMouseMove}
        ref={childWrapperContainer}
      >
        {children}
      </ChildWrapperComponent>
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

  function handleMouseMove(event: React.MouseEvent) {
    if (!active) return;
    if (childWrapperContainer.current == null) return;
    const {x, y, width, height} =
      childWrapperContainer.current.getBoundingClientRect();
    const positionX = width / 2;
    const positionY = height / 2;
    const {clientX, clientY} = event;

    const tooltipLeft = clientX - x;
    const tooltipTop = clientY - y;

    const transformX = tooltipLeft - positionX;
    const transformY = tooltipTop - positionY;

    setTooltipTransform(`translate(${transformX}px, ${transformY}px)`);
  }
}

function noop() {}
