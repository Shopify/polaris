import {useRef, useEffect} from 'react';

/**
 * Returns the previous value of a variable.
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
