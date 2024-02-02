import React, {useState, useEffect, useRef, Children} from 'react';

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
  const topCoordinate = useRef<number | undefined>();

  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    active ? TransitionStatus.Entering : TransitionStatus.Exiting,
  );
  const [overlayMoved, setOverlayMoved] = useState(false);

  const enteringTimer = useRef<NodeJS.Timeout | undefined>();

  const changeTransitionStatus = (
    transitionStatus: TransitionStatus,
    cb?: () => void,
  ) => {
    // Forcing a reflow to enable the animation
    requestAnimationFrame(() => setTransitionStatus(transitionStatus));
    return cb?.();
  };

  useEffect(() => {
    if (transitionStatus === TransitionStatus.Entering) {
      enteringTimer.current = setTimeout(() => {
        changeTransitionStatus(TransitionStatus.Entered);
      }, 100);
    }
  }, [transitionStatus]);

  useEffect(() => {
    if (active && !enteringTimer.current) {
      changeTransitionStatus(TransitionStatus.Entering);
    }

    if (!active) {
      clearTransitionTimeout();
      setTransitionStatus(TransitionStatus.Exiting);
    }

    return () => {
      clearTransitionTimeout();
    };
  }, [active]);

  const clearTransitionTimeout = () => {
    if (enteringTimer.current) {
      window.clearTimeout(enteringTimer.current);
    }
  };

  const renderHoverCard: PositionedOverlayProps['render'] = ({
    top,
    measuring,
    positioning,
    desiredWidth,
    desiredHeight,
  }) => {
    if (topCoordinate.current !== undefined && top !== topCoordinate.current) {
      setOverlayMoved(true);
      topCoordinate.current = top;
    }

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

    console.log(contentStyles);

    return (
      <div
        {...overlay.props}
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

  console.log(active, transitionStatus);

  const className = classNames(
    styles.HoverCardOverlay,
    transitionStatus === TransitionStatus.Entering &&
      styles['HoverCardOverlay-entering'],
    transitionStatus === TransitionStatus.Entered &&
      styles['HoverCardOverlay-active'],
    transitionStatus === TransitionStatus.Exiting &&
      styles['HoverCardOverlay-exited'],
    active && styles['HoverCardOverlay-active'],
    overlayMoved && styles['HoverCardOverlay-moved'],
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
