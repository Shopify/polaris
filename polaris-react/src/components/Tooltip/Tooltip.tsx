import React, {useEffect, useState, useRef, useCallback, useId} from 'react';
import type {
  BorderRadiusAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

import {Portal} from '../Portal';
import {useEphemeralPresenceManager} from '../../utilities/ephemeral-presence-manager';
import {findFirstFocusableNode} from '../../utilities/focus';
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
  open: openProp,
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
  persistOnClick = false,
  onOpen,
  onClose,
}: TooltipProps) {
  const borderRadius = borderRadiusProp || '200';
  const isControlled = typeof openProp === 'boolean';
  const defaultOpen = defaultOpenProp ?? originalActive ?? false;
  const [open, setOpen] = useState(defaultOpen);
  const [isPersisting, setIsPersisting] = useState(
    defaultOpen && persistOnClick,
  );
  const [shouldAnimate, setShouldAnimate] = useState(!defaultOpen);

  const isMouseEntered = useRef(false);
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);

  const id = useId();
  const WrapperComponent: any = activatorWrapper;
  const activatorContainer = useRef<HTMLElement>(null);
  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const wrapperClassNames = classNames(
    WrapperComponent === 'div' && styles.TooltipContainer,
    hasUnderline && styles.HasUnderline,
  );

  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

  const clearHoverDelayTimeout = useCallback(() => {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }
  }, []);

  const clearHoverOutTimeout = useCallback(() => {
    if (hoverOutTimeout.current) {
      clearTimeout(hoverOutTimeout.current);
      hoverOutTimeout.current = null;
    }
  }, []);

  const handleOpen = useCallback(() => {
    if (open) return;

    if (!isControlled && originalActive !== false) {
      setShouldAnimate(!open && !presenceList.tooltip);
      setOpen(true);
      addPresence('tooltip');
    }

    onOpen?.();
  }, [
    addPresence,
    isControlled,
    onOpen,
    open,
    originalActive,
    presenceList.tooltip,
  ]);

  const handleClose = useCallback(() => {
    if (!open) return;

    if (!isControlled) {
      setOpen(false);
      removePresence('tooltip');
    }

    onClose?.();
  }, [isControlled, open, onClose, removePresence]);

  const handleMouseEnter = useCallback(() => {
    // https://github.com/facebook/react/issues/10109
    // Mouseenter event not triggered when cursor moves from disabled button
    if (isMouseEntered.current) return;
    isMouseEntered.current = true;

    clearHoverOutTimeout();

    if (open) return;

    if (hoverDelay && !presenceList.tooltip) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
      }, hoverDelay);
    } else {
      handleOpen();
    }
  }, [
    clearHoverOutTimeout,
    handleOpen,
    hoverDelay,
    open,
    presenceList.tooltip,
  ]);

  const handleMouseLeave = useCallback(() => {
    isMouseEntered.current = false;

    clearHoverDelayTimeout();

    if (isPersisting) return;

    hoverOutTimeout.current = setTimeout(() => {
      handleClose();
    }, HOVER_OUT_TIMEOUT);
  }, [clearHoverDelayTimeout, handleClose, isPersisting]);

  const handleFocus = useCallback(() => {
    if (open) return;

    clearHoverDelayTimeout();

    handleOpen();
  }, [clearHoverDelayTimeout, handleOpen, open]);

  const handleBlur = useCallback(() => {
    if (isPersisting) setIsPersisting(false);

    handleClose();
  }, [handleClose, isPersisting, setIsPersisting]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (isPersisting) setIsPersisting(false);

      handleClose();
    },
    [handleClose, isPersisting, setIsPersisting],
  );

  const handleMouseDown = useCallback(() => {
    if (!open) return;

    setIsPersisting((prevIsPersisting) => !prevIsPersisting);
  }, [open, setIsPersisting]);

  const setActivator = useCallback((node: HTMLElement | null) => {
    const activatorContainerRef: any = activatorContainer;
    if (node == null) {
      activatorContainerRef.current = null;
      setActivatorNode(null);
      return;
    }

    node.firstElementChild instanceof HTMLElement &&
      setActivatorNode(node.firstElementChild);

    activatorContainerRef.current = node;
  }, []);

  // Sync controlled state with uncontrolled state
  useEffect(() => {
    if (!isControlled || openProp === open) return;

    clearHoverDelayTimeout();
    clearHoverOutTimeout();

    if (openProp) {
      setShouldAnimate(!open && !presenceList.tooltip);
      setOpen(true);
      addPresence('tooltip');
    } else {
      setShouldAnimate(false);
      setOpen(false);
      removePresence('tooltip');
    }
  }, [
    addPresence,
    clearHoverDelayTimeout,
    clearHoverOutTimeout,
    isControlled,
    open,
    openProp,
    presenceList.tooltip,
    removePresence,
  ]);

  // Clear timeouts on unmount
  useEffect(
    () => () => {
      clearHoverDelayTimeout();
      clearHoverOutTimeout();
    },
    [clearHoverDelayTimeout, clearHoverOutTimeout],
  );

  // Add `tabIndex` and other a11y attributes to the first focusable node
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

  return (
    <WrapperComponent
      ref={setActivator}
      className={wrapperClassNames}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseOver={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onKeyUp={handleKeyUp}
    >
      {children}
      {activatorNode && (
        <Portal idPrefix="tooltip">
          <TooltipOverlay
            id={id}
            preferredPosition={preferredPosition}
            activator={activatorNode}
            active={open}
            accessibilityLabel={accessibilityLabel}
            onClose={noop}
            preventInteraction={dismissOnMouseOut}
            width={width}
            padding={padding}
            borderRadius={borderRadius}
            zIndexOverride={zIndexOverride}
            instant={!shouldAnimate}
          >
            {content}
          </TooltipOverlay>
        </Portal>
      )}
    </WrapperComponent>
  );
}

function noop() {}
