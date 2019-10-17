import {useEffect, RefObject} from 'react';

/**
 * Attachs and removes event listeners from the target
 * @param target Defines a target for the listener to be placed on
 * @param type Defines the type of event, i.e blur or focus
 * @param handler Defines a callback to be invoked when the event type occurs
 * @param options Object that specificies event properties
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: RefObject<HTMLElement> | Window | Document,
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  useEffect(() => {
    const eventTarget = target && 'current' in target ? target.current : target;
    if (!eventTarget) return;
    eventTarget.addEventListener(type, handler, options);
    return () => eventTarget.removeEventListener(type, handler, options);
  }, [handler, options, target, type]);
}
