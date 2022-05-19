import {RefObject, useEffect, useRef} from 'react';

type ElementType = Window | Document | HTMLElement;

export function useEventListener(
  event: string,
  handler: (event: Event) => void,
  element: ElementType = window,
  options?: AddEventListenerOptions,
) {
  const handlerRef = useRef(handler);
  const optionsRef = useRef(options);

  useEffect(() => {
    handlerRef.current = handler;
    optionsRef.current = options;
  }, [handler, options]);

  useEffect(() => {
    const target = 'current' in element ? element.current : element;

    if (!target) return;

    const handler = handlerRef.current;
    const options = optionsRef.current;

    target.addEventListener(event, handler, options);

    return () => target.removeEventListener(event, handler, options);
  }, [event, element]);
}
