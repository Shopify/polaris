import {useRef, useEffect, useCallback} from 'react';

import {useEphemeralPresenceManager} from '../ephemeral-presence-manager';
import {useBreakpoints} from '../breakpoints';

const HOVER_OUT_TIMEOUT = 150;

export function useHoverCardActivatorWrapperProps({
  toggleActive,
  hoverDelay,
}: {
  toggleActive?(active: boolean): void;
  hoverDelay?: number;
}) {
  const hoverDelayTimeout = useRef<NodeJS.Timeout | null>(null);
  const hoverOutTimeout = useRef<NodeJS.Timeout | null>(null);
  const mouseEntered = useRef(false);

  const {mdUp} = useBreakpoints();

  const {presenceList, addPresence, removePresence} =
    useEphemeralPresenceManager();

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
    toggleActive?.(false);
    hoverOutTimeout.current = setTimeout(() => {
      removePresence('hovercard');
    }, HOVER_OUT_TIMEOUT);
  }, [toggleActive, removePresence]);

  const handleMouseLeave = useCallback(() => {
    console.log('mouse left');

    if (hoverDelayTimeout.current) {
      clearTimeout(hoverDelayTimeout.current);
      hoverDelayTimeout.current = null;
    }

    mouseEntered.current = false;
    handleClose();
  }, [handleClose, hoverDelayTimeout, mouseEntered]);

  const handleMouseEnter = useCallback(() => {
    console.log('mouse entered');

    if (!mdUp) return;

    mouseEntered.current = true;
    if (hoverDelay && !presenceList.hovercard) {
      hoverDelayTimeout.current = setTimeout(() => {
        handleOpen();
      }, hoverDelay);
    } else {
      handleOpen();
    }
  }, [handleOpen, hoverDelay, hoverDelayTimeout, presenceList, mdUp]);

  // https://github.com/facebook/react/issues/10109
  // Mouseenter event not triggered when cursor moves from disabled button
  const handleMouseEnterFix = useCallback(() => {
    if (!mouseEntered.current) {
      handleMouseEnter();
    }
  }, [handleMouseEnter]);

  return {
    isDesktop: mdUp,
    handleMouseLeave,
    handleMouseOver: handleMouseEnterFix,
  };

  // END HOOK
}
