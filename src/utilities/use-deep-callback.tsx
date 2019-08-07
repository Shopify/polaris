import {useCallback} from 'react';
import {EffectCallback, DependencyList, Comparator} from '../types';
import {useDeepCompareRef} from './use-deep-compare-ref';

export function useDeepCallback(
  callback: EffectCallback,
  dependencies: DependencyList,
  customCompare?: Comparator,
) {
  return useCallback(callback, useDeepCompareRef(dependencies, customCompare));
}
