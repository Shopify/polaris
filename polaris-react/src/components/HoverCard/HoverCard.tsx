import React, {
  Children,
  useRef,
  useId,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';

import type {PositionedOverlayProps} from '../PositionedOverlay';
import {Portal} from '../Portal';
import {useEphemeralPresenceManager} from '../../utilities/ephemeral-presence-manager';
import type {HoverCardContextType} from '../../utilities/hover-card';
import {HoverCardContext} from '../../utilities/hover-card';
import {classNames} from '../../utilities/css';
import {useBreakpoints} from '../../utilities/breakpoints';

import styles from './HoverCard.scss';
import {HoverCardOverlay} from './components/HoverCardOverlay';

/*

NOTES

Mon 12/4
- Right now, HoverCard is just a lightweight, hover only Tooltip
- What we want is to also support hovercard "groups" taking from the approach prototyped by QC that renders a single overlay and updates its children and position based on the currently hovered over activator's position
- Thinking there's two ways to use this component:
  - The current API of wrapping the children with the HoverCard and rendering it in place (good for single overlay use cases, like OrderDetails CustomerCard)
  - Rendering the HoverCard like a Modal (anywhere in the markup) and moving it to the nearest activator
- The things I want to abstract away to minimize configuration:
  - Position tracking: we don't want every instance having to track mouse events and update the DOM, that should be the job of the component
  - Updating child contents: we don't want folks to have to manage state of what's currently hovered etc, it should "just work" and we can do that in a few ways but having a renderChildren callback is the most familiar among other APIs in the system

Tues 12/5
- Made API adjustments in attempt to render single hovercard with activator updated on hover change
- This needs more work because the activators all need to be wrapped with the WrapperComponent that has the listeners etc right now
- Potential to set those on the activator directly _or_ wrap the component in composition if there was a hook to consume (will explore tomorrow)

Wed 12/13
- Got component working again!
- Context was not the solution, simplified things
-  Next steps: extract out transition and mouse handlers into hook used internally and by consumers to wire up handlers to activator(s)

*/

interface BaseHoverCardProps {
  /** Unique identifier for the overlay */
  id?: string;
  /** The activator markup to render */
  children?: React.ReactNode;
  /** Whether or not there is a child activator. Use when there is more than one activator for the hovercard. */
  standalone?: boolean;
  /** The preferred direction to open the overlay */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  /** Show or hide the overlay */
  active?: boolean;
  /** The element that activates the overlay */
  activator?: HTMLElement | null;
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Style activatorWrapper to fill parent dimensions and remove overlay margin
   * @default false
   */
  snapToParent?: boolean;
  /** Delay in milliseconds while hovering over an element before the overlay is visible */
  hoverDelay?: number;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Callback fired when mouse enters or leaves activator */
  toggleActive?(active: boolean): void;
  /** Callback fired when mouse enters the activator or moves from one activator to another */
  renderContent(): React.ReactNode | null;
}

interface StandaloneHoverCardProps {
  activator: HTMLElement | null;
  standalone: boolean;
}

interface ChildrenHoverCardProps {
  children: React.ReactNode;
}

type MutuallyExclusiveStandaloneProps =
  | StandaloneHoverCardProps
  | ChildrenHoverCardProps;

export type HoverCardProps = BaseHoverCardProps &
  MutuallyExclusiveStandaloneProps;

const HOVER_OUT_TIMEOUT = 150;

export function HoverCard({
  id: providedId,
  children,
  standalone = false,
  active = false,
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

  const defaultId = useId();

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);

  const WrapperComponent: any = activatorWrapper;
  const id = providedId ?? defaultId;

  // BEGIN HOOK
  const {mdUp} = useBreakpoints();

  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

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
    toggleActive?.(true);
    addPresence('hovercard');
  }, [toggleActive, addPresence]);

  const handleClose = useCallback(() => {
    toggleActive?.(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('hovercard');
    }, HOVER_OUT_TIMEOUT);
  }, [toggleActive, removePresence]);

  const handleMouseLeave = useCallback(() => {
    console.log('mouse left');

    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    handleClose();
  }, [handleClose, hoverDelayTimeout, mouseEntered]);

  const handleMouseEnter = useCallback(() => {
    console.log('mouse entered');

    if (!mdUp) return;

    mouseEntered.current = true;
    if (hoverDelay && !presenceList.hovercard) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
      }, hoverDelay);
    } else {
      handleOpen();
    }
  }, [handleOpen, hoverDelay, hoverDelayTimeout, presenceList, mdUp]);

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  const handleMouseEnterFix = useCallback(() => {
    if (!mouseEntered.current) {
      handleMouseEnter();
    }
  }, [handleMouseEnter]);

  // return {handleMouseLeave, handleMouseEnter: handleMouseEnterFix}

  // END HOOK

  useEffect(() => {
    if (!standalone && !activatorNode && activatorRef.current) {
      setActivatorNode(activatorRef.current);
    }
  }, [standalone, activator, activatorNode]);

  const activatorElement = standalone ? activator : activatorNode;

  const portal =
    activatorElement && mdUp ? (
      <Portal idPrefix="hovercard">
        <HoverCardOverlay
          id={id}
          active={active}
          activator={activatorElement}
          snapToParent={snapToParent}
          zIndexOverride={zIndexOverride}
          {...rest}
        />
      </Portal>
    ) : null;

  const activatorWrapperClassname = classNames(
    styles.ActivatorWrapper,
    snapToParent && styles.snapToParent,
  );

  const contextValue: HoverCardContextType = useMemo(
    () => ({
      onMouseLeave: handleMouseLeave,
      onMouseOver: handleMouseEnterFix,
    }),
    [handleMouseLeave, handleMouseEnterFix],
  );

  const markup = standalone ? (
    <HoverCardContext.Provider value={contextValue}>
      {children}
      {portal}
    </HoverCardContext.Provider>
  ) : (
    <WrapperComponent
      ref={activatorRef}
      className={activatorWrapperClassname}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseEnterFix}
    >
      {children}
      {portal}
    </WrapperComponent>
  );

  return markup;
}
