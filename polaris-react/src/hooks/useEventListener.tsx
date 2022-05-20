import {useEffect, useRef} from 'react';

import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect';

type UseEventTarget = Window | Document | HTMLElement;

type ExtractEventMap<Target extends UseEventTarget> = Target extends Window
  ? WindowEventMap
  : HTMLElementEventMap;

type ExtractEventName<Target extends UseEventTarget> =
  keyof ExtractEventMap<Target>;

type ExtractEvent<
  Target extends UseEventTarget,
  EventName extends ExtractEventName<Target>,
> = ExtractEventMap<Target>[EventName];

export function useEventListener<
  EventName extends ExtractEventName<Target>,
  Target extends UseEventTarget = Window,
>(
  eventName: EventName,
  handler: (event: ExtractEvent<Target, EventName>) => void,
  target?: null | Target,
): void {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: UseEventTarget = target || window;

    if (
      !(
        Boolean(targetElement?.addEventListener) &&
        typeof eventName === 'string'
      )
    ) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) =>
      savedHandler.current(event as unknown as ExtractEvent<Target, EventName>);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, target]);
}

export function Test() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener('click', (event) => event);
  useEventListener('keydown', (event) => event);
  useEventListener('paste', (event) => event);
  useEventListener('paste', (event) => event, buttonRef.current);
  useEventListener('paste', (event) => event, document);

  return <button ref={buttonRef} />;
}
