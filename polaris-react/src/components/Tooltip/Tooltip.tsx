import React, {useEffect, useState, useRef, useCallback, useId} from 'react';
import type {
  BorderRadiusAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

import {Portal} from '../Portal';
import {findFirstFocusableNode} from '../../utilities/focus';
import {classNames} from '../../utilities/css';

import {TooltipOverlay} from './components';
import type {TooltipOverlayProps} from './components';
import styles from './Tooltip.module.css';
import {Timeout, useTimeout} from './utils';

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

/**
 * The [hysteresis](https://en.wikipedia.org/wiki/Hysteresis) flag is used to influence the `hoverDelay` and `animateOpen` behavior of the Tooltip.
 * Adapted from the [MUI Tooltip component](https://github.com/mui/material-ui/blob/822a7e69c062a5e4f99f02b4a3aadc7fb51c2ce9/packages/mui-material/src/Tooltip/Tooltip.js#L217-L218)
 */
let hysteresisOpen = false;
const hysteresisTimer = new Timeout();
const HYSTERESIS_TIMEOUT = 150;

export function testResetHysteresis() {
  hysteresisOpen = false;
  hysteresisTimer.clear();
}

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
  const animateOpen = useRef(!defaultOpen && !hysteresisOpen);
  const [open, setOpen] = useState(defaultOpen);
  const [isPersisting, setIsPersisting] = useState(
    defaultOpen && persistOnClick,
  );

  const isMouseEntered = useRef(false);
  const hoverDelayTimer = useTimeout();

  const id = useId();
  const WrapperComponent: any = activatorWrapper;
  const activatorContainer = useRef<HTMLElement>(null);
  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const wrapperClassNames = classNames(
    WrapperComponent === 'div' && styles.TooltipContainer,
    hasUnderline && styles.HasUnderline,
  );

  const handleOpen = useCallback(() => {
    if (open) return;

    if (!isControlled && originalActive !== false) {
      hysteresisTimer.clear();

      animateOpen.current = !hysteresisOpen;
      hysteresisOpen = true;

      setOpen(true);
    }

    onOpen?.();
  }, [isControlled, onOpen, open, originalActive]);

  const handleClose = useCallback(() => {
    if (!open) return;

    if (!isControlled) {
      hysteresisTimer.start(HYSTERESIS_TIMEOUT, () => {
        hysteresisOpen = false;
      });

      animateOpen.current = false;

      setOpen(false);
    }

    onClose?.();
  }, [open, isControlled, onClose]);

  const handleMouseEnter = useCallback(() => {
    // https://github.com/facebook/react/issues/10109
    // Mouseenter event not triggered when cursor moves from disabled button
    if (isMouseEntered.current) return;
    isMouseEntered.current = true;

    if (open) return;

    if (hoverDelay && !hysteresisOpen) {
      hoverDelayTimer.start(hoverDelay, () => {
        handleOpen();
      });
    } else {
      hoverDelayTimer.clear();
      handleOpen();
    }
  }, [open, hoverDelayTimer, hoverDelay, handleOpen]);

  const handleMouseLeave = useCallback(() => {
    isMouseEntered.current = false;

    hoverDelayTimer.clear();

    if (isPersisting || !open) return;

    handleClose();
  }, [hoverDelayTimer, isPersisting, open, handleClose]);

  const handleFocus = useCallback(() => {
    if (open) return;

    hoverDelayTimer.clear();

    handleOpen();
  }, [handleOpen, hoverDelayTimer, open]);

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
    if (!persistOnClick) return;

    setIsPersisting((prevIsPersisting) => !prevIsPersisting);
  }, [persistOnClick]);

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

    hoverDelayTimer.clear();

    if (openProp && !originalActive) {
      hysteresisTimer.clear();

      animateOpen.current = !hysteresisOpen;
      hysteresisOpen = true;

      setOpen(true);
    } else {
      hysteresisTimer.start(HYSTERESIS_TIMEOUT, () => {
        hysteresisOpen = false;
      });

      animateOpen.current = false;

      setOpen(false);
    }
  }, [hoverDelayTimer, isControlled, open, openProp, originalActive]);

  // Note: Remove this effect along with the `active` prop in Polaris v14
  useEffect(() => {
    if (originalActive === false && open) {
      handleClose();
    }
  }, [originalActive, handleClose, handleBlur, open]);

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
            instant={!animateOpen.current}
          >
            {content}
          </TooltipOverlay>
        </Portal>
      )}
    </WrapperComponent>
  );
}

function noop() {}
