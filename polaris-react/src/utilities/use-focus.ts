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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFocusIn = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsFocusedIn(true);
  }, []);

  const handleFocusOut = useCallback(() => {
    // Prevents flashing when moving focus between child elements
    timeoutRef.current = setTimeout(() => {
      setIsFocusedIn(false);
    }, 0);
  }, []);

  useEventListener('focusin', handleFocusIn, ref);
  useEventListener('focusout', handleFocusOut, ref);
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return isFocusedIn;
}
