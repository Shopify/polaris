import {useEffect, useRef} from 'react';

export type ElementType = Window | Document | HTMLElement;

export function useEventListener(
  event: string,
  handler: () => void,
  element: ElementType = window,
  options?: AddEventListenerOptions,
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    const handler = handlerRef.current;
    element.addEventListener(event, handlerRef.current, options);

    return () => {
      element.removeEventListener(event, handler, options?.capture);
    };
  }, [event, element, options]);
}
