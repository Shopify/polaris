import {useCallback, useEffect, useRef} from 'react';
import {useIsomorphicLayoutEffect} from '@shopify/react-hooks';

import type {Key} from '../../types';

export interface KeypressListenerProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

type KeyEvent = 'keydown' | 'keyup';

export function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup',
}: KeypressListenerProps) {
  const handlerRef = useRef(handler);

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === keyCode) {
        handlerRef.current(event);
      }
    },
    [keyCode],
  );

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  }, [keyEvent, handleKeyEvent]);

  return null;
}
