import {useEffect} from 'react';
import {EffectCallback, DependencyList, Comparator} from '../types';
import {useDeepCompareRef} from './use-deep-compare-ref';

export function useDeepCompare(
  callback: EffectCallback,
  dependencies: DependencyList,
  customCompare?: Comparator,
) {
  useEffect(callback, useDeepCompareRef(dependencies, customCompare));
}
