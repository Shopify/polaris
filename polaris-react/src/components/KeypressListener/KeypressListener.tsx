import {useCallback, useEffect, useRef} from 'react';

import {useIsomorphicLayoutEffect} from '../../utilities/use-isomorphic-layout-effect';
import type {Key} from '../../types';

export interface NonMutuallyExclusiveProps {
  keyCode: Key;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
  document?: Document;
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
  document: ownerDocument = globalThis.document,
}: KeypressListenerProps) {
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
    ownerDocument.addEventListener(
      keyEvent,
      handleKeyEvent,
      useCapture || options,
    );
    return () => {
      ownerDocument.removeEventListener(
        keyEvent,
        handleKeyEvent,
        useCapture || options,
      );
    };
  }, [keyEvent, handleKeyEvent, useCapture, options, ownerDocument]);

  return null;
}
