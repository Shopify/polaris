import {useEffect, useState} from 'react';
import {
  addEventListener,
  removeEventListener,
} from '@shopify/javascript-utilities/events';

import {Key} from '../../types';

export interface KonamiCodeProps {
  handler(event: KeyboardEvent): void;
}

export const KONAMI_CODE = [
  Key.UpArrow,
  Key.UpArrow,
  Key.DownArrow,
  Key.DownArrow,
  Key.LeftArrow,
  Key.RightArrow,
  Key.LeftArrow,
  Key.RightArrow,
  Key.KeyB,
  Key.KeyA,
];

export function KonamiCode({handler}: KonamiCodeProps) {
  const keyEvent = 'keydown';
  const [position, setPosition] = useState(0);

  const handleKeyEvent = (event: KeyboardEvent) => {
    const key = event.keyCode;
    const requiredKey = KONAMI_CODE[position];

    if (key === requiredKey) {
      if (position === KONAMI_CODE.length - 1) {
        handler(event);
        setPosition(0);
      } else {
        setPosition(position + 1);
      }
    } else {
      setPosition(0);
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
