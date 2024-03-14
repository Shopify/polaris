import React, {useEffect, useState, useRef, useCallback, useId} from 'react';
import type {
  BorderRadiusAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

import {Portal} from '../Portal';
import {useEphemeralPresenceManager} from '../../utilities/ephemeral-presence-manager';
import {findFirstFocusableNode} from '../../utilities/focus';
import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';

import {TooltipOverlay} from './components';
import type {TooltipOverlayProps} from './components';
import styles from './Tooltip.module.css';

export type Width = 'default' | 'wide';
export type Padding = 'default' | Extract<SpaceScale, '400'>;
export type BorderRadius = Extract<BorderRadiusAliasOrScale, '100' | '200'>;

export interface TooltipProps {
  /** The element that will activate to tooltip */
  children?: React.ReactNode;
  /** The content to display within the tooltip */
  content: React.ReactNode;
  /** Toggle whether the tooltip is visible. */
  open?: boolean;
  /** Toggle whether the tooltip is visible initially */
  defaultOpen?: boolean;
  /**
   * Toggle whether the tooltip is visible initially
   * @deprecated Use `defaultOpen` instead
   */
  active?: boolean;
  /** Delay in milliseconds while hovering over an element before the tooltip is visible */
  hoverDelay?: number;
  /** Dismiss tooltip when not interacting with its children */
  dismissOnMouseOut?: TooltipOverlayProps['preventInteraction'];
  /**
   * The direction the tooltip tries to display
   * @default 'above'
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
   * @default '200'
   */
  borderRadius?: BorderRadius;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Whether to render a dotted underline underneath the tooltip's activator */
  hasUnderline?: boolean;
  /** Whether the tooltip's content remains open after clicking the activator */
  persistOnClick?: boolean;
  /* Callback fired when the tooltip is activated */
  onOpen?(): void;
  /* Callback fired when the tooltip is dismissed */
  onClose?(): void;
}

const HOVER_OUT_TIMEOUT = 150;

export function Tooltip({
  children,
  content,
  dismissOnMouseOut,
  open,
  defaultOpen: defaultOpenProp,
  active: originalActive,
  hoverDelay,
  preferredPosition = 'above',
  activatorWrapper = 'span',
  accessibilityLabel,
  width = 'default',
  padding = 'default',
  borderRadius: borderRadiusProp,
  zIndexOverride,
  hasUnderline,
  persistOnClick,
  onOpen,
  onClose,
}: TooltipProps) {
  const borderRadius = borderRadiusProp || '200';

  const WrapperComponent: any = activatorWrapper;
  const defaultOpen = defaultOpenProp ?? originalActive;
  const {
    value: active,
    setTrue: setActiveTrue,
    setFalse: handleBlur,
  } = useToggle(Boolean(defaultOpen));

  const {value: persist, toggle: togglePersisting} = useToggle(
    Boolean(defaultOpen) && Boolean(persistOnClick),
  );

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

  const id = useId();
  const activatorContainer = useRef<HTMLElement>(null);
  const mouseEntered = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(Boolean(!defaultOpen));
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleFocus = useCallback(() => {
    if (originalActive === false) return;

    setActiveTrue();
  }, [originalActive, setActiveTrue]);

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
      if (hoverOutTimeout.current) {
        clearTimeout(hoverOutTimeout.current);
      }
    };
  }, []);

  const handleOpen = useCallback(() => {
    setShouldAnimate(!presenceList.tooltip && !active);
    onOpen?.();
    addPresence('tooltip');
  }, [addPresence, presenceList.tooltip, onOpen, active]);

  const handleClose = useCallback(() => {
    onClose?.();
    setShouldAnimate(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('tooltip');
    }, HOVER_OUT_TIMEOUT);
  }, [removePresence, onClose]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      handleClose?.();
      handleBlur();
      persistOnClick && togglePersisting();
    },
    [handleBlur, handleClose, persistOnClick, togglePersisting],
  );

  useEffect(() => {
    if (originalActive === false && active) {
      handleClose();
      handleBlur();
    }
  }, [originalActive, active, handleClose, handleBlur]);

  const portal = activatorNode ? (
    <Portal idPrefix="tooltip">
      <TooltipOverlay
        id={id}
        preferredPosition={preferredPosition}
        activator={activatorNode}
        active={open ?? active}
        accessibilityLabel={accessibilityLabel}
        onClose={noop}
        preventInteraction={dismissOnMouseOut}
        width={width}
        padding={padding}
        borderRadius={borderRadius}
        zIndexOverride={zIndexOverride}
        instant={open || !shouldAnimate}
      >
        {content}
      </TooltipOverlay>
    </Portal>
  ) : null;

  const wrapperClassNames = classNames(
    activatorWrapper === 'div' && styles.TooltipContainer,
    hasUnderline && styles.HasUnderline,
  );

  return (
    <WrapperComponent
      onFocus={() => {
        handleOpen();
        handleFocus();
      }}
      onBlur={() => {
        handleClose();
        handleBlur();

        if (persistOnClick) {
          togglePersisting();
        }
      }}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
      onMouseDown={persistOnClick ? togglePersisting : undefined}
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
    if (hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
        handleFocus();
      }, hoverDelay);
    } else {
      handleOpen();
      handleFocus();
    }
  }

  function handleMouseLeave() {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    handleClose();

    if (!persist) {
      handleBlur();
    }
  }

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  function handleMouseEnterFix() {
    !mouseEntered.current && handleMouseEnter();
  }
}

function noop() {}
