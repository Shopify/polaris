import {useRef} from 'react';
import {EffectCallback} from '../types';
import {useIsAfterInitialMount} from './use-is-after-initial-mount';

/**
 * Similarly to the lifecycle hook componentDidMount, useComponentDidMount
 * will be invoked after the component has mounted, and only the initial mount.
 * @param callback Defines a callback to use invoked once the component has
 * initially mounted.
 */
export function useComponentDidMount(callback: EffectCallback) {
  const isAfterInitialMount = useIsAfterInitialMount();
  const hasInvokedLifeCycle = useRef(false);

  if (isAfterInitialMount && !hasInvokedLifeCycle.current) {
    hasInvokedLifeCycle.current = true;
    return callback();
  }
}
