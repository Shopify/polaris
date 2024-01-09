import React, {useState, useEffect, useRef} from 'react';

import {useTheme} from '../../../utilities/use-theme';
import {classNames} from '../../../utilities/css';
import {overlay} from '../../shared';
import {PositionedOverlay} from '../../PositionedOverlay';
import type {PositionedOverlayProps} from '../../PositionedOverlay';
import styles from '../HoverCard.scss';

export enum HoverCardCloseSource {
  Click,
  EscapeKeypress,
  FocusOut,
  ScrollOut,
}

enum TransitionStatus {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
  Moving = 'moving',
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
  const {motion} = useTheme();

  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    active ? TransitionStatus.Entering : TransitionStatus.Exited,
  );
  const contentNode = useRef<HTMLDivElement | null>(null);
  const enteringTimer = useRef<number | undefined>();

  const changeTransitionStatus = (
    transitionStatus: TransitionStatus,
    cb?: () => void,
  ) => {
    // Forcing a reflow to enable the animation
    requestAnimationFrame(() => setTransitionStatus(transitionStatus));
    cb && cb();
  };

  useEffect(() => {
    if (transitionStatus === TransitionStatus.Entering) {
      changeTransitionStatus(TransitionStatus.Entered);
    }
  }, [transitionStatus]);

  useEffect(() => {
    if (enteringTimer.current) {
      changeTransitionStatus(TransitionStatus.Entering, () => {
        clearTransitionTimeout();
        enteringTimer.current = window.setTimeout(() => {
          setTransitionStatus(TransitionStatus.Entered);
        }, Number(motion['motion-duration-100']));
      });
    }

    if (!active) {
      clearTransitionTimeout();
      setTransitionStatus(TransitionStatus.Exiting);
    }

    return () => {
      clearTransitionTimeout();
    };
  }, [active, motion]);

  const clearTransitionTimeout = () => {
    if (enteringTimer.current) {
      window.clearTimeout(enteringTimer.current);
    }
  };

  const renderHoverCard: PositionedOverlayProps['render'] = ({
    measuring,
    desiredHeight,
    positioning,
  }) => {
    const className = classNames(
      styles.HoverCard,
      snapToParent && styles.snapToParent,
      positioning === 'above' && styles.positionedAbove,
      measuring && styles.measuring,
      !measuring && styles.measured,
    );

    const contentStyles = measuring ? undefined : {height: desiredHeight};

    return (
      <div
        {...overlay.props}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div ref={contentNode}>
          <div id={id} className={styles.Content} style={contentStyles}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  if (transitionStatus === TransitionStatus.Exited && !active) {
    return null;
  }

  const className = classNames(
    styles.HoverCardOverlay,
    transitionStatus === TransitionStatus.Entering &&
      styles['HoverCardOverlay-entering'],
    transitionStatus === TransitionStatus.Entered &&
      styles['HoverCardOverlay-open'],
    transitionStatus === TransitionStatus.Exiting &&
      styles['HoverCardOverlay-exiting'],
  );

  const overlayMarkup = (
    <PositionedOverlay
      active={active}
      activator={activator}
      preferredPosition={preferredPosition}
      preferredAlignment={preferredAlignment}
      render={renderHoverCard}
      classNames={className}
      zIndexOverride={zIndexOverride}
    />
  );

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
