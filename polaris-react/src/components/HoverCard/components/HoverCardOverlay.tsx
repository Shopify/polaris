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
}

export interface HoverCardOverlayProps {
  children?: React.ReactNode;
  preferredPosition?: PositionedOverlayProps['preferredPosition'];
  preferredAlignment?: PositionedOverlayProps['preferredAlignment'];
  active: boolean;
  id: string;
  zIndexOverride?: number;
  activator: HTMLElement;
  snapToParent?: boolean;
}

export function HoverCardOverlay({
  children,
  preferredPosition = 'below',
  preferredAlignment = 'center',
  active,
  id,
  zIndexOverride,
  activator,
  snapToParent,
}: HoverCardOverlayProps) {
  const {motion} = useTheme();

  const [transitionStatus, setTransitionStatus] = useState<TransitionStatus>(
    active ? TransitionStatus.Entering : TransitionStatus.Exited,
  );
  const contentNode = useRef<HTMLDivElement>(null);
  const enteringTimer = useRef<number | undefined>();

  const changeTransitionStatus = (
    transitionStatus: TransitionStatus,
    cb?: () => void,
  ) => {
    setTransitionStatus(transitionStatus);
    // eslint-disable-next-line node/callback-return
    cb && cb();
    // Forcing a reflow to enable the animation
    contentNode.current && contentNode.current.getBoundingClientRect();
  };

  useEffect(() => {
    if (active) {
      changeTransitionStatus(TransitionStatus.Entered);
    }
  }, [active]);

  useEffect(() => {
    if (active && enteringTimer.current) {
      changeTransitionStatus(TransitionStatus.Entering, () => {
        clearTransitionTimeout();
        enteringTimer.current = window.setTimeout(() => {
          setTransitionStatus(TransitionStatus.Entered);
        }, parseInt(motion['motion-duration-500'], 10));
      });
    }

    if (!active) {
      clearTransitionTimeout();
      setTransitionStatus(TransitionStatus.Exited);
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
    );

    const contentStyles = measuring ? undefined : {height: desiredHeight};

    return (
      <div className={className} {...overlay.props}>
        <div className={styles.Content}>
          <div
            id={id}
            className={styles.Content}
            style={contentStyles}
            ref={contentNode}
          >
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