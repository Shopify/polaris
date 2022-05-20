import {useEffect, useRef} from 'react';

// See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect';
import {isBrowser} from './utils';

export type UseEventTarget = Window | Document | HTMLElement | EventTarget;

const defaultTarget = isBrowser ? window : null;

type AddEventListener<T> = T extends UseEventTarget
  ? T['addEventListener']
  : never;

export type AddEventListenerParameters<T> = Parameters<AddEventListener<T>>;

const useEvent = <T extends UseEventTarget>(
  eventType: AddEventListenerParameters<T>[0],
  handler: AddEventListenerParameters<T>[1],
  target: T = defaultTarget,
  options?: AddEventListenerParameters<T>[2],
) => {
  const savedHandler = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const savedOptions = useRef(options);

  useIsomorphicLayoutEffect(() => {
    savedOptions.current = options;
  }, [options]);

  useEffect(() => {
    if (target && savedHandler.current) {
      target.addEventListener(
        eventType,
        savedHandler.current,
        savedOptions.current,
      );
    }

    return () => {
      if (target && savedHandler.current) {
        target.removeEventListener(
          eventType,
          savedHandler.current,
          savedOptions.current,
        );
      }
    };
  }, [eventType, target]);
};

export function Test() {
  useEvent('click', (event) => event);
  useEvent('keydown', (event) => event);
  useEvent('paste', (event) => event);

  return <button ref={buttonRef} />;
}
