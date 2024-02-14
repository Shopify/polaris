import React, {useRef, useId} from 'react';

import type {PositionedOverlayProps} from '../PositionedOverlay';
import {Portal} from '../Portal';

import {useHoverCardActivatorWrapperProps} from './hooks';
import {HoverCardOverlay} from './components';

interface BaseHoverCardProps {
  /** Unique identifier for the overlay */
  id?: string;
  /** The activator markup to render that triggers the overlay. Only wrap individual commerce objects rendered by themselves. */
  children?: React.ReactNode;
  /** The preferred placement of the overlay relative to its activator */
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  /** The preferred alignment of the overlay relative to its activator */
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  /** Show or hide the overlay */
  active?: boolean;
  /** The activator element currently triggering the overlay. Use to dynamically trigger a single, standalone overlay with several of the same commerce object type in close context, like a column of customer names in an index table of orders. */
  activator?: HTMLElement | null;
  /**
   * The element type to wrap the activator in
   * @default 'span'
   */
  activatorWrapper?: string;
  /** Whether the activatorWrapper should fill its parent's dimensions and remove overlay margin. Set to true if the activator is within a table cell.
   * @default false
   */
  snapToParent?: boolean;
  /** Content to render inside of the overlay. */
  content: React.ReactNode;
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Callback fired when mouse enters or leaves activator */
  toggleActive?(active: boolean): void;
}

/**
 * An AlphaHoverCard rendered without `children` that is triggered to be `active` or repositioned by dynamically setting the `activator`.
 * @prop activator: HTMLElement | null;
 */
interface DynamicallyActivatedHoverCardProps {
  activator?: HTMLElement | null;
}

/**
 * An AlphaHoverCard that renders and is triggered to be `active` by its `children`.
 * @prop children: React.ReactNode;
 */
interface ChildrenActivatedHoverCardProps {
  children: React.ReactNode;
}

/**
 * An AlphaHoverCard can have either `children` or `activator`.
 * @interface ChildrenActivatedHoverCardProps - A AlphaHoverCard that renders and is triggered to be `active` by its `children`.
 * @interface DynamicallyActivatedHoverCardProps - A AlphaHoverCard rendered without `children` that is triggered to be `active` or repositioned by dynamically setting the `activator`.
 */
export type MutuallyExclusiveActivatorProps =
  | ChildrenActivatedHoverCardProps
  | DynamicallyActivatedHoverCardProps;

export type AlphaHoverCardProps = BaseHoverCardProps &
  MutuallyExclusiveActivatorProps;

/**
 * A hover card is an overlay only triggered by mouse over of a link. They are not triggered on focus, keyboard navigable, or visible to screen readers. Use to present a preview of a commerce object's key information when hovering a link to its detail page.

 * AlphaHoverCard can either have `children` or set an `activator`.
 * @interface AlphaHoverCardProps - BaseHoverCardProps & ChildrenActivatedHoverCardProps | DynamicallyActivatedHoverCardProps;
 * @interface BaseHoverCardProps - Non-mutually exclusive props
 * @interface ChildrenActivatedHoverCardProps - A AlphaHoverCard that renders and is triggered by its `children`.
 * @interface DynamicallyActivatedHoverCardProps - A AlphaHoverCard rendered without `children` that is triggered or repositioned by dynamically setting the `activator` prop.
 */
export function AlphaHoverCard({
  children,
  activator: dynamicActivator,
  active = false,
  activatorWrapper = 'span',
  snapToParent = false,
  content,
  zIndexOverride,
  id: providedId,
  preferredPosition,
  preferredAlignment,
  toggleActive,
}: AlphaHoverCardProps) {
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
    ref,
  });

  const WrapperComponent: any = activatorWrapper;
  const id = `AlphaHoverCard-${providedId ?? defaultId}`;
  const activatorElement = children ? childActivator : dynamicActivator;
  const isActive = dynamicActivator ? activatorElement !== null : active;

  const portal =
    isActive && activatorElement && isDesktop ? (
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
      data-hovercard-activator
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
