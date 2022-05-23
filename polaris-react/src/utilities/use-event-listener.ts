import {useEffect, useRef} from 'react';

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
    const handler = handlerRef.current;
    const options = optionsRef.current;

    element.addEventListener(event, handler, options);

    return () => element.removeEventListener(event, handler, options);
  }, [event, element]);
}
