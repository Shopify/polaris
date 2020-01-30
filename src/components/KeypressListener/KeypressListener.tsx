import {useEffect} from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';
import {Key} from '../../types';

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
    addEventListener(document, keyEvent, handleKeyEvent);
    return () => {
      removeEventListener(document, keyEvent, handleKeyEvent);
    };
  });

  return null;
}
