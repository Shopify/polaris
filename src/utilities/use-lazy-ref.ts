import {useRef, MutableRefObject} from 'react';

const UNIQUE_IDENTIFIER = Symbol('unique_identifier');

/**
 * useLazyRef provides a lazy initial value, similar to lazy
 * initial state the initialValue is the value used during
 * initialization and disregarded after that.
 * @param initialValue - A function that will return the initial
 * value and be disregarded after that
 * @returns MutableRefObject<T> - Returns a ref object with the
 * results from invoking initial value
 */
export function useLazyRef<T>(initialValue: () => T) {
  const lazyRef = useRef<T | Symbol>(UNIQUE_IDENTIFIER);

  if (lazyRef.current === UNIQUE_IDENTIFIER) {
    lazyRef.current = initialValue();
  }

  return lazyRef as MutableRefObject<T>;
}
