import React, {useEffect, useState, useRef, useCallback} from 'react';
import type {
  ShapeBorderRadiusScale,
  SpacingSpaceScale,
} from '@shopify/polaris-tokens';

import {Portal} from '../Portal';
import {findFirstFocusableNode} from '../../utilities/focus';
import {useUniqueId} from '../../utilities/unique-id';
import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';

import {TooltipOverlay, TooltipOverlayProps} from './components';
import styles from './Tooltip.scss';

export type Width = 'default' | 'wide';
export type Padding = 'default' | Extract<SpacingSpaceScale, '4'>;
export type BorderRadius = Extract<ShapeBorderRadiusScale, '1' | '2'>;

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: React.ReactNode;
  /** Toggle whether the tooltip is visible */
  active?: boolean;
  /** Delay in milliseconds while hovering over an element before the tooltip is visible */
  hoverDelay?: number;
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
  /**
   * Width of content
   * @default 'default'
   */
  width?: Width;
  /**
   * Padding of content
   * @default 'default'
   */
  padding?: Padding;
  /**
   * Border radius of the tooltip
   * @default '1'
   */
  borderRadius?: BorderRadius;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /* Callback fired when the tooltip is activated */
  onOpen?(): void;
  /* Callback fired when the tooltip is dismissed */
  onClose?(): void;
}

export function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  active: originalActive,
  hoverDelay,
  preferredPosition = 'below',
  activatorWrapper = 'span',
  accessibilityLabel,
  width = 'default',
  padding = 'default',
  borderRadius = '1',
  zIndexOverride,
  onOpen,
  onClose,
}: TooltipProps) {
  const WrapperComponent: any = activatorWrapper;
  const {
    value: active,
    setTrue: handleFocus,
    setFalse: handleBlur,
  } = useToggle(Boolean(originalActive));
  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);

  const id = useUniqueId('TooltipContent');
  const activatorContainer = useRef<HTMLElement>(null);
  const mouseEntered = useRef(false);
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);

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
    return () => {
      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
      }
    };
  }, []);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onClose?.();
      handleBlur();
    },
    [handleBlur, onClose],
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
        preventInteraction={dismissOnMouseOut}
        width={width}
        padding={padding}
        borderRadius={borderRadius}
        zIndexOverride={zIndexOverride}
      >
        {content}
      </TooltipOverlay>
    </Portal>
  ) : null;

  const wrapperClassNames = classNames(
    activatorWrapper === 'div' && styles.TooltipContainer,
  );

  return (
    <WrapperComponent
      onFocus={() => {
        onOpen?.();
        handleFocus();
      }}
      onBlur={() => {
        onClose?.();
        handleBlur();
      }}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
      ref={setActivator}
      onKeyUp={handleKeyUp}
      className={wrapperClassNames}
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
    if (hoverDelay) {
      hoverDelayTimeout.current = setTimeout(() => {
        onOpen?.();
        handleFocus();
      }, hoverDelay);
    } else {
      onOpen?.();
      handleFocus();
    }
  }

  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    onClose?.();
    handleBlur();
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}

function noop() {}
