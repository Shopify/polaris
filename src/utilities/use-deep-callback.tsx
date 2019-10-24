import {useCallback} from 'react';
import {EffectCallback, DependencyList, Comparator} from '../types';
import {useDeepCompareRef} from './use-deep-compare-ref';

/**
 * A replacement for React.useCallback that'll allow for custom and deep compares.
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usecallback}
 * @param callback Accepts a callback that's forwarded to React.useCallback
 * @param dependencies A dependency array similar to React.useCallback however it utilizes a deep compare
 * @param customCompare Opportunity to provide a custom compare function
 * @returns A memoized callback
 * @example
 * function ComponentExample() {
 *  const [, forceUpdate] = useState();
 *  const obj = {a: 1};
 *
 *  const handleClick = useDeepCallback(() => {
 *    forceUpdate(obj);
 *  }, [obj]);
 *
 *  return <button onClick={handleClick}>Click me</button>;
 * }
 */
export function useDeepCallback(
  callback: EffectCallback,
  dependencies: DependencyList,
  customCompare?: Comparator,
) {
  return useCallback(callback, useDeepCompareRef(dependencies, customCompare));
}
