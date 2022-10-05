import {useEffect, useRef} from 'react';

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
  const position = useRef(0);

  const handleKeyEvent = (event: KeyboardEvent) => {
    const key = event.keyCode;
    const requiredKey = KONAMI_CODE[position.current];

    if (key === requiredKey) {
      if (position.current === KONAMI_CODE.length - 1) {
        handler(event);
        position.current = 0;
      } else {
        position.current++;
      }
    } else {
      position.current = 0;
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
