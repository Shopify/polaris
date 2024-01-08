import React, {useRef, useId} from 'react';

import type {PositionedOverlayProps} from '../PositionedOverlay';
import {Portal} from '../Portal';

import {useHoverCardActivatorWrapperProps} from './hooks';
import {HoverCardOverlay} from './components';

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
  /** The activator markup to render that triggers the overlay. Only wrap individual commerce objects rendered by themselves. */
  children?: React.ReactNode;
  /** The preferred direction to open the overlay */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /** The preferred alignment of the popover relative to its activator */
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  /** Show or hide the overlay */
  active?: boolean;
  /** The activator element currently triggering the overlay. Use to dynamically trigger a single, standalone overlay with several of the same commerce object in close context, like a column of customer names in an index table of orders. */
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
  /** Content to render inside of the overlay. */
  content: React.ReactNode;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Callback fired when mouse enters or leaves activator */
  toggleActive?(active: boolean): void;
}

/**
 * A HoverCard rendered without `children` that is triggered to be `active` or repositioned by dynamically setting the `activator`.
 * @prop activator: HTMLElement | null;
 */
interface DynamicallyActivatedHoverCardProps {
  activator: HTMLElement | null;
}

/**
 * A HoverCard that renders and is triggered to be `active` by its `children`.
 * @prop children: React.ReactNode;
 */
interface ChildrenActivatedHoverCardProps {
  children: React.ReactNode;
}

/**
 * A HoverCard can have either `children` or `activator`.
 * @interface ChildrenActivatedHoverCardProps - A HoverCard that renders and is triggered to be `active` by its `children`.
 * @interface DynamicallyActivatedHoverCardProps - A HoverCard rendered without `children` that is triggered to be `active` or repositioned by dynamically setting the `activator`.
 */
export type MutuallyExclusiveActivatorProps =
  | ChildrenActivatedHoverCardProps
  | DynamicallyActivatedHoverCardProps;

export type HoverCardProps = BaseHoverCardProps &
  MutuallyExclusiveActivatorProps;

/**
 * A hover card is an overlay only triggered by mouse over of a link. They are not triggered on focus, keyboard navigable, or visible to screen readers. Use to present a preview of a commerce object's key information when hovering a link to its detail page.

 * HoverCard can either have `children` or set an `activator`.
 * @interface HoverCardProps - BaseHoverCardProps & ChildrenActivatedHoverCardProps | DynamicallyActivatedHoverCardProps;
 * @interface BaseHoverCardProps - Non-mutually exclusive props
 * @interface ChildrenActivatedHoverCardProps - A HoverCard that renders and is triggered by its `children`.
 * @interface DynamicallyActivatedHoverCardProps - A HoverCard rendered without `children` that is triggered or repositioned by dynamically setting the `activator` prop.
 */
export function HoverCard({
  children,
  activator: dynamicActivator,
  active = false,
  activatorWrapper = 'span',
  snapToParent = false,
  hoverDelay,
  content,
  zIndexOverride,
  id: providedId,
  preferredPosition,
  preferredAlignment,
  toggleActive,
}: HoverCardProps) {
  const defaultId = useId();

  const ref = useRef<HTMLElement | null>(null);

  const {
    className,
    isDesktop,
    activatorElement: childActivator,
    handleMouseLeaveActivator,
    handleMouseEnterActivator,
    handleMouseEnterOverlay,
    handleMouseLeaveOverlay,
  } = useHoverCardActivatorWrapperProps({
    toggleActive,
    hoverDelay,
    ref,
  });

  const WrapperComponent: any = activatorWrapper;
  const id = `HoverCard-${providedId ?? defaultId}`;
  const activatorElement = children ? childActivator : dynamicActivator;
  const isActive = dynamicActivator ? activatorElement !== null : active;

  const portal =
    activatorElement && isDesktop ? (
      <Portal idPrefix="hovercard">
        <HoverCardOverlay
          id={id}
          active={isActive}
          activator={activatorElement}
          snapToParent={snapToParent}
          zIndexOverride={zIndexOverride}
          preferredAlignment={preferredAlignment}
          preferredPosition={preferredPosition}
          onMouseEnter={handleMouseEnterOverlay}
          onMouseLeave={handleMouseLeaveOverlay}
        >
          {content}
        </HoverCardOverlay>
      </Portal>
    ) : null;

  const markup = children ? (
    <WrapperComponent
      ref={ref}
      className={className}
      onMouseLeave={handleMouseLeaveActivator}
      onMouseEnter={handleMouseEnterActivator}
    >
      {children}
      {portal}
    </WrapperComponent>
  ) : (
    portal
  );

  return markup;
}
