import {useRef} from 'react';
import isEqual from 'lodash/isEqual';

type DependencyList = ReadonlyArray<unknown>;
type Comparator = (a: DependencyList, b: DependencyList) => boolean;

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
