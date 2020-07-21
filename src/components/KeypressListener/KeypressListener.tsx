import {useEffect} from 'react';

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
  const handleKeyEvent = (event: KeyboardEvent) => {
    if (event.keyCode === keyCode) {
      handler(event);
    }
  };

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  });

  return null;
}
