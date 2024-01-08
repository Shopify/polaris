import {useRef, useEffect, useState, useCallback} from 'react';

import {useEphemeralPresenceManager} from '../../../utilities/ephemeral-presence-manager';
import {useBreakpoints} from '../../../utilities/breakpoints';
import {classNames} from '../../../utilities/css';
import styles from '../HoverCard.scss';

const HOVER_OUT_TIMEOUT = 150;

export function useHoverCardActivatorWrapperProps({
  hoverDelay,
  snapToParent,
  ref: providedActivatorRef,
  toggleActive,
}: {
  hoverDelay?: number;
  snapToParent?: boolean;
  ref?: React.RefObject<HTMLElement | null>;
  toggleActive?(active: boolean): void;
}) {
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);
  const mouseEntered = useRef(false);
  const dynamicActivatorRef = useRef<HTMLElement | null>(null);

  const {mdUp} = useBreakpoints();

  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

  const [activatorNode, setActivatorNode] = useState<HTMLElement | null>(null);
  const [overlayActive, setOverlayActive] = useState(false);

  useEffect(() => {
    if (
      !activatorNode &&
      providedActivatorRef &&
      providedActivatorRef.current
    ) {
      setActivatorNode(providedActivatorRef.current);
    }
  }, [providedActivatorRef, activatorNode]);

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
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('hovercard');
    }, HOVER_OUT_TIMEOUT);

    toggleActive?.(false);
  }, [toggleActive, removePresence]);

  const handleMouseLeaveActivator = useCallback(
    (event?: React.MouseEvent<HTMLDivElement>) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - EventTarget does in fact have a parentNode property
      const parentClassName = event?.relatedTarget?.parentNode?.className;
      const mouseEnteredHoverCard =
        parentClassName?.includes('HoverCard-Content');

      if (hoverDelayTimeout.current) {
        clearTimeout(hoverDelayTimeout.current);
        hoverDelayTimeout.current = null;
      }

      dynamicActivatorRef.current = null;
      mouseEntered.current = false;

      if (mouseEnteredHoverCard) {
        return;
      }

      handleClose();
    },
    [handleClose, hoverDelayTimeout, mouseEntered],
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!mdUp) return;
      dynamicActivatorRef.current = event.currentTarget;
      mouseEntered.current = true;

      if (hoverDelay && !presenceList.hovercard) {
        hoverDelayTimeout.current = setTimeout(() => {
          handleOpen();
        }, hoverDelay);
      } else {
        handleOpen();
      }
    },
    [handleOpen, hoverDelay, hoverDelayTimeout, presenceList, mdUp],
  );

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  const handleMouseEnterFix = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseEntered.current) {
        handleMouseEnter(event);
      }
    },
    [handleMouseEnter],
  );

  const handleMouseEnterOverlay = () => {
    setOverlayActive(true);
  };

  const handleMouseLeaveOverlay = () => {
    handleClose();
    setOverlayActive(false);
  };

  const className = classNames(
    styles.ActivatorWrapper,
    snapToParent && styles.snapToParent,
  );

  return {
    className,
    overlayActive,
    isDesktop: mdUp,
    present: presenceList.hovercard,
    activatorElement: dynamicActivatorRef?.current ?? activatorNode,
    setActivatorNode,
    handleMouseLeaveActivator,
    handleMouseEnterActivator: handleMouseEnterFix,
    handleMouseEnterOverlay,
    handleMouseLeaveOverlay,
  };
}
