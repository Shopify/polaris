import {useEffect} from 'react';

import {useDeepCompareRef} from './use-deep-compare-ref';

type DependencyList = readonly unknown[];

type Comparator = (a: DependencyList, b: DependencyList) => boolean;

/**
 * A replacement for React's useEffect that'll allow for custom and deep
 * compares of the dependency list.
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useeffect}
 * @param callback Accepts a callback that's forwarded to React's useEffect
 * @param dependencies A dependency array similar to React's useEffect however it utilizes a deep compare
 * @param customCompare Opportunity to provide a custom compare function
 * @example
 * function ComponentExample() {
 *  const [, forceUpdate] = useState();
 *  const obj = {a: 1};
 *
 *  useDeepEffect(() => {
 *    console.log('useDeepEffect invocation');
 *    forceUpdate(obj);
 *  }, [obj]);
 *
 *  return null;
 * }
 */
export function useDeepEffect(
  callback: Parameters<typeof useEffect>[0],
  dependencies: DependencyList,
  customCompare?: Comparator,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, useDeepCompareRef(dependencies, customCompare));
}
