import React, {useState, useEffect, useRef} from 'react';

// import {useTheme} from '../../../utilities/use-theme';
import {classNames} from '../../../utilities/css';
import {overlay} from '../../shared';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../PositionedOverlay';
import {Scrollable} from '../../Scrollable';
import styles from '../HoverCard.module.scss';

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Moving = 'moving',
  Exiting = 'exiting',
}

export interface HoverCardOverlayProps {
  id: string;
  children: React.ReactNode;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  zIndexOverride?: number;
  activator: HTMLElement;
  snapToParent?: boolean;
  onMouseEnter(): void;
  onMouseLeave(): void;
}

export function HoverCardOverlay({
  id,
  children,
  preferredPosition = 'below',
  preferredAlignment = 'center',
  active,
  zIndexOverride,
  activator,
  snapToParent,
  onMouseEnter,
  onMouseLeave,
}: HoverCardOverlayProps) {
  const contentNode = useRef<HTMLDivElement | null>(null);

  const getMinDimensionsOfChildren = () => {
    const childrenNode =
      contentNode.current?.children &&
      contentNode.current?.children[0].children[0];

    if (childrenNode) {
      const {minWidth, minHeight} = window.getComputedStyle(childrenNode);
      return {minWidth, minHeight};
    }
  };

  const renderHoverCard: PositionedOverlayProps['render'] = ({
    measuring,
    positioning,
    desiredWidth,
    desiredHeight,
  }) => {
    const className = classNames(
      styles.HoverCard,
      snapToParent && styles.snapToParent,
      positioning === 'above' && styles.positionedAbove,
      measuring && styles.measuring,
      !measuring && styles.measured,
    );

    const contentStyles = measuring
      ? undefined
      : {width: desiredWidth, height: desiredHeight};

    const minChildrenDimensions = getMinDimensionsOfChildren();

    const hoverCardStyles = {
      '--pc-hover-card-min-width': minChildrenDimensions?.minWidth,
    } as React.CSSProperties;

    return (
      <div
        {...overlay.props}
        style={hoverCardStyles}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div ref={contentNode} className={styles.ContentContainer}>
          <Scrollable
            id={id}
            shadow
            data-hovercard-content
            className={styles.Content}
            style={contentStyles}
          >
            {children}
          </Scrollable>
        </div>
      </div>
    );
  };

  const className = classNames(
    styles.HoverCardOverlay,
    active && styles['HoverCardOverlay-active'],
  );

  const overlayMarkup = active ? (
    <PositionedOverlay
      active={active}
      activator={activator}
      preferredPosition={preferredPosition}
      preferredAlignment={preferredAlignment}
      render={renderHoverCard}
      classNames={className}
      zIndexOverride={zIndexOverride}
    />
  ) : null;

  return overlayMarkup;
}

export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) {
    return true;
  }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) {
      return true;
    }
    parent = parent.parentNode;
  }

  return false;
}
