import React, {useEffect, useRef, useState} from 'react';

import {classNames} from '../../../utilities/css';
import {overlay} from '../../shared';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../PositionedOverlay';
import {Scrollable} from '../../Scrollable';
import styles from '../AlphaHoverCard.module.scss';
import {KeypressListener} from '../../KeypressListener';
import {Key} from '../../../types';

export interface HoverCardOverlayProps {
  id: string;
  children: React.ReactNode;
  contentKey?: string;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  zIndexOverride?: number;
  activator: HTMLElement;
  dynamic: boolean;
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
  dynamic,
  snapToParent,
  onMouseEnter,
  onMouseLeave,
}: HoverCardOverlayProps) {
  const contentNode = useRef<HTMLDivElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (dynamic && active && !shouldAnimate) {
      setShouldAnimate(true);
    }
  }, [dynamic, active, shouldAnimate]);

  const getMinMaxDimensionsOfChildren = () => {
    const childrenNode =
      contentNode.current?.children &&
      contentNode.current?.children[0].children[0];

    if (childrenNode) {
      const {minWidth, maxHeight} = window.getComputedStyle(childrenNode);

      return {minWidth, maxHeight};
    }
  };

  const renderHoverCard: PositionedOverlayProps['render'] = ({
    measuring,
    positioning,
    desiredWidth,
    desiredHeight,
  }) => {
    const className = classNames(
      styles.AlphaHoverCard,
      snapToParent && styles.snapToParent,
      positioning === 'above' && styles.positionedAbove,
      measuring ? styles.measuring : styles.measured,
    );

    const dimensions = getMinMaxDimensionsOfChildren();
    const numericalMaxHeight = dimensions?.maxHeight
      ? Number(dimensions?.maxHeight.replace(/\D/g, ''))
      : 0;

    const hoverCardStyles = {
      '--pc-hover-card-min-width': dimensions?.minWidth,
    } as React.CSSProperties;

    const contentStyles = measuring
      ? undefined
      : {
          width: desiredWidth,
          height:
            numericalMaxHeight > 0 && desiredHeight > numericalMaxHeight
              ? dimensions?.maxHeight
              : desiredHeight,
        };

    return (
      <div
        {...overlay.props}
        style={hoverCardStyles}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <KeypressListener keyCode={Key.Escape} handler={onMouseLeave} />
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
    active && styles['HoverCardOverlay-enter'],
    shouldAnimate && styles['HoverCardOverlay-glide'],
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
