/* eslint-disable react-hooks/rules-of-hooks */
import React, {PropsWithChildren, useEffect} from 'react';

import {useFeatures} from '../../utilities/features';
import {useIsMountedRef} from '../../utilities/use-is-mounted-ref';
import {Mark, PolarisEmoji} from '../../utilities/use-performance-benchmark';

interface PerformanceBenchmarkProps {
  name: string;
}

export function PerformanceBenchmark({
  name,
  children,
}: PropsWithChildren<PerformanceBenchmarkProps>) {
  const {enablePerformanceBenchmarking} = useFeatures();
  if (!enablePerformanceBenchmarking) {
    return <>{children}</>;
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

  return <>{children}</>;
}
