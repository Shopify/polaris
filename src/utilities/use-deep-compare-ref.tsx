import {useRef} from 'react';
import {isObjectsEqual} from './is-objects-equal';

type DependencyList = ReadonlyArray<unknown>;
type Comparator = (a: DependencyList, b: DependencyList) => boolean;

export function useDeepCompareRef(
  dependencies: DependencyList,
  comparator: Comparator = isObjectsEqual,
) {
  const dependencyList = useRef<DependencyList>(dependencies);

  if (!comparator(dependencyList.current, dependencies)) {
    dependencyList.current = dependencies;
  }

  return dependencyList.current;
}
