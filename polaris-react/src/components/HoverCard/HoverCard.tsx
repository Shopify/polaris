import React, {Children, useRef, useEffect, useState} from 'react';

import type {PositionedOverlayProps} from '../PositionedOverlay';
import {PositionedOverlay} from '../PositionedOverlay';
import {Portal} from '../Portal';

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
  /** Override on the default z-index of 400 */
  zIndexOverride?: number;
  /** Automatically add wrap content in a section */
  sectioned?: boolean;
  /** Allow popover to stretch to the full width of its activator */
  fullWidth?: boolean;
  /** Allow popover to stretch to fit content vertically */
  fullHeight?: boolean;
  /** Allow popover content to determine the overlay width and height */
  fluidContent?: boolean;
  /** Remains in a fixed position */
  fixed?: boolean;
  toggleActive(active: boolean): void;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export function HoverCard({
  children,
  activator,
  activatorWrapper = 'span',
  active,
  fixed,
  zIndexOverride,
  toggleActive,
  ...rest
}: HoverCardProps) {
  const overlayRef = useRef<PositionedOverlay>(null);
  const activatorRef = useRef<HTMLElement>(null);

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);

  const WrapperComponent: any = activatorWrapper;

  useEffect(() => {
    if (!activatorNode && activatorRef.current) {
      setActivatorNode(activatorRef.current);
    }
  }, [activatorNode]);

  const portal =
    activatorNode && active ? (
      <Portal idPrefix="hovercard">
        <PositionedOverlay
          ref={overlayRef}
          activator={activatorNode}
          active={active}
          fixed={fixed}
          zIndexOverride={zIndexOverride}
          render={() => children}
          {...rest}
        />
      </Portal>
    ) : null;

  return (
    <WrapperComponent
      ref={activatorRef}
      onMouseEnter={() => {
        console.log('HOVERED');
        toggleActive(true);
      }}
      onMouseLeave={() => {
        console.log('LEFT');
        toggleActive(false);
      }}
    >
      {Children.only(activator)}
      {portal}
    </WrapperComponent>
  );
}
