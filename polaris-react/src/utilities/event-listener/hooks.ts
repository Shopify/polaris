import {useEffect, useRef} from 'react';

export interface Props {
  element?: HTMLElement | Window | Document;
  event: string;
  capture?: boolean;
  passive?: boolean;
  handler(event: Event): void;
}

export function useEventListener({
  element = window,
  event,
  capture,
  passive,
  handler,
}: Props) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    element.addEventListener(event, handlerRef.current, {capture, passive});

    return () => {
      element.removeEventListener(event, handlerRef.current, capture);
    };
  }, [event, element]);
}
