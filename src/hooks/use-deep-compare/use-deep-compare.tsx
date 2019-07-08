import {useEffect} from 'react';
import {EffectCallback, DependencyList, Comparator} from '../../types';
import {useDeepCompareRef} from '../../utilities/use-deep-compare-ref';

function useDeepCompare(
  callback: EffectCallback,
  dependencies: DependencyList,
  customCompare?: Comparator,
) {
  useEffect(callback, useDeepCompareRef(dependencies, customCompare));
}

export default useDeepCompare;
