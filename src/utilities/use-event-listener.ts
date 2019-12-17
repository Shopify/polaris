import {useEffect, RefObject} from 'react';

interface Options {
  defaultToWindow?: boolean;
  defaultToDocument?: boolean;
}

/**
 * Attaches and removes event listeners from the target
 * @param target Defines a target for the listener to be placed on. Defaults to window.
 * @param type Defines the type of event, i.e blur or focus
 * @param handler Defines a callback to be invoked when the event type occurs
 * @param listenerOptions Object that specifies event properties
 * @param options Object that defines properties used in the hook
 *                interface Options {
 *                  // Uses window as a back up event target when the current
 *                  // target is falsy
 *                  defaultToWindow: boolean;
 *                }
 * @example
 * function Playground() {
 *  useEventListener(window, 'resize', () => console.log('resize'));
 *
 *  return null;
 * }
 */
export function useEventListener<K extends keyof WindowEventMap>(
  target: RefObject<HTMLElement> | Window | Document | null,
  type: K,
  handler: (ev: WindowEventMap[K]) => any,
  listenerOptions?: boolean | AddEventListenerOptions,
  options?: Options,
) {
  useEffect(() => {
    let eventTarget = target && 'current' in target ? target.current : target;
    if (!eventTarget && options) {
      if (options.defaultToWindow) eventTarget = window;
      else if (options.defaultToDocument) eventTarget = document;
    }

    if (!eventTarget) return;

    eventTarget.addEventListener(type, handler, listenerOptions);
    return () => {
      eventTarget &&
        eventTarget.removeEventListener(type, handler, listenerOptions);
    };
  }, [handler, listenerOptions, options, target, type]);
}
