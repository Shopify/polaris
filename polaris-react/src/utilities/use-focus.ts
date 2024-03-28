import type {RefObject} from 'react';
import {useState, useCallback} from 'react';

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

  const handleFocusIn = useCallback(() => setIsFocusedIn(true), []);
  const handleFocusOut = useCallback(() => setIsFocusedIn(false), []);

  useEventListener('focusin', handleFocusIn, ref);
  useEventListener('focusout', handleFocusOut, ref);

  return isFocusedIn;
}
