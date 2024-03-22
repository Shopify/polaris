import {useEffect, useRef} from 'react';

/**
 * Adapted from https://github.com/mui/material-ui/blob/0102a9579628d48d784511a562b7b72f0f51847e/packages/mui-utils/src/useTimeout/useTimeout.ts#L35
 */
export function useTimeout() {
  const timeoutRef = useLazyRef(Timeout.create);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(timeoutRef.current.clearEffect, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return timeoutRef.current;
}

/**
 * Adapted from https://github.com/mui/material-ui/blob/0102a9579628d48d784511a562b7b72f0f51847e/packages/mui-utils/src/useTimeout/useTimeout.ts#L5
 */
export class Timeout {
  static create() {
    return new Timeout();
  }

  id: ReturnType<typeof setTimeout> | null = null;

  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start = (delay: number, fn: () => void) => {
    this.clear();

    this.id = setTimeout(() => {
      this.id = null;
      fn();
    }, delay);
  };

  clear = () => {
    if (this.id === null) return;

    clearTimeout(this.id);
    this.id = null;
  };

  clearEffect = () => this.clear;
}

const uninitializedRef = {};

/**
 * A React.useRef() that is initialized lazily with a function. Note that it accepts an optional
 * initialization argument, so the initialization function doesn't need to be an inline closure.
 *
 * Adapted from https://github.com/mui/material-ui/blob/next/packages/mui-utils/src/useLazyRef/useLazyRef.ts
 *
 * @usage
 *   const lazyRef = useLazyRef(sortColumns, columns)
 */
export function useLazyRef<LazyRef, InitArg>(
  init: (arg?: InitArg) => LazyRef,
  initArg?: InitArg,
) {
  const lazyRef = useRef(uninitializedRef as unknown as LazyRef);

  if (lazyRef.current === uninitializedRef) {
    lazyRef.current = init(initArg);
  }

  return lazyRef;
}
