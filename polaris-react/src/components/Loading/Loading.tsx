import {memo, useEffect} from 'react';

import {useFrame} from '../../utilities/frame';
import {usePerformanceBenchmark} from '../../utilities/use-performance-benchmark';

export interface LoadingProps {}

export const Loading = memo(function Loading() {
  usePerformanceBenchmark('Loading');
  const {startLoading, stopLoading} = useFrame();

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, [startLoading, stopLoading]);

  return null;
});
