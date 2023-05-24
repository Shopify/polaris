import {useEffect, useState} from 'react';

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
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  });

  return null;
}
