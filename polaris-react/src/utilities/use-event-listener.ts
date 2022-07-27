import {useEffect, useRef, RefObject} from 'react';

type ElementType = RefObject<HTMLElement> | Window | Document | HTMLElement;

/**
 * Attachs and removes event listeners from the target
 * @param event Defines the type of event, i.e blur or focus
 * @param handler Defines a callback to be invoked when the event type occurs
 * @param element Defines a target for the listener to be placed on
 * @param options Object that specificies event properties
 */
export function useEventListener(
  event: string,
  handler: (event: Event) => void,
  element: ElementType = window,
  options?: AddEventListenerOptions,
) {
  const handlerRef = useRef(handler);
  const optionsRef = useRef(options);
  const eventTargetRef = useRef(
    element && 'current' in element ? element.current : element,
  );

  useEffect(() => {
    handlerRef.current = handler;
    optionsRef.current = options;
    eventTargetRef.current =
      element && 'current' in element ? element.current : element;
  }, [handler, options, element]);

  useEffect(() => {
    const handler = (event: Event) => handlerRef.current(event);
    const options = optionsRef.current;
    const eventTarget = eventTargetRef.current;

    eventTarget?.addEventListener(event, handler, options);

    return () => eventTarget?.removeEventListener(event, handler, options);
  }, [event, element]);
}
