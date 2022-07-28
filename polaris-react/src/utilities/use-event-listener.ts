import {useEffect, useRef, RefObject} from 'react';

import {useIsomorphicLayoutEffect} from './use-isomorphic-layout-effect';

/**
 * Acceptable target elements for `useEventListener`.
 */
type UseEventListenerTarget =
  | Window
  | Document
  | HTMLElement
  | RefObject<HTMLElement>;

/**
 * Extracts the target element from a React `ref` or returns the input element.
 */
type ExtractTargetElement<T> = T extends RefObject<infer U> ? U : T;

/**
 * Extracts a (lib.dom.ts) EventMap for a given target element.
 */
type ExtractEventMap<Target> = ExtractTargetElement<Target> extends Window
  ? WindowEventMap
  : HTMLElementEventMap;

/**
 * Extracts all event names for a given target element.
 */
type ExtractEventName<Target> = keyof ExtractEventMap<
  ExtractTargetElement<Target>
>;

/**
 * Extracts the `event` object for a given event type.
 */
type ExtractEvent<
  Target,
  EventName extends ExtractEventName<Target>,
> = ExtractEventMap<ExtractTargetElement<Target>>[EventName];

/**
 * React hook encapsulating the boilerplate logic for adding and removing event listeners.
 */
export function useEventListener<
  TargetEventName extends ExtractEventName<Target>,
  TargetEvent extends ExtractEvent<Target, TargetEventName>,
  Target extends UseEventListenerTarget = Window,
>(
  eventName: TargetEventName,
  handler: (event: TargetEvent) => void,
  target?: Target,
  options?: AddEventListenerOptions,
): void {
  const handlerRef = useRef(handler);
  const optionsRef = useRef(options);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useIsomorphicLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const targetElement =
      target && 'current' in target ? target.current : target || window;

    if (
      !(
        typeof eventName === 'string' &&
        targetElement &&
        !('current' in targetElement)
      )
    ) {
      return;
    }

    const eventOptions = optionsRef.current;

    const eventListener = (event: Event) =>
      handlerRef.current(event as unknown as TargetEvent);

    targetElement.addEventListener(eventName, eventListener, eventOptions);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, eventOptions);
    };
  }, [eventName, target]);
}
