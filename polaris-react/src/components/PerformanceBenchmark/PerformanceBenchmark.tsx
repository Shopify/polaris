import React, {PropsWithChildren} from 'react';

import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

export function PerformanceBenchmark({
  name,
  children,
}: PropsWithChildren<{name: string}>) {
  usePerformanceBenchmark(name);

  return <>{children}</>;
}
