import React, {
  Children,
  useRef,
  useId,
  useEffect,
  useState,
  useCallback,
} from 'react';

import type {PositionedOverlayProps} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {useEphemeralPresenceManager} from '../../utilities/ephemeral-presence-manager';
import {classNames} from '../../utilities/css';
import {useToggle} from '../../utilities/use-toggle';
import {useBreakpoints} from '../../utilities/breakpoints';

import styles from './HoverCard.scss';
import {HoverCardOverlay} from './components/HoverCardOverlay';

export interface HoverCardProps {
  /** The content to display inside the popover */
  children?: React.ReactNode;
  /** The preferred direction to open the popover */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  /** Show or hide the Popover */
  active: boolean;
  /** The element to activate the Popover */
  activator: React.ReactElement;
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Style activatorWrapper to fill parent dimensions and remove overlay margin
   * @default false
   */
  snapToParent?: boolean;
  /** Delay in milliseconds while hovering over an element before the hovercard is visible */
  hoverDelay?: number;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Callback fired when mouse enters or leaves activator */
  toggleActive(active: boolean): void;
}

const HOVER_OUT_TIMEOUT = 150;

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export function HoverCard({
  children,
  active: originalActive,
  activator,
  activatorWrapper = 'span',
  snapToParent = false,
  hoverDelay,
  zIndexOverride,
  toggleActive,
  ...rest
}: HoverCardProps) {
  const activatorRef = useRef<HTMLElement>(null);
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);
  const mouseEntered = useRef(false);

  const id = useId();

  const {mdUp} = useBreakpoints();

  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);

  const {value: active, setTrue, setFalse} = useToggle(Boolean(originalActive));

  const WrapperComponent: any = activatorWrapper;

  useEffect(() => {
    const currentHoverDelayTimeout = hoverDelayTimeout?.current;
    const currentHoverOutTimeout = hoverOutTimeout?.current;

    return () => {
      if (currentHoverDelayTimeout) {
        clearTimeout(currentHoverDelayTimeout);
      }
      if (currentHoverOutTimeout) {
        clearTimeout(currentHoverOutTimeout);
      }
    };
  }, []);

  const handleOpen = useCallback(() => {
    toggleActive(true);
    addPresence('hovercard');
  }, [toggleActive, addPresence]);

  const handleClose = useCallback(() => {
    toggleActive(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('hovercard');
    }, HOVER_OUT_TIMEOUT);
  }, [toggleActive, removePresence]);

  const handleMouseLeave = () => {
    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    handleClose();
    setFalse();
  };

  const handleMouseEnter = () => {
    if (!mdUp) return;
    mouseEntered.current = true;
    if (hoverDelay && !presenceList.hovercard) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
      }, hoverDelay);
    } else {
      handleOpen();
    }

    setTrue();
  };

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  const handleMouseEnterFix = () => {
    !mouseEntered.current && handleMouseEnter();
  };

  useEffect(() => {
    if (!activatorNode && activatorRef.current) {
      setActivatorNode(activatorRef.current);
    }
  }, [activatorNode]);

  const portal =
    activatorNode && active && mdUp ? (
      <Portal idPrefix="hovercard">
        <HoverCardOverlay
          id={id}
          active={active}
          activator={activatorNode}
          snapToParent={snapToParent}
          zIndexOverride={zIndexOverride}
          {...rest}
        >
          {children}
        </HoverCardOverlay>
      </Portal>
    ) : null;

  const activatorWrapperClassname = classNames(
    styles.ActivatorWrapper,
    snapToParent && styles.snapToParent,
  );

  return (
    <WrapperComponent
      className={activatorWrapperClassname}
      ref={activatorRef}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
    >
      {Children.only(activator)}
      {portal}
    </WrapperComponent>
  );
}
