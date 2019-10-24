import {useRef} from 'react';
import isEqual from 'lodash/isEqual';

type DependencyList = ReadonlyArray<unknown>;
type Comparator = (a: DependencyList, b: DependencyList) => boolean;

/**
 * useDeepCompare is valuable to keep a consistent dependency list across reference changes
 * @param dependencies A dependency array like React.useEffect/React.useCallback/React.useMemo
 * @param comparator A optional function to compare dependencies that'll default to a deep comparison
 * @returns A dependency list
 * @see {@link https://github.com/Shopify/polaris-react/blob/master/src/utilities/use-deep-effect.tsx}
 * @see {@link https://github.com/Shopify/polaris-react/blob/master/src/utilities/use-deep-callback.tsx}
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
