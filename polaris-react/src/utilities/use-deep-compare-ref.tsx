import {useRef} from 'react';
import isEqual from 'react-fast-compare';

type DependencyList = readonly unknown[];
type Comparator = (a: DependencyList, b: DependencyList) => boolean;

/**
 * Allows for custom or deep comparison of a dependency list. Useful to keep a consistent dependency
 * list across reference changes.
 * @param dependencies A dependency array similar to React's useEffect / useCallback / useMemo
 * @param comparator An optional function to compare dependencies that'll default to a deep comparison
 * @returns A dependency list
 * @see {@link https://github.com/Shopify/polaris-react/blob/main/src/utilities/use-deep-effect.tsx}
 * @see {@link https://github.com/Shopify/polaris-react/blob/main/src/utilities/use-deep-callback.tsx}
 * @example
 * function useDeepEffectExample(callback, dependencies, customCompare) {
 *  useEffect(callback, useDeepCompareRef(dependencies, customCompare));
 * }
 */
export function useDeepCompareRef(
  dependencies: DependencyList,
  comparator: Comparator = isEqual,
) {
  const dependencyList = useRef<DependencyList>(dependencies);

  if (!comparator(dependencyList.current, dependencies)) {
    dependencyList.current = dependencies;
  }

  return dependencyList.current;
}
