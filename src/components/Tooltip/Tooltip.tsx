import React, {useEffect, useState, useRef, useCallback} from 'react';
import {findFirstFocusableNode} from '@shopify/javascript-utilities/focus';

import {PreferredPosition} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {useUniqueId} from '../../utilities/unique-id';
import {useToggle} from '../../utilities/use-toggle';
import {TooltipOverlay} from './components';
import styles from './Tooltip.scss';

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: string;
  /** Display tooltip with a light background */
  light?: boolean;
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /**
   * The direction the tooltip tries to display
   * @default 'below'
   */
  preferredPosition?: PreferredPosition;
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
}

export function Tooltip({
  children,
  content,
  light,
  active: originalActive,
  preferredPosition = 'below',
  activatorWrapper = 'span',
}: TooltipProps) {
  const WrapperComponent: any = activatorWrapper;
  const {value: active, setTrue: handleFocus, setFalse: handleBlur} = useToggle(
    Boolean(originalActive),
  );
  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);

  const id = useUniqueId('TooltipContent');
  const activatorContainer = useRef<HTMLElement>(null);
  const mouseEntered = useRef(false);

  // Check this impl
  const setAccessibilityAttributes = useCallback(() => {
    if (activatorContainer == null) {
      return;
    }

    const firstFocusable = activatorContainer.current
      ? findFirstFocusableNode(activatorContainer.current)
      : null;
    const accessibilityNode = firstFocusable || activatorContainer.current;

    if (!accessibilityNode) return;

    accessibilityNode.tabIndex = 0;
    accessibilityNode.setAttribute('aria-describedby', id);
  }, [id]);

  useEffect(() => {
    setAccessibilityAttributes();
  }, [setAccessibilityAttributes]);

  const portal = activatorNode ? (
    <Portal idPrefix="tooltip">
      <TooltipOverlay
        id={id}
        preferredPosition={preferredPosition}
        activator={activatorNode}
        active={active}
        onClose={noop}
        light={light}
      >
        <div className={styles.Label} testID="TooltipOverlayLabel">
          {content}
        </div>
      </TooltipOverlay>
    </Portal>
  ) : null;

  return (
    <WrapperComponent
      testID="WrapperComponent"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
      ref={setActivator}
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

    setActivatorNode(node.firstElementChild as HTMLElement);
    activatorContainerRef.current = node;
  }

  // maybe add pre focus and pre blur????
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
