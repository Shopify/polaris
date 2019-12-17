import {useRef, MutableRefObject} from 'react';

const UNIQUE_IDENTIFIER = Symbol('unique_identifier');

/**
 * useLazyRef provides a lazy initial value, similar to lazy
 * initial state the initialValue is the value used during
 * initialization and disregarded after that. Use this hook
 * for expensive initialization.
 * @param initialValue - A function that will return the initial
 * value and be disregarded after that
 * @returns MutableRefObject<T> - Returns a ref object with the
 * results from invoking initial value
 * @example
 * function ComponentExample() {
 *  const title = useLazyRef(() => someExpensiveComputation());
 *  return <h1>{title.current}</h1>;
 * }
 */
export function useLazyRef<T>(initialValue: () => T) {
  const lazyRef = useRef<T | symbol>(UNIQUE_IDENTIFIER);

  if (lazyRef.current === UNIQUE_IDENTIFIER) {
    lazyRef.current = initialValue();
  }

  return lazyRef as MutableRefObject<T>;
}
