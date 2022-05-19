import {useCallback, useEffect, useRef} from 'react';

import {useIsomorphicLayoutEffect} from '../../utilities/use-isomorphic-layout-effect';
import type {Key} from '../../types';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

export interface NonMutuallyExclusiveProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

export type KeypressListenerProps = NonMutuallyExclusiveProps &
  (
    | {useCapture?: boolean; options?: undefined}
    | {useCapture?: undefined; options?: AddEventListenerOptions}
  );

type KeyEvent = 'keydown' | 'keyup';

export function KeypressListener({
  keyCode,
  handler,
  keyEvent = 'keyup',
  options,
  useCapture,
}: KeypressListenerProps) {
  usePerformanceBenchmark('KeypressListener');
  const tracked = useRef({handler, keyCode});

  useIsomorphicLayoutEffect(() => {
    tracked.current = {handler, keyCode};
  }, [handler, keyCode]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    const {handler, keyCode} = tracked.current;
    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent, useCapture || options);
    return () => {
      document.removeEventListener(
        keyEvent,
        handleKeyEvent,
        useCapture || options,
      );
    };
  }, [keyEvent, handleKeyEvent, useCapture, options]);

  return null;
}
