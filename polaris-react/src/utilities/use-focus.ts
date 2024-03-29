import type {RefObject} from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';

import {useEventListener} from './use-event-listener';

export function useFocus(
  /**
   * The target element for the focus event.
   */
  ref: RefObject<HTMLElement>,
): boolean {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  useEventListener('focus', handleFocus, ref);
  useEventListener('blur', handleBlur, ref);

  return isFocused;
}

export function useFocusIn(
  /**
   * The target element for the focusin event.
   */
  ref: RefObject<HTMLElement>,
): boolean {
  const [isFocusedIn, setIsFocusedIn] = useState(false);
  const deferredFocusOut = useRef<NodeJS.Timeout | null>(null);

  const handleFocusIn = useCallback(() => {
    if (deferredFocusOut.current) {
      clearTimeout(deferredFocusOut.current);
      deferredFocusOut.current = null;
    }
    setIsFocusedIn(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    // Push focusout state update to the end of the event queue to
    // allow subsequent focusin events to persist the isFocusedIn state
    deferredFocusOut.current = setTimeout(() => {
      setIsFocusedIn(false);
    }, 0);
  }, []);

  useEventListener('focusin', handleFocusIn, ref);
  useEventListener('focusout', handleFocusOut, ref);
  useEffect(
    () => () => {
      if (deferredFocusOut.current) clearTimeout(deferredFocusOut.current);
    },
    [],
  );

  return isFocusedIn;
}
