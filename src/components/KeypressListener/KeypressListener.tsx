import {useCallback, useEffect, useRef} from 'react';

import {useIsomorphicLayoutEffect} from '../../utilities/use-isomorphic-layout-effect';
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
  const tracked = useRef({handler, keyCode});

  useIsomorphicLayoutEffect(() => {
    tracked.current = {handler, keyCode};
  }, [handler, keyCode]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    const {handler, keyCode} = tracked.current;
    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  }, [keyEvent, handleKeyEvent]);

  return null;
}
