import type {RefObject} from 'react';
import {useEffect, useState, useCallback} from 'react';

import {useEventListener} from './use-event-listener';

export function useHover(
  /**
   * The target element for the hover event.
   */
  ref: RefObject<HTMLElement>,
): boolean {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  useEventListener('mouseenter', handleMouseEnter, ref);
  useEventListener('mouseleave', handleMouseLeave, ref);

  return isHovered;
}

export function useMouseHover(
  /**
   * The target element for the hover event.
   */
  ref: RefObject<HTMLElement>,
  /**
   * The fallback value when the device is not a mouse.
   */
  fallback = false,
): boolean {
  const isHovered = useHover(ref);

  const [isMouseDevice, setIsMouseDevice] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      // https://github.com/argyleink/open-props/blob/09e70c03c0a2533d06ec823f47490f018eb27f23/src/props.media.css#L24
      '(hover: hover) and (pointer: fine)',
    );

    const handler = (event: MediaQueryListEvent) =>
      setIsMouseDevice(event.matches);

    if (mediaQueryList.addListener) {
      mediaQueryList.addListener(handler);
    } else {
      mediaQueryList.addEventListener('change', handler);
    }

    setIsMouseDevice(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handler);
      } else {
        mediaQueryList.removeEventListener('change', handler);
      }
    };
  }, []);

  return isMouseDevice ? isHovered : fallback;
}
