import React, {ReactNode} from 'react';

import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

export function AfterInitialMount({children, fallback = null}: Props) {
  usePerformanceBenchmark('AfterInitialMount');
  const isMounted = useIsAfterInitialMount();
  const content = isMounted ? children : fallback;

  return <>{content}</>;
}
