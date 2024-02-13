import React, {useRef} from 'react';

import {classNames} from '../../../utilities/css';
import {overlay} from '../../shared';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../PositionedOverlay';
import {Scrollable} from '../../Scrollable';
import styles from '../HoverCard.module.scss';

export interface HoverCardOverlayProps {
  id: string;
  children: React.ReactNode;
  contentKey?: string;
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

  const getMinWidthOfChildren = () => {
    const childrenNode =
      contentNode.current?.children &&
      contentNode.current?.children[0].children[0];

    if (childrenNode) {
      return window.getComputedStyle(childrenNode).minWidth;
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

    const minWidth = getMinWidthOfChildren();

    const hoverCardStyles = {
      '--pc-hover-card-min-width': minWidth,
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
            data-hovercard-content
            className={styles.Content}
            horizontal={false}
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
