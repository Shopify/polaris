import {useRef, useEffect} from 'react';
import type {MutableRefObject} from 'react';

/**
 * Returns a MutatableRefObject containing a boolean value that
 * represents a components mounted status.
 * @returns MutableRefObject<boolean> The mounted status
 */
export function useIsMountedRef(): MutableRefObject<boolean> {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
