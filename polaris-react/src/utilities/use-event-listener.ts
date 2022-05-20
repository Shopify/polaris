import {useRef, RefObject} from 'react';

import {useDeepEffect} from './use-deep-effect';
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
 * Extracts the target element from a React `RefObject` or returns the input element.
 */
type ExtractTargetElement<Target> = Target extends RefObject<infer Element>
  ? Element
  : Target;

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

  useDeepEffect(() => {
    if (typeof eventName !== 'string') return;

    let targetElement: Exclude<UseEventListenerTarget, RefObject<HTMLElement>>;

    if (typeof target === 'undefined') {
      targetElement = window;
    } else if ('current' in target) {
      if (target.current === null) return;

      targetElement = target.current;
    } else {
      targetElement = target;
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
