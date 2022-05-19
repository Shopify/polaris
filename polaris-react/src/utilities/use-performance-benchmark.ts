/* eslint-disable react-hooks/rules-of-hooks */
import {useEffect} from 'react';

import {useIsMountedRef} from './use-is-mounted-ref';
import {useFeatures} from './features';

export enum Mark {
  MountStart = 'MountStart',
  MountEnd = 'MountEnd',
  Update = 'Update',
  UpdateStart = 'UpdateStart',
  UpdateEnd = 'UpdateEnd',
}

export const PolarisEmoji = '🌌';

export function usePerformanceBenchmark(name: string) {
  const {enablePerformanceBenchmarking} = useFeatures();
  if (!enablePerformanceBenchmarking) {
    return;
  }

  const {current: isMounted} = useIsMountedRef();

  if (!isMounted) {
    window.performance.mark(`${name}${Mark.MountStart}`);
  } else {
    window.performance.mark(`${name}${Mark.UpdateStart}`);
  }

  useEffect(() => {
    if (!isMounted) {
      window.performance.mark(`${name}${Mark.MountEnd}`);
      window.performance.measure(
        `${PolarisEmoji} ${name}`,
        `${name}${Mark.MountStart}`,
        `${name}${Mark.MountEnd}`,
      );
    } else {
      window.performance.mark(`${name}UpdateEnd`);
      window.performance.measure(
        `${PolarisEmoji} ${name} (${Mark.Update})`,
        `${name}${Mark.UpdateStart}`,
        `${name}${Mark.UpdateEnd}`,
      );
    }
  });
}
